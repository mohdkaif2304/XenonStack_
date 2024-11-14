'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const PGOwnerPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            List Your Property with Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of property owners who trust us to connect them with quality tenants
          </p>
          <Button
            onClick={() => router.push('/pg-owner/signup')}
            className="bg-green-600 hover:bg-green-700"
          >
            Sign Up Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold ml-4">PG Accommodation</h2>
            </div>
            <p className="text-gray-600 mb-6">
              List your PG accommodations and reach out to students and working professionals looking for comfortable stays.
            </p>
            <Button 
              onClick={() => router.push('/pg-owner/dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Manage PG Listings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Building2 className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold ml-4">Rental Flats</h2>
            </div>
            <p className="text-gray-600 mb-6">
              List your apartments and flats to connect with families and individuals looking for their next home.
            </p>
            <Button 
              onClick={() => router.push('/flat-owner/dashboard')}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Manage Flat Listings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Management",
                description: "Intuitive dashboard to manage all your properties in one place"
              },
              {
                title: "Verified Tenants",
                description: "Connect with pre-verified tenants for safer rentals"
              },
              {
                title: "24/7 Support",
                description: "Round the clock assistance for all your queries"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6"
                variants={itemVariants}
              >
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PGOwnerPage;
