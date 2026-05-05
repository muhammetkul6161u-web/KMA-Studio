import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SmartImage.css';

const SmartImage = ({ 
  src, 
  alt, 
  className = '', 
  hoverEffect = 'zoom', // 'zoom', 'none'
  objectFit = 'cover',
  themeColor = '#00f3ff' // Default theme color
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef(null);

  return (
    <div 
      className={`smart-image-wrapper ${className}`}
      ref={imgRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--image-theme-color': themeColor }}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="image-skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        className={`smart-image-content ${isLoaded ? 'loaded' : 'loading'}`}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{ 
          filter: isLoaded ? 'blur(0px)' : 'blur(20px)', 
          opacity: isLoaded ? 1 : 0,
          scale: hoverEffect === 'zoom' && isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* High-Tech Scanning Overlay */}
      {hoverEffect !== 'none' && (
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="image-scan-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="scan-line" style={{ 
                background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                boxShadow: `0 0 15px ${themeColor}`
              }}></div>
              <div className="scan-corner top-left" style={{ borderColor: themeColor }}></div>
              <div className="scan-corner top-right" style={{ borderColor: themeColor }}></div>
              <div className="scan-corner bottom-left" style={{ borderColor: themeColor }}></div>
              <div className="scan-corner bottom-right" style={{ borderColor: themeColor }}></div>
              <div className="scan-data" style={{ color: themeColor, textShadow: `0 0 5px ${themeColor}80` }}>
                <span>0x{Math.floor(Math.random() * 1000).toString(16)}</span>
                <span>SECURE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SmartImage;
