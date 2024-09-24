import React from 'react';
import { motion } from 'framer-motion';
import flexMain from '../assests/flex-main.png';
import flexDetails1 from '../assests/flex-details-1.png';
import flexDetails2 from '../assests/flex-details-2.png';
import flexDetails3 from '../assests/flex-details-3.png';

import payMain from '../assests/pay-main.png';
import payDetails1 from '../assests/pay-details-1.png';
import payDetails2 from '../assests/pay-details-2.png';
import payDetails3 from '../assests/pay-details-3.png';
import payDetails4 from '../assests/pay-details-4.png';
import dashboardmain from '../assests/dashboard-main.png';

const FeeCollectionSection = () => {
  return (
    <div className="jd-section flex-col items-center">
      <div className="jd-container flex flex-col w-full gap-20 my-20">


        <motion.div
          className="flex flex-col items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggeredContainer}
        >
          <motion.h4
            className="text-4xl mb-3 font-bold text-center text-[#1e1957]"
            variants={slideFromTop(0)}
          >
            SMART - FLEX
          </motion.h4>

          <motion.h4
            className="text-xl lg:text-3xl mb-14 text-center"
            variants={slideFromBottom(0.2)}
          >
            End late payments by automating<br />your fee collection!
          </motion.h4>

          <motion.div
            className="flex flex-col lg:flex-row gap-12 items-center"
            variants={slideFromBottom(0.3)}
          >
            <motion.div className="w-[260px] lg:w-[400px]">
              <img src={flexMain} width="400px" alt="Main Feature" />
            </motion.div>

            <motion.div className="flex-1 flex flex-col gap-6 max-w-[600px]">
              <PaymentDetail
                src={flexDetails1}
                title="Get all your fees on time!"
                description="Auto-pay setup for fee instalments. Get your fee on time without follow ups!"
                delay={0.4}
              />
              <PaymentDetail
                src={flexDetails2}
                title="Dynamic fee collection system!"
                description="Give your team the ability to dynamically create and manage fee schedules."
                delay={0.5}
              />
              <PaymentDetail
                src={flexDetails3}
                title="Automate end to end fee collection!"
                description="Fee reminders, receipts, and reconciliation - all automated."
                delay={0.6}
              />
            </motion.div>
          </motion.div>
        </motion.div>


        <motion.div
          className="flex flex-col items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggeredContainer}
        >
          <motion.h4
            className="text-4xl mb-3 font-bold text-center text-[#1e1957]"
            variants={slideFromTop(0.1)}
          >
            SMART - PAY
          </motion.h4>

          <motion.h4
            className="text-xl lg:text-3xl mb-14 text-center"
            variants={slideFromBottom(0.2)}
          >
            An online payment suite crafted exclusively<br />for educational institutes!
          </motion.h4>

          <motion.div
            className="flex flex-col lg:flex-row gap-12 items-center"
            variants={slideFromBottom(0.3)}
          >
            <motion.div className="w-[260px] lg:w-[400px]">
              <img src={payMain} width="400px" alt="Pay Main Feature" />
            </motion.div>

            <motion.div className="flex-1 flex flex-col gap-6 max-w-[600px]">
              <PaymentDetail
                src={payDetails1}
                title="Seamless payment gateway"
                description="A low-cost PG that can be easily integrated into your workflow and cover all digital modes of fee payment."
                delay={0.4}
              />
              <PaymentDetail
                src={payDetails2}
                title="Tailor-made payment pages"
                description="Create a customizable payment page to collect any kind of fees in minutes!"
                delay={0.5}
              />
              <PaymentDetail
                src={payDetails3}
                title="International payments"
                description="Receive international payments seamlessly at the lowest rates."
                delay={0.6}
              />
              <PaymentDetail
                src={payDetails4}
                title="Virtual Accounts"
                description="Reconciling bank transfers via NEFT/RTGS payments was never easier."
                delay={0.7}
              />
            </motion.div>
          </motion.div>
        </motion.div>


        <motion.div
          className="flex flex-col items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggeredContainer}
        >
          <motion.h4
            className="text-4xl mb-3 font-bold text-center text-[#1e1957]"
            variants={slideFromTop(0.1)}
          >
            SMART - SaaS
          </motion.h4>

          <motion.h4
            className="text-xl lg:text-3xl mb-14 text-center"
            variants={slideFromBottom(0.2)}
          >
            All-in-one fee management platform
          </motion.h4>

          <motion.div
            className="flex flex-col lg:flex-row gap-12 items-center"
            variants={slideFromBottom(0.3)}
          >
            <motion.div className="w-[260px] lg:w-[400px]">
              <img src={dashboardmain} width="400px" alt="Dashboard Main" />
            </motion.div>

            <motion.div className="flex-1 flex flex-col gap-6 max-w-[600px]">
              <PaymentDetail
                src={payDetails1}
                title="Manage all your fee related operations in minutes"
                description="Build fully customisable fee schedules, manage due dates, discounts and late fee."
                delay={0.4}
              />
              <PaymentDetail
                src={payDetails2}
                title="Easy tracking and reconciliation"
                description="Track and reconcile all fee payments in seconds using our dashboard. Get pinpoint insights into collection stats."
                delay={0.5}
              />
              <PaymentDetail
                src={payDetails3}
                title="Never follow up manually for fees again"
                description="Built-in WhatsApp communication layer to automate fee due notes, reminders and receipts."
                delay={0.6}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};


const PaymentDetail = ({ src, title, description, delay }) => (
  <motion.div
    className="flex flex-row gap-3 items-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-[80px]">
      <img src={src} width="80px" alt={title} />
    </div>
    <div className="flex-1 flex flex-col">
      <h5 className="text-sm lg:text-xl font-semibold">{title}</h5>
      <p className="text-xs lg:text-base text-gray-500">{description}</p>
    </div>
  </motion.div>
);


const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideFromTop = (delay) => ({
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const slideFromBottom = (delay) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  
  transition: { duration: 0.6, delay },
},
});

export default FeeCollectionSection;
