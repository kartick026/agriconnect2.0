"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun, Wind, Droplets, MapPin, CloudLightning, Calendar } from 'lucide-react';

export default function WeatherForecast() {
    const [location, setLocation] = useState('Pune, Maharashtra');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulating API call for now
        setTimeout(() => {
            const baseTemp = location.includes('Delhi') ? 35 : location.includes('Nashik') ? 26 : location.includes('Indore') ? 32 : location.includes('Karnal') ? 30 : 28;
            setWeatherData({
                location: location,
                current: {
                    temp: baseTemp,
                    condition: baseTemp > 32 ? 'Sunny' : 'Partly Cloudy',
                    humidity: baseTemp > 32 ? 45 : 65,
                    windSpeed: 12,
                    rainChance: baseTemp > 32 ? 5 : 20
                },
                forecast: [
                    { day: 'Today', max: 30, min: 22, condition: 'cloudy' },
                    { day: 'Tomorrow', max: 31, min: 23, condition: 'sunny' },
                    { day: 'Wed', max: 29, min: 21, condition: 'rain' },
                    { day: 'Thu', max: 28, min: 20, condition: 'storm' },
                    { day: 'Fri', max: 32, min: 24, condition: 'sunny' },
                    { day: 'Sat', max: 33, min: 25, condition: 'cloudy' },
                    { day: 'Sun', max: 31, min: 23, condition: 'sunny' }
                ]
            });
            setLoading(false);
        }, 800);
    }, [location]);

    const getWeatherIcon = (condition: string, className: string) => {
        switch (condition) {
            case 'sunny': return <Sun className={`text-yellow-500 ${className}`} />;
            case 'cloudy': return <CloudRain className={`text-gray-400 ${className}`} />;
            case 'rain': return <CloudRain className={`text-blue-500 ${className}`} />;
            case 'storm': return <CloudLightning className={`text-purple-600 ${className}`} />;
            default: return <Sun className={`text-yellow-500 ${className}`} />;
        }
    };

    if (loading) return <div className="animate-pulse space-y-8 max-w-5xl mx-auto"><div className="h-48 bg-gray-200 rounded-3xl"></div><div className="grid grid-cols-7 gap-4"><div className="h-32 bg-gray-200 rounded-2xl col-span-1"></div></div></div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
                    <CloudRain className="w-8 h-8 mr-3 text-blue-500" /> Farm Weather API
                </h1>
                <p className="text-gray-500 mt-1">Hyper-local precision forecasting to plan your sowing and harvesting.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white opacity-10">
                    <Sun className="w-64 h-64" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <div className="flex items-center space-x-2 text-blue-100 font-medium mb-4">
                            <MapPin className="w-5 h-5 text-blue-200" />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-transparent border-b border-blue-400/30 text-white font-bold text-xl focus:outline-none focus:bg-blue-800 cursor-pointer pb-1"
                            >
                                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                                <option value="Delhi, NCR">Delhi, NCR</option>
                                <option value="Nashik, Maharashtra">Nashik, Maharashtra</option>
                                <option value="Indore, MP">Indore, MP</option>
                                <option value="Karnal, Haryana">Karnal, Haryana</option>
                                <option value="Guntur, AP">Guntur, AP</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-6">
                            <h2 className="text-7xl font-light tracking-tighter">{weatherData.current.temp}°<span className="text-4xl">C</span></h2>
                            <div className="flex flex-col">
                                <span className="text-2xl font-semibold mb-1">{weatherData.current.condition}</span>
                                <span className="text-blue-200 font-medium">Feels like {weatherData.current.temp + 2}°C</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-8 md:mt-0 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                        <div className="flex flex-col items-center">
                            <Droplets className="w-6 h-6 text-blue-200 mb-2" />
                            <span className="font-bold text-xl">{weatherData.current.humidity}%</span>
                            <span className="text-xs text-blue-200 uppercase tracking-wider">Humidity</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Wind className="w-6 h-6 text-blue-200 mb-2" />
                            <span className="font-bold text-xl">{weatherData.current.windSpeed} km/h</span>
                            <span className="text-xs text-blue-200 uppercase tracking-wider">Wind</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <CloudRain className="w-6 h-6 text-blue-200 mb-2" />
                            <span className="font-bold text-xl">{weatherData.current.rainChance}%</span>
                            <span className="text-xs text-blue-200 uppercase tracking-wider">Rain Prob.</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <h3 className="text-xl font-bold text-gray-900 flex items-center pt-4">
                <Calendar className="w-6 h-6 mr-2 text-indigo-500" /> 7-Day Precision Forecast
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {weatherData.forecast.map((day: any, i: number) => (
                    <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center transition-all ${i === 0 ? 'ring-2 ring-blue-500 shadow-md' : 'shadow-sm hover:shadow-md'}`}
                    >
                        <span className={`text-sm font-bold ${i === 0 ? 'text-blue-600' : 'text-gray-500'}`}>{day.day}</span>
                        <div className="my-4">
                            {getWeatherIcon(day.condition, "w-10 h-10")}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900">{day.max}°</span>
                            <span className="text-gray-400 text-sm font-medium">{day.min}°</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl mt-8 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h4 className="font-bold text-indigo-900 mb-1">AI Farming Advisory</h4>
                    <p className="text-sm text-indigo-800">Rain is expected this Wednesday. Delay spraying pesticides or fertilizers.</p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700">
                    Set Advisory SMS Alert
                </button>
            </div>

        </div>
    );
}
