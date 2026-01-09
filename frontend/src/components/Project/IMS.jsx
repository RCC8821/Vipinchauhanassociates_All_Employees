import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, ExternalLink, Mail, Lock, Globe, Sparkles } from 'lucide-react';

const IMS = () => {
  const [sheets, setSheets] = useState([
    {
      id: 1,
      name: 'IMS Scope',
      type: 'IMS Scope',
      viewUrl: 'https://docs.google.com/spreadsheets/d/1HeenGXwOwMmgr2up7sSzQtDkWEsXsmgIjq7QPZh8MW4/edit?gid=1495304822#gid=1495304822',
      url: 'https://script.google.com/macros/s/AKfycbx-ay9-DunWgtORlPe4Kzh0QSpgFSTKvGtwjmDqEN4/dev',
      email: '*******',
      password: '*********'
    },
    {
      id: 2,
      name: 'Rajeev Abbott',
      type: 'Rajeev Abbott',
      viewUrl: 'https://docs.google.com/spreadsheets/d/1fSK9suXKI5gai4Vl43gDPyLnyZzg_FENtiUe0DDcGQ8/edit?gid=0#gid=0',
      url: 'https://script.google.com/macros/s/AKfycbx-ay9-DunWgtORlPe4Kzh0QSpgFSTKvGtwjmDqEN4/dev',
      email: '*******',
      password: '*********'
    },
    {
      id: 3,
      name: 'Dubey ji IMS',
      type: 'Dubey ji IMS',
      viewUrl: 'https://docs.google.com/spreadsheets/d/1veCXOTOpp089UzYQ_EiDI8Ag5ZFja-U1BlROEdRHZPc/edit?usp=drive_link',
      url: 'https://script.google.com/macros/s/AKfycbx-ay9-DunWgtORlPe4Kzh0QSpgFSTKvGtwjmDqEN4/dev',
      email: '*******',
      password: '*********'
    },
    {
      id: 4,
      name: 'Dr. Shirkant Jain',
      type: 'Dr. Shirkant Jain',
      viewUrl: 'https://docs.google.com/spreadsheets/d/1fLhnNaBH-yNLPrxDiWplrLI3Dt9zg294sZFYBO4SOnw/edit?usp=drive_link',
      url: 'https://script.google.com/macros/s/AKfycbx-ay9-DunWgtORlPe4Kzh0QSpgFSTKvGtwjmDqEN4/dev',
      email: '*******',
      password: '*********'
    },
  ]);

  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: 'IMS Scope',
    viewUrl: '',
    url: '',
    email: '',
    password: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const filtered = sheets.filter(sheet =>
    sheet.name.toLowerCase().includes(search.toLowerCase()) ||
    sheet.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.viewUrl) {
      alert('Name aur View Sheet URL zaroori hai!');
      return;
    }

    if (editingId) {
      setSheets(sheets.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
      setEditingId(null);
    } else {
      setSheets([...sheets, { ...formData, id: Date.now() }]);
    }

    setFormData({ name: '', type: 'IMS Scope', viewUrl: '', url: '', email: '', password: '' });
    setShowForm(false);
  };

  const handleEdit = (sheet) => {
    setFormData(sheet);
    setEditingId(sheet.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Kya aap ise delete karna chahte hain?")) {
      setSheets(sheets.filter(s => s.id !== id));
    }
  };

  const getTypeStyles = (type) => {
    const styles = {
      'IMS Scope': 'from-teal-50 to-cyan-100 text-teal-700 bg-teal-50 border border-teal-200',
      'Rajeev Abbott': 'from-indigo-50 to-blue-100 text-indigo-700 bg-indigo-50 border border-indigo-200',
      'Dubey ji IMS': 'from-emerald-50 to-green-100 text-emerald-700 bg-emerald-50 border border-emerald-200',
      'Dr. Shirkant Jain': 'from-purple-50 to-pink-100 text-purple-700 bg-purple-50 border border-purple-200',
      default: 'from-blue-50 to-blue-100 text-blue-700 bg-blue-50 border border-blue-200'
    };
    return styles[type] || styles.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-8 font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-lg">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">IMS Manager</h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base">All your inventory management sheets in one beautiful place ✨</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setEditingId(null);
                setFormData({ name: '', type: 'IMS Scope', viewUrl: '', url: '', email: '', password: '' });
              }
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-2xl active:scale-95 font-bold"
          >
            <Plus size={20} /> Add New Sheet
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all outline-none text-slate-900 placeholder-slate-500 shadow-md"
          />
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {editingId ? 'Update Details' : 'Add New Entry'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" />
              <input type="text" placeholder="Type/Category" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="input-field" />
              <input type="url" placeholder="View Sheet URL" value={formData.viewUrl} onChange={e => setFormData({...formData, viewUrl: e.target.value})} className="input-field" />
              <input type="url" placeholder="Script URL (Optional)" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="input-field" />
              <input type="text" placeholder="Email (Optional)" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input-field" />
              <input type="text" placeholder="Password (Optional)" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="input-field" />
              <div className="flex gap-3 col-span-full lg:col-span-3">
                <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-lg font-bold py-3 hover:from-green-500 hover:to-emerald-700 transition shadow-lg">
                  Save
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid with Awesome Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(sheet => (
            <div
              key={sheet.id}
              className="group bg-white rounded-2xl border border-blue-100 p-6 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 relative overflow-hidden hover:-translate-y-2"
            >
              {/* Beautiful Gradient Overlay on Hover */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-200/30 to-blue-300/20 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg ${getTypeStyles(sheet.type)}`}>
                    {sheet.type}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(sheet)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(sheet.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-5 truncate">{sheet.name}</h3>

                {/* Email & Password Always Visible */}
                <div className="space-y-2.5 mb-6">
                  {sheet.email && (
                    <div className="flex items-center gap-2 text-xs text-slate-700 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                      <Mail size={13} className="text-blue-500 flex-shrink-0" />
                      <span className="truncate flex-1 font-medium">{sheet.email}</span>
                    </div>
                  )}
                  {sheet.password && (
                    <div className="flex items-center gap-2 text-xs text-slate-700 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                      <Lock size={13} className="text-blue-500 flex-shrink-0" />
                      <span className="font-mono text-slate-900 font-semibold">{sheet.password}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={sheet.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 text-xs font-bold py-3 rounded-xl hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all border border-blue-300 hover:border-blue-500"
                  >
                    <ExternalLink size={15} /> View Sheet
                  </a>

                  {sheet.url ? (
                    <a
                      href={sheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl hover:from-slate-400 hover:to-slate-500 hover:text-white transition-all border border-slate-300 hover:border-slate-500"
                    >
                      <Globe size={15} /> Script URL
                    </a>
                  ) : (
                    <button disabled className="flex items-center justify-center gap-2 bg-slate-100 text-slate-400 text-xs font-medium py-3 rounded-xl border border-slate-200 cursor-not-allowed opacity-60">
                      <Globe size={15} /> No URL
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-blue-200">
            <p className="text-slate-500 font-medium text-lg">No sheets found matching your search.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-field {
          @apply w-full px-4 py-3 bg-slate-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all text-sm text-slate-900 placeholder-slate-500;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default IMS;