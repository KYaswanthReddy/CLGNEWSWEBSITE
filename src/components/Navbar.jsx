import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Search, Bell, ChevronDown, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout, isAdmin, isAuthenticated } = useAuth();
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sports', path: '/sports' },
        { name: 'Placements', path: '/placements' },
        { name: 'Exams', path: '/exams' },
        { name: 'Clubs', path: '/clubs' },
        { name: 'Events', path: '/events' },
        { name: 'Achievements', path: '/achievements' },
    ];

    // Derive initials or first letter of email
    const emailInitial = user?.email ? user.email[0].toUpperCase() : '?';
    const displayEmail = user?.email || 'Unknown';
    const displayName = user?.name || user?.email?.split('@')[0] || 'Student';

    return (
        <nav className="fixed w-full z-50 transition-all duration-300">
            {/* Top Banner */}
            <div className="bg-primary text-white py-2 px-4 shadow-md hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1 hover:text-blue-200 cursor-pointer">
                            Official News Portal
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Search className="w-3.5 h-3.5" />
                        <Bell className="w-3.5 h-3.5" />
                        <span className="cursor-pointer hover:text-blue-200 uppercase">Contact Support</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group min-w-0">
                            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white border border-red-100">
                                <img src="/rgukt-logo.png" alt="RGUKT Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-sm font-black text-red-700 tracking-tight leading-tight truncate">RGUKT ONGOLE</span>
                                <span className="text-[8px] sm:text-[9px] text-gray-400 font-semibold tracking-wide uppercase leading-tight">Gifted Rural Youth</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            <div className="h-6 w-px bg-gray-200 mx-2" />

                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    {isAdmin && (
                                        <Link to="/admin" className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                            ADMIN
                                        </Link>
                                    )}

                                    {/* ── Profile Dropdown ── */}
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setProfileOpen(prev => !prev)}
                                            className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-full transition-all duration-200 shadow-sm group"
                                        >
                                            {/* Avatar circle with initial */}
                                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black flex-shrink-0 shadow">
                                                {emailInitial}
                                            </div>
                                            <div className="flex flex-col items-start max-w-[130px]">
                                                <span className="text-xs font-black text-slate-800 leading-tight truncate w-full">{displayName}</span>
                                                <span className="text-[9px] text-slate-400 font-medium truncate w-full">{displayEmail}</span>
                                            </div>
                                            <ChevronDown size={13} className={`text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Dropdown Panel */}
                                        <AnimatePresence>
                                            {profileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                                                >
                                                    {/* User info header */}
                                                    <div className="bg-gradient-to-br from-primary to-primary/80 p-5 flex flex-col gap-2">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-xl font-black">
                                                            {emailInitial}
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-black text-sm leading-tight">{displayName}</p>
                                                            <p className="text-blue-200 text-xs mt-0.5 flex items-center gap-1.5 break-all">
                                                                <Mail size={10} className="shrink-0" /> {displayEmail}
                                                            </p>
                                                        </div>
                                                        {isAdmin && (
                                                            <span className="flex items-center gap-1 bg-red-500/20 text-red-200 border border-red-400/30 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full w-fit">
                                                                <ShieldCheck size={9} /> Admin
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="p-2 flex flex-col gap-1">
                                                        {isAdmin && (
                                                            <Link
                                                                to="/admin"
                                                                onClick={() => setProfileOpen(false)}
                                                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold text-sm transition-colors"
                                                            >
                                                                <ShieldCheck size={16} /> Admin Dashboard
                                                            </Link>
                                                        )}
                                                        <button
                                                            onClick={() => { logout(); setProfileOpen(false); }}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-bold text-sm transition-colors w-full text-left"
                                                        >
                                                            <LogOut size={16} /> Logout
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="btn-primary flex items-center gap-2">
                                        <User size={16} />
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg flex items-center gap-2 text-sm uppercase tracking-widest">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button className="lg:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
                    >
                        <div className="px-6 py-8 flex flex-col gap-4">
                            {/* Mobile profile strip */}
                            {isAuthenticated && (
                                <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 mb-2 border border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-base shrink-0">
                                        {emailInitial}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-black text-slate-800 truncate">{displayName}</span>
                                        <span className="text-[10px] text-slate-400 font-medium truncate flex items-center gap-1">
                                            <Mail size={9} /> {displayEmail}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-gray-800 hover:text-primary py-2 border-b border-gray-50 flex justify-between items-center"
                                >
                                    {link.name}
                                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg font-bold text-red-600 py-2 border-b border-gray-50">Admin Dashboard</Link>}
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-lg font-bold text-red-500 py-2 flex items-center gap-2">
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4 mt-4">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary text-center py-4 text-lg">
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="px-6 py-4 bg-slate-900 text-white font-bold rounded-xl text-center text-lg uppercase tracking-widest">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
