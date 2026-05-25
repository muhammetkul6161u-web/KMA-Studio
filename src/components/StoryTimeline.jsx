import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const storyData = [
  {
    id: '01',
    title: 'Sürükle-Bırak Hüsranı',
    desc: 'Serüvenim HTML ve CSS ile başladı. Ardından WordPress şablonlarına yöneldim ama ortaya çıkan o sıradan, klişe siteler bana göre değildi. Tasarımlarım içime sinmiyordu, çünkü koda tam anlamıyla hükmedemiyordum.',
    bgImage: 'linear-gradient(135deg, #2C241B, #4A3B2D)' // İleride buraya resim linki koyabilirsin
  },
  {
    id: '02',
    title: 'Kampüs ve Doğuş',
    desc: 'Ümitsizliğe kapıldığım dönemde, üniversitede omuz omuza verdiğim dostlarım devreye girdi. EMR CORE markasını kuran yakın arkadaşımın bana kattığı vizyonla sil baştan başladım. Sınırlarımı zorlamaya karar verdim.',
    bgImage: 'linear-gradient(135deg, #1A202C, #2D3748)'
  },
  {
    id: '03',
    title: 'React & Vite Devrimi',
    desc: 'Modern webin kalbi olan React ve Vite mimarisine adım attım. Bugün projelerimi ego ile değil, empati ve yüksek performans odağıyla, piksel piksel işliyorum. Hedefim her zaman daha iyisini üretmek.',
    bgImage: 'linear-gradient(135deg, #4A3B2D, #C18C5D)'
  }
];

const StoryTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storyData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="story-section">
      <h2 className="section-centered-title">Kodlara Giden <span style={{color: '#C18C5D', fontStyle: 'italic'}}>Yolculuğum.</span></h2>
      
      <div className="story-card-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="story-bg-image"
            style={{ background: storyData[currentIndex].bgImage }}
          ></motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + "content"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="story-content"
          >
            <span className="story-id">{storyData[currentIndex].id}</span>
            <h3 className="story-title">{storyData[currentIndex].title}</h3>
            <p className="story-desc">{storyData[currentIndex].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StoryTimeline;