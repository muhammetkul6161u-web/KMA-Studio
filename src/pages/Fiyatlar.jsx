import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaWhatsapp, FaTimes } from 'react-icons/fa';
import ParticleBackground from '../components/ParticleBackground';
import Footer from '../components/Footer';
import './Fiyatlar.css';

const Fiyatlar = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSelect = (pkg) => {
    setSelectedPkg(pkg);
    setPhoneNumber('');
  };

  const handleConfirm = () => {
    if(!phoneNumber.trim()) {
      alert("Lütfen telefon numaranızı giriniz.");
      return;
    }
    const message = `Merhaba Dizvyn, "${selectedPkg.title}" paketi ile ilgileniyorum.\n\nFiyat: ${selectedPkg.price}\nÖzellikler: ${selectedPkg.features.join(', ')}\n\nGeri dönüş numaram: ${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905359460122?text=${encodedMessage}`, '_blank');
    setSelectedPkg(null);
  };
  const fallbackPackages = [
    {
      id: 1,
      title: 'Bireysel',
      price: '3.000 - 4.500 ₺',
      desc: 'Kişisel markalar ve portfolyolar için ideal başlangıç.',
      features: ['Tek Sayfa (Landing Page)', 'Temel Tasarım', 'Mobil Uyumluluk', 'Hızlı Kurulum'],
      popular: false
    },
    {
      id: 2,
      title: 'Yerel İşletme',
      price: '5.500 - 8.500 ₺',
      desc: 'Küçük ve orta ölçekli işletmeler için kurumsal varlık.',
      features: ['Çoklu Sayfa Yapısı', 'Kurumsal Kimlik Uyumu', 'Temel SEO Optimizasyonu', 'İletişim/Rezervasyon Formu'],
      popular: true
    },
    {
      id: 3,
      title: 'Esnaf Çözümleri',
      price: '9.000 - 15.000 ₺',
      desc: 'Ürünlerini online satmak isteyen işletmeler için.',
      features: ['E-Ticaret Altyapısı', 'Ödeme Sistemi Entegrasyonu', 'Ürün Yönetim Paneli', 'Gelişmiş Performans'],
      popular: false
    },
    {
      id: 4,
      title: 'Kurumsal Vizyon',
      price: '25.000 - 40.000 ₺',
      desc: 'Özel yazılım gerektiren büyük ölçekli projeler.',
      features: ['Full-Stack Geliştirme', 'Özel Dashboard', 'API Entegrasyonları', 'İleri Seviye Güvenlik'],
      popular: false
    },
    {
      id: 5,
      title: 'Premium Marka',
      price: '50.000 ₺+',
      desc: 'Sınırları zorlayan, vizyoner ve ödüllük projeler.',
      features: ['Sınırsız Özelleştirme', 'Premium Animasyonlar', '7/24 Sürekli Destek', 'Öncelikli Geliştirme'],
      popular: false
    }
  ];

  const [packages] = useState(fallbackPackages);

  return (
    <div className="fiyatlar-wrapper">
      <SEO 
        title="Fiyatlar & Paketler" 
        description="Şeffaf fiyatlandırma. Gizli maliyet yok. İşletmenizin dijital dönüşümü için en uygun web tasarım paketini seçin." 
        url="/fiyatlar" 
      />
      {/* Background SVG Chart - Smooth realistic rising & falling */}
      <div className="fiyatlar-bg-chart">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
          {/* Area fill */}
          <path d="M0,400 L0,320 C60,310 120,340 180,300 C240,260 300,290 360,250 C420,210 480,260 540,220 C600,180 660,230 720,190 C780,150 840,200 900,160 C960,120 1020,170 1080,110 L1140,80 L1200,60 L1200,400 Z" fill="url(#chartGrad)" />
          {/* Main line */}
          <path d="M0,320 C60,310 120,340 180,300 C240,260 300,290 360,250 C420,210 480,260 540,220 C600,180 660,230 720,190 C780,150 840,200 900,160 C960,120 1020,170 1080,110 L1140,80 L1200,60" fill="none" stroke="rgba(0, 255, 157, 0.35)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Secondary line */}
          <path d="M0,350 C80,340 160,360 240,330 C320,300 400,340 480,280 C560,240 640,270 720,230 C800,200 880,240 960,190 C1040,160 1120,130 1200,100" fill="none" stroke="rgba(0, 255, 157, 0.12)" strokeWidth="1.5" strokeDasharray="6 4" />
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,255,157,0.08)" />
              <stop offset="100%" stopColor="rgba(0,255,157,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Currency Symbols - Left Edge */}
      <div className="currency-symbols">
        <span className="currency-item">$ USD</span>
        <span className="currency-item">€ EUR</span>
        <span className="currency-item">₺ TRY</span>
        <span className="currency-item">£ GBP</span>
      </div>

      {/* Dynamic Particle Background - Chart Variant */}
      <ParticleBackground variant="chart" />

      {/* Hero Section */}
      <section className="fiyatlar-hero" style={{ paddingTop: '180px' }}>
        
        {/* Static Price Table Ticker */}
        <div className="price-ticker-panel">
          <div className="ticker-item"><span className="ticker-label">BİREYSEL</span> <span className="ticker-price">3.000₺</span> <span className="ticker-trend">▲</span></div>
          <div className="ticker-item"><span className="ticker-label">YEREL</span> <span className="ticker-price">5.500₺</span> <span className="ticker-trend">▲</span></div>
          <div className="ticker-item"><span className="ticker-label">ESNAF</span> <span className="ticker-price">9.000₺</span> <span className="ticker-trend">▲</span></div>
          <div className="ticker-item"><span className="ticker-label">KURUMSAL</span> <span className="ticker-price">25.000₺</span> <span className="ticker-trend">▲</span></div>
          <div className="ticker-item"><span className="ticker-label">PREMİUM</span> <span className="ticker-price">50.000₺+</span> <span className="ticker-trend">▲</span></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fiyatlar-hero-content"
        >
          <span className="fiyatlar-label">[ YATIRIM ]</span>
          <h1 className="fiyatlar-title">
            Değer <br/>
            <span className="gradient-text-pricing">Yaratıyoruz.</span>
          </h1>
          <p className="fiyatlar-subtitle">
            Şeffaf fiyatlandırma. Gizli maliyet yok. İşletmenizin dijital dönüşümü için en uygun planı seçin.
          </p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="fiyatlar-content">
          <div className="pricing-grid">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                className={`pricing-card ${pkg.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {pkg.popular && <div className="popular-badge">En Çok Tercih Edilen</div>}
                <div className="card-header">
                  <h3 className="pkg-title">{pkg.title}</h3>
                  <p className="pkg-desc">{pkg.desc}</p>
                  <div className="pkg-price">{pkg.price}</div>
                </div>
                <div className="card-body">
                  <ul className="pkg-features">
                    {pkg.features && pkg.features.map((feature, j) => (
                      <li key={j}>
                        <FaCheck className="check-icon" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="pkg-select-btn" onClick={() => handleSelect(pkg)}>Seç</button>
                </div>
              </motion.div>
            ))}
          </div>
      
        {/* Warning and CTA */}
        <motion.div 
          className="pricing-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="pricing-warning">
            * Uyarı: Seçilen paket kapsamına göre fiyatlar değişkenlik gösterebilir; düşük paketler her özelliği kapsamaz.
          </p>
          
          <a href="https://wa.me/905359460122" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
            <FaWhatsapp className="wa-icon" />
            ÖZEL PAKET İÇİN İLETİŞİME GEÇİN
          </a>
        </motion.div>
      </section>

      <Footer variant="chart" />

      {/* Select Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <motion.div 
            className="pkg-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="pkg-modal-content glass-box"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
            >
              <button className="pkg-modal-close" onClick={() => setSelectedPkg(null)}><FaTimes /></button>
              <h3 className="pkg-modal-title">{selectedPkg.title} Paketi</h3>
              <p className="pkg-modal-desc">Detaylı bilgi ve sipariş için lütfen telefon numaranızı girin. Sizi WhatsApp üzerinden bilgilendireceğiz.</p>
              
              <div className="pkg-modal-input-group">
                <input 
                  type="tel" 
                  placeholder="05XX XXX XX XX" 
                  className="pkg-modal-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <button className="pkg-modal-confirm-btn" onClick={handleConfirm}>
                <FaWhatsapp /> WhatsApp'a Git
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Fiyatlar;
