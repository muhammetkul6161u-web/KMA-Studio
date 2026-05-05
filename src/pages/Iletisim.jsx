import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaGithub, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import ParticleBackground from '../components/ParticleBackground';
import Footer from '../components/Footer';
import './Iletisim.css';

const Iletisim = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Supabase'e Kaydet (Yedek olarak kalsın)
      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message,
            read: false 
          }
        ]);

      if (error) console.warn('Supabase insertion failed, but attempting email...', error);

      // 2. E-posta Gönder (FormSubmit.co üzerinden)
      const response = await fetch("https://formsubmit.co/ajax/muhammetkul6161u@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "KMA Studio - Yeni İletişim Formu Mesajı!"
        })
      });

      if (!response.ok) throw new Error('Email delivery failed');

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="iletisim-wrapper">
      <SEO 
        title="İletişim" 
        description="Projenizi hayata geçirmek için ilk adımı atın. KMA Web Stüdyosu ile iletişime geçin." 
        url="/iletisim" 
      />
      {/* Ambient */}
      <ParticleBackground variant="signal" />
      <div className="iletisim-ambient">
        <div className="iletisim-glow-red"></div>
        <div className="iletisim-grid-bg"></div>
      </div>

      {/* Diagonal Phone behind contact info */}
      <div className="iletisim-phone-diagonal">
        <svg viewBox="0 0 300 600" fill="none">
          <rect x="10" y="10" width="280" height="580" rx="40" stroke="rgba(255,179,0,0.12)" strokeWidth="3" />
          <rect x="25" y="60" width="250" height="460" rx="8" fill="rgba(255,179,0,0.03)" />
          <path d="M110,30 L190,30" stroke="rgba(255,179,0,0.2)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="150" cy="560" r="15" stroke="rgba(255,179,0,0.15)" strokeWidth="2" />
          {/* Screen content lines */}
          <rect x="50" y="100" width="200" height="8" rx="4" fill="rgba(255,179,0,0.06)" />
          <rect x="50" y="130" width="160" height="8" rx="4" fill="rgba(255,179,0,0.04)" />
          <rect x="50" y="160" width="180" height="8" rx="4" fill="rgba(255,179,0,0.05)" />
          <rect x="50" y="220" width="200" height="60" rx="12" fill="rgba(255,179,0,0.04)" />
          <rect x="50" y="310" width="200" height="60" rx="12" fill="rgba(255,179,0,0.03)" />
          <rect x="50" y="400" width="200" height="40" rx="20" fill="rgba(255,179,0,0.06)" />
        </svg>
      </div>

      {/* HERO */}
      <section className="iletisim-hero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="iletisim-hero-content"
        >
          <span className="iletisim-label">[ İLETİŞİM ]</span>
          <h1 className="iletisim-title">
            Bağlantı<br/>
            <span className="gradient-text-contact">Kur.</span>
          </h1>
          <p className="iletisim-subtitle">
            Projenizi hayata geçirmek için ilk adımı atın. Bir mesaj bırakın, 24 saat içinde dönüş yapalım.
          </p>
        </motion.div>
      </section>

      {/* FORM & CONTACT */}
      <section className="iletisim-content">
        <div className="iletisim-grid">

          {/* Glassmorphism Form */}
          <motion.div
            className="iletisim-form-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="iletisim-form"
                >
                  <div className={`form-group ${focused === 'name' || formData.name ? 'active' : ''}`}>
                    <label htmlFor="contact-name">İsim</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      required
                      autoComplete="name"
                    />
                    <div className="form-line" style={{ '--line-color': '#FFB300' }}></div>
                  </div>

                  <div className={`form-group ${focused === 'email' || formData.email ? 'active' : ''}`}>
                    <label htmlFor="contact-email">E-posta</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      required
                      autoComplete="email"
                    />
                    <div className="form-line" style={{ '--line-color': '#FFB300' }}></div>
                  </div>

                  <div className={`form-group ${focused === 'message' || formData.message ? 'active' : ''}`}>
                    <label htmlFor="contact-message">Mesaj</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      required
                    />
                    <div className="form-line" style={{ '--line-color': '#FFB300' }}></div>
                  </div>

                  <motion.button
                    type="submit"
                    className="iletisim-submit-btn"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    GÖNDER
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="iletisim-success"
                >
                  <div className="success-icon">✓</div>
                  <h3>Mesajınız Alındı</h3>
                  <p>En kısa sürede dönüş yapacağız.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="iletisim-info"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-block">
              <h3 className="info-title">İletişim Bilgileri</h3>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <span>muhammetkul6161u@gmail.com</span>
              </div>
              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <span>0535 946 01 22</span>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>Türkiye / Trabzon / Ortahisar</span>
              </div>
            </div>

            <div className="info-block">
              <h3 className="info-title">Sosyal Medya</h3>
              <div className="social-links">
                <a href="https://instagram.com/m.ali_kul61" target="_blank" rel="noopener noreferrer" className="social-link-item">
                  <FaInstagram /> <span>Instagram</span>
                </a>
                <a href="#" className="social-link-item">
                  <FaGithub /> <span>GitHub</span>
                </a>
                <a href="#" className="social-link-item">
                  <FaLinkedinIn /> <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer variant="signal" />
    </div>
  );
};

export default Iletisim;