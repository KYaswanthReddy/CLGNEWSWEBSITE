import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Rocket, Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Admin shortcut
        if (email === 'admin@college.edu' && password === 'admin123') {
            login({ name: 'Admin User', email, role: 'admin' });
            navigate('/admin');
            return;
        }

        // Look up in localStorage registry
        const registry = JSON.parse(localStorage.getItem('user_registry') || '[]');
        const found = registry.find(
            u => u.email === email.trim().toLowerCase() && u.password === password
        );

        if (!found) {
            setError('Invalid email or password. Please try again or register.');
            return;
        }

        login({ name: found.name, email: found.email, phone: found.phone, role: found.role });
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-20 px-4 relative overflow-hidden bg-slate-50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-[400px] -mt-[400px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] -ml-[400px] -mb-[400px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[48px] shadow-2xl overflow-hidden border border-slate-100 z-10"
            >
                {/* Left: Design/Info */}
                <div className="hidden lg:flex flex-col justify-between bg-primary p-20 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/30 opacity-50 backdrop-blur-3xl pointer-events-none" />
                    <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-10">
                        <div className="flex items-center gap-4 group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-xl">
                                <Rocket className="text-primary w-8 h-8" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight uppercase leading-none">College News</span>
                                <span className="text-[10px] text-blue-200 font-bold tracking-widest uppercase mt-2">Official University Hub</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 max-w-sm">
                            <h2 className="text-4xl font-black leading-tight tracking-tight mt-10">Gateway to <span className="text-blue-300 underline decoration-wavy decoration-2 underline-offset-8">Campus Insights</span></h2>
                            <p className="text-blue-100/70 font-medium leading-relaxed">Login to access exclusive academic content, detailed placement analytics, and event registrations tailored specifically for you.</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-6 mt-20">
                        <div className="flex items-center gap-4 bg-white/10 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                            <ShieldCheck className="text-blue-300 w-10 h-10 flex-shrink-0" />
                            <p className="text-sm text-blue-50 font-medium">Enhanced encryption protection for your student credentials.</p>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="p-10 md:p-20 flex flex-col justify-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            {message && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 border border-red-100 text-sm font-bold animate-slide-up">
                                    <AlertCircle size={18} /> {message}
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-start gap-3 border border-red-100 text-sm font-semibold">
                                    <AlertCircle size={17} className="mt-0.5 shrink-0" /> {error}
                                </div>
                            )}
                            <h1 className="text-4xl font-black text-gray-800 tracking-tight">Welcome Back</h1>
                            <p className="text-gray-500 font-medium">Continue your journey with the official news portal.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] uppercase font-black text-primary tracking-widest ml-1">Academic Email</label>
                                <div className="group relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="email"
                                        placeholder="student@college.edu"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 border-2 border-slate-100 py-5 pl-16 pr-8 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-end ml-1">
                                    <label className="text-[10px] uppercase font-black text-primary tracking-widest">Secret Key</label>
                                    <NavLink to="/" className="text-[10px] uppercase font-bold text-gray-400 hover:text-primary transition-colors">Forgot Password?</NavLink>
                                </div>
                                <div className="group relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 border-2 border-slate-100 py-5 pl-16 pr-8 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-semibold"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="bg-primary text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-primary/20 hover:-translate-y-2 transition-all flex items-center justify-center gap-3 mt-4">
                                Authorize Entry <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="flex items-center gap-4 py-4">
                            <div className="h-px flex-grow bg-slate-100" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">OR START FRESH</span>
                            <div className="h-px flex-grow bg-slate-100" />
                        </div>

                        <NavLink to="/register" className="group flex items-center justify-center gap-4 bg-slate-900 border border-slate-800 text-white py-5 rounded-2xl transition-all hover:bg-black uppercase text-[10px] font-black tracking-widest shadow-xl">
                            Create New Student Profile <User size={16} className="group-hover:rotate-12 transition-transform" />
                        </NavLink>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
