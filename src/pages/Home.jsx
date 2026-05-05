import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import SmartImage from '../components/SmartImage';
import { motion } from 'framer-motion';
import LiveFeed from '../components/LiveFeed';
import Footer from '../components/Footer';
import ProcessSection from '../components/StatsCounter';
import { SiReact, SiTailwindcss, SiVite, SiFigma, SiNodedotjs } from 'react-icons/si';
import { FaCode, FaRocket, FaPaintBrush } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

// YENİ GÖRSELLER (2'li setler)
import emr1 from '../assets/emr1.webp';
import emr2 from '../assets/emr2.webp';

import kaman1 from '../assets/kaman1.webp';
import kaman2 from '../assets/kaman2.webp';
import ParticleBackground from '../components/ParticleBackground';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    { text: 'system.status', type: 'cmd' },
    { text: '→ ONLINE — all services running', type: 'dim' }
  ]);
  const [monitorStats, setMonitorStats] = useState({ latency: 12, fps: 60 });
  const navigate = useNavigate();

  useReveal();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Terminal & Monitor Simulation
  useEffect(() => {
    const terminalInterval = setInterval(() => {
      const logs = [
        'request.incoming from 192.168.1.1',
        'auth.token validated',
        'database.query success',
        'cache.hit rate 94%',
        'deployment.sync active',
        'security.firewall nominal'
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setTerminalLines(prev => [...prev.slice(-4), { text: `→ ${randomLog}`, type: 'dim' }]);
    }, 3000);

    const monitorInterval = setInterval(() => {
      setMonitorStats({
        latency: Math.floor(Math.random() * (18 - 8) + 8),
        fps: Math.floor(Math.random() * (62 - 58) + 58)
      });
    }, 2000);

    return () => {
      clearInterval(terminalInterval);
      clearInterval(monitorInterval);
    };
  }, []);

  return (
    <>
      <SEO 
        title="Ana Sayfa" 
        description="Sınırları aşan butik bir teknoloji stüdyosu. Modern web ekosistemini minimalist bir estetikle buluşturup markanızın geleceğini inşa ediyoruz." 
        url="/" 
      />
      <div className="cyber-space-bg">
        <ParticleBackground variant="cyber" />
        
        {/* === İNTERAKTİF ARKA PLAN === */}
        <div className="fixed-ambient-bg">
          <div className="interactive-grid-deep"></div>
          <div className="noise-overlay"></div>
        </div>

        <div className="content-layer">
          
          {/* --- HERO --- */}
          <div className="hero-section hero-centered">
            
            {/* Left Panel - Terminal */}
            <motion.div 
              className="hero-side-panel hero-panel-left"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="panel-header">
                <span className="panel-dot red"></span>
                <span className="panel-dot yellow"></span>
                <span className="panel-dot green"></span>
                <span className="panel-title">terminal</span>
              </div>
              <div className="panel-body terminal-body">
                {terminalLines.map((line, i) => (
                  <p key={i} className={line.type === 'dim' ? 't-dim' : ''}>
                    {line.type === 'cmd' && <span className="t-green">$ </span>}
                    {line.text}
                  </p>
                ))}
                <p className="t-blink"><span className="t-green">$</span> _</p>
              </div>
            </motion.div>

            {/* Center Content */}
            <div className="hero-content hero-content-center">
              <div className={`reveal-item ${showContent ? 'visible' : ''}`} style={{ marginBottom: '30px' }}>
                <LiveFeed />
              </div>
              <motion.h1 
                className={`reveal-item ${showContent ? 'visible' : ''} hero-title hero-title-centered`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Küresel Vizyon.<br />
                <span className="gradient-text-home">Yerel Etki.</span>
              </motion.h1>
              <motion.p 
                className={`reveal-item ${showContent ? 'visible' : ''} hero-description hero-desc-centered`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Sınırları aşan butik bir teknoloji stüdyosu. Modern web ekosistemini minimalist bir estetikle buluşturup markanızın geleceğini inşa ediyoruz.
              </motion.p>
              <motion.div 
                className={`reveal-item ${showContent ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.6s' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button 
                  className="cta-button hero-btn" 
                  onClick={() => navigate('/hakkimizda')}
                  style={{ position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
                >
                  BİZİ TANIYIN
                </button>
              </motion.div>
            </div>

            {/* Right Panel - System Monitor */}
            <motion.div 
              className="hero-side-panel hero-panel-right"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="panel-header">
                <span className="panel-dot red"></span>
                <span className="panel-dot yellow"></span>
                <span className="panel-dot green"></span>
                <span className="panel-title">monitor</span>
              </div>
              <div className="panel-body monitor-body">
                <div className="monitor-row">
                  <span className="monitor-label">LATENCY</span>
                  <span className="monitor-value t-cyan">{monitorStats.latency}ms</span>
                </div>
                <div className="monitor-row">
                  <span className="monitor-label">FPS</span>
                  <span className="monitor-value t-green">{monitorStats.fps}</span>
                </div>
                <div className="monitor-row">
                  <span className="monitor-label">UPTIME</span>
                  <span className="monitor-value t-cyan">99.9%</span>
                </div>
                <div className="monitor-divider"></div>
                <div className="monitor-coord">
                  <span className="t-dim">TRABZON</span>
                  <span className="t-cyan">41.0027° N</span>
                </div>
                <div className="monitor-coord">
                  <span className="t-dim">MERIDIAN</span>
                  <span className="t-cyan">39.7168° E</span>
                </div>
              </div>
            </motion.div>

          </div>

         {/* --- FELSEFE (BENTO GRID) --- */}
          <div className="section-padding section-border-top">
            <div className="bg-watermark">01 // VİZYON</div>
            <div className="reveal-item" style={{ marginBottom: '60px' }}>
              <div className="section-subtitle">[ YAKLAŞIMIMIZ ]</div>
              <motion.h2 className="section-title" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>Dürüstlükten Gelen <br/><span className="gradient-text-home">İcraat Gücü.</span></motion.h2>
            </div>
            
            <div className="grid-bento">
              {/* 1. Kutu: Ana Yaklaşım (Büyük Kutu) */}
              <div className="glass-box reveal-item bento-span-2 bento-large">
                <div className="bento-icon-main"><FaCode /></div>
                <h3 className="bento-title">Şeffaf ve Gerçekçiyiz.</h3>
                <p className="bento-text">
                  Yüzlerce çalışana sahipmişiz gibi jenerik cümlelerin arkasına saklanmıyoruz. Biz kodlarına aşık küçük bir ekibiz. Referansımız, şu an içinde bulunduğunuz bu pürüzsüz arayüzdür.
                </p>
              </div>

              {/* 2. Kutu: Teknolojiler */}
              <div className="glass-box reveal-item bento-tech-box">
                <h3 className="bento-title-small">Modern Stack</h3>
                <p className="bento-text-small">Sadece en güncel ve performanslı teknolojileri kullanıyoruz.</p>
                <div className="tech-icons-grid">
                   <div className="tech-icon-item" title="React"><SiReact /></div>
                   <div className="tech-icon-item" title="Vite"><SiVite /></div>
                   <div className="tech-icon-item" title="Tailwind"><SiTailwindcss /></div>
                   <div className="tech-icon-item" title="Node.js"><SiNodedotjs /></div>
                   <div className="tech-icon-item" title="Figma"><SiFigma /></div>
                </div>
              </div>

              {/* 3. Kutu: Hız ve Performans */}
              <div className="glass-box reveal-item bento-speed-box">
                <div className="bento-icon"><FaRocket /></div>
                <h3 className="bento-title-small">Işık Hızında</h3>
                <p className="bento-text-small">Sıfır gecikme, kusursuz optimizasyon.</p>
              </div>

              {/* 4. Kutu: Tasarım Vizyonu (Büyük Kutu) */}
              <div className="glass-box reveal-item bento-span-2 bento-design-box">
                <div className="bento-icon"><FaPaintBrush /></div>
                <h3 className="bento-title">Piksel Mükemmelliği</h3>
                <p className="bento-text">Her bir boşluk, her bir renk tonu özenle seçilir. Kullanıcıyı yormayan, Apple sadeliğinde arayüzler tasarlıyoruz.</p>
              </div>
            </div>
          </div>

          {/* --- SÜREÇ / NASIL ÇALIŞIYORUZ --- */}
          <ProcessSection />

          {/* --- PROJELER --- */}
          <div className="section-padding section-border-top">
            <div className="bg-watermark">03 // ESERLER</div>
            <div className="reveal-item" style={{ marginBottom: '80px' }}>
              <motion.h2 className="section-title" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>Seçilmiş <span className="gradient-text-home">Projeler</span></motion.h2>
            </div>

            <div className="projects-container">
              {/* EMR CORE PROJESİ */}
              <div className="reveal-item project-row">
                <a href="https://www.emrcore.com.tr" target="_blank" rel="noopener noreferrer" className="project-borderless project-borderless-xl">
                  <div className="mockup-group asymmetric-group">
                    <SmartImage src={emr2} alt="EMR 2" className="mockup-img secondary-img" objectFit="contain" />
                    <SmartImage src={emr1} alt="EMR 1" className="mockup-img primary-img" objectFit="contain" />
                  </div>
                </a>
                <div className="project-info">
                  <motion.h3 className="project-title text-xl gradient-text-home" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>EMR CORE</motion.h3>
                  <p className="project-desc text-lg">Modern Adisyon Sistemleri</p>
                  <a href="https://www.emrcore.com.tr" target="_blank" rel="noopener noreferrer" className="project-link">CANLI SİTEYE GİT ↗</a>
                </div>
              </div>

{/* KAMAN TAKSİ PROJESİ */}
              <div className="reveal-item project-row project-row-reverse">
                <div className="project-info">
                  <motion.h3 className="project-title text-xl gradient-text-home" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>Kaman Taksi</motion.h3>
                  <p className="project-desc text-lg">Bölgesel Ulaşım Çözümü</p>
                  <a href="https://kamantaksi.com" target="_blank" rel="noopener noreferrer" className="project-link">SİTEYE GİT ↗</a>
                </div>
                <a href="https://kamantaksi.com" target="_blank" rel="noopener noreferrer" className="project-borderless project-borderless-xl">
                  <div className="mockup-group asymmetric-group">
                    <SmartImage src={kaman2} alt="Kaman 2" className="mockup-img secondary-img" objectFit="contain" />
                    <SmartImage src={kaman1} alt="Kaman 1" className="mockup-img primary-img" objectFit="contain" />
                  </div>
                </a>
              </div>
              
            </div> {/* projects-container KAPANIŞI */}
          </div> {/* PROJELER BÖLÜMÜ KAPANIŞI (HATA BURADAYDI, EKLENDİ) */}

          {/* --- CTA --- */}
          <div className="section-padding reveal-item text-center cta-section">
            <motion.h2 className="cta-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>Fikrinizi koda dökme <br/><span className="gradient-text-home">zamanı gelmedi mi?</span></motion.h2>
            <motion.button className="cta-button" onClick={() => navigate('/iletisim')} whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>BİR PROJE BAŞLAT</motion.button>
          </div>

          {/* --- YENİ EKLENEN FOOTER BİLEŞENİ --- */}
          <Footer variant="cyber" />

        </div> {/* content-layer KAPANIŞI */}
      </div> {/* cyber-space-bg KAPANIŞI */}
    </>
  );
};

export default Home;