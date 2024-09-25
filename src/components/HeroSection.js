import React from 'react'; 
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import FeaturesSection from './FeaturesSection';
import FeeCollectionSection from './FeeCollectionSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import heroImage from '../assests/download (1).png'; // Import the image for the right side

const HeroSection = () => {
  const navigate = useNavigate();

  const handleInstituteLogin = () => {
    navigate('/institute-login'); // Navigate to the Institute Login page
  };

  return (
    <div>
      <section className="relative">
        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 z-10">
          <div className="container mx-auto flex justify-between items-center px-8">
            <div className="flex space-x-6">
              <a href="#home" className="text-black font-medium hover:text-[#003366] transition">
                Home
              </a>
              <a href="#about" className="text-black font-medium hover:text-[#003366] transition">
                About Us
              </a>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <motion.h1 className="text-3xl text-[#003366] font-bold">SmartFee</motion.h1>
            </div>
            <div className="flex space-x-4">
              <motion.a
                href="#student-login"
                className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Student Login
              </motion.a>
              <motion.button
                onClick={handleInstituteLogin}
                className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Institute Login
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Hero Section with Text and Image Side by Side */}
        <div className="container mx-auto flex items-center justify-between h-screen px-8 py-16">
          {/* Left Text Section */}
          <div className="w-1/2">
            <motion.h2
              className="text-5xl font-bold text-[#003366]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to SmartFee
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              SmartFee is your solution for effortless fee collection and management. Our platform simplifies the payment process for both institutions and students, making everything more efficient.
            </motion.p>
            <motion.button
              onClick={handleInstituteLogin}
              className="mt-8 bg-[#00CC66] text-white px-6 py-3 rounded-lg hover:bg-[#00994C] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>

          {/* Right Image Section */}
          <div className="w-1/2">
            <motion.img
              src={heroImage}
              alt="SmartFee Hero"
              className="w-full h-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>

      {/* Render other sections here */}
      <FeaturesSection />
      <FeeCollectionSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default HeroSection;




