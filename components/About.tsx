"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Home, MessageCircle, Shield, Sparkles, Star } from "lucide-react";

const About = () => {
  // Animation variants
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            transition: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative py-20 bg-gradient-to-br from-cyan-50 to-blue-50"
      >
        <motion.div
          variants={floatingAnimation}
          className="absolute top-10 right-10"
        >
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2 space-y-6"
            >
              <motion.h1 
                variants={pulseAnimation}
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
              >
                Transforming the Way You Find Your Home
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 text-lg"
              >
                EstateNex is revolutionizing the rental experience with cutting-edge technology and a user-centric approach. Say goodbye to traditional hassles and embrace a new era of home finding.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <motion.div 
                  animate={{
                    rotate: [0, 5, 0],
                    transition: { duration: 6, repeat: Infinity }
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-3xl transform blur-2xl opacity-30" 
                />
                <Image
                  src="/img4.jpg"
                  alt="Modern Living"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl relative z-10 hover:shadow-cyan-200/50 transition-shadow duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 5, repeat: Infinity }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Why Choose EstateNex?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine innovation with simplicity to deliver an unmatched rental experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-cyan-600" />,
                title: "Verified Listings",
                description: "Every property is thoroughly verified for your peace of mind"
              },
              {
                icon: <Home className="w-8 h-8 text-cyan-600" />,
                title: "Smart Search",
                description: "Find your perfect home with our intelligent search filters"
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-cyan-600" />,
                title: "Direct Communication",
                description: "Connect directly with property owners through our platform"
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-cyan-600" />,
                title: "Easy Booking",
                description: "Streamlined booking process with secure payments"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-100"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-cyan-50 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-cyan-600 to-blue-600 text-white relative overflow-hidden"
      >
        <motion.div
          animate={{
            x: [-100, 800],
            y: [-100, 400],
            transition: { duration: 8, repeat: Infinity }
          }}
          className="absolute w-40 h-40 bg-white/10 rounded-full blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "1000+", label: "Happy Residents" },
              { number: "500+", label: "Verified Properties" },
              { number: "50+", label: "Cities Covered" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="space-y-2 backdrop-blur-sm bg-white/10 p-8 rounded-2xl"
              >
                <motion.h3 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl font-bold"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-cyan-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 p-12 rounded-3xl text-center relative overflow-hidden"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                transition: { duration: 8, repeat: Infinity }
              }}
              className="absolute top-0 right-0 text-cyan-200"
            >
              <Star className="w-20 h-20" />
            </motion.div>

            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Home?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied residents who found their ideal living space through EstateNex
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all flex items-center gap-2 mx-auto hover:shadow-cyan-200/50"
            >
              Get Started Today
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
