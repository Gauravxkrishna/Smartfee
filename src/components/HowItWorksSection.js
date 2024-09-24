import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { 
    step: 1, 
    title: 'Register', 
    desc: 'Create your account easily with just a few clicks. Provide your necessary details and start using our platform right away.', 
    icon: '📝' 
  },
  { 
    step: 2, 
    title: 'View Fee ', 
    desc: 'Once registered, you can view a detailed breakdown of your fees, due dates, and payment schedules in a simple interface.', 
    icon: '👁️' 
  },
  { 
    step: 3, 
    title: 'Make Payment', 
    desc: 'Choose your preferred payment method and securely make payments with instant confirmation and receipt generation.', 
    icon: '💳' 
  },
  { 
    step: 4, 
    title: 'Get Notified', 
    desc: 'Stay updated with real-time notifications for due dates, payment receipts, and any updates related to your account.', 
    icon: '📩' 
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-[#F0F8FF] py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl text-[#003366] font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <motion.div
              key={step.step}
              className="p-6 bg-white rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg text-[#003366] font-semibold">{`Step ${step.step}: ${step.title}`}</h3>
              <p className="text-[#003366] mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
