import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FeatureCard({ title, icon, color, delay }: { title: string, icon: React.ReactNode, color: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className={`p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer transition-colors hover:border-${color}-200`}
        >
            <div className={`p-4 rounded-full bg-${color}-50 text-${color}-600 mb-4`}>
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="mt-4 flex flex-row items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Try it out <ArrowRight className="w-4 h-4 ml-1" />
            </div>
        </motion.div>
    );
}
