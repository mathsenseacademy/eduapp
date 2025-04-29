// src/components/ComingSoon/ComingSoon.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import './ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <motion.div 
        className="coming-soon"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <FaGraduationCap size={80} color="#4a90e2" style={{ marginBottom: '20px' }} />
        
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          Coming Soon...
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our education platform is launching soon. Stay tuned!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
