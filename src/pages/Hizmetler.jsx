import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Footer from '../components/Footer';
import SmartImage from '../components/SmartImage';
import { FaPenNib, FaVideo, FaDesktop, FaRobot, FaCode, FaCashRegister, FaGamepad, FaWhatsapp } from 'react-icons/fa';
import './Hizmetler.css';

// Marquee Assets - Web Sitesi
import kafehz1 from '../assets/kafehz1.webp';
import kafehz2 from '../assets/kafehz2.webp';
import kamanhz1 from '../assets/kamanhz1.webp';
import kamanhz2 from '../assets/kamanhz2.webp';
import toplulukhz1 from '../assets/toplulukhz1.webp';
import toplulukhz2 from '../assets/toplulukhz2.webp';
import emrcorehz1 from '../assets/emrcorehz1.webp';
import emrcorehz2 from '../assets/emrcorehz 2.webp';
import bluuryhz1 from '../assets/bluuryhz1 .webp';
import bluuryhz2 from '../assets/bluuryhz2 .webp';

// Marquee Assets - Giyim
import city1hz from '../assets/city1hz.webp';
import city2hz from '../assets/city2hz.webp';
import dream1hz from '../assets/dream1hz.webp';
import dream2hz from '../assets/dream2hz.webp';
import glicthhz from '../assets/glicthhz.webp';

const webImages = [kafehz1, kafehz2, kamanhz1, kamanhz2, toplulukhz1, toplulukhz2, emrcorehz1, emrcorehz2, bluuryhz1, bluuryhz2];
const clothImages = [city1hz, city2hz, dream1hz, dream2hz, glicthhz];

const services = [
  { id: 1, title: 'Logo Tasarımı', desc: 'Markanızın ruhunu yansıtan, akılda kalıcı ve modern kurumsal kimlik ve logo tasarımları.', icon: <FaPenNib /> },
  { id: 2, title: 'Video Editleme', desc: 'Hikayenizi en çarpıcı şekilde anlatan profesyonel kurgu, renk düzenleme ve post-prodüksiyon hizmetleri.', icon: <FaVideo /> },
  { id: 3, title: 'UX Tasarım', desc: 'Kullanıcıları merkeze alan, sezgisel ve akıcı arayüz deneyimleri tasarlayarak dönüşüm oranlarınızı artırıyoruz.', icon: <FaDesktop /> },
  { id: 4, title: 'Yapay Zeka Video Yapımı', desc: 'Son teknoloji AI araçlarıyla sınırları zorlayan, yaratıcı ve fütüristik video içerikleri üretiyoruz.', icon: <FaRobot /> },
  { id: 5, title: 'Web Site Düzenleme', desc: 'Mevcut web sitenizi modern standartlara uyarlıyor, hız ve SEO performansını optimize ediyoruz.', icon: <FaCode /> },
  { id: 6, title: 'Adisyon Sistemi', desc: 'Kafe ve restoranlar için özel geliştirdiğimiz bulut tabanlı modern yönetim altyapısı.', icon: <FaCashRegister />, link: 'https://www.emrcore.com.tr' },
  { id: 7, title: 'Oyun Yapımı', desc: 'Unity ve Unreal Engine ile hem mobil hem masaüstü platformlar için yüksek performanslı, etkileyici oyunlar geliştiriyoruz.', icon: <FaGamepad /> },
];

const MarqueeCard = ({ img, index, prefix }) => {
  const cardRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Merkezi Odak Mantığı: Sadece ekranın ortasındaki %30'luk alanda keskinleşecek
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsFocused(entry.isIntersecting);
      });
    }, {
      root: null,
      rootMargin: '0px -35% 0px -35%', 
      threshold: 0
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} className={`marquee-card ${isFocused ? 'focused' : ''}`}>
      <img src={img} alt={`KMA Studio ${prefix} Projesi - Görsel ${index + 1}`} className="marquee-img" loading="lazy" />
      <div className="marquee-overlay"></div>
      
      {/* Nothing Brand Dot-Matrix Data */}
      <div className="marquee-tech-data">
        <span className="tech-badge">ID: {prefix}-{(index + 1).toString().padStart(3, '0')}</span>
        <span className="tech-badge">DURUM: AKTİF</span>
      </div>
      <div className="marquee-tech-bottom">
        YÜKLEME: %100
      </div>
      
      {/* Neon Progress Bar */}
      <div className="marquee-progress-container">
        <div className="marquee-progress-bar" style={{ width: isFocused ? '100%' : '0%' }}></div>
      </div>
    </div>
  );
};

const NothingMarquee = ({ title, desc, images, prefix, reverse }) => {
  // Sonsuz döngü için resimleri çoğaltıyoruz
  const extendedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="marquee-section">
      <div className="marquee-header">
        <motion.h2 
          className="marquee-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="marquee-desc"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {desc}
        </motion.p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track" style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: `${extendedImages.length * 5}s` }}>
          {extendedImages.map((img, i) => (
            <MarqueeCard key={i} img={img} index={i} prefix={prefix} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Hizmetler = () => {
  return (
    <div className="hizmetler-wrapper">
      <SEO 
        title="Hizmetlerimiz" 
        description="Logo tasarımından yapay zeka videolarına, KMA'nın sunduğu tüm profesyonel dijital hizmetler." 
        url="/hizmetler" 
      />

      {/* Ambient Backgrounds */}
      <div className="hizmetler-ambient">
        <div className="hizmetler-glow-white"></div>
        <div className="hizmetler-glow-silver"></div>
        <div className="hizmetler-noise"></div>
        <div className="hizmetler-geometric-bg"></div>
      </div>

      {/* Hero Section */}
      <section className="hizmetler-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hizmetler-hero-content"
        >
          <span className="hizmetler-label">[ HİZMETLER / ✓ ]</span>
          <h1 className="hizmetler-title">
            Neler <span className="gradient-text-services">Yapıyoruz.</span>
          </h1>
          <p className="hizmetler-subtitle">
            Sıradanlığı reddediyor, markanızı geleceğe taşıyacak vizyoner ve uçtan uca dijital çözümler üretiyoruz.
          </p>
        </motion.div>
      </section>

      {/* Standart Hizmet Kartları Grid */}
      <section className="hizmetler-grid-section">
        <div className="hizmetler-grid">
          {services.map((srv, i) => (
            <motion.div
              key={srv.id}
              className="hizmet-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="hizmet-meta">REF: SRV-0{srv.id}</div>
              <div className="hizmet-icon-wrapper">
                {srv.icon}
              </div>
              <h3 className="hizmet-card-title">{srv.title}</h3>
              <p className="hizmet-card-desc">{srv.desc}</p>
              
              {srv.link && (
                <a href={srv.link} target="_blank" rel="noopener noreferrer" className="hizmet-link">
                  Projeyi İncele &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Özel Galeriler (Nothing Marquee) */}
      <NothingMarquee 
        title="Web Sitesi Yapımı" 
        desc="Estetik, hız ve SEO uyumunu mükemmel bir dengede buluşturan, sadece size özel tasarlanmış premium web deneyimleri."
        images={webImages}
        prefix="WEB"
      />

      <NothingMarquee 
        title="Giyim Tasarımı" 
        desc="Markanızın karakterini kumaşa işleyen, modern sokak modası ve kurumsal kimlik odaklı yenilikçi tekstil tasarımları."
        images={clothImages}
        prefix="GLM"
        reverse={true}
      />

      {/* CTA Section */}
      <section className="hizmetler-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Projenizi birlikte tasarlayalım.</h2>
          <a href="https://wa.me/905359460122" target="_blank" rel="noopener noreferrer" className="hizmetler-cta-btn">
            <FaWhatsapp style={{ fontSize: '1.4rem' }} /> Hemen İletişime Geçin
          </a>
        </motion.div>
      </section>

      <Footer variant="services" />
    </div>
  );
};

export default Hizmetler;
