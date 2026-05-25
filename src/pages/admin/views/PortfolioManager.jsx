import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';

const PortfolioManager = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'EMR CORE', desc: 'Modern Adisyon Sistemleri', status: 'Active' },
    { id: 2, title: 'Kaman Taksi', desc: 'Bölgesel Ulaşım Çözümü', status: 'Active' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentProject({ title: '', desc: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(currentProject.id) {
      setProjects(projects.map(p => p.id === currentProject.id ? currentProject : p));
    } else {
      setProjects([...projects, { ...currentProject, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Portfolyo Yönetimi</h2>
          <p className="text-gray-400">Web sitenizde sergilenen seçkin projeleri buradan yönetin.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#00FF9D]/10 hover:bg-[#00FF9D] text-[#00FF9D] hover:text-black border border-[#00FF9D]/30 px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(0,255,157,0.1)] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] font-semibold"
        >
          <FaPlus /> Yeni Ekle
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black/40 border-b border-white/5">
                <th className="p-5 font-semibold text-gray-300">Proje Adı</th>
                <th className="p-5 font-semibold text-gray-300">Açıklama</th>
                <th className="p-5 font-semibold text-gray-300">Durum</th>
                <th className="p-5 font-semibold text-gray-300 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-5 font-bold text-white">{project.title}</td>
                  <td className="p-5 text-gray-400">{project.desc}</td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] text-xs font-bold tracking-wider border border-[#00FF9D]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]"></span>
                      {project.status ? project.status.toUpperCase() : 'AKTİF'}
                    </span>
                  </td>
                  <td className="p-5 text-right flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(project)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#050A07] border border-[#00FF9D]/30 p-8 rounded-2xl w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-bold text-white mb-6">
              {currentProject.id ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
            </h3>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Proje Adı</label>
                <input 
                  type="text" 
                  value={currentProject.title} 
                  onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF9D]/50 focus:ring-1 focus:ring-[#00FF9D]/50 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Açıklama</label>
                <input 
                  type="text" 
                  value={currentProject.desc} 
                  onChange={(e) => setCurrentProject({...currentProject, desc: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF9D]/50 focus:ring-1 focus:ring-[#00FF9D]/50 transition-all"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white transition-colors">
                  İptal
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#00FF9D] text-black font-bold hover:bg-[#00cc7e] shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
