"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tractor, Snowflake, MapPin, Phone, Calendar as CalendarIcon, Filter, Search } from 'lucide-react';

const RENTALS = [
    { id: 1, type: "Tractor", name: "Mahindra 575 DI", owner: "Rao Farm Equipments", price: 450, unit: "hour", location: "Pune Outskirts (5km)", img: "/images/tractor_equipment.png", rating: 4.8 },
    { id: 2, type: "Cold Storage", name: "Kisan Mega Storage", owner: "Kisan Logistics Pvt Ltd", price: 12, unit: "kg/month", location: "Nashik Highway (12km)", img: "/images/cold_storage_equipment.png", rating: 4.5 },
    { id: 3, type: "Harvester", name: "Claas Crop Tiger", owner: "Singh Harvesting", price: 1500, unit: "acre", location: "Karnal Setup (8km)", img: "/images/harvester_equipment.png", rating: 4.9 },
    { id: 4, type: "Drone", name: "Agri-Spray Drone 10L", owner: "SkyTech Agri", price: 600, unit: "acre", location: "Pune Hub (15km)", img: "/images/drone_equipment.png", rating: 4.7 },
];

export default function EquipmentColdStorage() {
    const [activeTab, setActiveTab] = useState('All');

    const filteredRentals = RENTALS.filter(r => activeTab === 'All' || r.type === activeTab || (activeTab === 'Machinery' && r.type !== 'Cold Storage'));

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#004d2b] tracking-tight flex items-center">
                        <Tractor className="w-8 h-8 mr-3 text-[#a4e320]" /> Equipment & Storage
                    </h1>
                    <p className="text-[#004d2b]/60 mt-1 font-medium">Rent tractors, harvesters, drones, or book local cold storage space.</p>
                </div>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-[#004d2b]/10 flex overflow-x-auto w-max">
                {['All', 'Machinery', 'Cold Storage'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${activeTab === tab ? 'bg-[#004d2b] text-[#a4e320] shadow-md' : 'text-[#004d2b]/60 hover:text-[#004d2b] hover:bg-[#f0f4eb]'}`}
                    >
                        {tab === 'Cold Storage' ? <Snowflake className="w-4 h-4 mr-2" /> : tab === 'Machinery' ? <Tractor className="w-4 h-4 mr-2" /> : null}
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRentals.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#004d2b]/10 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col"
                    >
                        <div className="h-48 overflow-hidden relative border-b border-[#004d2b]/10">
                            <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-md ${item.type === 'Cold Storage' ? 'bg-[#004d2b] text-white' : 'bg-[#a4e320] text-[#004d2b]'}`}>
                                {item.type}
                            </div>
                            <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-[#004d2b] line-clamp-1">{item.name}</h3>
                            </div>
                            <p className="text-sm text-[#004d2b]/60 mb-4 font-medium">{item.owner}</p>

                            <div className="flex items-center text-[11px] uppercase tracking-wider text-[#004d2b]/50 mb-4 font-bold bg-[#f0f4eb] px-3 py-2 rounded-lg">
                                <MapPin className="w-4 h-4 mr-2 text-[#a4e320]" /> {item.location}
                            </div>

                            <div className="mt-auto pt-4 border-t border-[#004d2b]/10 flex items-end justify-between">
                                <div>
                                    <span className="text-[10px] text-[#004d2b]/40 font-black block uppercase tracking-widest mb-1">Rental Price</span>
                                    <div className="text-2xl font-black text-[#004d2b]">₹{item.price}<span className="text-sm text-[#004d2b]/50 font-medium">/{item.unit}</span></div>
                                </div>
                                <button onClick={() => alert(`Booking flow triggered for ${item.name}`)} className="w-12 h-12 rounded-2xl bg-[#004d2b] text-[#a4e320] flex items-center justify-center hover:bg-[#003b20] transition-colors shadow-md">
                                    <CalendarIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
