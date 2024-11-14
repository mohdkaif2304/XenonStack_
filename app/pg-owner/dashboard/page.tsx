'use client'
import React, { useState, useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';
import { Plus, Pencil, Trash2, Eye, Search, User, Building2, LogOut } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: string;
  city: string;
  address: string;
  type: string;
  userId: string;
  image?: string;
}

interface FormData extends Omit<Listing, 'id'> {
  image?: string;
}

const PGDashboard = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Add refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    city: '',
    address: '',
    type: '',
    userId: '',
    image: ''
  });

  const pb = new PocketBase('https://laugh-consonant.pockethost.io');

  // Focus management for create dialog
  useEffect(() => {
    if (isCreateOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isCreateOpen]);

  // Focus management for update dialog
  useEffect(() => {
    if (isUpdateOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isUpdateOpen]);

  useEffect(() => {
    const authData = pb.authStore.model;
    if (!authData) {
      router.push('/pg-owner/signin');
      return;
    }

    fetchListings();
    setFormData(prev => ({
      ...prev,
      userId: authData.id
    }));
    setUserName(authData.name);
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    router.push('/pg-owner/signin');
  };

  const fetchListings = async () => {
    try {
      const authData = pb.authStore.model;
      if (!authData) {
        console.error('No authenticated user found');
        return;
      }

      const records = await pb.collection('pg').getFullList<Listing>({
        filter: `userId = "${authData.id}"`,
        sort: '-created'
      });
      setListings(records);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size should be less than 5MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      image: file.name
    }));
  }
};

  const handleCreate = async () => {
    setLoading(true);
    try {
      const authData = pb.authStore.model;
      if (!authData) return;

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== 'image') formDataToSend.append(key, value);
      });
      // @ts-ignore
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      await pb.collection('pg').create(formDataToSend);
      setIsCreateOpen(false);
      resetForm(authData.id);
      await fetchListings();
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Error creating listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (!selectedListing?.id) return;

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== 'image') formDataToSend.append(key, value);
      });

      // @ts-ignore
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      await pb.collection('pg').update(selectedListing.id, formDataToSend);
      setIsUpdateOpen(false);
      setSelectedListing(null);
      resetForm(formData.userId);
      await fetchListings();
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Error updating listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    setLoading(true);
    try {
      await pb.collection('pg').delete(id);
      await fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Error deleting listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (userId: string) => {
    setFormData({
      title: '',
      description: '',
      price: '',
      city: '',
      address: '',
      type: '',
      userId,
      image: undefined
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">

        <Image
          src={listing.image ? 
            `https://laugh-consonant.pockethost.io/api/files/pg/${listing.id}/${listing.image}` :
            'https://laugh-consonant.pockethost.io/api/files/kcumxj3ih2n2k9j/4dlg470th6rgvtl/img5_DwHOPFC7nZ.jpeg'
          }
          alt={listing.title}
          fill
          className="object-cover"
        />

      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
        <p className="text-lg font-bold text-primary mb-2">₹{listing.price}</p>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span>{listing.city}</span> • <span>{listing.type}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedListing(listing);
              setIsViewOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedListing(listing);
              setFormData({
                ...listing,
                image: listing.image
              });
              setIsUpdateOpen(true);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-50"
            onClick={() => handleDelete(listing.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FormFields = () => (
    <div className="grid gap-4">
      <Input
        ref={titleRef}
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        ref={descriptionRef}
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          ref={priceRef}
          name="price"
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <Input
          ref={typeRef}
          name="type"
          placeholder="Type (e.g., PG, Flat)"
          value={formData.type}
          onChange={handleInputChange}
          required
        />
      </div>
      <Input
        ref={cityRef}
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleInputChange}
        required
      />
      <Input
        ref={addressRef}
        name="address"
        placeholder="Full Address"
        value={formData.address}
        onChange={handleInputChange}
        required
      />
      <div className="space-y-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer"
          id="image"
        />
        {/* @ts-ignore */}
        {formData.image instanceof File && (
          <p className="text-sm text-gray-500">
            Selected: {formData.image.name}
          </p>
        )}
      </div>
    </div>
  );

  const CustomDialog = ({ isOpen, onClose, title, children, onSubmit }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          {children}
          <Button onClick={onSubmit} className="w-full mt-4" disabled={loading}>
            {loading ? 'Loading...' : title}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 border-b pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-medium text-gray-700">Welcome, {userName}</h2>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Building2 className="w-4 h-4" />
          <span>Property Manager Dashboard</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Your Properties</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
          
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <p className="text-center text-gray-500">No properties added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      <CustomDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Property"
        onSubmit={handleCreate}
      >
        <FormFields />
      </CustomDialog>

      <CustomDialog
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Property"
        onSubmit={handleUpdate}
      >
        <FormFields />
      </CustomDialog>

      <CustomDialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Property Details"
      >
        {selectedListing && (
          <div className="space-y-6">

            <div className="relative w-full h-64">
              <Image
                src={selectedListing.image ? 
                  `https://laugh-consonant.pockethost.io/api/files/pg/${selectedListing.id}/${selectedListing.image}` :
                  'https://laugh-consonant.pockethost.io/api/files/kcumxj3ih2n2k9j/4dlg470th6rgvtl/img5_DwHOPFC7nZ.jpeg'
                }
                alt={selectedListing.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedListing.title}</h3>
                <p className="text-xl font-bold text-primary">₹{selectedListing.price}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Description</h4>
                <p className="text-gray-600">{selectedListing.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">City</h4>
                  <p className="text-gray-600">{selectedListing.city}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Type</h4>
                  <p className="text-gray-600">{selectedListing.type}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Address</h4>
                <p className="text-gray-600">{selectedListing.address}</p>
              </div>
            </div>
          </div>
        )}
      </CustomDialog>
    </div>
  );
};

export default PGDashboard;
