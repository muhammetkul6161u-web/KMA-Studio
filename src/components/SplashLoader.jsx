import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo1.webp';
import './SplashLoader.css';

const SplashLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1200; // Match App.jsx timeout
    const interval = 10;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const brandingText = "KMA STUDIO";

  return (
    <div className="splash-container">
      {/* 6-Point Theme Convergence Background */}
      <div className="splash-background">
        <div className="glow-point top-left"></div>
        <div className="glow-point top-right"></div>
        <div className="glow-point bottom-left"></div>
        <div className="glow-point bottom-right"></div>
        <div className="glow-point top-center"></div>
        <div className="glow-point bottom-center"></div>
        
        <div className="splash-grid-complex"></div>
      </div>

      {/* Theme Contextual Modules */}
      <div className="theme-module home-module">
        <div className="module-tag">00 // HOME</div>
        <div className="module-content">system.init();<br/>const state = "READY";</div>
      </div>

      <div className="theme-module portfolio-module">
        <div className="module-tag">04 // PORTFOLIO</div>
        <div className="module-content">render.visuals();<br/>fps: 60_stable</div>
      </div>

      <div className="theme-module about-module">
        <div className="module-tag">01 // ABOUT</div>
        <div className="module-content">logic.human();<br/>since: 2024</div>
      </div>

      <div className="theme-module pricing-module">
        <div className="module-tag">02 // PRICING</div>
        <div className="module-content">value.optimized();<br/>tier: premium</div>
      </div>

      <div className="theme-module contact-module">
        <div className="module-tag">05 // CONTACT</div>
        <div className="module-content">connection.online();<br/>status: listening</div>
      </div>

      <div className="theme-module services-module">
        <div className="module-tag">03 // SERVICES</div>
        <div className="module-content">cloud.syncing();<br/>stack: next_fiber</div>
      </div>
      
      <div className="splash-content">
        <motion.div 
          className="splash-logo-container"
          initial={{ scale: 0.9, opacity: 0, filter: "blur(15px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={logo} alt="KMA Studio Logo" className="logo-image-premium" />
          <div className="logo-prism-aura"></div>
        </motion.div>
        
        <div className="splash-branding-premium">
          {brandingText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + index * 0.04 }}
              className={char === " " ? "space" : "letter"}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.div 
          className="splash-counter-huge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(progress)}<span className="counter-symbol">%</span>
        </motion.div>
        
        <div className="splash-progress-track">
          <motion.div 
            className="splash-progress-bar-premium"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          >
            <div className="progress-energy"></div>
          </motion.div>
        </div>

        <motion.div 
          className="splash-status-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          CONVERGING ALL THEMES • READY TO DEPLOY
        </motion.div>
      </div>
      
      <div className="splash-grain"></div>
    </div>
  );
};

export default SplashLoader;

