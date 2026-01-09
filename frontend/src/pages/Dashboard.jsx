

// import React, { useState, useEffect } from 'react';
// import {
//   Lock, User, Menu, X, LogOut, Package, ChevronDown, DollarSign, Link, Search
// } from 'lucide-react';

// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../features/auth/authSlice';

// // All Components Import
// import FMS from '../../src/components/Project/FMS';
// import PMS from '../../src/components/Project/PMS';
// import IMS from '../../src/components/Project/IMS';
// import CheckList from '../../src/components/Project/CheckList';
// import HelpTicket from '../../src/components/Project/HelpTicket';
// import SalesSystem from '../../src/components/Project/SalesSystem';
// import Client from '../components/Client/Client';

// const Dashboard = () => {
//   const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(
//     localStorage.getItem('dashboard_mobileMenuOpen') === 'true' || true
//   );
  
//   const [openDropdown, setOpenDropdown] = useState('project');
  
//   const [selectedView, setSelectedView] = useState(
//     localStorage.getItem('dashboard_selectedView') || ''
//   );

//   // Global Search State
//   const [globalSearch, setGlobalSearch] = useState(
//     localStorage.getItem('dashboard_globalSearch') || ''
//   );

//   const { token, userType } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     localStorage.setItem('dashboard_mobileMenuOpen', isMobileMenuOpen);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (selectedView) {
//       localStorage.setItem('dashboard_selectedView', selectedView);
//     }
//   }, [selectedView]);

//   useEffect(() => {
//     localStorage.setItem('dashboard_globalSearch', globalSearch);
//   }, [globalSearch]);

//   const isAdmin = userType === 'admin';

//   const userDisplayName = {
//     admin:'Admin',
//     'Bharti':'Bharti',
//     'Govind Ram Nagar': 'Govind Ram Nagar',
//     'Ashok Sir': 'Ashok Sir',
//     'Ravindra Singh': 'Ravindra Singh'
//   }[userType] || 'User';

//   const userPermissions = {
//     admin: ['fms', 'pms', 'ims', 'checklist', 'helpticket', 'salessystem', 'billing', 'payment', 'client'],
//     'Ashok Sir': ['fms', 'pms', 'ims', 'checklist', 'helpticket', 'salessystem', 'billing', 'payment', 'client'],
//     'Aakash Chouhan': ['fms', 'pms', 'ims', 'checklist'],
//     'Ravindra Singh': ['helpticket', 'checklist', 'fms'],
//     'Govind Ram Nagar': ['fms', 'salessystem', 'ims'],
//     Bharti: ['client'],
//     default: ['']
//   };

//   const allowedModules = userPermissions[userType] || userPermissions.default;

//   const allModules = {
//     fms: { id: 'fms', name: 'FMS', component: FMS },
//     pms: { id: 'pms', name: 'PMS', component: PMS },
//     ims: { id: 'ims', name: 'IMS', component: IMS },
//     checklist: { id: 'checklist', name: 'CheckList', component: CheckList },
//     helpticket: { id: 'helpticket', name: 'Help Ticket', component: HelpTicket },
//     salessystem: { id: 'salessystem', name: 'Sales System', component: SalesSystem },
//     client: { id: 'client', name: 'Work', component: Client },
//   };

//   const resourceCategories = [
//     {
//       id: 'project',
//       name: 'Projects',
//       icon: Package,
//       gradient: 'from-blue-500 to-cyan-500',
//       subItems: ['fms', 'pms', 'ims', 'checklist', 'helpticket', 'salessystem']
//         .filter(id => allowedModules.includes(id))
//         .map(id => allModules[id])
//     },
//     {
//       id: 'billing',
//       name: 'Billing',
//       icon: DollarSign,
//       gradient: 'from-emerald-500 to-teal-500',
//       subItems: allowedModules.includes('billing')
//         ? [{ id: 'billing', name: 'Billing Module', component: () => <div className="text-center py-20 text-3xl text-gray-600">Billing Coming Soon...</div> }]
//         : []
//     },
//     {
//       id: 'payment',
//       name: 'Payment',
//       icon: DollarSign,
//       gradient: 'from-green-500 to-emerald-600',
//       subItems: allowedModules.includes('payment')
//         ? [{ id: 'payment', name: 'Payment Module', component: () => <div className="text-center py-20 text-3xl text-gray-600">Payment Coming Soon...</div> }]
//         : []
//     },
//     ...(allowedModules.includes('client') ? [{
//       id: 'HOW WE WORK',
//       name: 'HOW WE WORK',
//       icon: Link,
//       gradient: 'from-purple-500 to-pink-500',
//       subItems: [allModules.client],
//       direct: true
//     }] : [])
//   ].filter(cat => cat.subItems && cat.subItems.length > 0);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem('dashboard_selectedView');
//     localStorage.removeItem('dashboard_mobileMenuOpen');
//     localStorage.removeItem('dashboard_globalSearch');
//     navigate('/');
//   };

//   let CurrentComponent = null;
//   let currentTitle = 'Dashboard';

//   for (const cat of resourceCategories) {
//     const found = cat.subItems.find(item => item.id === selectedView);
//     if (found) {
//       CurrentComponent = found.component;
//       currentTitle = found.name;
//       break;
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative">
      
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       <div
//         className={`
//           ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 
//           fixed inset-y-0 left-0 
//           w-64 lg:w-16 ${isSidebarHovered ? "lg:w-64" : "lg:w-16"}
//           bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
//           shadow-2xl z-50 transform transition-all duration-300 ease-out flex flex-col
//         `}
//         onMouseEnter={() => setIsSidebarHovered(true)}
//         onMouseLeave={() => setIsSidebarHovered(false)}
//       >
//         <div className="flex flex-col h-full relative">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-40 pointer-events-none"></div>

//           <div className="flex items-center gap-3 p-4 border-b border-white/10 relative z-10">
//             <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
//               <span className="text-xl">🏢</span>
//             </div>
//             <h1 className={`text-white font-bold text-lg transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//               Office
//             </h1>
//             <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden ml-auto">
//               <X className="w-5 h-5 text-white" />
//             </button>
//           </div>

//           <nav className="flex-1 py-3 px-3 overflow-y-auto relative z-10">
//             <ul className="space-y-1">
//               {resourceCategories.map((cat) => (
//                 <li key={cat.id} className="relative group">
//                   <button
//                     onClick={() => {
//                       if (cat.subItems.length === 1) {
//                         setSelectedView(cat.subItems[0].id);
//                         setIsMobileMenuOpen(false);
//                       } else {
//                         setOpenDropdown(openDropdown === cat.id ? null : cat.id);
//                       }
//                     }}
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
//                       (cat.subItems.length === 1 && selectedView === cat.subItems[0].id) || openDropdown === cat.id
//                         ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
//                         : 'text-gray-300 hover:bg-white/10'
//                     }`}
//                   >
//                     <div className={`p-1.5 rounded-lg flex-shrink-0 ${(cat.subItems.length === 1 && selectedView === cat.subItems[0].id) || openDropdown === cat.id ? 'bg-white/20' : 'bg-white/5'}`}>
//                       <cat.icon className="w-4 h-4" />
//                     </div>
//                     <span className={`text-sm font-medium transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                       {cat.name}
//                     </span>
//                     {cat.subItems.length > 1 && (
//                       <ChevronDown className={`w-4 h-4 ml-auto transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0"} ${openDropdown === cat.id ? 'rotate-180' : ''}`} />
//                     )}
//                   </button>

//                   {cat.subItems.length > 1 && isSidebarHovered && openDropdown === cat.id && (
//                     <div className="mt-2 ml-8 space-y-1">
//                       {cat.subItems.map((sub) => (
//                         <button
//                           key={sub.id}
//                           onClick={() => {
//                             setSelectedView(sub.id);
//                             setIsMobileMenuOpen(false);
//                           }}
//                           className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
//                             selectedView === sub.id
//                               ? 'bg-white/20 text-white font-medium shadow'
//                               : 'text-gray-300 hover:bg-white/10 hover:text-white'
//                           }`}
//                         >
//                           <Package className="w-4 h-4 flex-shrink-0" />
//                           <span>{sub.name}</span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="p-3 border-t border-white/10 relative z-10">
//             <div className={`flex items-center gap-3 mb-3 transition-all duration-300 ${isSidebarHovered ? "" : "justify-center"}`}>
//               <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
//                 <span className="text-lg">A</span>
//               </div>
//               <div className={`transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                 <p className="text-white text-sm font-semibold">{userDisplayName}</p>
//                 <p className="text-gray-400 text-xs">{isAdmin ? 'Administrator' : 'Employee'}</p>
//               </div>
//             </div>

//             <button
//               onClick={handleLogout}
//               className={`w-full flex items-center gap-2 px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition border border-red-500/30 ${isSidebarHovered ? "justify-start" : "justify-center"}`}
//             >
//               <LogOut className="w-4 h-4 flex-shrink-0" />
//               <span className={`text-sm font-medium transition-all duration-300 ${isSidebarHovered ? "" : "opacity-0 w-0 overflow-hidden"}`}>
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col min-h-screen">
//         <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 p-4 sticky top-0 z-30">
//           <div className="flex items-center justify-between max-w-7xl mx-auto w-full gap-4">
//             <button 
//               onClick={() => setIsMobileMenuOpen(true)} 
//               className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
//             >
//               <Menu className="w-6 h-6 text-gray-600" />
//             </button>

//             <div className="hidden lg:block w-20"></div>

//             <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-900 bg-clip-text text-transparent whitespace-nowrap">
//               Vipinchauhanassociates
//             </h2>

//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search clients only... (e.g. MIS, RCC, IMS)"
//                 value={globalSearch}
//                 onChange={(e) => setGlobalSearch(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none text-slate-800 placeholder-slate-500 shadow-lg hover:border-purple-300"
//               />
//             </div>

//             <div className="w-10 lg:w-20"></div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
//           <div className="max-w-7xl mx-auto">
//             <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
//               <div className="flex items-center gap-4 mb-8">
//                 {selectedView === 'client' ? <Link className="w-8 h-8 text-purple-500" /> : <Package className="w-8 h-8 text-indigo-500" />}
//                 <h3 className="text-3xl font-bold text-gray-800">
//                   {currentTitle}
//                 </h3>
//               </div>

//               <div className="w-full min-h-[600px]">
//                 {CurrentComponent ? (
//                   <CurrentComponent globalSearch={globalSearch} />
//                 ) : (
//                   <div className="text-center py-20">
//                     <p className="text-2xl text-gray-600 font-medium">
//                       Welcome, {userDisplayName}!
//                     </p>
//                     <p className="text-lg text-gray-500 mt-4">
//                       Please select a module from the sidebar to begin.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import {
  Lock, User, Menu, X, LogOut, Package, ChevronDown, DollarSign, Link, Search
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

// All Components Import
import FMS from '../../src/components/Project/FMS';
import PMS from '../../src/components/Project/PMS';
import IMS from '../../src/components/Project/IMS';
import CheckList from '../../src/components/Project/CheckList';
import HelpTicket from '../../src/components/Project/HelpTicket';
import SalesSystem from '../../src/components/Project/SalesSystem';
import Client from '../components/Client/Client';

const Dashboard = () => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(
    localStorage.getItem('dashboard_mobileMenuOpen') === 'true' || true
  );
  
  const [openDropdown, setOpenDropdown] = useState('project');
  
  const [selectedView, setSelectedView] = useState(
    localStorage.getItem('dashboard_selectedView') || ''
  );

  // Global Search State
  const [globalSearch, setGlobalSearch] = useState(
    localStorage.getItem('dashboard_globalSearch') || ''
  );

  const { token, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    localStorage.setItem('dashboard_mobileMenuOpen', isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (selectedView) {
      localStorage.setItem('dashboard_selectedView', selectedView);
    }
  }, [selectedView]);

  useEffect(() => {
    localStorage.setItem('dashboard_globalSearch', globalSearch);
  }, [globalSearch]);

  const isAdmin = userType === 'admin';

  const userDisplayName = {
    admin: 'Admin',
    'Bharti': 'Bharti',
    'Govind Ram Nagar': 'Govind Ram Nagar',
    'Ashok Sir': 'Ashok Sir',
    'Ravindra Singh': 'Ravindra Singh'
  }[userType] || 'User';

  const userPermissions = {
    admin: ['fms', 'pms', 'ims', 'checklist', 'helpticket', 'salessystem', 'billing', 'payment', 'client'],
    'Ashok Sir': ['fms', 'pms', 'ims', 'checklist', 'helpticket', 'salessystem', 'billing', 'payment', 'client'],
    'Aakash Chouhan': ['fms', 'pms', 'ims', 'checklist'],
    'Ravindra Singh': ['helpticket', 'checklist', 'fms'],
    'Govind Ram Nagar': ['fms', 'salessystem', 'ims'],
    Bharti: ['client'],
    default: ['']
  };

  const allowedModules = userPermissions[userType] || userPermissions.default;

  const allModules = {
    fms: { id: 'fms', name: 'FMS', component: FMS },
    pms: { id: 'pms', name: 'PMS', component: PMS },
    ims: { id: 'ims', name: 'IMS', component: IMS },
    checklist: { id: 'checklist', name: 'CheckList', component: CheckList },
    helpticket: { id: 'helpticket', name: 'Help Ticket', component: HelpTicket },
    salessystem: { id: 'salessystem', name: 'Sales System', component: SalesSystem },
    client: { id: 'client', name: 'Work', component: Client },
  };

  const resourceCategories = [
    {
      id: 'project',
      name: 'Projects',
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
      subItems: ['fms', 'pms', 'ims', 'checklist', 'helpticket', 'salessystem']
        .filter(id => allowedModules.includes(id))
        .map(id => allModules[id])
    },
    {
      id: 'billing',
      name: 'Billing',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500',
      subItems: allowedModules.includes('billing')
        ? [{ id: 'billing', name: 'Billing Module', component: () => <div className="text-center py-20 text-3xl text-gray-600">Billing Coming Soon...</div> }]
        : []
    },
    {
      id: 'payment',
      name: 'Payment',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      subItems: allowedModules.includes('payment')
        ? [{ id: 'payment', name: 'Payment Module', component: () => <div className="text-center py-20 text-3xl text-gray-600">Payment Coming Soon...</div> }]
        : []
    },
    // FIX: यह condition काम कर रही है सही तरीके से अब
    ...(allowedModules.includes('client') ? [{
      id: 'HOW_WE_WORK',
      name: 'HOW WE WORK',
      icon: Link,
      gradient: 'from-purple-500 to-pink-500',
      subItems: [allModules.client],
      direct: true
    }] : [])
  ].filter(cat => cat.subItems && cat.subItems.length > 0);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('dashboard_selectedView');
    localStorage.removeItem('dashboard_mobileMenuOpen');
    localStorage.removeItem('dashboard_globalSearch');
    navigate('/');
  };

  let CurrentComponent = null;
  let currentTitle = 'Dashboard';

  for (const cat of resourceCategories) {
    const found = cat.subItems.find(item => item.id === selectedView);
    if (found) {
      CurrentComponent = found.component;
      currentTitle = found.name;
      break;
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative">
      
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
          fixed inset-y-0 left-0 
          w-64 lg:w-16 ${isSidebarHovered ? "lg:w-64" : "lg:w-16"}
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
          shadow-2xl z-50 transform transition-all duration-300 ease-out flex flex-col
        `}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div className="flex flex-col h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-40 pointer-events-none"></div>

          <div className="flex items-center gap-3 p-4 border-b border-white/10 relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🏢</span>
            </div>
            <h1 className={`text-white font-bold text-lg transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Office
            </h1>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden ml-auto">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <nav className="flex-1 py-3 px-3 overflow-y-auto relative z-10">
            <ul className="space-y-1">
              {resourceCategories.map((cat) => (
                <li key={cat.id} className="relative group">
                  <button
                    onClick={() => {
                      if (cat.subItems.length === 1) {
                        setSelectedView(cat.subItems[0].id);
                        setIsMobileMenuOpen(false);
                      } else {
                        setOpenDropdown(openDropdown === cat.id ? null : cat.id);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      (cat.subItems.length === 1 && selectedView === cat.subItems[0].id) || openDropdown === cat.id
                        ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg flex-shrink-0 ${(cat.subItems.length === 1 && selectedView === cat.subItems[0].id) || openDropdown === cat.id ? 'bg-white/20' : 'bg-white/5'}`}>
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-medium transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                      {cat.name}
                    </span>
                    {cat.subItems.length > 1 && (
                      <ChevronDown className={`w-4 h-4 ml-auto transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0"} ${openDropdown === cat.id ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {cat.subItems.length > 1 && isSidebarHovered && openDropdown === cat.id && (
                    <div className="mt-2 ml-8 space-y-1">
                      {cat.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedView(sub.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                            selectedView === sub.id
                              ? 'bg-white/20 text-white font-medium shadow'
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Package className="w-4 h-4 flex-shrink-0" />
                          <span>{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-3 border-t border-white/10 relative z-10">
            <div className={`flex items-center gap-3 mb-3 transition-all duration-300 ${isSidebarHovered ? "" : "justify-center"}`}>
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-lg">A</span>
              </div>
              <div className={`transition-all duration-300 ${isSidebarHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                <p className="text-white text-sm font-semibold">{userDisplayName}</p>
                <p className="text-gray-400 text-xs">{isAdmin ? 'Administrator' : 'Employee'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-2 px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition border border-red-500/30 ${isSidebarHovered ? "justify-start" : "justify-center"}`}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className={`text-sm font-medium transition-all duration-300 ${isSidebarHovered ? "" : "opacity-0 w-0 overflow-hidden"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div className="hidden lg:block w-20"></div>

            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-900 bg-clip-text text-transparent whitespace-nowrap">
              Vipinchauhanassociates
            </h2>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search clients only... (e.g. MIS, RCC, IMS)"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none text-slate-800 placeholder-slate-500 shadow-lg hover:border-purple-300"
              />
            </div>

            <div className="w-10 lg:w-20"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                {selectedView === 'client' ? <Link className="w-8 h-8 text-purple-500" /> : <Package className="w-8 h-8 text-indigo-500" />}
                <h3 className="text-3xl font-bold text-gray-800">
                  {currentTitle}
                </h3>
              </div>

              <div className="w-full min-h-[600px]">
                {CurrentComponent ? (
                  <CurrentComponent globalSearch={globalSearch} />
                ) : (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-600 font-medium">
                      Welcome, {userDisplayName}!
                    </p>
                    <p className="text-lg text-gray-500 mt-4">
                      Please select a module from the sidebar to begin.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;