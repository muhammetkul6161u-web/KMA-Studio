import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import logo from '../assets/logo.webp';

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
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
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
      case '/hakkimizda': return { color: '#D4C0A8', scrollBg: 'rgba(26, 18, 11, 0.92)', scrollBorder: 'rgba(212, 192, 168, 0.3)' };
      case '/fiyatlar': return { color: '#00FF9D', scrollBg: 'rgba(5, 12, 8, 0.92)', scrollBorder: 'rgba(0, 255, 157, 0.3)' };
      case '/hizmetler': return { color: '#1a1a1a', scrollBg: 'rgba(230, 230, 235, 0.92)', scrollBorder: 'rgba(26, 26, 26, 0.15)' };
      case '/portfolyo': return { color: '#BC13FE', scrollBg: 'rgba(15, 8, 25, 0.92)', scrollBorder: 'rgba(188, 19, 254, 0.3)' };
      case '/iletisim': return { color: '#FFB300', scrollBg: 'rgba(12, 10, 5, 0.92)', scrollBorder: 'rgba(255, 179, 0, 0.3)' };
      case '/':
      default: return { color: '#00f3ff', scrollBg: 'rgba(3, 4, 7, 0.92)', scrollBorder: 'rgba(0, 243, 255, 0.3)' };
    }
  };

  const theme = getThemeConfig();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

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
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { path: '/', label: 'Ana Sayfa', hoverColor: '#00f3ff', iconType: 'home' },
    { path: '/hakkimizda', label: 'Hakkımızda', hoverColor: '#D4C0A8', iconType: 'about' },
    { path: '/fiyatlar', label: 'Fiyatlar', hoverColor: '#00FF9D', iconType: 'pricing' },
  ];

  const rightLinks = [
    { path: '/hizmetler', label: 'Hizmetler', hoverColor: '#C0C0C0', iconType: 'services' },
    { path: '/portfolyo', label: 'Portfolyo', hoverColor: '#BC13FE', iconType: 'portfolio' },
    { path: '/iletisim', label: 'İletişim', hoverColor: '#FFB300', iconType: 'contact' },
  ];

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('TR');
  const langRef = React.useRef(null);

  // Force hide Google Translate bar on language change
  useEffect(() => {
    const hideGoogleBanner = () => {
      document.querySelectorAll('.skiptranslate, .goog-te-banner-frame, iframe.goog-te-banner-frame').forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.height = '0';
      });
      document.body.style.top = '0px';
    };
    hideGoogleBanner();
    const timer = setTimeout(hideGoogleBanner, 500);
    return () => clearTimeout(timer);
  }, [selectedLang]);

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
        className={`premium-navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isMobileOpen ? 'navbar-hidden-mobile' : ''}`} 
        style={{ 
          '--theme-color': theme.color,
          '--scroll-bg': theme.scrollBg,
          '--scroll-border': theme.scrollBorder,
        }}
      >
        {/* Language Switcher: Stay on absolute left */}
        <div className="nav-actions-container nav-desktop-only">
          <div className="custom-lang-switcher" ref={langRef}>
            <button 
              className="lang-trigger-v2"
              onClick={() => setIsLangOpen(!isLangOpen)}
              style={{ color: theme.color, borderColor: `${theme.color}50` }}
            >
              <span className="notranslate" translate="no">{selectedLang}</span>
              <span className="lang-arrow" style={{ color: theme.color }}>▼</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  className="lang-dropdown-v2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  style={{ borderColor: `${theme.color}30` }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-opt-v2 ${selectedLang === lang.label ? 'active' : ''}`}
                      onClick={() => handleLangChange(lang)}
                      style={{ '--active-color': theme.color }}
                    >
                      <span className="notranslate" translate="no">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="navbar-content-wrapper">
          {/* Left Links */}
          <div className="nav-links-left nav-desktop-only">
            {leftLinks.map((link) => (
              <Magnetic key={link.path}>
                <div className="nav-item" style={{ '--hover-color': link.hoverColor }}>
                  <div className={`bg-icon icon-${link.iconType}`}>
                    <NavIcon type={link.iconType} color={link.hoverColor} />
                  </div>
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                    style={{ color: theme.color }}
                  >
                    {link.label}
                  </Link>
                </div>
              </Magnetic>
            ))}
          </div>

          {/* Center Logo Circle */}
          <div className="nav-center-logo">
            <Link 
              to="/" 
              className="logo-circle-container"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="logo-circle-inner" style={{ borderColor: theme.color, boxShadow: `0 0 25px ${theme.color}40` }}>
                <img src={logo} alt="Dizvyn" className="logo-img" />
              </div>
            </Link>
          </div>

          {/* Right Links */}
          <div className="nav-links-right nav-desktop-only">
            {rightLinks.map((link) => (
              <Magnetic key={link.path}>
                <div className="nav-item" style={{ '--hover-color': link.hoverColor }}>
                  <div className={`bg-icon icon-${link.iconType}`}>
                    <NavIcon type={link.iconType} color={link.hoverColor} />
                  </div>
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                    style={{ color: theme.color }}
                  >
                    {link.label}
                  </Link>
                </div>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* CTA Button: Move to absolute right */}
        <div className="nav-cta-container nav-desktop-only">
          <button 
            className="cta-pill"
            onClick={() => navigate('/iletisim')}
            style={{ 
              background: theme.color, 
              color: '#000',
              boxShadow: `0 4px 20px ${theme.color}40`
            }}
          >
            <span className="notranslate" translate="no">Teklif Al</span>
          </button>
        </div>

        <button 
          className="hamburger-btn mobile-only"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Menü"
        >
          <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} style={{ background: theme.color }}></span>
          <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} style={{ background: theme.color }}></span>
          <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} style={{ background: theme.color }}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ '--theme-color': theme.color }}
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-logo">
                <img src={logo} alt="Dizvyn" />
              </div>
              <button 
                className="mobile-menu-close" 
                onClick={() => setIsMobileOpen(false)}
                aria-label="Kapat"
              >
                <div className="close-icon-wrap">
                  <span style={{ background: theme.color }}></span>
                  <span style={{ background: theme.color }}></span>
                </div>
              </button>
            </div>
            <div className="mobile-menu-content">
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-menu-link ${location.pathname === link.path ? 'mobile-link-active' : ''}`}
                    style={{ '--link-color': link.hoverColor }}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="mobile-menu-icon">
                      <NavIcon type={link.iconType} color={link.hoverColor} />
                    </div>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="mobile-menu-footer">
                <div className="mobile-lang-row">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`mobile-lang-btn ${selectedLang === lang.label ? 'active' : ''}`}
                      onClick={() => handleLangChange(lang)}
                      style={{ '--theme-color': theme.color }}
                    >
                      <span className="notranslate" translate="no">{lang.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="mobile-cta-btn-huge"
                  onClick={() => {
                    navigate('/iletisim');
                    setIsMobileOpen(false);
                  }}
                  style={{ background: theme.color }}
                >
                  <span className="notranslate" translate="no">Teklif Al</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;