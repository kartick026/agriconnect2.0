"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun, Wind, Droplets, MapPin, CloudLightning, Calendar, Search, Loader2 } from 'lucide-react';

// WMO Weather interpretation codes (Open-Meteo)
const getWeatherDescStr = (code: number) => {
    if (code === 0) return 'Clear Sky';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 82) return 'Snowy';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Clear Sky';
};

const getWeatherIconStr = (code: number) => {
    if (code === 0) return 'sunny';
    if (code >= 1 && code <= 3) return 'cloudy';
    if (code >= 51 && code <= 67) return 'rain';
    if (code >= 95 && code <= 99) return 'storm';
    return 'sunny';
};

export default function WeatherForecast() {
    const [locationInput, setLocationInput] = useState('');
    const [locationName, setLocationName] = useState('Detecting location...');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    // Initial load: Try to get user's geolocation, fallback to Delhi
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude, "Your Location");
                },
                (error) => {
                    console.warn("Geolocation denied or failed, defaulting to Delhi.");
                    fetchWeather(28.6139, 77.2090, "Delhi, India");
                }
            );
        } else {
            fetchWeather(28.6139, 77.2090, "Delhi, India");
        }
    }, []);

    const fetchWeather = async (lat: number, lon: number, name: string) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
            const data = await res.json();

            // Format daily forecast
            const forecastDays = data.daily.time.map((dateStr: string, index: number) => {
                const date = new Date(dateStr);
                const isToday = index === 0;
                const isTomorrow = index === 1;
                const dayName = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' });

                return {
                    day: dayName,
                    max: Math.round(data.daily.temperature_2m_max[index]),
                    min: Math.round(data.daily.temperature_2m_min[index]),
                    code: data.daily.weather_code[index],
                    condition: getWeatherIconStr(data.daily.weather_code[index]),
                    rainChance: data.daily.precipitation_probability_max[index] || 0
                };
            });

            setWeatherData({
                current: {
                    temp: Math.round(data.current.temperature_2m),
                    conditionStr: getWeatherDescStr(data.current.weather_code),
                    humidity: Math.round(data.current.relative_humidity_2m),
                    windSpeed: Math.round(data.current.wind_speed_10m),
                    rainChance: data.daily.precipitation_probability_max[0] || 0
                },
                forecast: forecastDays
            });
            setLocationName(name);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setSearching(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!locationInput.trim()) return;

        setSearching(true);
        try {
            // Geocoding API to convert city name to coordinates
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();

            if (geoData.results && geoData.results.length > 0) {
                const place = geoData.results[0];
                const displayName = `${place.name}${place.admin1 ? `, ${place.admin1}` : ''}, ${place.country}`;
                await fetchWeather(place.latitude, place.longitude, displayName);
                setLocationInput('');
            } else {
                alert("Location not found. Please try another city.");
                setSearching(false);
            }
        } catch (err) {
            console.error("Geocoding failed", err);
            setSearching(false);
        }
    };

    const getWeatherIcon = (condition: string, className: string) => {
        switch (condition) {
            case 'sunny': return <Sun className={`text-yellow-500 ${className}`} />;
            case 'cloudy': return <CloudRain className={`text-gray-400 ${className}`} />;
            case 'rain': return <CloudRain className={`text-blue-500 ${className}`} />;
            case 'storm': return <CloudLightning className={`text-purple-600 ${className}`} />;
            default: return <Sun className={`text-yellow-500 ${className}`} />;
        }
    };

    if (loading && !weatherData) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-green-700">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium text-lg animate-pulse">Fetching latest meteorological data...</p>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
                        <CloudRain className="w-8 h-8 mr-3 text-blue-500" /> Farm Weather API
                    </h1>
                    <p className="text-gray-500 mt-1">Live precision forecasting to plan your sowing and harvesting.</p>
                </div>
                
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search for any city or mandi..."
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <button 
                        type="submit" 
                        disabled={searching || !locationInput.trim()}
                        className="absolute right-2 top-2 p-1.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 disabled:opacity-50 transition-colors"
                    >
                        {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    </button>
                </form>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl p-8 text-white shadow-xl relative overflow-hidden transition-colors duration-1000 ${
                    weatherData.current.temp > 35 ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-900/20' : 
                    weatherData.current.temp > 25 ? 'bg-gradient-to-br from-blue-600 to-indigo-800 shadow-blue-900/20' : 
                    'bg-gradient-to-br from-teal-500 to-cyan-700 shadow-teal-900/20'
                }`}
            >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white opacity-10">
                    {getWeatherIconStr(weatherData.forecast[0].code) === 'sunny' ? <Sun className="w-64 h-64" /> : <CloudRain className="w-64 h-64" />}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <div className="flex items-center space-x-2 text-white/80 font-medium mb-4">
                            <MapPin className="w-5 h-5 text-current" />
                            <span className="font-bold text-xl">{locationName}</span>
                            {loading && <Loader2 className="w-4 h-4 text-white animate-spin ml-2" />}
                        </div>
                        <div className="flex items-center space-x-6">
                            <h2 className="text-7xl font-light tracking-tighter">{weatherData.current.temp}°<span className="text-4xl">C</span></h2>
                            <div className="flex flex-col">
                                <span className="text-2xl font-semibold mb-1">{weatherData.current.conditionStr}</span>
                                <span className="text-white/80 font-medium">Feels like {weatherData.current.temp + Math.round(weatherData.current.humidity > 60 ? 2 : -1)}°C</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-8 md:mt-0 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                        <div className="flex flex-col items-center">
                            <Droplets className="w-6 h-6 text-white/80 mb-2" />
                            <span className="font-bold text-xl">{weatherData.current.humidity}%</span>
                            <span className="text-xs text-white/80 uppercase tracking-wider text-center mt-1">Humidity</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Wind className="w-6 h-6 text-white/80 mb-2" />
                            <span className="font-bold text-xl">{weatherData.current.windSpeed} km/h</span>
                            <span className="text-xs text-white/80 uppercase tracking-wider text-center mt-1">Wind</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <CloudRain className="w-6 h-6 text-white/80 mb-2" />
                            <span className="font-bold text-xl">{weatherData.current.rainChance}%</span>
                            <span className="text-xs text-white/80 uppercase tracking-wider text-center mt-1">Rain Prob.</span>
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
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`bg-white p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${i === 0 ? 'ring-2 ring-blue-500 shadow-md border-transparent' : 'shadow-sm hover:shadow-md border-gray-100'}`}
                    >
                        <span className={`text-sm font-bold ${i === 0 ? 'text-blue-600' : 'text-gray-500'}`}>{day.day}</span>
                        <div className="my-4">
                            {getWeatherIcon(day.condition, "w-10 h-10")}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900">{day.max}°</span>
                            <span className="text-gray-400 text-sm font-medium">{day.min}°</span>
                        </div>
                        {day.rainChance > 20 && (
                            <span className="text-xs text-blue-500 font-semibold mt-2 flex items-center">
                                <Droplets className="w-3 h-3 mr-1" /> {day.rainChance}%
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl mt-8 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h4 className="font-bold text-indigo-900 mb-1">AI Farming Advisory</h4>
                    <p className="text-sm text-indigo-800">
                        {weatherData.forecast[1].rainChance > 50 
                            ? "Heavy rain expected tomorrow. Delay spraying pesticides or fertilizers and ensure proper field drainage." 
                            : weatherData.current.temp > 35 
                                ? "Extreme heat detected. Increase irrigation frequency and avoid spraying chemicals during mid-day."
                                : "Optimal weather conditions for standard farming activities today."}
                    </p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 whitespace-nowrap">
                    Set Advisory SMS Alert
                </button>
            </div>

        </div>
    );
}
