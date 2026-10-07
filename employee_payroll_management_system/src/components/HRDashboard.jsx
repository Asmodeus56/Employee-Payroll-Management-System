import React, { useState } from 'react';
import { createEmployee, runPayrollBatch } from '../api';

const HRDashboard = () => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [status, setStatus] = useState({ message: '', type: '' });
    const [loading, setLoading] = useState({ employee: false, payroll: false });

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, employee: true }));
        try {
            await createEmployee({
                FirstName: name.split(' ')[0],
                LastName: name.split(' ').slice(1).join(' ') || '',
                BaseSalary: parseFloat(salary),
                EmploymentStatus: 'Active',
                EncryptedTaxID: 'SECURE_DUMMY_ID'
            });
            setStatus({ message: 'Employee profile saved successfully to the secure database.', type: 'success' });
            setName('');
            setSalary('');
        } catch (error) {
            setStatus({ message: `Error: ${error.message}`, type: 'error' });
        }
        setLoading(prev => ({ ...prev, employee: false }));
        
        // Auto-hide status after 5s
        setTimeout(() => setStatus({ message: '', type: '' }), 5000);
    };

    const handleRunPayroll = async () => {
        setLoading(prev => ({ ...prev, payroll: true }));
        setStatus({ message: 'Initiating secure payroll batch processing...', type: 'info' });
        try {
            await runPayrollBatch();
            setStatus({ message: 'Global payroll batch completed successfully across all active profiles.', type: 'success' });
        } catch (error) {
            setStatus({ message: `Batch failed: ${error.message}`, type: 'error' });
        }
        setLoading(prev => ({ ...prev, payroll: false }));
        
        // Auto-hide status after 5s
        setTimeout(() => setStatus({ message: '', type: '' }), 5000);
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">HR & Payroll Overview</h1>
                <p className="text-base text-slate-500 mt-2 max-w-2xl">Manage your organizational structure and orchestrate secure payroll cycles effortlessly.</p>
            </div>

            {/* Status Alert */}
            <div className={`transition-all duration-500 overflow-hidden ${status.message ? 'max-h-24 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
                <div className={`p-4 rounded-xl shadow-md border flex items-center space-x-4 ${
                    status.type === 'error' ? 'bg-red-50/90 text-red-800 border-red-200' : 
                    status.type === 'success' ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200' : 
                    'bg-brand-50/90 text-brand-800 border-brand-200'
                } backdrop-blur-md`}>
                    <div className="flex-shrink-0">
                        {status.type === 'error' && (
                            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        )}
                        {status.type === 'success' && (
                            <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        )}
                        {status.type === 'info' && (
                            <svg className="w-6 h-6 text-brand-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                        )}
                    </div>
                    <p className="text-sm font-semibold tracking-wide">{status.message}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Add Employee Card */}
                <div className="glass rounded-3xl overflow-hidden group">
                    <div className="px-8 py-6 border-b border-white/20 bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-lg flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Onboard Employee</h3>
                    </div>
                    <div className="p-8">
                        <form onSubmit={handleAddEmployee} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Legal Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-5 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200/80 rounded-xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-300"
                                    placeholder="e.g. Sarah Jenkins"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Base Salary</label>
                                <div className="relative group-hover:shadow-sm transition-shadow rounded-xl">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <span className="text-slate-400 font-bold sm:text-base">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-5 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200/80 rounded-xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-300"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading.employee}
                                className={`w-full bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5 flex justify-center items-center ${loading.employee ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading.employee ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : 'Save Employee Profile'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Payroll Engine Card */}
                <div className="glass rounded-3xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0"></div>
                    <div className="px-8 py-6 border-b border-white/20 bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-lg flex items-center space-x-3 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Payroll Orchestration</h3>
                    </div>
                    <div className="p-8 flex flex-col justify-center items-center h-full min-h-[300px] text-center relative z-10">
                        
                        <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-purple-900/5 border border-purple-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <p className="text-base text-slate-600 font-medium mb-8 max-w-xs leading-relaxed">Calculate compensation, process taxes, and dispatch secure payslips instantly.</p>
                        
                        <button
                            onClick={handleRunPayroll}
                            disabled={loading.payroll}
                            className={`w-full max-w-xs font-bold py-4 px-6 rounded-xl transition-all shadow-xl flex justify-center items-center ${loading.payroll ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5'}`}
                        >
                            {loading.payroll ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Processing Batch...
                                </span>
                            ) : (
                                <>
                                    Execute Batch Run
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRDashboard;