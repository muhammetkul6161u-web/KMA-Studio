import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo1.png';
import './SplashLoader.css';

const SplashLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="splash-container">
      <div className="splash-background">
        <div className="splash-glow"></div>
      </div>
      
      <div className="splash-content">
        <motion.div 
          className="splash-logo-container"
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src={logo} alt="KMA Studio Logo" className="logo-image" />
        </motion.div>
        
        <motion.div 
          className="splash-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}<span className="counter-percent">%</span>
        </motion.div>

        <motion.div 
          className="splash-text"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          KMA Studio Projesi
        </motion.div>
        
        <div className="splash-progress-container">
          <motion.div 
            className="splash-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="progress-glow"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;

