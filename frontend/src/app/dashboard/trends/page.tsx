"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, BarChart2, Filter } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const historicalData = [
    { month: 'Jan', price: 1800, forecast: null },
    { month: 'Feb', price: 1950, forecast: null },
    { month: 'Mar', price: 2100, forecast: null },
    { month: 'Apr', price: 2200, forecast: null },
    { month: 'May', price: 2150, forecast: null },
    { month: 'Jun', price: 2300, forecast: 2300 }, // Connection point
    { month: 'Jul', price: null, forecast: 2450 },
    { month: 'Aug', price: null, forecast: 2600 },
];

export default function MarketTrends() {
    const { t } = useTranslation();
    const [selectedCrop, setSelectedCrop] = useState('Wheat');
    const [timeframe, setTimeframe] = useState('6M');

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Market Analytics & Forecast</h1>
                    <p className="text-gray-500 mt-1">Analyze historical data and view AI-powered price predictions.</p>
                </div>

                <div className="flex gap-2">
                    <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 outline-none shadow-sm cursor-pointer font-semibold min-w-[200px]"
                    >
                        <optgroup label="Crops & Pulses">
                            <option value="Wheat">Wheat</option>
                            <option value="Tomato">Tomato</option>
                            <option value="Onion">Onion</option>
                            <option value="Potato">Potato</option>
                            <option value="Toor Dal">Toor Dal</option>
                        </optgroup>
                        <optgroup label="Fruits">
                            <option value="Mango">Mango</option>
                            <option value="Orange">Orange</option>
                            <option value="Apple">Apple</option>
                            <option value="Banana">Banana</option>
                        </optgroup>
                        <optgroup label="Seeds & Spices">
                            <option value="Soybean">Soybean</option>
                            <option value="Cumin Seed">Cumin Seed (Jeera)</option>
                            <option value="Red Chilli">Red Chilli</option>
                            <option value="Black Pepper">Black Pepper</option>
                        </optgroup>
                        <optgroup label="Foods & Cash Crops">
                            <option value="Basmati Rice">Basmati Rice</option>
                            <option value="Groundnut">Groundnut</option>
                            <option value="Jaggery">Jaggery</option>
                        </optgroup>
                    </select>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['1M', '3M', '6M', '1Y'].map(tf => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeframe === tf ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]"
            >
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <BarChart2 className="w-6 h-6 mr-2 text-indigo-600" />
                        {selectedCrop} Price Index
                    </h3>
                    <div className="flex gap-4 text-sm font-medium">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></span> Historical Price</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full border-2 border-indigo-400 border-dashed mr-2"></span> AI Forecast</div>
                    </div>
                </div>

                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 14 }} dy={15} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 14 }} dx={-15} tickFormatter={(val) => `₹${val}`} />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                                formatter={(value: number | undefined, name: string | undefined) => [`₹${value || 0}`, name === 'price' ? 'Historical' : 'Predicted']}
                            />
                            <Line type="monotone" dataKey="price" stroke="#4F46E5" strokeWidth={4} dot={{ fill: '#4F46E5', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, fill: '#3730A3', stroke: '#fff', strokeWidth: 2 }} />
                            <Line type="monotone" dataKey="forecast" stroke="#818CF8" strokeWidth={4} strokeDasharray="8 8" dot={{ fill: '#818CF8', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl"
                >
                    <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" /> AI Market Insight
                    </h4>
                    <p className="text-indigo-800 leading-relaxed">
                        Based on current weather patterns, export demand, and local inventory levels, {selectedCrop} prices are expected to <strong className="font-extrabold">rise by 12%</strong> over the next two months.
                        <br /><br />
                        <strong>Recommendation:</strong> Consider holding stock if storage facilities permit to maximize ROI.
                    </p>
                </motion.div>
            </div>

        </div>
    );
}
