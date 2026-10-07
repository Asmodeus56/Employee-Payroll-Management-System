import React, { useState } from 'react';

const EmployeePortal = () => {
    // Mock data
    const myPayslips = [
        { id: 1, date: 'July 31, 2026', gross: 5500.00, tax: 1000.00, netPay: 4500.00, status: 'Paid' },
        { id: 2, date: 'August 31, 2026', gross: 5500.00, tax: 1000.00, netPay: 4500.00, status: 'Paid' }
    ];

    const [downloadingId, setDownloadingId] = useState(null);

    const handleDownload = (id) => {
        setDownloadingId(id);
        setTimeout(() => setDownloadingId(null), 1500);
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">My Portal</h1>
                <p className="text-base text-slate-500 mt-2 max-w-2xl">Access your pay records and manage your personal financial documents securely.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
                {/* Stats cards for Employee */}
                <div className="glass rounded-3xl p-6 flex flex-col justify-center items-start">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Base</p>
                    <p className="text-3xl font-extrabold text-slate-800">$66,000<span className="text-sm font-medium text-slate-400">/yr</span></p>
                </div>
                <div className="glass rounded-3xl p-6 flex flex-col justify-center items-start">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Next Pay Date</p>
                    <p className="text-3xl font-extrabold text-brand-600">Sep 30</p>
                </div>
                <div className="glass rounded-3xl p-6 flex flex-col justify-center items-start">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">YTD Net Earnings</p>
                    <p className="text-3xl font-extrabold text-emerald-600">$36,000</p>
                </div>
            </div>

            <div className="glass rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                <div className="px-8 py-6 border-b border-slate-100 bg-white/50 backdrop-blur-md flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">Recent Payslips</h3>
                    <span className="text-xs font-semibold px-3 py-1 bg-brand-100 text-brand-700 rounded-full">Viewing All</span>
                </div>
                <ul className="divide-y divide-slate-100/50">
                    {myPayslips.map((slip) => (
                        <li key={slip.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between group">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-md font-semibold text-slate-900">Period Ending {slip.date}</p>
                                        <p className="text-xs text-slate-500 font-medium">Standard Payroll</p>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-600 flex space-x-6 ml-14">
                                    <span className="flex flex-col"><span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Gross</span> <span className="font-semibold text-slate-700">${slip.gross.toFixed(2)}</span></span>
                                    <span className="flex flex-col"><span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Taxes/Deductions</span> <span className="font-semibold text-slate-700">${slip.tax.toFixed(2)}</span></span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 ml-14 md:ml-0">
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Net Pay</p>
                                    <p className="text-2xl font-black text-emerald-500 tracking-tight">${slip.netPay.toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => handleDownload(slip.id)}
                                    className="inline-flex items-center justify-center w-36 py-2.5 border border-slate-200/60 shadow-sm text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
                                >
                                    {downloadingId === slip.id ? (
                                        <svg className="animate-spin h-5 w-5 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <>
                                            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            Download
                                        </>
                                    )}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmployeePortal;