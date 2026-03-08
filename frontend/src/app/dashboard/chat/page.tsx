"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Bot, User, Languages, Volume2, Loader2, StopCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
type Message = {
    id: string;
    sender: 'bot' | 'user';
    text: string;
    isAudio?: boolean;
};

export default function ChatbotPanel() {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: 'Hello! I am your AgriConnect Assistant. I can help you with crop prices, disease identification, or government schemes. You can type or speak in English or Hindi.' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        const langName = e.target.options[e.target.selectedIndex].text;
        i18n.changeLanguage(newLang);

        const greeting = newLang === 'en' ? 'Language switched to English. How can I help?' : `Language switched to ${langName}. How can I assist you?`;
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: greeting }]);
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, language: i18n.language })
            });

            const data = await response.json();

            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: data.reply }]);
            }, 600);

        } catch (error) {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: 'Sorry, I am having trouble connecting to the server.' }]);
        }
    };

    useEffect(() => {
        if (listening) {
            setInputText(transcript);
        }
    }, [transcript, listening]);

    const toggleVoiceNavigation = () => {
        if (!browserSupportsSpeechRecognition) {
            alert("Your browser does not support speech recognition software! Try Chrome.");
            return;
        }

        if (listening) {
            SpeechRecognition.stopListening();
            if (inputText.trim()) {
                handleSend(inputText);
            }
        } else {
            resetTranscript();
            setInputText('');
            SpeechRecognition.startListening({ continuous: true, language: i18n.language === 'en' ? 'en-IN' : 'hi-IN' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-white rounded-3xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 flex justify-between items-center text-white">
                <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-xl mr-3">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">AgriConnect Assistant</h2>
                        <p className="text-green-100 text-xs flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-300 mr-1.5"></span> Online
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Languages className="w-5 h-5 text-white/80" />
                    <select
                        onChange={handleLanguageChange}
                        value={i18n.language}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-lg px-3 py-1.5 outline-none cursor-pointer font-medium transition-colors"
                    >
                        <option value="en" className="text-gray-900">English</option>
                        <option value="hi" className="text-gray-900">हिंदी (Hindi)</option>
                        <option value="pa" className="text-gray-900">ਪੰਜਾਬੀ (Punjabi)</option>
                        <option value="mr" className="text-gray-900">मराठी (Marathi)</option>
                        <option value="ta" className="text-gray-900">தமிழ் (Tamil)</option>
                        <option value="te" className="text-gray-900">తెలుగు (Telugu)</option>
                    </select>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-indigo-100 ml-3' : 'bg-green-100 mr-3'}`}>
                                    {msg.sender === 'user' ? <User className="w-4 h-4 text-indigo-700" /> : <Bot className="w-4 h-4 text-green-700" />}
                                </div>

                                {/* Message Bubble */}
                                <div className={`group relative p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'}`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                                    {/* TTS Button (only for bot) */}
                                    {msg.sender === 'bot' && (
                                        <button className="absolute -right-10 top-2 p-2 text-gray-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Volume2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex flex-row max-w-[80%]">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 mr-3 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-green-700" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex items-center space-x-1.5 text-gray-400">
                                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></span>
                                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-end gap-2 relative">

                    <button
                        onClick={toggleVoiceNavigation}
                        className={`p-3.5 rounded-xl transition-all ${listening ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-green-600'}`}
                    >
                        {listening ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>

                    <div className="flex-1 relative">
                        {listening && (
                            <div className="absolute -top-10 left-0 right-0 text-center text-sm font-semibold text-red-500 bg-red-50 py-1 rounded-md animate-pulse">
                                Listening... Speak now
                            </div>
                        )}
                        <textarea
                            className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
                            placeholder={listening ? "Listening..." : "Type your message..."}
                            rows={1}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(inputText);
                                }
                            }}
                        />
                    </div>

                    <button
                        onClick={() => handleSend(inputText)}
                        disabled={!inputText.trim()}
                        className="p-3.5 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                    >
                        <Send className="w-6 h-6" />
                    </button>

                </div>
                <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                    Powered by AgriConnect AI. Verify important information.
                </p>
            </div>

        </div>
    );
}
