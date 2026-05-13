import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';

const KVKKModal = ({ isOpen, onClose }) => {
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 999999,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            style={{
              width: '90%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto',
              background: '#111', border: '1px solid #333', borderRadius: '16px',
              padding: '40px', position: 'relative', color: '#eee',
              textAlign: 'left'
            }}
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none',
                color: '#888', fontSize: '1.5rem', cursor: 'pointer'
              }}
            >
              <FaTimes />
            </button>
            <h2 style={{ color: '#fff', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>KVKK Aydınlatma Metni</h2>
            <div style={{ lineHeight: '1.7', fontSize: '0.95rem', color: '#bbb' }}>
              <p>Kişisel verileriniz, Dizvyn tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla işlenmektedir.</p>
              <br/>
              <p><strong>1. Kişisel Verilerin İşlenme Amacı:</strong><br/>Toplanan kişisel verileriniz, size sunduğumuz hizmetlerin kalitesini artırmak, projelerinizi yönetmek, iletişim kurmak ve yasal yükümlülüklerimizi yerine getirmek amacıyla işlenmektedir.</p>
              <br/>
              <p><strong>2. Kişisel Verilerin Aktarılması:</strong><br/>Kişisel verileriniz, yasal zorunluluklar haricinde üçüncü şahıslarla paylaşılmamaktadır.</p>
              <br/>
              <p><strong>3. Veri Sahibinin Hakları:</strong><br/>KVKK'nın 11. maddesi uyarınca, kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahipsiniz.</p>
              <br/>
              <p>İletişim için ana sayfadaki formu veya iletişim numaralarımızı kullanabilirsiniz.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Footer = ({ variant = 'cyber' }) => {
  const [isKVKKOpen, setIsKVKKOpen] = useState(false);
  const getThemeColor = () => {
    switch(variant) {
      case 'suit': return '#D4C0A8';
      case 'chart': return '#00FF9D';
      case 'services': return '#C0C0C0';
      case 'lens': return '#BC13FE';
      case 'signal': return '#FFB300';
      case 'cyber':
      default: return '#00f3ff';
    }
  };

  const themeColor = getThemeColor();

  const getFooterBg = () => {
    switch(variant) {
      case 'suit': return '#0f0a06';
      case 'chart': return '#010302';
      case 'services': return '#f5f5f7';
      case 'lens': return '#070310';
      case 'signal': return '#080600';
      case 'cyber':
      default: return '#020407';
    }
  };

  return (
    <>
      <footer className={`ak-footer footer-${variant}`} style={{ '--theme-color': themeColor, backgroundColor: getFooterBg() }}>
        <div className="footer-top-line"></div>
        
        <div className="footer-container footer-compact">
          <div className="footer-brand">
            <h2 className="footer-logo">
              <img src={logo} alt="Dizvyn" style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '50%', background: '#000', padding: '0', border: '2px solid rgba(0, 243, 255, 0.3)', boxShadow: '0 0 15px rgba(0, 243, 255, 0.15)' }} />
            </h2>
            <p className="footer-description">
              Sınırları aşan butik web teknolojileri stüdyosu. Minimalizm ile markanızın geleceğini inşa ediyoruz.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/m.ali_kul61" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ '--hover-color': themeColor }}><FaInstagram /></a>
              <a href="#" className="social-icon" style={{ '--hover-color': themeColor }}><FaGithub /></a>
              <a href="#" className="social-icon" style={{ '--hover-color': themeColor }}><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-title">Keşfet</h3>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/hakkimizda">Hakkımızda</Link></li>
              <li><Link to="/fiyatlar">Fiyatlar</Link></li>
              <li><Link to="/hizmetler">Hizmetler</Link></li>
              <li><Link to="/portfolyo">Portfolyo</Link></li>
              <li><Link to="/iletisim">İletişim</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-title">Uzmanlıklar</h3>
            <ul>
              <li><a href="#">Özel Web Geliştirme</a></li>
              <li><a href="#">UI/UX Tasarım</a></li>
              <li><a href="#">E-Ticaret</a></li>
              <li><a href="#">Kurumsal Kimlik</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-title">Bize Ulaşın</h3>
            <ul>
              <li><FaEnvelope className="contact-icon" /> muhammetkul6161u@gmail.com</li>
              <li><FaPhoneAlt className="contact-icon" /> 0535 946 01 22</li>
              <li><FaMapMarkerAlt className="contact-icon" /> Trabzon, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dizvyn. Tüm hakları saklıdır.</p>
          <p 
            className="footer-kvkk" 
            onClick={() => setIsKVKKOpen(true)}
            style={{ 
              cursor: 'pointer', 
              textDecoration: 'underline', 
              marginTop: '10px', 
              fontSize: '0.8rem', 
              color: '#aaaaaa',
              fontWeight: '400',
              opacity: 0.8
            }}
          >
            6698 sayılı KVKK kapsamında, kişisel verileriniz gizlilik politikamız doğrultusunda korunmaktadır. Tıklayarak metni okuyabilirsiniz.
          </p>
        </div>
      </footer>

      <KVKKModal isOpen={isKVKKOpen} onClose={() => setIsKVKKOpen(false)} />
    </>
  );
};

export default Footer;