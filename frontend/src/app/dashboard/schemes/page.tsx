"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, CheckCircle, ExternalLink, Filter } from 'lucide-react';

const mockSchemes = [
    { id: 1, title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)', amount: '₹6,000 / year', category: 'Income Support', active: true },
    { id: 2, title: 'KCC (Kisan Credit Card) Loan', amount: 'Up to ₹3 Lakh', category: 'Credit/Loan', active: true },
    { id: 3, title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)', amount: 'Varies', category: 'Insurance', active: true },
    { id: 4, title: 'Solar Pump Subsidy (PM-KUSUM)', amount: 'Up to 60%', category: 'Subsidy', active: false },
];

export default function GovernmentSchemes() {
    const [filter, setFilter] = useState('All');

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
                        <Landmark className="w-8 h-8 mr-3 text-teal-600" /> Government Schemes
                    </h1>
                    <p className="text-gray-500 mt-1">Discover loans, subsidies, and insurance programs you qualify for.</p>
                </div>

                <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold shadow-md hover:bg-teal-700 transition-colors">
                    <CheckCircle className="w-4 h-4 mr-2" /> Check My Eligibility
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Income Support', 'Credit/Loan', 'Insurance', 'Subsidy'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors border ${filter === f ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockSchemes.filter(s => filter === 'All' || s.category === filter).map((scheme, i) => (
                    <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-teal-50 text-teal-700 uppercase tracking-wide">
                                {scheme.category}
                            </span>
                            <span className={`flex w-3 h-3 rounded-full ${scheme.active ? 'bg-green-500' : 'bg-gray-300'}`} title={scheme.active ? "Currently Active" : "Closed"}></span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-teal-600 transition-colors">{scheme.title}</h3>

                        <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Financial Benefit</p>
                            <p className="text-lg font-bold text-gray-900">{scheme.amount}</p>
                        </div>

                        <div className="mt-auto pt-6">
                            <button className="w-full flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                                Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
