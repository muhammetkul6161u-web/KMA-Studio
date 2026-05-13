import React from 'react';
import SEO from '../components/SEO';
import SmartImage from '../components/SmartImage';
import { motion } from 'framer-motion';
import StoryTimeline from '../components/StoryTimeline';
import Manifesto from '../components/Manifesto';
import ParticleBackground from '../components/ParticleBackground';
import Footer from '../components/Footer';
import './Hakkimizda.css';
import aboutHeroImg from '../assets/about-hero.webp';

const coffeeSymbols = ['☕', '☕', '☕', '☕', '☕', '☕', '☕', '☕'];
const beanSymbols = ['●', '●', '●', '●', '●', '●', '●', '●', '●', '●'];

const Hakkimizda = () => {
  return (
    <div className="hakkimizda-wrapper">
      <SEO 
        title="Hakkımızda" 
        description="Sıfırdan kodlara. Gerçekçi, şeffaf ve tutkulu. Dizvyn'in hikayesi ve manifestosu." 
        url="/hakkimizda" 
      />
      <style>
        {`
          nav, .navbar, header {
            background: rgba(20, 15, 10, 0.98) !important;
            box-shadow: 0 0 35px rgba(44, 36, 27, 0.9) !important;
            border-bottom: 1px solid rgba(193, 140, 93, 0.4) !important;
            backdrop-filter: blur(15px);
          }
          nav a, .navbar-logo {
            color: #F9F6F0 !important;
            text-shadow: 0 0 8px rgba(193, 140, 93, 0.4);
          }
        `}
      </style>

      <ParticleBackground variant="suit" />

      {/* Floating Coffee & Bean Symbols */}
      <div className="coffee-symbols-layer">
        {coffeeSymbols.map((s, i) => (
          <motion.span
            key={`coffee-${i}`}
            className="floating-coffee"
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 3) * 28}%`,
              fontSize: `${1.5 + (i % 3) * 0.8}rem`,
            }}
            animate={{ y: [0, -25, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {s}
          </motion.span>
        ))}
        {beanSymbols.map((s, i) => (
          <motion.span
            key={`bean-${i}`}
            className="floating-bean"
            style={{
              left: `${5 + i * 10}%`,
              top: `${25 + (i % 4) * 20}%`,
              fontSize: `${0.8 + (i % 3) * 0.4}rem`,
            }}
            animate={{ y: [0, -15, 0], rotate: [0, 20, -10, 0] }}
            transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <section className="new-hero-section" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-photo-wrapper">
          <motion.div 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="hero-image-box"
          >
            <SmartImage src={aboutHeroImg} alt="Dizvyn" hoverEffect="none" />
            <div className="hero-img-gradient"></div>
            <h1 className="hero-title-inside">
              Sıfırdan Kodlara.<br />
              <span className="gradient-text-about">Gerçekçi, Şeffaf ve Tutkulu.</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 0.4 }} 
            className="hero-desc-box"
          >
            <p>Merhaba, ben Muhammet Ali. Yönetim Bilişim Sistemleri bölümünde okuyan bir üniversite öğrencisiyim. Karşınızda yüzlerce çalışanı olan bir ajans yok; sadece inandığı projeleri koda döken genç bir geliştirici var.</p>
          </motion.div>
        </div>
      </section>

      <StoryTimeline />
      <Manifesto />

      <Footer variant="suit" />
    </div>
  );
};

export default Hakkimizda;