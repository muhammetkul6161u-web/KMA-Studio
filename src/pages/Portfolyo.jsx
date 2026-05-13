import React, { useRef, useState } from 'react';
import SEO from '../components/SEO';
import SmartImage from '../components/SmartImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Footer from '../components/Footer';
import './Portfolyo.css';

// Fallback images
import bluury1 from '../assets/bluury1.webp';
import bluury2 from '../assets/bluury2.webp';
import emr1 from '../assets/emr1.webp';
import emr2 from '../assets/emr2.webp';
import kafe1 from '../assets/kafe1.webp';
import kafe2 from '../assets/kafe2.webp';
import kaman1 from '../assets/kaman1.webp';
import kaman2 from '../assets/kaman2.webp';
import topluluk1 from '../assets/topluluk1.webp';
import topluluk2 from '../assets/topluluk2.webp';

const staticProjects = [
  {
    id: 1,
    title: 'Bluury',
    subtitle: 'Fotoğraf & Video Çekim Ajansı',
    desc: 'Profesyonel Düğün, Reklam ve Sanatsal Çekim Odaklı Post-Prodüksiyon Çözümleri.',
    techs: ['React', 'Framer Motion', 'UI/UX Design'],
    images: [bluury1, bluury2],
    color: '#BC13FE',
  },
  {
    id: 2,
    title: 'EMR CORE',
    subtitle: 'Modern Adisyon Sistemleri',
    desc: 'Kafe ve restoranlar için özel geliştirilmiş bulut tabanlı modern yönetim altyapısı.',
    techs: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    link: 'https://www.emrcore.com.tr',
    images: [emr1, emr2],
    color: '#00f3ff',
  },
  {
    id: 3,
    title: 'Kaman Taksi',
    subtitle: 'Bölgesel Ulaşım Çözümü',
    desc: 'Kaman bölgesi için hızlı, güvenilir ve modern taksi çağırma platformu.',
    techs: ['React', 'Firebase', 'Mobile First UI'],
    link: 'https://www.kamantaksi.com',
    images: [kaman1, kaman2],
    color: '#FFB300',
  },
  {
    id: 4,
    title: 'YBS Topluluk',
    subtitle: 'Üniversite Topluluğu Platformu',
    desc: 'KTÜ Yönetim Bilişim Sistemleri topluluğunun resmi web sitesi. Etkinlikler, duyurular ve topluluk yönetimi.',
    techs: ['React', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://www.ybstopluluk.com',
    images: [topluluk1, topluluk2],
    color: '#00FF9D',
  },
  {
    id: 5,
    title: 'Butik Kafe Konsepti',
    subtitle: 'Kahve & Mekan Deneyimi',
    desc: 'Butik kahveciler için özel olarak tasarlanmış, sıcak ve davetkar e-menü entegreli web sitesi.',
    techs: ['React', 'CSS3', 'UX Design'],
    images: [kafe1, kafe2],
    color: '#D4C0A8',
  }
];

const ParallaxProject = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const imgY1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      className={`portfolio-project ${isReversed ? 'reversed' : ''}`}
      style={{ scale, opacity }}
    >
      {/* Image Side - Asymmetric Grid */}
      <motion.div className="portfolio-img-container">
        <div className="portfolio-asymmetric-grid">
          <div className="portfolio-glow" style={{ background: `radial-gradient(circle, ${project.color || '#00f3ff'}15 0%, transparent 60%)` }}></div>
          <motion.div style={{ y: imgY1 }} className="portfolio-img portfolio-img-primary">
            <SmartImage src={project.images?.[0]} alt={`${project.title} 1`} objectFit="contain" hoverEffect="zoom" themeColor={project.color} />
          </motion.div>
          <motion.div style={{ y: imgY2 }} className="portfolio-img portfolio-img-secondary">
            <SmartImage src={project.images?.[1]} alt={`${project.title} 2`} objectFit="contain" hoverEffect="zoom" themeColor={project.color} />
          </motion.div>
        </div>
      </motion.div>

      {/* Info Side */}
      <motion.div className="portfolio-info" style={{ y }}>
        <motion.span
          className="portfolio-project-num"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ color: project.color }}
        >
          0{index + 1}
        </motion.span>
        <motion.h2
          className="portfolio-project-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {project.title}
          <span className="portfolio-project-subtitle">{project.subtitle}</span>
        </motion.h2>
        <motion.p
          className="portfolio-project-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {project.desc}
        </motion.p>
        <motion.div
          className="portfolio-techs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.techs && project.techs.map((tech, i) => (
            <span key={i} className="portfolio-tech-tag" style={{ borderColor: `${project.color || '#00f3ff'}40`, color: project.color || '#00f3ff' }}>
              {tech}
            </span>
          ))}
        </motion.div>
        
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-project-link"
            style={{ '--link-color': project.color }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ x: 8 }}
          >
            PROJEYİ İNCELE ↗
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

const Portfolyo = () => {
  return (
    <div className="portfolyo-wrapper">
      <SEO 
        title="Portfolyo" 
        description="Sanat ve kodun kesişimi. Dizvyn'ın web tasarım, yazılım projeleri ve görsel manifestosu." 
        url="/portfolyo" 
      />
      <ParticleBackground variant="lens" />
      
      <div className="portfolyo-geometric-bg"></div>
      <div className="portfolyo-lens-flare-1"></div>
      <div className="portfolyo-lens-flare-2"></div>

      {/* HERO */}
      <section className="portfolyo-hero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="portfolyo-hero-content"
        >
          <span className="portfolyo-label">[ VİZYON / LENS ]</span>
          <h1 className="portfolyo-title">
            Görsel<br/>
            <span className="gradient-text-portfolio">Manifesto.</span>
          </h1>
          <p className="portfolyo-subtitle">
            Sanat ve kodun kesişimi. Her bir proje, kendi içinde benzersiz bir karakter taşıyor.
          </p>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section className="portfolyo-projects" aria-label="Dizvyn Projeleri">
        {staticProjects.map((project, i) => (
          <ParallaxProject key={project.id} project={project} index={i} />
        ))}
      </section>

      {/* CTA */}
      <section className="portfolyo-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="portfolyo-cta-content"
        >
          <h2 className="portfolyo-cta-title">
            Sıradaki eser<br/>
            <span className="gradient-text-portfolio">sizin olabilir.</span>
          </h2>
          <motion.a
            href="https://wa.me/905359460122"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolyo-cta-btn"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            BİR PROJE BAŞLAT
          </motion.a>
        </motion.div>
      </section>

      <Footer variant="lens" />
    </div>
  );
};

export default Portfolyo;