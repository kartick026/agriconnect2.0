"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Share2, Image as ImageIcon, ThumbsUp, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const POSTS = [
    {
        id: 1,
        author: "Ramesh Singh",
        location: "Karnal, Haryana",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=128&h=128&auto=format&fit=crop",
        time: "2 hours ago",
        content: "My wheat crop is showing these yellow spots on the edges. I used Urea 10 days ago. Does anyone know what this is?",
        image: "https://images.unsplash.com/photo-1599813548981-64d4b1a20a45?q=80&w=1000&auto=format&fit=crop",
        likes: 24,
        comments: 8,
        tags: ["Wheat", "Disease"]
    },
    {
        id: 2,
        author: "Dr. Anjali Patil (Agri Expert)",
        location: "Pune University",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&h=128&auto=format&fit=crop",
        time: "5 hours ago",
        content: "Warning to all farmers in Nashik region: Unseasonal heavy rains expected tomorrow evening. Please cover your harvested onions immediately to prevent rotting.",
        likes: 156,
        comments: 32,
        tags: ["Alert", "Weather", "Onion"]
    },
    {
        id: 3,
        author: "Siddharth Rao",
        location: "Guntur, AP",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&h=128&auto=format&fit=crop",
        time: "1 day ago",
        content: "Successfully installed drip irrigation on my 5-acre chilli farm today! It cost around ₹60,000 but the water savings will be immense. Highly recommend it.",
        image: "https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=1000&auto=format&fit=crop",
        likes: 89,
        comments: 14,
        tags: ["Irrigation", "Technology"]
    }
];

export default function CommunityForum() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('Feed');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Banner Image Section */}
            <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden shadow-xl border border-[#004d2b]/10 mb-8">
                <img src="/images/community_banner.png" alt="Farmers Community" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#004d2b] via-[#004d2b]/80 to-transparent flex flex-col justify-center px-8 md:px-12 backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center mb-2">
                        <Users className="w-8 h-8 md:w-12 md:h-12 mr-4 text-[#a4e320]" />
                        {t('FarmersCommunity') || 'Farmers Community'}
                    </h1>
                    <p className="text-white/80 font-medium max-w-md text-sm md:text-base">{t('CommunityDesc') || 'Ask experts, share success stories, and connect with nearby farmers in an exclusive network.'}</p>
                </div>
            </div>

            <div className="flex gap-4 border-b border-[#004d2b]/10 pb-2 overflow-x-auto">
                {[{key: 'Feed', label: 'Feed'}, {key: 'AskExpert', label: 'Ask Expert'}, {key: 'MyRequests', label: 'My Requests'}].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.key ? 'text-[#004d2b] border-[#004d2b]' : 'text-[#004d2b]/40 border-transparent hover:text-[#004d2b]/70'}`}
                    >
                        {t(tab.key) || tab.label}
                    </button>
                ))}
            </div>

            {/* Create Post */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#004d2b]/10 flex gap-4">
                <div className="w-12 h-12 bg-[#004d2b] rounded-full flex items-center justify-center text-[#a4e320] font-black shrink-0 border-2 border-[#a4e320]">
                    ME
                </div>
                <div className="flex-1">
                    <textarea
                        className="w-full bg-[#f0f4eb] border border-transparent rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#004d2b]/20 resize-none text-[#004d2b] font-medium placeholder-[#004d2b]/40"
                        placeholder={t('PostPlaceholder') || "What's happening on your farm? Ask a question or share a photo..."}
                        rows={3}
                    />
                    <div className="flex justify-between items-center mt-3">
                        <button className="text-[#004d2b]/60 hover:text-[#004d2b] flex items-center text-sm font-bold transition cursor-pointer bg-[#f0f4eb] px-4 py-2 rounded-xl">
                            <ImageIcon className="w-4 h-4 mr-2" /> {t('AddPhoto') || 'Add Photo'}
                        </button>
                        <button onClick={() => alert('Post creation initiated!')} className="px-6 py-2.5 bg-[#004d2b] text-[#a4e320] font-bold rounded-xl shadow-md hover:bg-[#003b20] transition">
                            {t('PostUpdate') || 'Post Update'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-6">
                {POSTS.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-[#f0f4eb]" />
                                <div>
                                    <h4 className="font-bold text-[#004d2b] flex items-center gap-2">
                                        {post.author}
                                        {post.author.includes('Expert') && <span className="bg-[#004d2b] text-[#a4e320] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Verified</span>}
                                    </h4>
                                    <div className="flex items-center text-[11px] text-[#004d2b]/50 font-bold uppercase tracking-wide mt-1">
                                        <MapPin className="w-3 h-3 mr-1 text-[#a4e320]" /> {post.location} • <span className="lowercase ml-1">{post.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <p className="text-[#004d2b]/80 font-medium leading-relaxed text-[15px] mb-5">{post.content}</p>

                        {post.image && (
                            <div className="rounded-2xl overflow-hidden mb-5 border border-[#004d2b]/10 bg-[#f0f4eb]">
                                <img src={post.image} alt="Farm update" className="w-full max-h-80 object-cover mix-blend-multiply" />
                            </div>
                        )}

                        <div className="flex gap-2 mb-5">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-wider bg-[#f0f4eb] text-[#004d2b]/70 px-3 py-1.5 rounded-lg border border-[#004d2b]/5">#{tag}</span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-6 border-t border-[#004d2b]/10 pt-4 text-[#004d2b]/50">
                            <button onClick={() => alert('Post liked')} className="flex items-center gap-1.5 hover:text-[#004d2b] font-bold transition cursor-pointer">
                                <ThumbsUp className="w-4 h-4" /> {post.likes}
                            </button>
                            <button onClick={() => alert('Opening comments section')} className="flex items-center gap-1.5 hover:text-[#004d2b] font-bold transition cursor-pointer">
                                <MessageSquare className="w-4 h-4" /> {post.comments} Comments
                            </button>
                            <button onClick={() => alert('Share flow initiated')} className="flex items-center gap-1.5 hover:text-[#004d2b] font-bold transition ml-auto cursor-pointer">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
