import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building, MapPin, Calendar, DollarSign, ArrowLeft, ChevronRight,
    CheckCircle, Globe, Info, Clock, Users, Star, ExternalLink, Filter, Search, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlacements } from '../../services/api';

// ── Placeholder internship data ───────────────────────────────────────────────
const PLACEHOLDER = [
    {
        _id: 'i1',
        title: 'Software Engineer Intern',
        companyName: 'Google',
        type: 'Internship',
        location: 'Bangalore, India',
        duration: '3 Months',
        stipend: '₹1,20,000 / Month',
        deadline: 'March 31, 2024',
        logo: null,
        badge: 'NEW',
        badgeColor: 'bg-emerald-500',
        skills: ['Python', 'System Design', 'Data Structures', 'Cloud'],
        eligibility: '8.0+ CGPA · CSE / IT · Pre-Final Year',
        perks: ['PPO Opportunity', 'Work from Office', 'Free Meals', 'Accommodation'],
        description: 'Join Google\'s core engineering team and work on large-scale distributed systems. You will collaborate with senior engineers on real production systems that serve millions of users. The internship includes product rotations, mentorship, and opportunities for full-time conversion.',
        applicationLink: '#',
    },
    {
        _id: 'i2',
        title: 'Data Science Intern',
        companyName: 'Microsoft',
        type: 'Internship',
        location: 'Hyderabad, India',
        duration: '6 Months',
        stipend: '₹85,000 / Month',
        deadline: 'April 10, 2024',
        logo: null,
        badge: 'HOT',
        badgeColor: 'bg-rose-500',
        skills: ['ML', 'Python', 'Azure ML', 'SQL', 'Power BI'],
        eligibility: '7.5+ CGPA · CSE / IT · Any Year',
        perks: ['PPO Opportunity', 'Hybrid Mode', 'Gym Access', 'Learning Budget'],
        description: 'Work with Microsoft\'s Azure AI division to build next-generation machine learning pipelines. You\'ll get hands-on experience with Azure ML, real datasets, and ship features used by enterprise customers globally.',
        applicationLink: '#',
    },
    {
        _id: 'i3',
        title: 'Cloud Infrastructure Intern',
        companyName: 'Amazon (AWS)',
        type: 'Internship',
        location: 'Hyderabad, India',
        duration: '6 Months',
        stipend: '₹95,000 / Month',
        deadline: 'April 20, 2024',
        logo: null,
        badge: 'OPEN',
        badgeColor: 'bg-blue-500',
        skills: ['AWS', 'Linux', 'Python', 'Terraform', 'DevOps'],
        eligibility: '7.0+ CGPA · CSE / ECE / IT · Final Year',
        perks: ['Return Offer', 'Full Remote Option', 'Stock Options', 'Healthcare'],
        description: 'Amazon Web Services is looking for a Cloud Infrastructure Intern to help build and scale globally distributed systems. The role involves automation of cloud deployments, infrastructure monitoring and collaborating with cross-functional teams.',
        applicationLink: '#',
    },
    {
        _id: 'i4',
        title: 'UI/UX Design Intern',
        companyName: 'Adobe',
        type: 'Internship',
        location: 'Noida, India (Hybrid)',
        duration: '4 Months',
        stipend: '₹60,000 / Month',
        deadline: 'May 01, 2024',
        logo: null,
        badge: 'OPEN',
        badgeColor: 'bg-amber-500',
        skills: ['Figma', 'Illustrator', 'User Research', 'Prototyping', 'CSS'],
        eligibility: '6.5+ CGPA · Any Branch · Pre-Final / Final Year',
        perks: ['Adobe CC License', 'Hybrid Work', 'Portfolio Mentorship'],
        description: 'Shape the future of creative tools at Adobe. You\'ll work with our design systems team to craft interfaces for millions of creative professionals. This role is ideal for design-minded developers and full-time designers who want to influence global product UX.',
        applicationLink: '#',
    },
    {
        _id: 'i5',
        title: 'Embedded Systems Intern',
        companyName: 'Texas Instruments',
        type: 'Internship',
        location: 'Bangalore, India',
        duration: '6 Months',
        stipend: '₹70,000 / Month',
        deadline: 'April 15, 2024',
        logo: null,
        badge: 'OPEN',
        badgeColor: 'bg-violet-500',
        skills: ['C', 'RTOS', 'ARM Cortex', 'PCB Design', 'Signal Processing'],
        eligibility: '8.0+ CGPA · ECE / EEE · Final Year',
        perks: ['PPO Offer', 'Lab Equipment Access', 'Patent Opportunity'],
        description: 'Texas Instruments invites final-year ECE / EEE students to intern with its Embedded Processor Group. You will develop firmware for microcontrollers, work with DSPs, and collaborate with hardware engineers on real silicon products.',
        applicationLink: '#',
    },
    {
        _id: 'i6',
        title: 'Full Stack Developer Intern',
        companyName: 'Flipkart',
        type: 'Internship',
        location: 'Bangalore, India',
        duration: '3 Months',
        stipend: '₹80,000 / Month',
        deadline: 'March 28, 2024',
        logo: null,
        badge: 'CLOSING SOON',
        badgeColor: 'bg-orange-500',
        skills: ['React', 'Node.js', 'MongoDB', 'Redis', 'REST APIs'],
        eligibility: '7.5+ CGPA · CSE / IT · Pre-Final Year',
        perks: ['PPO Opportunity', 'Swiggy one', 'Internal Hackathons', 'Accommodation'],
        description: 'Flipkart\'s Platform Engineering team is hiring full-stack interns to help build India\'s largest e-commerce platform. You will own features from design to deployment, working on high-traffic systems that serve 500M+ users during sale events.',
        applicationLink: '#',
    },
];

// ── Stat pill ─────────────────────────────────────────────────────────────────
const Pill = ({ icon: Icon, label, value, color = 'bg-slate-100 text-slate-600' }) => (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${color}`}>
        <Icon size={12} />
        <span className="uppercase tracking-wide">{label}: <span className="font-black">{value}</span></span>
    </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const Internships = () => {
    const [selected, setSelected] = useState(null);
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getPlacements();
                const filtered = data.filter(p => p.type === 'Internship');
                setInternships(filtered.length > 0 ? filtered : PLACEHOLDER);
            } catch {
                setInternships(PLACEHOLDER);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const displayed = internships.filter(i =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.companyName.toLowerCase().includes(search.toLowerCase())
    );

    const item = internships.find(i => i._id === selected);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-32">
            {/* ── Header ── */}
            <section className="bg-slate-900 py-16 relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link to="/placements" className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[10px] tracking-widest mb-5 hover:text-white transition-colors w-fit">
                        <ArrowLeft size={14} /> Back to Placements
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase">
                        Internship <span className="text-emerald-400 italic">Portal</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium mt-4 uppercase tracking-widest">
                        {internships.length} Active Opportunities · Summer & Winter Drives
                    </p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="max-w-7xl mx-auto px-6 w-full py-12">
                {loading ? (
                    <div className="flex justify-center p-32">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <AnimatePresence mode="wait">

                        {/* ── LIST VIEW ── */}
                        {!selected && (
                            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-8">

                                {/* Search bar */}
                                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm max-w-md">
                                    <Search size={16} className="text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search role or company..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="flex-1 outline-none text-sm text-slate-700 font-medium placeholder:text-slate-400 bg-transparent"
                                    />
                                    {search && <button onClick={() => setSearch('')}><X size={14} className="text-slate-400 hover:text-slate-700" /></button>}
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    {displayed.map((job, i) => (
                                        <motion.div
                                            key={job._id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => setSelected(job._id)}
                                            className="bg-white rounded-[28px] border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
                                        >
                                            {/* Logo */}
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 group-hover:border-emerald-200 transition-colors shrink-0 p-3">
                                                {job.logo
                                                    ? <img src={`http://localhost:5000${job.logo}`} className="w-full h-full object-contain" alt="logo" />
                                                    : <Building size={28} className="text-emerald-500" />
                                                }
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {job.badge && (
                                                        <span className={`${job.badgeColor || 'bg-emerald-500'} text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest`}>
                                                            {job.badge}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Internship</span>
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                                                <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 font-semibold">
                                                    <span className="flex items-center gap-1"><Building size={11} /> {job.companyName}</span>
                                                    {job.location && <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>}
                                                    {job.duration && <span className="flex items-center gap-1"><Clock size={11} /> {job.duration}</span>}
                                                    {job.stipend && <span className="flex items-center gap-1 text-emerald-600 font-black"><DollarSign size={11} /> {job.stipend}</span>}
                                                </div>
                                                {job.skills && (
                                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                                        {job.skills.slice(0, 4).map(s => (
                                                            <span key={s} className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-lg">{s}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* CTA */}
                                            <div className="flex flex-col items-end gap-3 shrink-0">
                                                {job.deadline && (
                                                    <span className="text-[10px] text-rose-500 font-black uppercase tracking-wider flex items-center gap-1">
                                                        <Calendar size={10} /> Deadline: {job.deadline}
                                                    </span>
                                                )}
                                                <div className="bg-emerald-500 text-white w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:rotate-12 transition-all shadow-lg shadow-emerald-500/30">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {displayed.length === 0 && (
                                        <div className="bg-white rounded-[28px] p-16 text-center border-2 border-dashed border-slate-200">
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No internships match your search.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ── DETAIL VIEW ── */}
                        {selected && item && (
                            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-8">

                                {/* Back */}
                                <button
                                    onClick={() => setSelected(null)}
                                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-black uppercase text-[11px] tracking-widest transition-colors w-fit group"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Internships
                                </button>

                                <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
                                    {/* Hero */}
                                    <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-10 md:p-14 text-white flex flex-col md:flex-row justify-between items-start gap-10">
                                        <div className="flex flex-col gap-5 max-w-2xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                                    <Building size={26} className="text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-emerald-400 font-black uppercase text-[10px] tracking-widest">{item.companyName}</p>
                                                    <p className="text-slate-300 text-xs font-semibold">Internship Drive 2024</p>
                                                </div>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black leading-none tracking-tighter uppercase">{item.title}</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {item.location && <Pill icon={MapPin} label="Location" value={item.location} color="bg-white/10 text-white" />}
                                                {item.duration && <Pill icon={Clock} label="Duration" value={item.duration} color="bg-white/10 text-white" />}
                                                {item.stipend && <Pill icon={DollarSign} label="Stipend" value={item.stipend} color="bg-emerald-500/20 text-emerald-300" />}
                                            </div>
                                        </div>
                                        {item.applicationLink && (
                                            <a
                                                href={item.applicationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-emerald-500/30 hover:-translate-y-1 transition-all flex items-center gap-3 shrink-0"
                                            >
                                                Apply Now <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="p-10 md:p-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

                                        {/* Left - main info */}
                                        <div className="lg:col-span-2 flex flex-col gap-10">
                                            {/* Description */}
                                            <div className="flex flex-col gap-4">
                                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                                    <span className="w-6 h-1.5 bg-emerald-500 rounded-full" /> About the Role
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed text-base">{item.description}</p>
                                            </div>

                                            {/* Skills required */}
                                            {item.skills && (
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                                        <span className="w-6 h-1.5 bg-blue-500 rounded-full" /> Skills Required
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.skills.map(s => (
                                                            <span key={s} className="bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Perks */}
                                            {item.perks && (
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                                        <span className="w-6 h-1.5 bg-amber-500 rounded-full" /> Perks & Benefits
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {item.perks.map(p => (
                                                            <div key={p} className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs font-bold text-amber-800">
                                                                <CheckCircle size={13} className="text-amber-500 shrink-0" /> {p}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right - sidebar */}
                                        <div className="flex flex-col gap-6">
                                            {/* Quick facts */}
                                            <div className="bg-slate-900 rounded-[28px] p-8 text-white flex flex-col gap-6">
                                                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                                                    <Info size={14} /> Quick Facts
                                                </h4>
                                                <div className="flex flex-col gap-4 text-sm">
                                                    {[
                                                        { label: 'Company', value: item.companyName },
                                                        { label: 'Duration', value: item.duration || 'N/A' },
                                                        { label: 'Stipend', value: item.stipend || 'N/A' },
                                                        { label: 'Deadline', value: item.deadline || 'N/A' },
                                                        { label: 'Mode', value: item.location || 'N/A' },
                                                    ].map(r => (
                                                        <div key={r.label} className="flex justify-between items-center border-b border-white/5 pb-3">
                                                            <span className="text-slate-400 font-bold">{r.label}</span>
                                                            <span className="text-white font-black text-right max-w-[55%]">{r.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Eligibility */}
                                            {item.eligibility && (
                                                <div className="bg-emerald-50 border border-emerald-100 rounded-[28px] p-8 flex flex-col gap-4">
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                                        <Users size={14} /> Eligibility Criteria
                                                    </h4>
                                                    <p className="text-emerald-800 font-bold text-sm leading-relaxed">{item.eligibility}</p>
                                                </div>
                                            )}

                                            {/* Policy note */}
                                            <div className="bg-slate-100 rounded-[28px] p-6 text-slate-500 text-xs font-medium leading-relaxed">
                                                <Star size={12} className="inline-block mr-1 text-amber-500" />
                                                Verified by the college TPO Cell. Register through your internal placement portal before applying externally.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </section>
        </div>
    );
};

export default Internships;
