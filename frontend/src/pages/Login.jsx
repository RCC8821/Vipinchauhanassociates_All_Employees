



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [appInitializing, setAppInitializing] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [loadingText, setLoadingText] = useState("Fetching Staff Records...");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // 5-Second Professional Loading with Text Changes
    const textSequence = [
      { time: 0, text: "Connecting to Secure Server..." },
      { time: 1500, text: "Fetching ALL Staff Profiles..." },
      { time: 3000, text: "Verifying System Integrity..." },
      { time: 4200, text: "Ready to Authenticate." }
    ];

    textSequence.forEach(item => {
      setTimeout(() => setLoadingText(item.text), item.time);
    });

    const timer = setTimeout(() => {
      setAppInitializing(false);
      setTimeout(() => setShowForm(true), 150);
    }, 5500); // 5.5 seconds for a smoother transition

    dispatch(clearError());
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) return;
    const result = await dispatch(loginUser({ email: formData.email.trim(), password: formData.password }));
    if (loginUser.fulfilled.match(result)) navigate('/dashboard');
  };

  // --- Professional Light UI Components ---

  const LightSplash = () => (
    <div className="fixed inset-0 z-[100] bg-blue-300 flex flex-col items-center justify-center">
      {/* Centered Circle Loader */}
      <div className="relative mb-12">
        <div className="w-24 h-24 border-[2px] border-slate-100 border-t-indigo-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/rcc-logo.png" alt="RCC" className="w-10 h-10 opacity-70 animate-pulse" />
        </div>
      </div>

      {/* Animated Text Container */}
      <div className="flex flex-col items-center px-6 text-center">
        <div className="h-6 mb-2 overflow-hidden">
          <p key={loadingText} className="text-slate-600 text-sm font-bold tracking-tight animate-slide-up">
            {loadingText}
          </p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex space-x-2 mt-4">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
        </div>

        {/* Subtle background text */}
        <span className="mt-8 text-[10px] text-white uppercase tracking-[0.4em] font-medium">
          RCC Systems • All Staff Portal
        </span>
      </div>
    </div>
  );

  if (appInitializing) return <LightSplash />;

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-50/80 rounded-full blur-[100px]" />
      </div>

      <div className={`w-full max-w-[420px] z-10 transition-all duration-1000 transform ${
        showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="bg-blue-250 backdrop-blur-3xl border border-white/50 rounded-[3rem] p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)]">
          
          <div className="text-center mb-10">
            <div className="inline-flex mb-6 p-4 bg-white shadow-sm border border-slate-50 rounded-2xl">
               <img src="/rcc-logo.png" alt="RCC" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">Vipinchauhanassociates</h1>
            <p className="text-orange-300 mt-3 font-medium text-sm">Secure Portal Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Official Email"
                  className="w-full px-6 py-4 border border-transparent rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-100 transition-all duration-300"
                  required
                />
              </div>

              <div className="group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-6 py-4  border border-transparent rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-100 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-500 text-[13px] font-bold py-4 px-5 rounded-2xl flex items-center border border-rose-100 animate-shake">
                <span className="mr-2">✕</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.email.trim() || !formData.password.trim()}
              className="w-full py-4.5 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95 disabled:bg-slate-300 disabled:shadow-none"
            >
              {isLoading ? "Validating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button className="text-slate-800 text-xs font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors">
              Request Access
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .py-4.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
      `}</style>
    </div>
  );
};

export default Login;