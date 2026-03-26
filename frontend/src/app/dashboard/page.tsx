"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, IndianRupee, BellRing } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const ScrollVelocity = dynamic(() => import('@/components/ScrollVelocity').then(mod => ({ default: mod.ScrollVelocity })), { ssr: false });

const dummyData = [
    { name: 'Mon', price: 2100 },
    { name: 'Tue', price: 2150 },
    { name: 'Wed', price: 2120 },
    { name: 'Thu', price: 2200 },
    { name: 'Fri', price: 2250 },
    { name: 'Sat', price: 2300 },
    { name: 'Sun', price: 2280 },
];

export default function DashboardHome() {
    const { t } = useTranslation();
    const [trends, setTrends] = useState([] as { date: string, price: number }[]);

    useEffect(() => {
        fetch(`/api/trends`)
            .then(res => res.json())
            .then(data => setTrends(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6 md:space-y-12 pb-8">
            {/* FocoFirm Style Hero Banner */}
            <div className="relative bg-[#004d2b] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 pb-24 md:pb-32 overflow-hidden shadow-2xl">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#a4e320]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight">
                            Farm <span className="italic font-light opacity-90">Overview</span>
                        </h1>
                        <p className="text-[#a4e320] font-medium mt-2 text-sm md:text-base tracking-wide">
                            Here is what's happening in the markets today.
                        </p>
                    </div>

                    <button className="flex items-center px-5 py-3 bg-[#a4e320] shadow-[0_4px_20px_rgba(164,227,32,0.3)] rounded-full text-sm font-bold text-[#004d2b] hover:bg-[#8ec21b] transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        <BellRing className="w-4 h-4 mr-2" />
                        Setup Price Alerts
                    </button>
                </div>
            </div>

            {/* Overlapping Stats Grid */}
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 -mt-16 md:-mt-24">
                {/* Card 1 */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#004d2b]/5 shadow-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs md:text-sm font-bold text-[#004d2b]/50 mb-1 uppercase tracking-wider">Top Market (Wheat)</p>
                            <h3 className="text-3xl md:text-4xl font-black text-[#004d2b] flex items-center mt-2">
                                <IndianRupee className="w-6 h-6 md:w-8 md:h-8 mr-0 text-[#a4e320]" />
                                2,300<span className="text-sm font-bold text-[#004d2b]/40 ml-1 mt-2">/ Qtl</span>
                            </h3>
                        </div>
                        <div className="p-3 bg-[#f0f4eb] rounded-2xl">
                            <TrendingUp className="w-6 h-6 text-[#004d2b]" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center inline-flex bg-[#a4e320]/20 px-3 py-1.5 rounded-lg">
                        <span className="text-xs font-bold text-[#004d2b]">+4.5%</span>
                        <span className="text-[10px] text-[#004d2b]/60 font-medium ml-2 uppercase tracking-wide">from last week</span>
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#004d2b]/5 shadow-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs md:text-sm font-bold text-[#004d2b]/50 mb-1 uppercase tracking-wider">Top Market (Tomato)</p>
                            <h3 className="text-3xl md:text-4xl font-black text-[#004d2b] flex items-center mt-2">
                                <IndianRupee className="w-6 h-6 md:w-8 md:h-8 mr-0 text-[#a4e320]" />
                                1,200<span className="text-sm font-bold text-[#004d2b]/40 ml-1 mt-2">/ Qtl</span>
                            </h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-2xl">
                            <TrendingDown className="w-6 h-6 text-red-500" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center inline-flex bg-red-50 px-3 py-1.5 rounded-lg">
                        <span className="text-xs font-bold text-red-600">-2.1%</span>
                        <span className="text-[10px] text-[#004d2b]/60 font-medium ml-2 uppercase tracking-wide">from last week</span>
                    </div>
                </motion.div>

                {/* Card 3 (Highlighted) */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-[#004d2b] to-[#003b20] p-6 md:p-8 rounded-[2rem] shadow-2xl text-white border border-[#a4e320]/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#a4e320]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-xs md:text-sm font-bold text-[#a4e320] mb-1 uppercase tracking-wider relative z-10">Estimated Wallet Profit</p>
                    <h3 className="text-4xl md:text-5xl font-black flex items-center mt-3 relative z-10">
                        ₹ 45k+
                    </h3>
                    <p className="text-xs text-white/70 mt-5 font-medium leading-relaxed relative z-10">
                        Based on current selected crops and acreage.
                    </p>
                </motion.div>
            </div>

            {/* Huge Background Typography */}
            <div className="py-12 md:py-24 overflow-hidden mt-8 md:mt-12 pointer-events-none">
                <ScrollVelocity
                    texts={['FARMING INNOVATION', 'SUSTAINABLE FUTURE']}
                    velocity={60}
                    className="text-[#004d2b] opacity-10 font-black tracking-tighter text-6xl md:text-[8rem] lg:text-[10rem] leading-none px-4 uppercase"
                />
            </div>

            {/* Typography Section matching FocoFirm */}
            <div className="py-8 md:py-16 px-4 md:px-8 max-w-4xl mx-auto text-center relative z-10 -mt-20 md:-mt-32">
                <h2 className="text-2xl md:text-4xl leading-[1.6] md:leading-[1.5] font-medium text-[#004d2b]">
                    <span className="italic text-[#004d2b]/70">Track and optimize</span>{' '}
                    <span className="text-[#004d2b] font-semibold">your farm's performance with</span>{' '}
                    <span className="font-bold border-b-4 border-[#a4e320] pb-1">real-time insights</span>.{' '}
                    <span className="italic text-[#004d2b]/70 mt-4 block md:inline">Gain a comprehensive overview.</span>
                </h2>
            </div>

            {/* Premium Dashboard Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8 mt-8 relative z-20">
                {/* Premium Chart Widget */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[3rem] border-2 border-[#f0f4eb] shadow-[0_10px_40px_rgb(0,77,43,0.06)] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-[#004d2b] tracking-tight">Market Index</h3>
                            <p className="text-[#004d2b]/50 font-medium italic mt-1">Weekly volume trajectory</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 bg-[#f0f4eb] p-1.5 rounded-full border border-[#004d2b]/5">
                            <span className="px-4 py-2 rounded-full text-xs font-bold bg-white text-[#004d2b] shadow-sm">1W</span>
                            <span className="px-4 py-2 rounded-full text-xs font-bold text-[#004d2b]/50 hover:text-[#004d2b] cursor-pointer transition-colors">1M</span>
                            <span className="px-4 py-2 rounded-full text-xs font-bold text-[#004d2b]/50 hover:text-[#004d2b] cursor-pointer transition-colors">1Y</span>
                        </div>
                    </div>
                    <div className="h-64 md:h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dummyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#004d2b" strokeOpacity={0.06} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#004d2b', opacity: 0.4, fontWeight: 700, fontSize: 13 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#004d2b', opacity: 0.4, fontWeight: 700, fontSize: 13 }} dx={0} domain={['dataMin - 100', 'dataMax + 100']} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '24px', border: '1px solid rgba(0,77,43,0.05)', boxShadow: '0 20px 40px -10px rgba(0,77,43,0.12)', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', color: '#004d2b', padding: '16px 24px' }}
                                    cursor={{ stroke: '#a4e320', strokeWidth: 2, strokeDasharray: '6 6' }}
                                />
                                <Line type="monotone" dataKey="price" stroke="#004d2b" strokeWidth={6} strokeLinecap="round" dot={{ fill: '#fff', stroke: '#004d2b', strokeWidth: 4, r: 6 }} activeDot={{ r: 12, fill: '#004d2b', stroke: '#a4e320', strokeWidth: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Status/Task Widget */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#004d2b] p-6 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#a4e320]/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-6">Farm Status</h3>

                        <div className="space-y-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                <span className="text-white/80 font-medium text-sm">Irrigation System</span>
                                <span className="px-3 py-1 bg-[#a4e320]/20 text-[#a4e320] rounded-xl text-xs font-bold uppercase tracking-wider">Active</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                <span className="text-white/60 font-medium text-sm">Pest Control</span>
                                <span className="px-3 py-1 bg-white/5 text-white/50 rounded-xl text-xs font-bold uppercase tracking-wider">Scheduled</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                <span className="text-white/60 font-medium text-sm">Soil Moisture</span>
                                <span className="px-3 py-1 bg-[#a4e320]/20 text-[#a4e320] rounded-xl text-xs font-bold uppercase tracking-wider">Optimal</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
                        <button className="w-full flex items-center justify-center px-6 py-4 bg-[#a4e320] hover:bg-[#8ec21b] transition-colors rounded-2xl text-[#004d2b] font-extrabold text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(164,227,32,0.2)]">
                            Generate Full Report
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
