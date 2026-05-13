import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserSecret } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'kma2026') {
      localStorage.setItem('dizvyn_admin_auth', 'true');
      navigate('/admin/portfolio');
    } else {
      alert('Geçersiz kimlik bilgileri.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020503] flex items-center justify-center overflow-hidden">
      <ParticleBackground variant="admin" />
      
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 w-full max-w-md p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,255,157,0.1)]">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#00FF9D]/10 flex items-center justify-center mb-4 border border-[#00FF9D]/30 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <FaUserSecret className="text-3xl text-[#00FF9D]" />
          </div>
          <h2 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FF9D]">DIZVYN ADMIN</h2>
          <p className="text-gray-400 text-sm tracking-widest mt-2">SECURE TERMINAL</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Kullanıcı Adı" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF9D]/50 focus:shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all"
              required
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Parola" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF9D]/50 focus:shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full mt-4 bg-[#00FF9D]/10 hover:bg-[#00FF9D] text-[#00FF9D] hover:text-black border border-[#00FF9D]/50 font-bold py-3 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,255,157,0.1)] hover:shadow-[0_0_25px_rgba(0,255,157,0.4)] flex items-center justify-center gap-2"
          >
            <FaLock /> SİSTEME GİRİŞ YAP
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
