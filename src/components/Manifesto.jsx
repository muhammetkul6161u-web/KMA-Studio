import React from 'react';
import { motion } from 'framer-motion';

const Manifesto = () => {
  return (
    <section className="manifesto-section">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-centered-title"
      >
        Çalışma <span style={{color: '#C18C5D', fontStyle: 'italic'}}>Felsefem.</span>
      </motion.h2>

      <div className="manifesto-list">
        
        {/* 1. Kural */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          className="manifesto-rect-card" 
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.1))' }}
        >
          <div className="manifesto-icon-wrapper" style={{ flexShrink: 0 }}>
             <svg style={{ width: 40, color: '#C18C5D' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <div>
            <h3 className="manifesto-card-title">Zamanın Gerçekliği</h3>
            <p className="manifesto-card-desc">
              Bir yandan üniversite eğitimime devam ederken diğer yandan projeler geliştiriyorum. Bu yüzden tutamayacağım süslü vaatler vermem; gerçekçi teslim tarihleri belirler ve sözümü tutarım.
            </p>
          </div>
        </motion.div>

        {/* 2. Kural */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="manifesto-rect-card" 
          style={{ background: 'linear-gradient(to right, rgba(193, 140, 93, 0.15), rgba(255,255,255,0.2))' }}
        >
          <div className="manifesto-icon-wrapper" style={{ flexShrink: 0 }}>
            <svg style={{ width: 40, color: '#C18C5D' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <h3 className="manifesto-card-title">Önce Benim İçime Sinmeli</h3>
            <p className="manifesto-card-desc">
              Sadece 'işi teslim edip parayı almak' için kod yazmam. Yaptığım tasarım ve yazdığım sistem önce benim estetik ve teknik standartlarımdan geçmeli. Ben beğenmiyorsam, yayına almam.
            </p>
          </div>
        </motion.div>

        {/* 3. Kural */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.5 }}
          className="manifesto-rect-card" 
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.1))' }}
        >
          <div className="manifesto-icon-wrapper" style={{ flexShrink: 0 }}>
             <svg style={{ width: 40, color: '#C18C5D' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
             </svg>
          </div>
          <div>
            <h3 className="manifesto-card-title">Eleştiriye Açığım</h3>
            <p className="manifesto-card-desc">
              Ego ile değil, empati ile çalışırım. Projenin daha iyi olması için gelen her yapıcı eleştiriyi bir gelişim fırsatı olarak görür, esneklikle kodlarıma ve tasarımlara yansıtırım.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Manifesto;