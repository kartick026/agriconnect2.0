"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Cloud, Sun, CloudRain, LogOut, Sprout, ChevronDown, Globe, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { data: session } = useSession();
    const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिंदी (Hindi)" },
        { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
        { code: "mr", label: "मराठी (Marathi)" },
        { code: "ta", label: "தமிழ் (Tamil)" },
        { code: "te", label: "తెలుగు (Telugu)" }
    ];

    useEffect(() => {
        // Fetch local weather from our backend
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/weather`)
            .then((res) => res.json())
            .then((data) => setWeather(data))
            .catch((err) => console.error("Weather fetch error", err));

        function handleClickOutside(event: MouseEvent) {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMobileSidebar = () => {
        window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
    };

    const getWeatherIcon = (condition: string) => {
        if (condition.includes("Sun")) return <Sun className="w-5 h-5 text-yellow-500" />;
        if (condition.includes("Rain")) return <CloudRain className="w-5 h-5 text-blue-500" />;
        return <Cloud className="w-5 h-5 text-gray-500" />;
    };

    return (
        <nav className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-[#004d2b]/10 z-40 sticky top-0 shadow-sm">

            {/* Left side: Logo + Menu (visible on mobile only) */}
            <div className="flex items-center space-x-3 md:hidden">
                <button
                    onClick={toggleMobileSidebar}
                    className="p-2 rounded-xl bg-[#f0f4eb] text-[#004d2b] hover:bg-[#e0eadb] transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <Link href="/dashboard" className="flex items-center space-x-2 text-[#004d2b] font-bold text-lg">
                    <Sprout className="w-6 h-6" />
                    <span>AgriConnect</span>
                </Link>
            </div>

            {/* Right side: Weather, Language, User */}
            <div className="flex items-center space-x-3 md:space-x-6 ml-auto">
                {weather && (
                    <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#f0f4eb] rounded-full border border-[#004d2b]/10">
                        {getWeatherIcon(weather.condition)}
                        <span className="text-sm font-bold text-[#004d2b]">{weather.temp}°C {weather.condition}</span>
                    </div>
                )}

                <div className="relative" ref={langRef}>
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center space-x-1.5 md:space-x-2 bg-[#f0f4eb] border border-[#004d2b]/10 hover:border-[#004d2b]/30 text-[#004d2b] font-bold text-xs md:text-sm rounded-xl px-3 md:px-4 py-2 transition-colors focus:outline-none"
                    >
                        <Globe className="w-4 h-4 text-[#a4e320]" />
                        <span className="hidden sm:inline">{languages.find(l => l.code === i18n.language)?.label || "English"}</span>
                        <span className="sm:hidden uppercase">{i18n.language || "en"}</span>
                        <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isLangOpen && (
                        <div className="absolute top-12 right-0 bg-[#004d2b] text-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden min-w-[170px] z-50 border border-white/10">
                            <div className="py-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            i18n.changeLanguage(lang.code);
                                            setIsLangOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors hover:bg-[#a4e320] hover:text-[#004d2b] ${i18n.language === lang.code ? 'bg-[#003b20] text-[#a4e320]' : 'text-gray-200'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pl-1 md:pl-4">
                    {session ? (
                        <div className="flex items-center space-x-3 md:space-x-4">
                            <span className="text-sm font-bold text-[#004d2b] hidden md:block">
                                {session.user?.name}
                            </span>
                            <img
                                src="https://ui-avatars.com/api/?name=Modern+Farmer&background=004d2b&color=a4e320"
                                alt="User"
                                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-[#a4e320] shadow-sm"
                            />
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-[#004d2b]/50 hover:text-red-600 transition-colors p-1 hidden sm:block"
                                title="Sign Out"
                            >
                                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="text-xs md:text-sm font-bold text-[#004d2b] bg-[#a4e320] px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-[#8ec21b] transition-colors shadow-sm whitespace-nowrap">
                            LOGIN
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
