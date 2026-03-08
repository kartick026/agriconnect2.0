"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState<{ id: string; sender: 'bot' | 'user'; text: string }[]>([
        { id: '1', sender: 'bot', text: 'Namaste! I am AgriBot. How can I help you today?' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now().toString(), sender: 'user' as const, text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text, language: i18n.language })
            });

            const data = await response.json();

            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: data.reply }]);
            }, 500);

        } catch (error) {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: 'Sorry, I am offline.' }]);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-[#f0f4eb] rounded-3xl shadow-2xl border border-white flex flex-col z-50 overflow-hidden"
                    >
                        <div className="bg-[#004d2b] p-5 shrink-0 flex justify-between items-center text-white">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#a4e320]/20 rounded-full">
                                    <Bot className="w-5 h-5 text-[#a4e320]" />
                                </div>
                                <h3 className="font-bold text-sm tracking-wide">AgriBot</h3>
                            </div>
                            <div className="flex items-center space-x-3">
                                <select
                                    title="Choose Language"
                                    value={i18n.language || 'en'}
                                    onChange={(e) => {
                                        i18n.changeLanguage(e.target.value);
                                        const langName = e.target.options[e.target.selectedIndex].text;
                                        setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'bot', text: `Language changed to ${langName}. How can I assist you?` }]);
                                    }}
                                    className="bg-white/20 border border-white/30 text-white text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                                >
                                    <option value="en" className="text-gray-900">English</option>
                                    <option value="hi" className="text-gray-900">हिंदी (Hindi)</option>
                                    <option value="mr" className="text-gray-900">मराठी (Marathi)</option>
                                    <option value="te" className="text-gray-900">తెలుగు (Telugu)</option>
                                    <option value="ta" className="text-gray-900">தமிழ் (Tamil)</option>
                                    <option value="pa" className="text-gray-900">ਪੰਜਾਬੀ (Punjabi)</option>
                                    <option value="gu" className="text-gray-900">ગુજરાતી (Gujarati)</option>
                                </select>
                                <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-200 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#a4e320] text-[#004d2b] rounded-br-sm font-medium' : 'bg-white border border-[#004d2b]/10 text-[#004d2b] font-medium rounded-bl-sm shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm flex space-x-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-[#004d2b]/10 shrink-0 flex space-x-2">
                            <button className="p-2.5 text-[#004d2b]/50 hover:text-[#004d2b] bg-[#f0f4eb] rounded-xl transition-colors">
                                <Mic className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-[#f0f4eb] border-transparent rounded-xl px-4 py-2.5 text-sm text-[#004d2b] font-medium focus:outline-none focus:ring-2 focus:ring-[#004d2b] placeholder-[#004d2b]/40 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="p-2.5 bg-[#004d2b] text-[#a4e320] rounded-xl hover:bg-[#003b20] disabled:opacity-50 transition-colors shadow-md"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 p-4 bg-[#004d2b] text-[#a4e320] rounded-full shadow-2xl hover:shadow-xl transition-shadow z-50 flex items-center justify-center border-4 border-white/50"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </>
    );
}
