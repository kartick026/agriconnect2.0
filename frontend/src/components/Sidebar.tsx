"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Activity, Calculator, Sprout, Landmark, Mic, CloudRain, ShoppingBag, Tractor, Users, Wallet, Crosshair, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Listen for toggle event from Navbar hamburger button
    useEffect(() => {
        const handleToggle = () => setIsMobileOpen(prev => !prev);
        window.addEventListener("toggle-mobile-sidebar", handleToggle);
        return () => window.removeEventListener("toggle-mobile-sidebar", handleToggle);
    }, []);

    const links = [
        { name: t('Dashboard') || 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: t('Prices') || 'Compare Prices', href: '/dashboard/prices', icon: <Activity size={20} /> },
        { name: t('Profit') || 'Profit Calculator', href: '/dashboard/profit', icon: <Calculator size={20} /> },
        { name: t('Community') || 'Community Forum', href: '/dashboard/community', icon: <Users size={20} /> },
        { name: t('Marketplace') || 'B2B Marketplace', href: '/dashboard/marketplace', icon: <ShoppingBag size={20} /> },
        { name: t('Equipment') || 'Equipment Rental', href: '/dashboard/equipment', icon: <Tractor size={20} /> },
        { name: t('Loans') || 'Loans & Insurance', href: '/dashboard/loans', icon: <Wallet size={20} /> },
        { name: t('Profile') || 'Farm Profile', href: '/dashboard/profile', icon: <Crosshair size={20} /> },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-[#004d2b]/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <div className={`fixed md:static inset-y-0 left-0 w-72 md:w-64 bg-white border-r border-[#004d2b]/10 h-screen md:min-h-[calc(100vh-73px)] p-4 flex flex-col space-y-2 z-50 transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Logo + Close button on mobile */}
                <div className="flex items-center justify-between px-6 py-6 mb-2">
                    <div className="flex items-center space-x-2 text-[#004d2b] font-bold text-2xl cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => { router.push('/'); setIsMobileOpen(false); }}>
                        <Sprout className="w-8 h-8" />
                        <span>AgriConnect</span>
                    </div>
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden p-1.5 rounded-lg text-[#004d2b]/50 hover:text-[#004d2b] hover:bg-[#f0f4eb] transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="text-xs font-bold text-[#004d2b]/60 uppercase tracking-widest mb-4 px-3 mt-2 md:mt-4">Applications</div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.name} href={link.href} onClick={() => setIsMobileOpen(false)}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={`flex items-center px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#004d2b] text-[#a4e320] font-bold shadow-md shadow-[#004d2b]/20' : 'text-[#004d2b]/70 hover:bg-[#f0f4eb] font-medium hover:text-[#004d2b]'}`}
                                >
                                    <div className={`mr-3 ${isActive ? 'text-[#a4e320]' : 'text-[#004d2b]/50'}`}>
                                        {link.icon}
                                    </div>
                                    <span className="text-[15px]">{link.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>

                <Link href="/dashboard/chat" className="mt-4 shrink-0 group" onClick={() => setIsMobileOpen(false)}>
                    <div className="p-4 bg-gradient-to-r from-[#004d2b] to-[#003b20] rounded-2xl border border-[#004d2b]/20 flex items-center space-x-3 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                        <div className="p-2.5 bg-[#a4e320]/20 text-[#a4e320] rounded-xl shadow-inner backdrop-blur-sm">
                            <Mic size={20} className="animate-pulse" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-white tracking-wide">{t('Chat') || 'AgriBot AI'}</h4>
                            <p className="text-[11px] text-[#a4e320] mt-0.5 font-bold uppercase tracking-wider">Voice Assisted</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

