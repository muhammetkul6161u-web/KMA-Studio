import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import logo from '../assets/logo1.webp';

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.35);
    y.set(middleY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getThemeConfig = () => {
    switch(location.pathname) {
      case '/hakkimizda': return { color: '#D4C0A8', topClass: 'top-about', scrollClass: 'scroll-about', btnClass: 'btn-about' };
      case '/fiyatlar': return { color: '#00FF9D', topClass: 'top-pricing', scrollClass: 'scroll-pricing', btnClass: 'btn-pricing' };
      case '/hizmetler': return { color: '#C0C0C0', topClass: 'top-services', scrollClass: 'scroll-services', btnClass: 'btn-services' };
      case '/portfolyo': return { color: '#BC13FE', topClass: 'top-portfolio', scrollClass: 'scroll-portfolio', btnClass: 'btn-portfolio' };
      case '/iletisim': return { color: '#FFB300', topClass: 'top-contact', scrollClass: 'scroll-contact', btnClass: 'btn-contact' };
      case '/':
      default: return { color: '#00f3ff', topClass: 'top-home', scrollClass: 'scroll-home', btnClass: 'btn-home' };
    }
  };

  const theme = getThemeConfig();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Ana Sayfa', hoverColor: '#00f3ff', iconType: 'home' },
    { path: '/hakkimizda', label: 'Hakkımızda', hoverColor: '#D4C0A8', iconType: 'about' },
    { path: '/fiyatlar', label: 'Fiyatlar', hoverColor: '#00FF9D', iconType: 'pricing' },
    { path: '/hizmetler', label: 'Hizmetler', hoverColor: '#C0C0C0', iconType: 'services' },
    { path: '/portfolyo', label: 'Portfolyo', hoverColor: '#BC13FE', iconType: 'portfolio' },
    { path: '/iletisim', label: 'İletişim', hoverColor: '#FFB300', iconType: 'contact' },
  ];

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('TR');
  const langRef = React.useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'ja', label: 'JA' },
  ];

  const handleLangChange = (lang) => {
    setSelectedLang(lang.label);
    setIsLangOpen(false);
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
      googleSelect.value = lang.code;
      googleSelect.dispatchEvent(new Event('change'));
    }
  };

  const NavIcon = ({ type, color }) => {
    switch (type) {
      case 'home':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="32" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" strokeDasharray="6 4"/>
            <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1" fill="none" opacity="0.6"/>
            <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8"/>
            <path d="M50,5 L50,95 M5,50 L95,50" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 3"/>
            <circle cx="50" cy="50" r="4" fill={color} opacity="0.9"/>
          </svg>
        );
      case 'about':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect x="30" y="25" width="40" height="50" rx="6" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
            <path d="M40,25 L40,75 M60,25 L60,75" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="2 3"/>
            <path d="M30,40 L70,40 M30,60 L70,60" stroke={color} strokeWidth="1" opacity="0.2"/>
            <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M43,50 L57,50 M50,43 L50,57" stroke={color} strokeWidth="1.5" opacity="0.8"/>
          </svg>
        );
      case 'pricing':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M15,80 L85,80" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
            <path d="M20,65 L35,45 L50,55 L80,25" stroke={color} strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="35" cy="45" r="3.5" fill={color} opacity="0.9"/>
            <circle cx="50" cy="55" r="3.5" fill={color} opacity="0.9"/>
            <circle cx="80" cy="25" r="4.5" fill={color}/>
          </svg>
        );
      case 'services':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="4 4" />
            <path d="M35,50 L45,60 L70,35" stroke={color} strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
          </svg>
        );
      case 'portfolio':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect x="20" y="25" width="60" height="50" rx="8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8"/>
            <circle cx="50" cy="50" r="6" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
            <circle cx="72" cy="35" r="3" fill={color} opacity="0.7"/>
            <path d="M35,25 L35,18 L65,18 L65,25" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
          </svg>
        );
      case 'contact':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect x="30" y="10" width="40" height="80" rx="8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M43,17 L57,17" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
            <circle cx="50" cy="80" r="4" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M30,25 L70,25 M30,70 L70,70" stroke={color} strokeWidth="1" opacity="0.2"/>
          </svg>
        );
      default: return null;
    }
  };

  return (
    <>
      <nav 
        className={`ak-navbar ${!isScrolled ? theme.topClass : theme.scrollClass}`} 
        style={{
          '--theme-color': theme.color,
          top: isScrolled ? '15px' : '25px',
          width: isScrolled ? '90%' : '95%',
        }}
      >
        <Magnetic>
          <Link 
            to="/" 
            className="logo-kma" 
            style={{ '--theme-color': theme.color }}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img src={logo} alt="KMA" style={{ height: '70px', objectFit: 'contain' }} />
          </Link>
        </Magnetic>

        {/* Desktop Nav Links */}
        <div className="nav-links-container nav-desktop-only">
          {navLinks.map((link) => (
            <Magnetic key={link.path}>
              <div className="nav-item" style={{ '--hover-color': link.hoverColor }}>
                <div className={`bg-icon icon-${link.iconType}`}>
                  <NavIcon type={link.iconType} color={link.hoverColor} />
                </div>
                <Link to={link.path} className="nav-link">{link.label}</Link>
              </div>
            </Magnetic>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Custom Language Switcher */}
          <div className="custom-lang-switcher nav-desktop-only" ref={langRef}>
            <Magnetic>
              <button 
                className="lang-trigger"
                onClick={() => setIsLangOpen(!isLangOpen)}
                style={{ '--theme-color': theme.color }}
              >
                {selectedLang}
                <motion.span
                  animate={{ rotate: isLangOpen ? 180 : 0 }}
                  style={{ display: 'inline-block', marginLeft: '6px', fontSize: '10px' }}
                >
                  ▼
                </motion.span>
              </button>
            </Magnetic>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  className="lang-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-option ${selectedLang === lang.label ? 'active' : ''}`}
                      onClick={() => handleLangChange(lang)}
                      style={{ '--theme-color': theme.color }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Magnetic>
            <button 
              className={`theme-btn ${theme.btnClass} nav-desktop-only`}
              onClick={() => navigate('/iletisim')}
            >
              Teklif Al
            </button>
          </Magnetic>

          {/* Hamburger Toggle - Mobile only */}
          <button 
            className="hamburger-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menü aç/kapat"
            style={{ '--theme-color': theme.color }}
          >
            <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ '--theme-color': theme.color }}
          >
            <div className="mobile-menu-content">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-menu-link ${location.pathname === link.path ? 'active' : ''}`}
                    style={{ '--link-color': link.hoverColor }}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span className="mobile-link-number">0{i + 1}</span>
                    <span className="mobile-link-text">{link.label}</span>
                    {location.pathname === link.path && (
                      <span className="mobile-link-active-dot" style={{ background: link.hoverColor }}></span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mobile-menu-footer"
              >
                {/* Language Selector in Mobile */}
                <div className="mobile-lang-grid">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`mobile-lang-btn ${selectedLang === lang.label ? 'active' : ''}`}
                      onClick={() => handleLangChange(lang)}
                      style={{ '--theme-color': theme.color }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <button
                  className="mobile-cta-btn"
                  style={{ '--theme-color': theme.color }}
                  onClick={() => {
                    navigate('/iletisim');
                    setIsMobileOpen(false);
                  }}
                >
                  Teklif Al
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;