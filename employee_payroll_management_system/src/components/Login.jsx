import React, { useState } from 'react';
import { signInUser } from '../api';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await signInUser(email, password);
            onLogin(user);
        } catch (err) {
            setError(err.message || 'Failed to sign in. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
            <div className="max-w-md w-full glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="text-center mb-10 relative z-10">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-brand-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 mb-6 group-hover:scale-105 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
                    <p className="mt-3 text-sm text-slate-400 font-medium">Sign in to EPNexus Portal</p>
                </div>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400 font-medium text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700/80 rounded-xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-500 font-medium text-white shadow-sm"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700/80 rounded-xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-500 font-medium text-white shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
