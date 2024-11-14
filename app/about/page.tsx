"use client"
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { AccessibilityIcon, BadgeIcon, GithubIcon, LinkedinIcon, TwitterIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-full z-10">
        <main className="container mx-auto py-16 md:py-24 px-4 md:px-6">
          <motion.section 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="grid md:grid-cols-2 items-center gap-12 md:gap-16"
          >
            <motion.div 
              variants={fadeIn}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                EstateNex: A Rented Hub
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                About Our Student Housing Platform
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                At our core, we&apos;re dedicated to simplifying the quest for
                affordable and cozy student housing. Through our platform,
                students effortlessly connect with verified PG/flat owners,
                ensuring a seamless search for their ideal home away from home.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeIn} 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                alt="About"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                height="500"
                src="/img.jpg"
                width="700"
              />
            </motion.div>
          </motion.section>

          <motion.section 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mt-24 md:mt-32 space-y-12"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl text-center max-w-4xl mx-auto">
                Our platform was founded by a group of students who struggled to
                find affordable and reliable housing during their time in
                college. We saw the need for a solution that would connect
                students with verified PG/flat owners and make the process of
                finding a place to live easier and more transparent.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                Our Values
              </h2>
              <motion.ul 
                variants={staggerChildren}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {[
                  {
                    icon: <AccessibilityIcon className="w-10 h-10 text-primary" />,
                    title: "Accessibility",
                    description: "We believe that everyone should have access to affordable and comfortable housing."
                  },
                  {
                    icon: <BadgeIcon className="w-10 h-10 text-primary" />,
                    title: "Verified Listings",
                    description: "We carefully vet all listings to ensure they meet our high standards."
                  },
                  {
                    icon: <AccessibilityIcon className="w-10 h-10 text-primary" />,
                    title: "Transparency",
                    description: "We believe in being upfront and honest about our services and listings."
                  },
                  {
                    icon: <UserIcon className="w-10 h-10 text-primary" />,
                    title: "Community",
                    description: "We strive to build a supportive community of students and property owners."
                  }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeIn}
                    className="flex items-start gap-6 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="space-y-16"
            >
              <div className="text-center space-y-6">
                <span className="text-primary font-medium tracking-wider uppercase">The Visionary</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Solo Creator,
                  </span>
                  <br />
                  <span className="mt-2 block">Endless Possibilities</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                  From concept to creation, this platform represents one person&apos;s vision to transform the student housing landscape
                </p>
              </div>

              <motion.div 
                variants={staggerChildren}
                className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto"
              >
                <motion.div
                  variants={fadeIn}
                  className="md:w-1/2"
                >
                  <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl -rotate-6" />
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        alt="Megha Kaushal"
                        className="w-full h-full object-cover"
                        height="500"
                        width="400"
                        src="/megha.jpg"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  className="md:w-1/2 space-y-8 text-center md:text-left"
                >
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Megha Kaushal</h3>
                    <p className="text-primary font-medium">Founder & Developer</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      As a student who experienced the challenges of finding suitable accommodation firsthand, 
                      I embarked on a mission to create a solution that would make a real difference.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Every line of code, every design decision, and every feature has been carefully crafted 
                      to ensure students can find their perfect living space with ease and confidence.
                    </p>
                  </div>

                  <div className="flex gap-6 justify-center md:justify-start">
                    <Link 
                      href="https://www.linkedin.com/in/meghakaushal/"
                      target="_blank"
                      className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors"
                    >
                      <LinkedinIcon className="w-6 h-6" />
                    </Link>
                    <Link 
                      href="https://github.com/MeghaKaushal19"
                      target="_blank"
                      className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors"
                    >
                      <GithubIcon className="w-6 h-6" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default page;
