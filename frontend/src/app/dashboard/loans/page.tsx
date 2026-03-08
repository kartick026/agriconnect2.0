"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, Landmark, CheckCircle2, IndianRupee, Clock, ChevronRight } from 'lucide-react';

export default function LoansInsurance() {
    const [activeTab, setActiveTab] = useState('Loans');

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
                        <Wallet className="w-8 h-8 mr-3 text-blue-600" /> Micro-Loans & Insurance
                    </h1>
                    <p className="text-gray-500 mt-1">1-click applications for farm credit and weather protection.</p>
                </div>
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex overflow-x-auto w-max shrink-0">
                    {['Loans', 'Insurance'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${activeTab === tab ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                        >
                            {tab === 'Loans' ? <Landmark className="w-4 h-4 mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'Loans' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* KCC Loan */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Landmark className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Kisan Credit Card (KCC)</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Short-term credit for crop cultivation, post-harvest expenses, and farm maintenance at subsidized rates.</p>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Interest Rate</span>
                                <span className="font-bold text-gray-900">4% - 7% p.a.</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Max Limit</span>
                                <span className="font-bold text-gray-900 flex items-center"><IndianRupee className="w-3 h-3" /> 3 Lakh</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Processing Time</span>
                                <span className="font-bold text-green-600 flex items-center"><Clock className="w-3 h-3 mr-1" /> Fast Track</span>
                            </div>
                        </div>
                        <button onClick={() => alert('Starting KCC Application')} className="w-full py-3 bg-gray-50 text-blue-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                            Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </motion.div>

                    {/* Micro Equipment Loan */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Machinery Micro-Loan</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Quick credit designed specifically for purchasing small farming tools, drip irrigation, or drones.</p>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Interest Rate</span>
                                <span className="font-bold text-gray-900">8.5% p.a.</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Max Limit</span>
                                <span className="font-bold text-gray-900 flex items-center"><IndianRupee className="w-3 h-3" /> 1 Lakh</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Processing Time</span>
                                <span className="font-bold text-green-600 flex items-center"><Clock className="w-3 h-3 mr-1" /> 24 Hours</span>
                            </div>
                        </div>
                        <button onClick={() => alert('Starting Equipment Loan Application')} className="w-full py-3 bg-gray-50 text-green-700 font-bold rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors flex items-center justify-center">
                            Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </motion.div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* PMFBY */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <ShieldCheck className="w-48 h-48 absolute -right-10 -bottom-10 opacity-10" />
                        <div className="relative z-10">
                            <div className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-xs font-bold tracking-wider uppercase mb-4 text-blue-200 border border-blue-400/20">Govt Backed</div>
                            <h3 className="text-2xl font-bold mb-2">PM Fasal Bima Yojana (PMFBY)</h3>
                            <p className="text-blue-100 text-sm mb-8 leading-relaxed max-w-md">Comprehensive crop insurance protecting you against non-preventable natural risks from pre-sowing to post-harvest.</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0" /> Low Premium (1.5% - 2%)</div>
                                <div className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0" /> Covers Drought, Flood, Hailstorms</div>
                                <div className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0" /> Localized Calamity Assessment</div>
                            </div>

                            <button onClick={() => alert('Checking PMFBY Eligibility...')} className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-blue-50 transition w-full sm:w-auto">
                                Check Eligibility & Premium
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
