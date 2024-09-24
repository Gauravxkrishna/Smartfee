import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'Slide 1',
    description: 'This is the first slide description. Add any text here.',
    buttonText: 'Learn More',
    backgroundImage: 'bg-gray-200', // Placeholder class for the background image
  },
  {
    id: 2,
    title: 'Slide 2',
    description: 'This is the second slide description. Add any text here.',
    buttonText: 'Learn More',
    backgroundImage: 'bg-gray-300', // Placeholder class for the background image
  },
  {
    id: 3,
    title: 'Slide 3',
    description: 'This is the third slide description. Add any text here.',
    buttonText: 'Learn More',
    backgroundImage: 'bg-gray-400', // Placeholder class for the background image
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideDuration = 5000; // 5 seconds for each slide

  // Timer to auto-switch slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, slideDuration);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
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
            <motion.a
              href="#institute-login"
              className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Institute Login
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Carousel Section */}
      <div className="relative overflow-hidden h-screen w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-start pl-20 ${slides[currentSlide].backgroundImage}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-left text-white mt-20"> {/* Adjust this mt-20 to control vertical spacing */}
              <h2 className="text-4xl font-bold">{slides[currentSlide].title}</h2>
              <p className="mt-4 text-lg">{slides[currentSlide].description}</p>
              <button className="mt-8 bg-[#00CC66] text-white px-6 py-2 rounded-lg hover:bg-[#00994C] transition">
                {slides[currentSlide].buttonText}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left & Right Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
