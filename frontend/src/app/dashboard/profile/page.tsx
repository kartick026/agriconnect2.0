"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, TestTube, Crosshair, Calendar, Droplets } from 'lucide-react';

export default function Profile() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
                        <Crosshair className="w-8 h-8 mr-3 text-emerald-600" /> My Farm Profile
                    </h1>
                    <p className="text-gray-500 mt-1">A personalized dashboard tailored exactly to your crop, soil, and location.</p>
                </div>
                <button className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition">
                    Edit Farm Details
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Farm Stats */}
                <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-20 z-0"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Rao Family Farms</h2>
                                <div className="flex items-center text-gray-500 mt-1 font-medium">
                                    <MapPin className="w-4 h-4 mr-1 text-emerald-500" /> GPS: 18.5204° N, 73.8567° E (Pune)
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <span className="text-sm font-bold text-gray-400 block mb-1">Total Area</span>
                                <div className="text-2xl font-black text-gray-800">12.5 <span className="text-sm">Acres</span></div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                <span className="text-sm font-bold text-orange-400 block mb-1">Soil Type</span>
                                <div className="text-xl font-bold text-orange-800 flex items-center"><TestTube className="w-5 h-5 mr-1" /> Black Cotton</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 col-span-2 lg:col-span-1">
                                <span className="text-sm font-bold text-blue-400 block mb-1">Water Source</span>
                                <div className="text-xl font-bold text-blue-800 flex items-center"><Droplets className="w-5 h-5 mr-1" /> Canal & Borewell</div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><Sprout className="w-5 h-5 mr-2 text-emerald-600" /> Active Crops</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xl">🌾</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Wheat (Lok-1)</h4>
                                        <span className="text-xs text-gray-500 font-medium">8 Acres Sown</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" /> Days to Harvest: 45
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-xl">🍅</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Tomato (Hybrid)</h4>
                                        <span className="text-xs text-gray-500 font-medium">4.5 Acres Sown</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" /> Days to Harvest: 12
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personalized Actions */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-md text-white">
                        <h3 className="font-bold text-lg mb-2">Smart Action Plan</h3>
                        <p className="text-sm text-gray-300 leading-relaxed mb-4">Based on your sowing data, your Wheat crop is entering the flowering stage.</p>
                        <div className="bg-white/10 p-3 rounded-xl mb-4 text-sm font-medium">
                            ⚠️ Apply NPK fertilizer before the rain expected next Wednesday.
                        </div>
                        <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition">
                            View Full Schedule
                        </button>
                    </div>

                    <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                        <h3 className="font-bold text-emerald-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Soil Health Score: 82/100</h3>
                        <div className="w-full bg-emerald-200 rounded-full h-2.5 mb-2 mt-4">
                            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                        <p className="text-xs text-emerald-800 font-medium">Nitrogen levels are optimal. Consider adding Potassium post-harvest.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
