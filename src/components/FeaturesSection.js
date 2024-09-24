import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { id: 1, title: 'For Parents', desc: 'Seamless Fee Payments', color: '#0073E6' },
  { id: 2, title: 'For Institutes', desc: 'Real-time Notifications', color: '#003366' },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto flex justify-center gap-12"> 
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="p-6 border border-[#E0E0E0] rounded-lg text-center w-[300px]" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-[#003366]" style={{ color: feature.color }}>
              {feature.title}
            </h3>
            <p className="text-[#333333] mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
