
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Link2,
  FileSpreadsheet,
  Code,
  ExternalLink,
  Copy,
  CheckCircle,
  Award,
  BarChart3,
  Activity,
  Settings,
  Key,
  Star,
  Lock,
} from 'lucide-react';

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [copied, setCopied] = useState(null);
  const [activeTab, setActiveTab] = useState('links');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const scoringData = {
    overallScore: 85,
    metrics: [
      { name: 'Productivity', score: 90, trend: 'up' },
      { name: 'Quality', score: 88, trend: 'up' },
      { name: 'Teamwork', score: 82, trend: 'stable' },
      { name: 'Communication', score: 80, trend: 'up' },
      { name: 'Innovation', score: 75, trend: 'down' },
    ],
    badges: ['Top Performer', 'Quick Learner', 'Team Player', 'Problem Solver'],
    rank: 'Top 15%',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-pink-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-1/3 h-1/3 bg-blue-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Rotating orbs */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" style={{
          animation: 'spin 20s linear infinite'
        }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" style={{
          animation: 'spin 25s linear infinite reverse'
        }}></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-10 border border-white/60 hover:shadow-purple-200/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="relative group/photo transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse group-hover/photo:opacity-60 transition-opacity"></div>
              <img
                src={
                  user.photo?.includes('drive.google.com/file/d/')
                    ? `https://drive.google.com/thumbnail?id=${user.photo.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1]}&sz=w1000`
                    : user.photo?.includes('lh3.googleusercontent.com')
                    ? user.photo.replace(/=s\d+-c/, '=s1000-c')
                    : user.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&size=400&background=10b981&color=fff&bold=true'
                }
                alt={user.name || 'Profile Photo'}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover border-4 border-white shadow-xl transition-all duration-300 group-hover/photo:shadow-2xl group-hover/photo:shadow-purple-300/50 group-hover/photo:scale-105"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&size=400&background=ef4444&color=fff&bold=true';
                  e.target.onerror = null;
                }}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-semibold text-purple-700 mb-4 border border-purple-200 hover:scale-105 transition-all">
                <Shield size={16} className="text-purple-600" />
                ID: {user.employeeId || 'N/A'}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                {user.name.trim()}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <span className="px-4 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg font-semibold text-sm border border-purple-200 hover:scale-105 transition-all">
                  {user.role || 'N/A'}
                </span>
                <span className="px-4 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg font-semibold text-sm border border-blue-200 hover:scale-105 transition-all">
                  {user.department || 'N/A'}
                </span>
              </div>
              <p className="text-slate-600 text-sm  mb-8 max-w-xl mx-auto md:mx-0">
                {user.bio || 'No bio available'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 hover:scale-105 transition-all">
                  <Mail size={18} className="text-purple-600" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-all">
                  <Phone size={18} className="text-pink-600" />
                  <span>{user.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-all">
                  <MapPin size={18} className="text-blue-600" />
                  <span>{user.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-all">
                  <Calendar size={18} className="text-fuchsia-600" />
                  <span>{user.joinDate || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <section className="mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/60 p-1 mb-8">
            <div className="flex flex-wrap gap-2 p-2 justify-center md:justify-start">
              <button
                onClick={() => setActiveTab('links')}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'links'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Link2 size={20} />
                Links
              </button>

              <button
                onClick={() => setActiveTab('scoring')}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'scoring'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <BarChart3 size={20} />
                Performance Scoring
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'activity'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Activity size={20} />
                Recent Activity
              </button>

              <button
                onClick={() => setActiveTab('credentials')}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'credentials'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Key size={20} />
                Credentials
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Settings size={20} />
                Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/60 p-8">
            {/* Links Tab */}
            {activeTab === 'links' && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Link2 size={28} className="text-purple-600" />
                  <h3 className="text-2xl font-bold text-slate-800">My Projects & Access Links</h3>
                </div>

                {user.projects?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {user.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-purple-300 hover:-translate-y-2 hover:rotate-1"
                      >
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-800 mb-5">{project.name}</h3>

                          <div className="space-y-4 text-sm">
                            {/* Sheet */}
                            {project.sheet_url && (
                              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl border border-purple-200 hover:border-purple-400 transition-all hover:-translate-x-1 hover:shadow-md group/item">
                                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
                                  <FileSpreadsheet size={22} />
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-slate-800 mb-1">Google Sheet</p>
                                  <a
                                    href={project.sheet_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-700 flex items-center gap-1.5 font-semibold"
                                  >
                                    Open Sheet <ExternalLink size={15} />
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Script */}
                            {project.script_url && (
                              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200 hover:border-blue-400 transition-all hover:-translate-x-1 hover:shadow-md group/item">
                                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
                                  <Code size={22} />
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-slate-800 mb-1">Apps Script</p>
                                  <a
                                    href={project.script_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 font-semibold"
                                  >
                                    Open Script <ExternalLink size={15} />
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Form */}
                            {project.form_url && (
                              <div className="flex items-center gap-3 bg-pink-50 p-4 rounded-xl border border-pink-200 hover:border-pink-400 transition-all hover:-translate-x-1 hover:shadow-md group/item">
                                <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
                                  <FileSpreadsheet size={22} />
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-slate-800 mb-1">Google Form</p>
                                  <a
                                    href={project.form_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 hover:text-pink-700 flex items-center gap-1.5 font-semibold"
                                  >
                                    Open Form <ExternalLink size={15} />
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Email */}
                            {project.email && (
                              <div className="flex items-center justify-between bg-amber-50 p-4 rounded-xl border border-amber-200 hover:border-amber-400 transition-all hover:-translate-x-1 hover:shadow-md group/item">
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
                                    <Mail size={22} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-bold text-slate-800 mb-1">Project Email</p>
                                    <span className="text-slate-700 text-sm truncate">{project.email}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(project.email, `email-${index}`)}
                                  className="text-slate-400 hover:text-purple-600 hover:scale-125 transition-all"
                                >
                                  {copied === `email-${index}` ? <CheckCircle size={20} className="text-green-500 animate-bounce" /> : <Copy size={20} />}
                                </button>
                              </div>
                            )}

                            {/* Password */}
                            {project.password && (
                              <div className="flex items-center justify-between bg-red-50 p-4 rounded-xl border border-red-200 hover:border-red-400 transition-all hover:-translate-x-1 hover:shadow-md group/item">
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
                                    <Lock size={22} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-bold text-slate-800 mb-1">Password</p>
                                    <span className="text-slate-700 text-sm font-mono">{project.password}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(project.password, `password-${index}`)}
                                  className="text-slate-400 hover:text-purple-600 hover:scale-125 transition-all"
                                >
                                  {copied === `password-${index}` ? <CheckCircle size={20} className="text-green-500 animate-bounce" /> : <Copy size={20} />}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-500 bg-slate-50/50 rounded-2xl border border-dashed border-purple-300">
                    No projects assigned yet.
                  </div>
                )}
              </div>
            )}

            {/* Performance Scoring Tab */}
            {activeTab === 'scoring' && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Award className="text-purple-600" size={28} />
                  <h3 className="text-2xl font-bold text-slate-800">Performance Scoring</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 text-center">
                      <div className="relative w-48 h-48 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-xl"></div>
                        <div className="relative w-full h-full rounded-full bg-white border-8 border-purple-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {scoringData.overallScore}
                            </div>
                            <div className="text-sm text-slate-600 mt-2">Overall Score</div>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full hover:scale-110 transition-all">
                        <Star size={16} className="text-purple-600" />
                        <span className="font-semibold text-purple-700">{scoringData.rank}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h4 className="text-lg font-bold text-slate-800 mb-6">Performance Metrics</h4>
                    <div className="space-y-6">
                      {scoringData.metrics.map((metric, index) => (
                        <div key={index} className="bg-white rounded-xl p-5 border border-slate-200 hover:border-purple-300 transition-all hover:-translate-y-1 hover:shadow-md">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-slate-800">{metric.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-slate-900">{metric.score}</span>
                              <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                metric.trend === 'up' ? 'bg-green-100 text-green-700' :
                                metric.trend === 'down' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {metric.trend === 'up' ? '↗ Improving' :
                                 metric.trend === 'down' ? '↘ Declining' : '→ Stable'}
                              </div>
                            </div>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${metric.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10">
                      <h4 className="text-lg font-bold text-slate-800 mb-4">Achievement Badges</h4>
                      <div className="flex flex-wrap gap-3">
                        {scoringData.badges.map((badge, index) => (
                          <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:scale-105 transition-all">
                            <Award size={16} className="text-blue-600" />
                            <span className="font-medium text-blue-700">{badge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs */}
            {activeTab === 'activity' && (
              <div className="text-center py-16 text-slate-500">Recent Activity coming soon...</div>
            )}

            {activeTab === 'credentials' && (
              <div className="text-center py-16 text-slate-500">Credentials section coming soon...</div>
            )}

            {activeTab === 'settings' && (
              <div className="text-center py-16 text-slate-500">Settings section coming soon...</div>
            )}
          </div>
        </section>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Profile;




// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Shield,
//   Link2,
//   FileSpreadsheet,
//   Code,
//   ExternalLink,
//   Copy,
//   CheckCircle,
//   Award,
//   BarChart3,
//   Activity,
//   Settings,
//   Key,
//   Star,
//   Lock,
//   LogOut,
// } from 'lucide-react';

// const Profile = () => {
//   const { user, isLoading } = useSelector((state) => state.auth);
//   const [copied, setCopied] = useState(null);
//   const [activeTab, setActiveTab] = useState('links');

//   const copyToClipboard = (text, key) => {
//     navigator.clipboard.writeText(text);
//     setCopied(key);
//     setTimeout(() => setCopied(null), 2000);
//   };

//   const scoringData = {
//     overallScore: 85,
//     metrics: [
//       { name: 'Productivity', score: 90, trend: 'up' },
//       { name: 'Quality', score: 88, trend: 'up' },
//       { name: 'Teamwork', score: 82, trend: 'stable' },
//       { name: 'Communication', score: 80, trend: 'up' },
//       { name: 'Innovation', score: 75, trend: 'down' },
//     ],
//     badges: ['Top Performer', 'Quick Learner', 'Team Player', 'Problem Solver'],
//     rank: 'Top 15%',
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center text-xl text-white">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center text-xl text-red-400">
//         Please login to view your profile
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 md:p-10 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

//         {/* Rotating orbs */}
//         <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" style={{
//           animation: 'spin 20s linear infinite'
//         }}></div>
//         <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" style={{
//           animation: 'spin 25s linear infinite reverse'
//         }}></div>

//         {/* Floating particles */}
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-purple-300/50 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         {/* Profile Header */}
//         <div className="relative group mb-8 sm:mb-12">
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
          
//           <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
//             <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center md:items-start">
//               <div className="relative group/photo transition-all duration-300 hover:-translate-y-2">
//                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 group-hover/photo:opacity-60 transition-opacity"></div>
//                 <img
//                   src={
//                     user.photo?.includes('drive.google.com/file/d/')
//                       ? `https://drive.google.com/thumbnail?id=${user.photo.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1]}&sz=w1000`
//                       : user.photo?.includes('lh3.googleusercontent.com')
//                       ? user.photo.replace(/=s\d+-c/, '=s1000-c')
//                       : user.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&size=400&background=10b981&color=fff&bold=true'
//                   }
//                   alt={user.name || 'Profile Photo'}
//                   className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 border-white/30 shadow-xl transition-all duration-300 group-hover/photo:shadow-2xl group-hover/photo:shadow-blue-500/50 group-hover/photo:scale-105"
//                   crossOrigin="anonymous"
//                   referrerPolicy="no-referrer"
//                   loading="lazy"
//                   onError={(e) => {
//                     e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&size=400&background=ef4444&color=fff&bold=true';
//                     e.target.onerror = null;
//                   }}
//                 />
//               </div>

//               <div className="flex-1 text-center md:text-left w-full">
//                 <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs sm:text-sm font-semibold text-blue-300 mb-3 sm:mb-4 border border-blue-400/30 hover:scale-105 transition-all">
//                   <Shield size={14} className="sm:w-4 sm:h-4 text-blue-400" />
//                   ID: {user.employeeId || 'N/A'}
//                 </div>
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent line-clamp-2">
//                   {user.name.trim()}
//                 </h1>
//                 <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
//                   <span className="px-3 sm:px-4 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-lg font-semibold text-xs sm:text-sm border border-blue-400/30 hover:scale-105 transition-all">
//                     {user.role || 'N/A'}
//                   </span>
//                   <span className="px-3 sm:px-4 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-lg font-semibold text-xs sm:text-sm border border-purple-400/30 hover:scale-105 transition-all">
//                     {user.department || 'N/A'}
//                   </span>
//                 </div>
//                 <p className="text-slate-300 text-xs sm:text-sm mb-4 sm:mb-6 max-w-xl mx-auto md:mx-0">
//                   {user.bio || 'No bio available'}
//                 </p>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
//                   <div className="flex items-center gap-2 hover:scale-105 transition-all">
//                     <Mail size={16} className="sm:w-5 sm:h-5 text-blue-400" />
//                     <span className="text-slate-300 truncate">{user.email}</span>
//                   </div>
//                   <div className="flex items-center gap-2 hover:scale-105 transition-all">
//                     <Phone size={16} className="sm:w-5 sm:h-5 text-cyan-400" />
//                     <span className="text-slate-300 truncate">{user.phone || 'N/A'}</span>
//                   </div>
//                   <div className="flex items-center gap-2 hover:scale-105 transition-all">
//                     <MapPin size={16} className="sm:w-5 sm:h-5 text-purple-400" />
//                     <span className="text-slate-300 truncate">{user.location || 'N/A'}</span>
//                   </div>
//                   <div className="flex items-center gap-2 hover:scale-105 transition-all">
//                     <Calendar size={16} className="sm:w-5 sm:h-5 text-pink-400" />
//                     <span className="text-slate-300 truncate">{user.joinDate || 'N/A'}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <section className="mb-8 sm:mb-12">
//           <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/10 p-1 mb-6 sm:mb-8 overflow-x-auto">
//             <div className="flex gap-1 sm:gap-2 p-2 min-w-min sm:min-w-0">
//               {[
//                 { id: 'links', label: 'Links', icon: Link2 },
//                 { id: 'scoring', label: 'Performance', icon: BarChart3 },
//                 { id: 'activity', label: 'Activity', icon: Activity },
//                 { id: 'credentials', label: 'Credentials', icon: Key },
//                 { id: 'settings', label: 'Settings', icon: Settings }
//               ].map(tab => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base transition-all duration-300 whitespace-nowrap ${
//                       activeTab === tab.id
//                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
//                         : 'text-slate-300 hover:bg-white/10'
//                     }`}
//                   >
//                     <Icon size={16} className="sm:w-5 sm:h-5" />
//                     <span className="hidden sm:inline">{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="relative group">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            
//             <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
//               {/* Links Tab */}
//               {activeTab === 'links' && (
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 sm:mb-8">
//                     <Link2 size={24} className="sm:w-7 sm:h-7 text-blue-400" />
//                     <h3 className="text-xl sm:text-2xl font-bold text-white">My Projects & Access Links</h3>
//                   </div>

//                   {user.projects?.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                       {user.projects.map((project, index) => (
//                         <div
//                           key={index}
//                           className="bg-slate-700/50 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:border-blue-500/50 group"
//                         >
//                           <div className="p-4 sm:p-6">
//                             <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5 group-hover:text-blue-300 transition-colors">{project.name}</h3>

//                             <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
//                               {project.sheet_url && (
//                                 <div className="flex items-center gap-3 bg-blue-500/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-400/30 hover:border-blue-400/60 transition-all hover:bg-blue-500/30 group/item">
//                                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
//                                     <FileSpreadsheet size={20} />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <p className="font-bold text-white mb-0.5">Google Sheet</p>
//                                     <a href={project.sheet_url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 flex items-center gap-1 font-semibold truncate">
//                                       Open <ExternalLink size={14} />
//                                     </a>
//                                   </div>
//                                 </div>
//                               )}

//                               {project.script_url && (
//                                 <div className="flex items-center gap-3 bg-cyan-500/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:bg-cyan-500/30 group/item">
//                                   <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
//                                     <Code size={20} />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <p className="font-bold text-white mb-0.5">Apps Script</p>
//                                     <a href={project.script_url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-semibold truncate">
//                                       Open <ExternalLink size={14} />
//                                     </a>
//                                   </div>
//                                 </div>
//                               )}

//                               {project.form_url && (
//                                 <div className="flex items-center gap-3 bg-purple-500/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-400/30 hover:border-purple-400/60 transition-all hover:bg-purple-500/30 group/item">
//                                   <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform">
//                                     <FileSpreadsheet size={20} />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <p className="font-bold text-white mb-0.5">Google Form</p>
//                                     <a href={project.form_url} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 flex items-center gap-1 font-semibold truncate">
//                                       Open <ExternalLink size={14} />
//                                     </a>
//                                   </div>
//                                 </div>
//                               )}

//                               {project.email && (
//                                 <div className="flex items-center justify-between bg-amber-500/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-amber-400/30 hover:border-amber-400/60 transition-all hover:bg-amber-500/30 group/item">
//                                   <div className="flex items-center gap-3 min-w-0">
//                                     <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform flex-shrink-0">
//                                       <Mail size={20} />
//                                     </div>
//                                     <div className="min-w-0">
//                                       <p className="font-bold text-white mb-0.5">Email</p>
//                                       <span className="text-slate-300 text-xs truncate">{project.email}</span>
//                                     </div>
//                                   </div>
//                                   <button onClick={() => copyToClipboard(project.email, `email-${index}`)} className="text-slate-400 hover:text-blue-400 hover:scale-125 transition-all flex-shrink-0 ml-2">
//                                     {copied === `email-${index}` ? <CheckCircle size={18} className="text-green-400 animate-bounce" /> : <Copy size={18} />}
//                                   </button>
//                                 </div>
//                               )}

//                               {project.password && (
//                                 <div className="flex items-center justify-between bg-red-500/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-400/30 hover:border-red-400/60 transition-all hover:bg-red-500/30 group/item">
//                                   <div className="flex items-center gap-3 min-w-0">
//                                     <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover/item:rotate-12 transition-transform flex-shrink-0">
//                                       <Lock size={20} />
//                                     </div>
//                                     <div className="min-w-0">
//                                       <p className="font-bold text-white mb-0.5">Password</p>
//                                       <span className="text-slate-400 text-xs font-mono truncate">{project.password}</span>
//                                     </div>
//                                   </div>
//                                   <button onClick={() => copyToClipboard(project.password, `password-${index}`)} className="text-slate-400 hover:text-blue-400 hover:scale-125 transition-all flex-shrink-0 ml-2">
//                                     {copied === `password-${index}` ? <CheckCircle size={18} className="text-green-400 animate-bounce" /> : <Copy size={18} />}
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12 sm:py-16 text-slate-400 bg-slate-700/30 rounded-xl sm:rounded-2xl border border-dashed border-slate-600">
//                       No projects assigned yet.
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Performance Scoring Tab */}
//               {activeTab === 'scoring' && (
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 sm:mb-8">
//                     <Award size={24} className="sm:w-7 sm:h-7 text-purple-400" />
//                     <h3 className="text-xl sm:text-2xl font-bold text-white">Performance Scoring</h3>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
//                     <div className="lg:col-span-1 hover:scale-105 transition-all duration-300">
//                       <div className="bg-slate-700/50 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-purple-400/50">
//                         <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6">
//                           <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-xl"></div>
//                           <div className="relative w-full h-full rounded-full bg-slate-800 border-8 border-purple-400/30 flex items-center justify-center">
//                             <div className="text-center">
//                               <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                                 {scoringData.overallScore}
//                               </div>
//                               <div className="text-xs sm:text-sm text-slate-300 mt-2">Overall Score</div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30 hover:scale-110 transition-all">
//                           <Star size={14} className="sm:w-4 sm:h-4 text-purple-300" />
//                           <span className="font-semibold text-purple-200 text-xs sm:text-sm">{scoringData.rank}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="lg:col-span-2">
//                       <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Performance Metrics</h4>
//                       <div className="space-y-4 sm:space-y-6">
//                         {scoringData.metrics.map((metric, index) => (
//                           <div key={index} className="bg-slate-700/50 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:border-blue-400/50 transition-all hover:-translate-y-1 hover:shadow-md">
//                             <div className="flex items-center justify-between mb-2 sm:mb-3">
//                               <span className="font-semibold text-white text-sm sm:text-base">{metric.name}</span>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xl sm:text-2xl font-bold text-white">{metric.score}</span>
//                                 <div className={`px-2 py-1 rounded text-xs font-semibold ${
//                                   metric.trend === 'up' ? 'bg-green-500/20 text-green-300' :
//                                   metric.trend === 'down' ? 'bg-red-500/20 text-red-300' :
//                                   'bg-blue-500/20 text-blue-300'
//                                 }`}>
//                                   {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
//                               <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${metric.score}%` }}></div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="mt-6 sm:mt-10">
//                         <h4 className="text-lg font-bold text-white mb-3 sm:mb-4">Achievement Badges</h4>
//                         <div className="flex flex-wrap gap-2 sm:gap-3">
//                           {scoringData.badges.map((badge, index) => (
//                             <div key={index} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500/20 rounded-lg sm:rounded-xl border border-blue-400/30 hover:scale-105 transition-all text-xs sm:text-sm">
//                               <Award size={14} className="sm:w-4 sm:h-4 text-blue-300" />
//                               <span className="font-medium text-blue-200">{badge}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Other tabs */}
//               {activeTab === 'activity' && (
//                 <div className="text-center py-12 sm:py-16 text-slate-400">Recent Activity coming soon...</div>
//               )}

//               {activeTab === 'credentials' && (
//                 <div className="text-center py-12 sm:py-16 text-slate-400">Credentials section coming soon...</div>
//               )}

//               {activeTab === 'settings' && (
//                 <div className="text-center py-12 sm:py-16 text-slate-400">Settings section coming soon...</div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) translateX(0); }
//           50% { transform: translateY(-20px) translateX(10px); }
//         }
//         .animate-float {
//           animation: float ease-in-out infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Profile;