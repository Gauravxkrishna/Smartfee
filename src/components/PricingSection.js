import React from 'react';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    id: 1,
    title: 'Basic',
    price: '$29/month',
    features: ['Access to all features', 'Basic customer support', 'No setup fee'],
  },
  {
    id: 2,
    title: 'Premium',
    price: '$49/month',
    features: ['Priority support', 'No transaction fees', 'Custom branding options'],
  },
  {
    id: 3,
    title: 'Enterprise',
    price: '$99/month',
    features: ['Dedicated account manager', 'Custom integrations', 'Unlimited access'],
  },
];

const PricingSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#003366] mb-8">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className="p-8 bg-[#F0F8FF] rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-[#003366] mb-4">{plan.title}</h3>
              <p className="text-2xl font-semibold text-black mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-[#333333] mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-[#003366] text-white px-6 py-3 rounded-lg hover:bg-[#00994C] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
