"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee, Sprout, TrendingUp } from 'lucide-react';

export default function ProfitCalculator() {
    const [quantity, setQuantity] = useState(10); // in quintals
    const [costPerQuintal, setCostPerQuintal] = useState(1500);
    const [marketPrice, setMarketPrice] = useState(2300);

    const totalCost = quantity * costPerQuintal;
    const totalRevenue = quantity * marketPrice;
    const totalProfit = totalRevenue - totalCost;
    const roi = ((totalProfit / totalCost) * 100).toFixed(1);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Banner Image Section */}
            <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl border border-[#004d2b]/10">
                <img src="/images/profit_banner.png" alt="Smart Profit Calculator Concept" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#004d2b] via-[#004d2b]/80 to-transparent flex flex-col justify-center px-8 md:px-12 backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center mb-2">
                        <TrendingUp className="w-8 h-8 md:w-12 md:h-12 mr-4 text-[#a4e320]" />
                        Smart Profit Calculator
                    </h1>
                    <p className="text-white/80 font-medium max-w-md text-sm md:text-base">Estimate your net earnings before you head to the mandi with real-time financial insights.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-3xl border border-[#004d2b]/10 shadow-sm flex flex-col justify-between"
                >
                    <div className="space-y-10">
                        {/* Quantity Slider */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-sm font-bold text-[#004d2b] flex items-center uppercase tracking-wider">
                                    <div className="p-1.5 bg-[#f0f4eb] rounded-lg mr-3">
                                        <Sprout className="w-4 h-4 text-[#a4e320]" />
                                    </div>
                                    Estimated Yield
                                </label>
                                <span className="text-2xl font-black text-[#004d2b] bg-[#f0f4eb] px-3 py-1 rounded-xl border border-[#004d2b]/10">{quantity} <span className="text-sm text-[#004d2b]/50">Qtl</span></span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="1" max="500"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full h-2.5 bg-[#f0f4eb] rounded-full appearance-none cursor-pointer accent-[#004d2b] focus:outline-none focus:ring-4 focus:ring-[#004d2b]/20 transition-all border border-[#004d2b]/10"
                                />
                            </div>
                        </div>

                        {/* Cost Slider */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-sm font-bold text-[#004d2b] flex items-center uppercase tracking-wider">
                                    <div className="p-1.5 bg-[#f0f4eb] rounded-lg mr-3">
                                        <IndianRupee className="w-4 h-4 text-red-500" />
                                    </div>
                                    Production Cost
                                </label>
                                <span className="text-2xl font-black text-[#004d2b] bg-red-50 px-3 py-1 rounded-xl border border-red-100">₹{costPerQuintal}</span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="500" max="10000" step="100"
                                    value={costPerQuintal}
                                    onChange={(e) => setCostPerQuintal(Number(e.target.value))}
                                    className="w-full h-2.5 bg-red-50 rounded-full appearance-none cursor-pointer accent-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all border border-red-100"
                                />
                            </div>
                        </div>

                        {/* Market Price Slider */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-sm font-bold text-[#004d2b] flex items-center uppercase tracking-wider">
                                    <div className="p-1.5 bg-[#f0f4eb] rounded-lg mr-3">
                                        <TrendingUp className="w-4 h-4 text-[#004d2b]" />
                                    </div>
                                    Expected Market Price
                                </label>
                                <span className="text-2xl font-black text-[#004d2b] bg-[#f0f4eb] px-3 py-1 rounded-xl border border-[#004d2b]/10">₹{marketPrice}</span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="1000" max="15000" step="100"
                                    value={marketPrice}
                                    onChange={(e) => setMarketPrice(Number(e.target.value))}
                                    className="w-full h-2.5 bg-[#f0f4eb] rounded-full appearance-none cursor-pointer accent-[#a4e320] focus:outline-none focus:ring-4 focus:ring-[#a4e320]/20 transition-all border border-[#004d2b]/10"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col space-y-6"
                >
                    <div className="bg-[#004d2b] p-8 rounded-3xl shadow-xl text-white flex-1 flex flex-col justify-center relative overflow-hidden border border-[#004d2b]">
                        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[#a4e320] opacity-10 rounded-full blur-[40px]"></div>

                        <p className="text-[#a4e320] font-black mb-3 uppercase tracking-widest text-xs flex items-center bg-[#a4e320]/10 w-fit px-3 py-1.5 rounded-full border border-[#a4e320]/20">
                            <Calculator className="w-3.5 h-3.5 mr-2" />
                            Estimated Net Profit
                        </p>
                        <h2 className="text-[3.5rem] font-black mb-6 tracking-tighter text-white">₹{totalProfit.toLocaleString('en-IN')}</h2>

                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">Total Revenue</p>
                                <p className="font-bold text-xl text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">Total Cost</p>
                                <p className="font-bold text-xl text-red-300">₹{totalCost.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-[#004d2b]/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-[#004d2b]/50 font-bold mb-1">Return on Investment (ROI)</p>
                            <h3 className={`text-3xl font-black ${totalProfit >= 0 ? 'text-[#a4e320]' : 'text-red-500'} ${totalProfit >= 0 ? '[text-shadow:0_0_20px_rgba(164,227,32,0.3)]' : ''}`}>
                                {totalProfit >= 0 ? '+' : ''}{roi}%
                            </h3>
                        </div>
                        <div className={`p-4 rounded-2xl border ${totalProfit >= 0 ? 'bg-[#f0f4eb] border-[#004d2b]/10' : 'bg-red-50 border-red-100'}`}>
                            <TrendingUp className={`w-8 h-8 ${totalProfit >= 0 ? 'text-[#004d2b]' : 'text-red-500'} group-hover:scale-110 transition-transform`} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
