"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, IndianRupee, MapPin } from 'lucide-react';

const MOCK_DATA = [
    // Cereals & Pulses
    { id: 1, market: 'Delhi Azadpur', crop: 'Wheat', variety: 'Lok-1', minPrice: 2100, maxPrice: 2400, modalPrice: 2300, distance: '12 km', type: 'Crops' },
    { id: 2, market: 'Gurugram Mandi', crop: 'Wheat', variety: 'Sharbati', minPrice: 2600, maxPrice: 2900, modalPrice: 2800, distance: '28 km', type: 'Crops' },
    { id: 3, market: 'Indore Mandi', crop: 'Soybean', variety: 'Yellow', minPrice: 4200, maxPrice: 4600, modalPrice: 4400, distance: '450 km', type: 'Seeds' },
    { id: 4, market: 'Latur APMC', crop: 'Toor Dal', variety: 'Desi', minPrice: 9500, maxPrice: 10500, modalPrice: 10000, distance: '480 km', type: 'Crops' },

    // Vegetables
    { id: 5, market: 'Nasik APMC', crop: 'Onion', variety: 'Red', minPrice: 1200, maxPrice: 1800, modalPrice: 1500, distance: '160 km', type: 'Crops' },
    { id: 6, market: 'Kolar Mandi', crop: 'Tomato', variety: 'Hybrid', minPrice: 800, maxPrice: 1200, modalPrice: 1000, distance: '210 km', type: 'Crops' },
    { id: 7, market: 'Agra Mandi', crop: 'Potato', variety: 'Kufri Bahar', minPrice: 600, maxPrice: 900, modalPrice: 750, distance: '180 km', type: 'Crops' },

    // Fruits
    { id: 8, market: 'Nagpur APMC', crop: 'Orange', variety: 'Nagpur Mandarin', minPrice: 3000, maxPrice: 4000, modalPrice: 3500, distance: '320 km', type: 'Fruits' },
    { id: 9, market: 'Ratnagiri', crop: 'Mango', variety: 'Alphonso', minPrice: 8000, maxPrice: 12000, modalPrice: 10000, distance: '550 km', type: 'Fruits' },
    { id: 10, market: 'Shimla Mandi', crop: 'Apple', variety: 'Royal Delicious', minPrice: 5000, maxPrice: 7000, modalPrice: 6000, distance: '410 km', type: 'Fruits' },
    { id: 11, market: 'Jalgaon', crop: 'Banana', variety: 'Robusta', minPrice: 1100, maxPrice: 1500, modalPrice: 1300, distance: '280 km', type: 'Fruits' },

    // Seeds & Spices
    { id: 12, market: 'Unjha Mandi', crop: 'Cumin Seed', variety: 'Jeera', minPrice: 45000, maxPrice: 55000, modalPrice: 50000, distance: '620 km', type: 'Seeds' },
    { id: 13, market: 'Guntur APMC', crop: 'Red Chilli', variety: 'Teja', minPrice: 18000, maxPrice: 22000, modalPrice: 20000, distance: '780 km', type: 'Seeds' },
    { id: 14, market: 'Kochi', crop: 'Black Pepper', variety: 'Garbled', minPrice: 48000, maxPrice: 52000, modalPrice: 50000, distance: '1100 km', type: 'Seeds' },

    // Cash Crops & Foods
    { id: 15, market: 'Rajkot', crop: 'Groundnut', variety: 'Bold', minPrice: 5500, maxPrice: 6500, modalPrice: 6000, distance: '680 km', type: 'Foods' },
    { id: 16, market: 'Karnal', crop: 'Basmati Rice', variety: '1121', minPrice: 3800, maxPrice: 4500, modalPrice: 4200, distance: '110 km', type: 'Foods' },
    { id: 17, market: 'Kolhapur', crop: 'Jaggery', variety: 'Golden', minPrice: 3200, maxPrice: 3800, modalPrice: 3500, distance: '320 km', type: 'Foods' }
];

export default function ComparePrices() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    // Find max and min prices for heatmap calculation
    const allPrices = MOCK_DATA.map(d => d.modalPrice);
    const highestPrice = Math.max(...allPrices);
    const lowestPrice = Math.min(...allPrices);

    const getHeatmapColor = (price: number) => {
        // Simple gradient calculation
        if (price === highestPrice) return 'bg-green-100 text-green-800 border-green-200';
        if (price === lowestPrice) return 'bg-red-50 text-red-800 border-red-200';
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Market Prices</h1>
                    <p className="text-gray-500 mt-1">Compare daily modal prices across different mandis to find the best rate.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors sm:text-sm shadow-sm"
                        placeholder="Search crops or markets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 outline-none shadow-sm cursor-pointer">
                    <option>All Types</option>
                    <option>Crops & Pulses</option>
                    <option>Fruits</option>
                    <option>Seeds & Spices</option>
                    <option>Foods & Cash Crops</option>
                </select>
                <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 outline-none shadow-sm cursor-pointer min-w-[150px]">
                    <option>All Items</option>
                    <optgroup label="Crops">
                        <option>Wheat</option>
                        <option>Tomato</option>
                        <option>Onion</option>
                        <option>Potato</option>
                        <option>Toor Dal</option>
                    </optgroup>
                    <optgroup label="Fruits">
                        <option>Mango</option>
                        <option>Orange</option>
                        <option>Apple</option>
                        <option>Banana</option>
                    </optgroup>
                    <optgroup label="Seeds & Spices">
                        <option>Soybean</option>
                        <option>Cumin Seed (Jeera)</option>
                        <option>Red Chilli</option>
                        <option>Black Pepper</option>
                    </optgroup>
                    <optgroup label="Foods">
                        <option>Groundnut</option>
                        <option>Basmati Rice</option>
                        <option>Jaggery</option>
                    </optgroup>
                </select>
                <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 outline-none shadow-sm cursor-pointer ml-auto">
                    <option>Sort by Distance</option>
                    <option>Sort by Price: High to Low</option>
                    <option>Sort by Price: Low to High</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Market Location</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Crop (Variety)</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Distance</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Modal Price / Quintal</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {MOCK_DATA.filter(row =>
                                row.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                row.market.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((row, index) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <MapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                                            <div className="text-sm font-medium text-gray-900">{row.market}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800">{row.crop} <span className="text-gray-400 font-normal">({row.variety})</span></span>
                                            <span className="text-xs text-indigo-500 font-medium uppercase tracking-wider">{row.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {row.distance}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-bold ${getHeatmapColor(row.modalPrice)}`}>
                                            <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                                            {row.modalPrice}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                                            Navigate
                                        </a>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-end items-center gap-4 text-xs text-gray-500 pt-2">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-200 border border-green-300 mr-2"></span> Highest Yield</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-200 border border-yellow-300 mr-2"></span> Average Price</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-200 border border-red-300 mr-2"></span> Low Value</div>
            </div>
        </div>
    );
}
