"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Leaf, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

export default function DiseaseScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<{ disease: string; confidence: number; remedy: string } | null>(null);

    const handleSimulateScan = () => {
        setIsScanning(true);
        setResult(null);

        // Simulate API call to Vision AI
        setTimeout(() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/detect-disease`, { method: "POST" })
                .then(res => res.json())
                .then(data => {
                    setResult(data);
                    setIsScanning(false);
                })
                .catch(() => setIsScanning(false));
        }, 2500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center">
                    <Leaf className="w-10 h-10 mr-3 text-green-600" /> Plant Doctor AI
                </h1>
                <p className="text-gray-500 mt-3 text-lg">Upload or snap a photo of a sick leaf, and our AI will diagnose it instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl border-2 border-dashed border-green-200 hover:border-green-400 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]"
                    onClick={handleSimulateScan}
                >
                    {isScanning ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-16 h-16 text-green-600 animate-spin mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">Analyzing Leaf...</h3>
                            <p className="text-gray-500 mt-2">Running computer vision models</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                <Camera className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tap to upload a photo</h3>
                            <p className="text-gray-500 max-w-xs">Supports JPG, PNG up to 10MB. Make sure the leaf is clearly visible and in focus.</p>

                            <div className="mt-8 flex gap-4">
                                <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700">
                                    <Camera className="w-5 h-5 mr-2" /> Take Photo
                                </button>
                                <button className="flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-semibold shadow-sm hover:bg-gray-50">
                                    <Upload className="w-5 h-5 mr-2" /> Browse
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Results Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-500 ${result ? 'bg-gradient-to-b from-red-50 to-white border-red-100 shadow-lg' : 'bg-gray-50 border-gray-100 flex items-center justify-center'}`}
                >
                    {!result && !isScanning && (
                        <p className="text-gray-400 italic">Upload an image to see the diagnosis here.</p>
                    )}

                    {result && (
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold mb-4">
                                        <AlertTriangle className="w-3 h-3 mr-1" /> Disease Detected
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{result.disease}</h2>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-4xl font-extrabold text-green-600">{(result.confidence * 100).toFixed(0)}%</span>
                                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Confidence Level</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 mt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Recommended Action
                                </h3>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed shadow-sm">
                                    {result.remedy}
                                </div>
                            </div>

                            <button className="w-full mt-4 py-4 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                                Connect with an Expert Agri-Officer
                            </button>
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
}
