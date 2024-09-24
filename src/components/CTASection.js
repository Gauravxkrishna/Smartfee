import React from 'react';
import { motion } from 'framer-motion';
import isoicon from '../assests/iso-icon.png';
import location from '../assests/location.svg';
import email from '../assests/email.svg';


const CTASection = () => {
  return (
    <section>
      {/* Existing CTA Section */}
      <div className="bg-[#003366] py-16">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl text-white font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Get Started with SmartFee?
          </motion.h2>
          <motion.p
            className="text-lg text-white mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sign up today and simplify your school's fee management process!
          </motion.p>
          <motion.button
            className="bg-white text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now
          </motion.button>
        </div>
      </div>

      {/* New Section */}
      <div className="bg-blue-600 text-white py-12 lg:py-16">
        <div className="container mx-auto flex flex-col gap-6 lg:gap-10 lg:flex-row">
          <div className="flex flex-col flex-1">
            <h3 className="text-3xl font-bold pl-4 border-l-4 border-[#f6c545]">2,500+</h3>
            <div className="pl-4 text-lg">Institutes</div>
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-3xl font-bold pl-4 border-l-4 border-[#f6c545]">&#8377;5000 Cr+</h3>
            <div className="pl-4 text-lg">Fee processed</div>
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-3xl font-bold pl-4 border-l-4 border-[#f6c545]">90+</h3>
            <div className="pl-4 text-lg">Cities</div>
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-3xl font-bold pl-4 border-l-4 border-[#f6c545]">15,00,000+</h3>
            <div className="pl-4 text-lg">Parents</div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-blue-800 text-white py-12 lg:py-16">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex flex-col flex-1 mb-10">
            <h5 className="text-lg mb-3">Reach us</h5>
            <div className="flex flex-col gap-5">
              <div className="flex items-start">
                <img
                  src={location}
                  alt="Location icon"
                  className="mr-2 mt-2"
                />
                <div className="text-base leading-relaxed">
                  Jodo, Incubex INR4, 100 Feet Rd, Indiranagar, <br />
                  Bengaluru, Karnataka 560008<br />
                  CIN - U72900KA2020PTC132767
                </div>
              </div>
              <div className="flex items-center">
                <img src={email} alt="Email icon" className="mr-2" />
                <div className="text-base">
                  <a href="mailto:whatsup@jodopay.com">whatsup@jodopay.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col">
            <h5 className="text-lg mb-3">Resources</h5>
            <div className="flex flex-col gap-5">
              <a href="/blog/" className="text-base">Blog</a>
              <a href="https://docs.jodo.in" className="text-base">Integrations</a>
            </div>
            <div className="mt-2">
              <h5 className="text-lg mb-3">Help & Support</h5>
              <a href="/contact-us/" className="text-base">Contact Us</a>
            </div>
          </div>
          
          <div className="flex-1">
            <h5 className="text-lg mb-3">Company</h5>
            <div className="flex flex-col gap-5">
              <a href="/about-us/" className="text-base">About Us</a>
              <a href="/careers/" className="text-base">Careers</a>
              <a href="/terms-and-conditions/" className="text-base">Terms & Conditions</a>
              <a href="/privacy-policy/" className="text-base">Privacy Policy</a>
              <a href="/grievance-redressal/" className="text-base">Grievance Redressal</a>
              <a href="https://compliance.jodo.in/" className="text-base" target="_blank">Compliance</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-centre gap-10">
            <h2 classname="text-7xl text-[#1e1957] ">SMARTFEE </h2>
            
            <p className="hidden lg:block text-base">
              &copy; {new Date().getFullYear()} Bharosepe Technology Services Pvt Ltd.
            </p>
          </div>
          <a
            href="https://compliance.jodo.in/"
            className="flex items-center gap-4"
            target="_blank"
          >
            <img
              src={isoicon}
              alt="ISO certification"
              className="h-12 w-12"
            />
            <div className="text-blue-800 font-bold border-l-2 pl-2 border-blue-800">
              <div>ISO 27001:2022</div>
              <div>Certified</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
