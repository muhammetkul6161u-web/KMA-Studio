import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLaptopCode, FaTags, FaInbox, FaSignOutAlt, FaRocket, FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../../components/ParticleBackground';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('dizvyn_admin_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/portfolio', icon: <FaLaptopCode />, label: 'Portfolyo Yönetimi' },
    { path: '/admin/pricing', icon: <FaTags />, label: 'Fiyat Paketleri' },
    { path: '/admin/inbox', icon: <FaInbox />, label: 'Gelen Kutusu' }
  ];

  return (
    <div className="flex h-screen bg-[#020503] text-white overflow-hidden font-sans selection:bg-[#00FF9D]/30">
      <ParticleBackground variant="admin" />
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 157, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.15) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }}></div>

      {/* Mobile Toggle Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 h-full bg-black/85 backdrop-blur-2xl border-r border-white/5 flex flex-col shadow-[10px_0_40px_rgba(0,0,0,0.8)] transition-transform duration-300 md:relative md:translate-x-0 md:bg-black/60 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsSidebarOpen(false)}>
            <motion.div 
              className="w-10 h-10 rounded-lg bg-[#00FF9D]/10 flex items-center justify-center border border-[#00FF9D]/30 shadow-[0_0_15px_rgba(0,255,157,0.2)] group-hover:bg-[#00FF9D] transition-all"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <FaRocket className="text-[#00FF9D] group-hover:text-black transition-all" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FF9D]">DZVN</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse"></span>
                <p className="text-[10px] text-[#00FF9D] tracking-[0.2em] font-mono">CORE_TERMINAL</p>
              </div>
            </div>
          </Link>
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Kapat"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <nav className="flex-1 py-10 px-4 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20 shadow-[inset_0_0_20px_rgba(0,255,157,0.05)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-[#00FF9D]' : ''}`}>{item.icon}</span>
                <span className="font-semibold tracking-wide text-sm">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-1/2 bg-[#00FF9D] rounded-full shadow-[0_0_10px_#00FF9D]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="mb-4 px-4 py-2 bg-[#00FF9D]/5 border border-[#00FF9D]/10 rounded-lg flex items-center gap-3">
            <FaShieldAlt className="text-[#00FF9D] text-xs" />
            <span className="text-[10px] text-gray-400 font-mono">STATUS: ENCRYPTED</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-3 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold text-sm"
          >
            <FaSignOutAlt />
            <span>Sistemden Çıkış</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 h-full overflow-y-auto custom-scrollbar">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between p-5 bg-black/40 border-b border-white/5 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-300 hover:text-[#00FF9D] transition-colors"
            aria-label="Menü"
          >
            <FaBars className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse"></span>
            <span className="text-sm font-bold tracking-widest text-[#00FF9D] font-mono">DZVN ADMIN</span>
          </div>
        </div>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 157, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 157, 0.3); }
      `}} />
    </div>
  );
};

export default AdminLayout;
