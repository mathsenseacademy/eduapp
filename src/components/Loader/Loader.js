import React, { useEffect } from 'react';
import './Loader.css';
import { motion, useAnimation } from 'framer-motion';
import logoVideo from '../../assets/logo.mp4';

const Loader = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Delay before flying to header
    const timer = setTimeout(() => {
      controls.start({
  scale: 0.5,
  y: -200,
  transition: {
    type: 'spring',
    stiffness: 50,
    damping: 14,
    duration: 1.4,
  },
});
    }, 6000);

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className="math-loader-wrapper">
      <motion.div
        layoutId="shared-logo"
        initial={{ scale: 1.5, y: 0 }}
        animate={controls}
        className="loader-logo-wrapper pulse-wrapper"
      >
        <video
          src={logoVideo}
          className="loader-logo"
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      {/* <p className="loader-text">Loading Math Senseacademy...</p> */}
    </div>
  );
};

export default Loader;
