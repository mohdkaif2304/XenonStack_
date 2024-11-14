"use client"
import React, { useState, useEffect } from 'react';
import SinglePg from '../../components/SinglePg';
import { PinIcon, SearchIcon, MessageCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Location from '@/components/Location';
import PocketBase from 'pocketbase';
import { motion } from 'framer-motion';

const pb = new PocketBase('https://laugh-consonant.pockethost.io');

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Chatbot Component
const Chatbot = ({ propertyData }: { propertyData: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{type: 'user' | 'bot', content: string}[]>([]);
  const [currentStep, setCurrentStep] = useState('name');
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    priceRange: '',
    city: ''
  });

  useEffect(() => {
    if (isOpen && chat.length === 0) {
      setChat([{
        type: 'bot',
        content: 'Hello! I\'m your PG Assistant. To help you find properties, please tell me your name.'
      }]);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;

    setChat(prev => [...prev, {type: 'user', content: message}]);

    switch(currentStep) {
      case 'name':
        setUserInfo(prev => ({...prev, name: message}));
        setChat(prev => [...prev, {
          type: 'bot',
          content: `Hi ${message}! Please enter your 10-digit phone number.`
        }]);
        setCurrentStep('phone');
        break;

      case 'phone':
        if (!/^\d{10}$/.test(message)) {
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Please enter a valid 10-digit phone number.'
          }]);
        } else {
          setUserInfo(prev => ({...prev, phone: message}));
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Please select your budget range:\n1. ₹6000-₹7000\n2. ₹7000-₹8000\n3. ₹8000+'
          }]);
          setCurrentStep('range');
        }
        break;

      case 'range':
        const range = message;
        if (!['₹6000-₹7000', '₹7000-₹8000', '₹8000+', '1', '2', '3'].includes(range)) {
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Please select a valid range (1, 2, or 3)'
          }]);
        } else {
          let selectedRange = range;
          if (range === '1') selectedRange = '₹6000-₹7000';
          if (range === '2') selectedRange = '₹7000-₹8000';
          if (range === '3') selectedRange = '₹8000+';
          
          setUserInfo(prev => ({...prev, priceRange: selectedRange}));
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Please select your preferred city:\n- Mohali\n- Chandigarh\n- Kharar'
          }]);
          setCurrentStep('city');
        }
        break;

      case 'city':
        const city = message.toLowerCase();
        if (!['mohali', 'chandigarh', 'kharar'].includes(city)) {
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Please select either Mohali, Chandigarh, or Kharar'
          }]);
        } else {
          const updatedUserInfo = {...userInfo, city: city};
          setUserInfo(updatedUserInfo);
          
          const matchedProperties = propertyData.filter(property => {
            // Safely handle property.price being undefined
            if (!property.price) return false;
            
            const propertyPrice = typeof property.price === 'number' ? 
              property.price : 
              parseInt(property.price.toString().replace(/[^\d]/g, ''));
            
            const inPriceRange = 
              (updatedUserInfo.priceRange === '₹6000-₹7000' && propertyPrice >= 6000 && propertyPrice < 7000) ||
              (updatedUserInfo.priceRange === '₹7000-₹8000' && propertyPrice >= 7000 && propertyPrice < 8000) ||
              (updatedUserInfo.priceRange === '₹8000+' && propertyPrice >= 8000);
            
            return property.city.toLowerCase() === city && inPriceRange;
          });

          setChat(prev => [...prev, {
            type: 'bot',
            content: `There are ${matchedProperties.length} properties available in ${city} within your budget range of ${updatedUserInfo.priceRange}.\n\nWould you like to see the details? Type 'yes' to view properties or 'restart' to begin a new search.`
          }]);
          setCurrentStep('showDetails');
        }
        break;

      case 'showDetails':
        if (message.toLowerCase() === 'yes') {
          const matchedProperties = propertyData.filter(property => {
            if (!property.price) return false;
            
            const propertyPrice = typeof property.price === 'number' ? 
              property.price : 
              parseInt(property.price.toString().replace(/[^\d]/g, ''));
            
            const inPriceRange = 
              (userInfo.priceRange === '₹6000-₹7000' && propertyPrice >= 6000 && propertyPrice < 7000) ||
              (userInfo.priceRange === '₹7000-₹8000' && propertyPrice >= 7000 && propertyPrice < 8000) ||
              (userInfo.priceRange === '₹8000+' && propertyPrice >= 8000);
            
            return property.city.toLowerCase() === userInfo.city && inPriceRange;
          });

          const propertiesList = matchedProperties.map((p, index) => 
            `\n${index + 1}. ${p.title}\n   Price: ₹${p.price}\n   Address: ${p.address}`
          ).join('');

          setChat(prev => [...prev, {
            type: 'bot',
            content: `Here are the available properties:${propertiesList}\n\nType 'restart' to begin a new search.`
          }]);
          setCurrentStep('complete');
        } else if (message.toLowerCase() === 'restart') {
          setCurrentStep('name');
          setUserInfo({name: '', phone: '', priceRange: '', city: ''});
          setChat([{
            type: 'bot',
            content: 'Let\'s start over. What\'s your name?'
          }]);
        } else {
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Please type \'yes\' to view properties or \'restart\' to begin a new search.'
          }]);
        }
        break;

      case 'complete':
        if (message.toLowerCase() === 'restart') {
          setCurrentStep('name');
          setUserInfo({name: '', phone: '', priceRange: '', city: ''});
          setChat([{
            type: 'bot',
            content: 'Let\'s start over. What\'s your name?'
          }]);
        } else {
          setChat(prev => [...prev, {
            type: 'bot',
            content: 'Type \'restart\' to begin a new search.'
          }]);
        }
        break;
    }
    
    setMessage('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 mb-4 overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-semibold">PG Assistant</h3>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-3 max-w-[90%] ${
                  msg.type === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response..."
                className="flex-1"
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </div>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 flex items-center justify-center"
      >
        <MessageCircle />
      </Button>
    </motion.div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <motion.div 
      variants={fadeIn}
      className="container px-4 md:px-6 relative overflow-hidden bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl p-8"
    >
      <div className="grid md:grid-cols-3 items-center gap-6 lg:gap-12">
        <div className="flex flex-col justify-center gap-6 md:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Find your perfect home away from home
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
              Browse through our curated list of Paying Guest accommodations and flats near your college or university.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
          >
            <PinIcon className="w-6 h-6 text-primary" />
            <span className="text-lg font-medium">India</span>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl transform rotate-6" />
          <Image
            alt="Banner"
            className="relative rounded-3xl object-cover shadow-2xl transform transition-transform hover:scale-105"
            height={400}
            src="/banner.jpg"
            width={600}
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Search and Filter Component
const SearchAndFilter = ({ searchTerm, setSearchTerm, selectedCity, setSelectedCity, priceRange, setPriceRange }: { searchTerm: string, setSearchTerm: (value: string) => void, selectedCity: string, setSelectedCity: (value: string) => void, priceRange: string, setPriceRange: (value: string) => void }) => {
  const cities = ['All', 'Mohali', 'Chandigarh', 'Kharar'];
  const priceRanges = ['All', '₹6000-₹7000', '₹7000-₹8000', '₹8000+'];

  return (
    <motion.div 
      variants={fadeIn}
      className="w-[300px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg top-4 sticky"
    >
      <div className="flex flex-col gap-8">
        <motion.div variants={staggerChildren} className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Filters
          </h2>
          
          <motion.div variants={fadeIn} className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
            />
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div variants={fadeIn} className="flex flex-col gap-3">
              <Label className="text-lg font-semibold">City</Label>
              <div className="flex flex-col gap-2">
                {cities.map(city => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    onClick={() => setSelectedCity(city)}
                    className="w-full justify-start"
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col gap-3">
              <Label className="text-lg font-semibold">Price Range</Label>
              <div className="flex flex-col gap-2">
                {priceRanges.map(range => (
                  <Button
                    key={range}
                    variant={priceRange === range ? "default" : "outline"}
                    onClick={() => setPriceRange(range)}
                    className="w-full justify-start"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Property Grid Component
const PropertyGrid = ({ filteredProperties }: { filteredProperties: any[] }) => {
  return (
    <motion.div 
      variants={staggerChildren}
      className="flex-1 grid grid-cols-1 gap-8 p-6 overflow-y-auto"
    >
      {filteredProperties.map((property: any) => (
        <motion.div
          key={property.id}
          variants={fadeIn}
          whileHover={{ y: -10 }}
          className="transform transition-all"
        >
          <SinglePg
            name={property.title}
            location={property.address}
            city={property.city}
            price={property.price}
            description={property.description}
            imageURL={property.images ? `https://laugh-consonant.pockethost.io/api/files/pg/${property.id}/${property.images}` : "https://laugh-consonant.pockethost.io/api/files/kcumxj3ih2n2k9j/4dlg470th6rgvtl/img5_DwHOPFC7nZ.jpeg"}
          />
        </motion.div>
      ))}

      {filteredProperties.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12 col-span-2"
        >
          <p className="text-xl text-gray-500">No properties found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Component
const Pg = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyData, setPropertyData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPgs() {
      try {
        const records = await pb
          .collection("pg")
          .getFullList({
            sort: "-created",
            expand: 'images'
          });
        setPropertyData(records);
      } catch (error) {
        console.error("Error fetching PGs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPgs();
  }, []);

  const filterProperties = () => {
    return propertyData.filter((property: any) => {
      const price = typeof property.price === 'number' ? 
        property.price : 
        parseInt(property.price?.toString().replace(/[^\d]/g, '') || '0');
        
      const matchesCity = selectedCity === 'All' || property.city?.toLowerCase() === selectedCity.toLowerCase();
      const matchesSearch = (property.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (property.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (property.address?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange === '₹6000-₹7000') {
        matchesPrice = price >= 6000 && price < 7000;
      } else if (priceRange === '₹7000-₹8000') {
        matchesPrice = price >= 7000 && price < 8000;
      } else if (priceRange === '₹8000+') {
        matchesPrice = price >= 8000;
      }

      return matchesCity && matchesPrice && matchesSearch;
    });
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className='flex flex-col space-y-8'
    >
      <HeroSection />
      
      <motion.div variants={fadeIn}>
        <Location />
      </motion.div>

      <div className="container mx-auto flex gap-8 relative">
        <SearchAndFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <PropertyGrid filteredProperties={filterProperties()} />
      </div>

      <Chatbot propertyData={propertyData} />
    </motion.div>
  );
};

export default Pg;
