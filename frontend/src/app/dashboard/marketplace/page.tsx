"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter, Phone, MapPin, IndianRupee, Handshake, Star } from 'lucide-react';

const MARKET_LISTINGS = [
    { id: 1, seller: "Ram Kumar", crop: "Premium Basmati Rice", qty: "50 Quintals", price: 4200, location: "Karnal, Haryana", rating: 4.8, type: "Wholesale", status: "Available" },
    { id: 2, seller: "GreenFresh Corp", crop: "Organic Tomatoes", qty: "1000 kg", price: 18, location: "Pune, MH", rating: 4.5, type: "Contract", status: "Looking for Farmers" },
    { id: 3, seller: "Suresh Patil", crop: "Export Quality Onion", qty: "20 Tonnes", price: 1400, location: "Nashik, MH", rating: 4.9, type: "Wholesale", status: "Available" },
    { id: 4, seller: "ITC Agri", crop: "Wheat (Sharbati)", qty: "100 Tonnes", price: 2900, location: "Indore, MP", rating: 4.7, type: "Contract", status: "Looking for Farmers" },
    { id: 5, seller: "Ramesh Singh", crop: "Organic Turmeric", qty: "500 kg", price: 12000, location: "Sangli, MH", rating: 5.0, type: "Retail/Bulk", status: "Available" },
];

export default function Marketplace() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredListings = MARKET_LISTINGS.filter(item =>
        (filter === 'All' || item.type.includes(filter) || (filter === 'To Sell' && item.status.includes('Looking'))) &&
        (item.crop.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#004d2b] tracking-tight flex items-center">
                        <ShoppingBag className="w-8 h-8 mr-3 text-[#a4e320]" /> B2B Marketplace
                    </h1>
                    <p className="text-[#004d2b]/60 mt-1 font-medium">Sell directly to buyers, restaurants, and corporations. No Middlemen.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-[#004d2b] text-[#a4e320] font-bold rounded-xl shadow-md hover:bg-[#003b20] transition-colors flex items-center">
                        <ShoppingBag className="w-4 h-4 mr-2" /> Post a Listing
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#004d2b]/10 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-3 text-[#004d2b]/40" />
                    <input
                        type="text"
                        placeholder="Search crops, buyers, or locations..."
                        className="w-full pl-10 pr-4 py-2 border border-[#004d2b]/20 bg-[#f0f4eb] text-[#004d2b] font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004d2b] placeholder-[#004d2b]/40"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Wholesale', 'Contract', 'To Sell'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${filter === f ? 'bg-[#004d2b] text-[#a4e320] shadow-md' : 'bg-[#f0f4eb] text-[#004d2b]/70 hover:bg-[#e4ebdd]'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredListings.map((listing, i) => (
                    <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-xs font-bold ${listing.type.includes('Contract') ? 'bg-[#004d2b] text-white' : 'bg-[#a4e320] text-[#004d2b]'
                            }`}>
                            {listing.type}
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-[#004d2b] group-hover:text-[#a4e320] transition-colors">{listing.crop}</h3>
                                <div className="flex items-center text-[#004d2b]/60 text-sm mt-1">
                                    <span className="font-medium text-[#004d2b]/80">{listing.seller}</span>
                                    <span className="mx-2">•</span>
                                    <div className="flex items-center text-yellow-500">
                                        <Star className="w-4 h-4 fill-current mr-1" /> {listing.rating}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right mt-6 lg:mt-0">
                                <div className="text-2xl font-black text-[#004d2b] flex items-center justify-end">
                                    <IndianRupee className="w-5 h-5 mr-1" /> {listing.price}
                                </div>
                                <div className="text-xs text-[#004d2b]/50 font-medium">per {listing.qty.includes('kg') ? 'kg' : 'Quintal'}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-4 border-y border-[#004d2b]/10 my-4 bg-[#f0f4eb]/50 rounded-xl px-4">
                            <div className="flex-1 flex flex-col">
                                <span className="text-[10px] text-[#004d2b]/50 font-bold uppercase tracking-wider mb-1">Volume</span>
                                <span className="font-bold text-[#004d2b]">{listing.qty}</span>
                            </div>
                            <div className="w-px h-8 bg-[#004d2b]/20"></div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-[10px] text-[#004d2b]/50 font-bold uppercase tracking-wider mb-1">Location</span>
                                <span className="font-bold text-[#004d2b] flex items-center"><MapPin className="w-3 h-3 mr-1 text-[#004d2b]/40" /> {listing.location}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => alert('Contacting ' + listing.seller)} className="flex-1 flex items-center justify-center py-2.5 bg-[#f0f4eb] text-[#004d2b] font-bold rounded-xl hover:bg-[#e4ebdd] border border-[#004d2b]/20 transition-colors">
                                <Phone className="w-4 h-4 mr-2" /> Contact
                            </button>
                            <button onClick={() => alert('Offer initiated for ' + listing.crop)} className="flex-1 flex items-center justify-center py-2.5 bg-[#004d2b] text-[#a4e320] font-bold rounded-xl hover:bg-[#003b20] shadow-md transition-colors">
                                <Handshake className="w-4 h-4 mr-2" /> {listing.status === 'Available' ? 'Make Offer' : 'Accept Contract'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredListings.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700">No listings found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                </div>
            )}

        </div>
    );
}
