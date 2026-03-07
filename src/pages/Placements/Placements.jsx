import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, TrendingUp, Download, PieChart, Users, CheckCircle, ChevronRight, ArrowLeft, ArrowRight, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Placements = () => {
    const stats = [
        { label: 'Highest Package', value: '45 LPA', icon: TrendingUp },
        { label: 'Average Package', value: '8.5 LPA', icon: Briefcase },
        { label: 'Campus Drives', value: '150+', icon: Building },
        { label: 'Placement Rate', value: '96%', icon: PieChart },
    ];

    const recentPlacements = [
        { name: 'Aditya Singh', company: 'Google', role: 'SWE Intern', package: '1.2L PM' },
        { name: 'Priya Verma', company: 'Microsoft', role: 'Support Engineer', package: '18 LPA' },
        { name: 'Kushal Reddy', company: 'Amazon', role: 'Cloud Associate', package: '22 LPA' },
        { name: 'Sakshi Gupta', company: 'Texas Instruments', role: 'Analog Engineer', package: '24 LPA' },
    ];

    return (
        <div className="flex flex-col gap-24 pb-32">
            {/* Placement Header Banner */}
            <section className="bg-primary py-24 md:py-40 relative overflow-hidden">
                {/* Abstract background shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -mr-[200px] -mt-[200px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px] -ml-[100px] -mb-[100px]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl flex flex-col gap-8">
                        <div className="flex items-center gap-3 text-blue-200 font-bold uppercase text-xs tracking-widest">
                            <Building size={16} /> Placement & Career Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                            ELEVATE YOUR <span className="text-blue-400">CAREER</span>
                        </h1>
                        <p className="text-lg text-blue-50/70 font-medium leading-relaxed max-w-xl">
                            Bridging the gap between academic brilliance and industry standards. Access the latest internship drives, recruitment news, and career counseling directly from the cell.
                        </p>
                        <div className="flex flex-wrap gap-6 pt-4">
                            <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:-translate-y-2 transition-all">
                                View New Opportunities
                            </button>
                            <button className="px-10 py-5 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-primary transition-all">
                                <Download size={18} className="inline-block mr-2" /> Placement Brochure
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl flex flex-col gap-4 text-white shadow-xl hover:bg-white/15 transition-all cursor-default">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                                    <stat.icon className="w-5 h-5 text-blue-300" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black leading-none">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1 opacity-70">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Navigation Cards: Internships & Jobs */}
            <section className="max-w-7xl mx-auto px-6 w-full -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Link to="/placements/internships" className="bg-white p-12 rounded-[56px] shadow-2xl border-4 border-slate-50 flex flex-col items-center justify-center gap-8 group hover:bg-slate-900 transition-all duration-700 min-h-[350px]">
                        <div className="w-20 h-20 bg-emerald-500 rounded-[32px] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                            <TrendingUp size={40} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-gray-800 group-hover:text-white transition-colors tracking-tighter uppercase">Internships</h3>
                            <p className="text-gray-400 font-medium group-hover:text-blue-100/60 transition-colors uppercase text-[10px] tracking-widest mt-2 font-bold">Latest Summer & Winter Drives</p>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-500 group-hover:text-white font-black uppercase text-[10px] tracking-widest">
                            Explore Roles <ChevronRight size={16} />
                        </div>
                    </Link>

                    <Link to="/placements/jobs" className="bg-white p-12 rounded-[56px] shadow-2xl border-4 border-slate-50 flex flex-col items-center justify-center gap-8 group hover:bg-primary transition-all duration-700 min-h-[350px]">
                        <div className="w-20 h-20 bg-blue-600 rounded-[32px] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                            <Briefcase size={40} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-gray-800 group-hover:text-white transition-colors tracking-tighter uppercase">Full-Time Jobs</h3>
                            <p className="text-gray-400 font-medium group-hover:text-blue-100/60 transition-colors uppercase text-[10px] tracking-widest mt-2 font-bold">Elite Recruitments & Referrals</p>
                        </div>
                        <div className="flex items-center gap-3 text-primary group-hover:text-white font-black uppercase text-[10px] tracking-widest">
                            Explore Roles <ChevronRight size={16} />
                        </div>
                    </Link>
                </div>
            </section>

            {/* Main Content Areas */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 w-full">

                {/* Left: Companies & Recent Hires */}
                <div className="lg:col-span-8 flex flex-col gap-16">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-4">
                            <span className="w-10 h-1.5 bg-primary rounded-full" />
                            Hall of Success
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {recentPlacements.map((hire, i) => (
                                <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-150 transition-transform">
                                        <Building size={64} />
                                    </div>
                                    <div className="w-20 h-20 bg-primary/5 rounded-2xl flex-shrink-0 flex items-center justify-center border-2 border-primary/10 group-hover:bg-primary transition-colors">
                                        <Users size={32} className="text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">{hire.name}</h4>
                                        <p className="text-xs text-primary font-black uppercase tracking-widest">{hire.company}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-[10px] bg-slate-100 text-gray-400 px-3 py-1 rounded-full font-bold uppercase">{hire.role}</span>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase">{hire.package}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placement Policy */}
                    <div className="bg-slate-900 p-12 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
                        <div className="flex flex-col gap-6 relative z-10 max-w-xl">
                            <h3 className="text-3xl font-black tracking-tight leading-none">The TPO Policy & Guidelines</h3>
                            <p className="text-blue-100/60 font-medium leading-relaxed">Ensure you meet all eligibility criteria before applying. Download the 2024-25 Placement Handbook for detailed guidelines on the recruitment process.</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                                    <CheckCircle size={16} /> Eligible Students
                                </div>
                                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                                    <CheckCircle size={16} /> Resume Certified
                                </div>
                            </div>
                        </div>
                        <button className="relative z-10 bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            Download Handbook
                        </button>
                    </div>
                </div>

                {/* Right Sidebar: Key Contacts & Deadlines */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight">Recruitment Schedule</h3>
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-6 p-6 bg-white border border-slate-100 rounded-3xl group cursor-pointer hover:border-primary/20 transition-all">
                                        <div className="text-center bg-slate-50 p-3 rounded-2xl w-16 group-hover:bg-primary/5 transition-colors">
                                            <span className="block text-xl font-black text-primary">2{i}</span>
                                            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest">MAR</span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="font-bold text-gray-800 text-md">Accenture Pre-Placement</h4>
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Main Seminar Hall • 10:00 AM</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary/5 p-10 rounded-[40px] border border-primary/10 flex flex-col gap-8">
                            <h3 className="text-xl font-black text-primary tracking-tight">Counseling Sessions</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">Book a 1-on-1 session with our career experts to refine your resume and prepare for technical interviews.</p>
                            <button className="bg-primary text-white w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                Book an Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Placements;
