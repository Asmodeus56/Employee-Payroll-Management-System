import React, { useState, useEffect } from 'react';
import HRDashboard from './components/HRDashboard';
import EmployeePortal from './components/EmployeePortal';
import Login from './components/Login';
import { getSession, signOutUser, supabase } from './api';

function App() {
  const [role, setRole] = useState('HR / Payroll Officer');
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const activeSession = await getSession();
        setSession(activeSession);
        if (activeSession?.user?.email === 'employee@epnexus.com') {
          setRole('Employee');
        } else {
          setRole('HR / Payroll Officer');
        }
      } catch (error) {
        console.error('Failed to get session', error);
      } finally {
        setInitializing(false);
        setIsLoaded(true);
      }
    };
    initSession();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session?.user?.email === 'employee@epnexus.com') {
          setRole('Employee');
        } else if (session) {
          setRole('HR / Payroll Officer');
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleLogin = (user) => {
      setSession({ user });
      if (user?.email === 'employee@epnexus.com') {
          setRole('Employee');
      } else {
          setRole('HR / Payroll Officer');
      }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setSession(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (initializing) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!session) {
    return <div className="min-h-screen bg-slate-50 relative"><Login onLogin={handleLogin} /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-200 selection:text-brand-900 overflow-hidden relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-emerald-400/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-tr from-brand-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                EPNexus
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">{session?.user?.email || 'System Active'}</span>
              </div>
              <div className="relative group hidden sm:block">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-48 sm:w-56 pl-4 pr-10 py-2.5 text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/60 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all cursor-pointer appearance-none backdrop-blur-sm"
                >
                  <option value="HR / Payroll Officer">HR Administrator</option>
                  <option value="Employee">Employee Portal</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400 group-hover:text-brand-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold rounded-xl transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className={`max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Mobile View Toggle */}
        <div className="sm:hidden mb-6">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full pl-4 pr-10 py-3 text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/60 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all cursor-pointer appearance-none backdrop-blur-sm"
            >
              <option value="HR / Payroll Officer">HR Administrator</option>
              <option value="Employee">Employee Portal</option>
            </select>
        </div>
        {role === 'HR / Payroll Officer' ? <HRDashboard /> : <EmployeePortal />}
      </main>
    </div>
  );
}

export default App;