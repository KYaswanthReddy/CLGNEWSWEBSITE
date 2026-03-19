import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [callStatus, setCallStatus] = useState('');

    const quickReplies = [
        "Events 🎉",
        "Time Table 📅",
        "Clubs 🎸",
        "Placements 💼",
        "Sports ⚽",
        "Achievements 🏆",
    ];

    const messagesEndRef = useRef(null);
    const formRef = useRef(null);

    // Initial greeting when opened for the first time
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const now = new Date();
            const hour = now.getHours();
            let timeGreeting = '';

            if (hour >= 5 && hour < 12) {
                timeGreeting = 'morning';
            } else if (hour >= 12 && hour < 17) {
                timeGreeting = 'afternoon';
            } else if (hour >= 17 && hour < 21) {
                timeGreeting = 'evening';
            } else {
                timeGreeting = 'night';
            }

            const initialGreetings = [
                `Yo! 👋 Good ${timeGreeting}! I'm NewsBot, your campus hype squad! Ready to spill the tea on RGUKT Ongole? What's popping? 🔥`,
                `Hey bestie! 💫 Good ${timeGreeting}! NewsBot here with that fresh campus energy. What's the vibe today? Events, clubs, or placements? ✨`,
                `Sup fam! 🌟 Good ${timeGreeting}! I'm NewsBot, your go-to for RGUKT Ongole updates. What's the tea? Need some campus deets? 🎉`,
                `What's good! 👋 Good ${timeGreeting}! NewsBot bringing that campus energy. What's the word? Events, clubs, or placement updates? ⚡`
            ];

            setMessages([
                {
                    id: Date.now(),
                    sender: 'bot',
                    text: initialGreetings[Math.floor(Math.random() * initialGreetings.length)],
                    timestamp: new Date()
                }
            ]);
        }
    }, [isOpen]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current && !isCalling) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isCalling]);

    // Audio call timer
    useEffect(() => {
        let interval;
        if (isCalling && callStatus === 'connected') {
            interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCalling, callStatus]);

    const initiateCall = () => {
        setIsCalling(true);
        setCallStatus('connecting');
        setCallDuration(0);

        // Simulate connecting delay
        setTimeout(() => {
            setCallStatus('connected');
        }, 2000);
    };

    const endCall = () => {
        setIsCalling(false);
        setCallStatus('');
        setCallDuration(0);
        setIsMuted(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleSendMessage = async (e) => {
        e?.preventDefault();

        if (!inputValue.trim()) return;

        const messageText = inputValue.trim();

        const newUserMessage = {
            id: Date.now(),
            sender: 'user',
            text: messageText,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await sendChatMessage(messageText);
            
            const botResponse = {
                id: Date.now() + 1,
                sender: 'bot',
                text: response.data.reply || "Sorry, I didn't get a response.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error('Error fetching bot response:', error);
            const errorResponse = {
                id: Date.now() + 1,
                sender: 'bot',
                text: "Sorry, I'm having trouble connecting to the server.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleQuickReply = (text) => {
        setInputValue(text);
        // We use a timeout to let the state update before triggering send
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }, 50);
    };

    // Component logic uses the backend API directly via fetch

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
                        className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-white/10"
                    >
                        {/* Header Area */}
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 pb-6 flex items-start justify-between relative overflow-hidden shrink-0">
                            {/* Decorative background blur inside header */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 blur-2xl rounded-full" />

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                                        <Bot className="w-7 h-7 text-white" />
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-indigo-600 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-white text-lg tracking-wide flex items-center gap-2">
                                        NewsBot <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </h3>
                                    <p className="text-blue-100 text-xs font-medium">Always online & ready to vibe ⚡</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 relative z-10">
                                <button
                                    onClick={initiateCall}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                                    title="Voice Call"
                                >
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Overlapping wavy/diagonal divider can be added here, but keeping it clean with a subtle shadow */}
                        <div className="h-4 bg-gradient-to-b from-black/5 to-transparent absolute top-20 left-0 w-full z-10 pointer-events-none" />

                        {isCalling ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 text-white relative overflow-hidden">
                                {/* Background ripples */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {callStatus === 'connected' && (
                                        <>
                                            <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute w-36 h-36 bg-blue-500/20 rounded-full" />
                                            <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.4 }} className="absolute w-36 h-36 bg-indigo-500/20 rounded-full" />
                                            <motion.div animate={{ scale: [1, 3.2, 1], opacity: [0.1, 0, 0.1] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }} className="absolute w-36 h-36 bg-purple-500/10 rounded-full" />
                                        </>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 mb-6">
                                    <Bot className="w-12 h-12 text-white" />
                                </div>

                                {/* Info */}
                                <h3 className="relative z-10 text-2xl font-bold font-heading mb-2">Bot</h3>
                                <p className="relative z-10 text-slate-300 mb-12 h-6 flex items-center justify-center">
                                    {callStatus === 'connecting' ? 'Connecting...' : formatTime(callDuration)}
                                </p>

                                {/* Controls */}
                                <div className="relative z-10 flex items-center gap-6 mt-auto mb-8">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-slate-700/80 text-white' : 'bg-slate-700/80 text-white'}`}
                                    >
                                        {isMuted ? <MicOff className="w-6 h-6 text-red-400" /> : <Mic className="w-6 h-6" />}
                                    </button>

                                    <button
                                        onClick={endCall}
                                        className="p-5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-105 active:scale-95"
                                    >
                                        <PhoneOff className="w-7 h-7" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 dark:bg-slate-800/50 custom-scrollbar">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                                {/* Avatar Mini */}
                                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-auto ${msg.sender === 'user'
                                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md transform translate-y-2'
                                                    : 'bg-primary shadow-md transform translate-y-2'
                                                    }`}>
                                                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                                </div>

                                                {/* Message Bubble */}
                                                <div className={`px-4 py-3 md:text-sm text-[15px] shadow-sm relative ${msg.sender === 'user'
                                                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-[20px] rounded-br-[4px]'
                                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-[20px] rounded-bl-[4px]'
                                                    }`}>
                                                    {msg.text}
                                                    <span className={`block text-[10px] mt-1.5 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="flex max-w-[80%] gap-2">
                                                <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-auto shadow-md transform translate-y-2 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                    <Bot className="w-4 h-4 text-white relative z-10" />
                                                </div>
                                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-4 rounded-[20px] rounded-bl-[4px] shadow-sm flex items-center gap-1.5">
                                                    <motion.span animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-indigo-500 rounded-full block" />
                                                    <motion.span animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-indigo-500 rounded-full block" />
                                                    <motion.span animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-indigo-500 rounded-full block" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} className="h-1" />
                                </div>

                                {/* Input Area & Quick Replies */}
                                <div className="p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 shrink-0 relative z-20">

                                    {/* Quick Replies */}
                                    {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
                                        <div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar snap-x">
                                            {quickReplies.map((reply, index) => (
                                                <motion.button
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    onClick={() => handleQuickReply(reply)}
                                                    type="button"
                                                    className="whitespace-nowrap snap-center px-4 py-1.5 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-full shadow-sm hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-300 transition-all flex items-center gap-1.5"
                                                >
                                                    {reply}
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}

                                    <form
                                        ref={formRef}
                                        onSubmit={handleSendMessage}
                                        className="relative flex items-center"
                                    >
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Ask NewsBot..."
                                            className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500/30 transition-all placeholder:text-slate-400 shadow-inner"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputValue.trim()}
                                            className="absolute right-1.5 top-1.5 bottom-1.5 w-[42px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 group shadow-md"
                                        >
                                            <Send className="w-[18px] h-[18px] ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </form>
                                    <div className="text-center mt-2.5">
                                        <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase flex items-center justify-center gap-1">
                                            <Sparkles className="w-3 h-3 text-yellow-500/70" /> Powered by Campus AI
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl shadow-indigo-600/30 flex items-center justify-center text-white relative z-50 group hover:shadow-2xl hover:shadow-indigo-600/40 transition-shadow border-2 border-white/20"
            >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center justify-center"
                        >
                            <MessageCircle className="w-8 h-8" />
                            {/* GenZ flair: Little notification badge/sparkle */}
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default Chatbot;
