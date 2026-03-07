import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building, MapPin, Calendar, DollarSign, ArrowLeft, ChevronRight,
    CheckCircle, Globe, Info, Clock, Users, Star, Briefcase, ExternalLink,
    Search, X, TrendingUp, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlacements } from '../../services/api';

// ── Placeholder full-time job data ────────────────────────────────────────────
const PLACEHOLDER = [
    {
        _id: 'j1',
        title: 'Software Development Engineer',
        companyName: 'Amazon',
        type: 'Job',
        location: 'Hyderabad, India',
        package: '₹22 LPA + Stocks',
        experience: 'Fresher / 0–1 Yr',
        deadline: 'April 05, 2024',
        logo: null,
        badge: 'NEW',
        badgeColor: 'bg-blue-600',
        skills: ['Java', 'System Design', 'Data Structures', 'AWS', 'Distributed Systems'],
        eligibility: '7.0+ CGPA · CSE / IT · Batch 2024',
        perks: ['RSUs Worth ₹20L', 'Relocation Bonus', 'Health Insurance', 'Annual Bonus'],
        rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Bar Raiser', 'HR Round'],
        description: 'Amazon is recruiting fresh graduates for its core SDE-1 role across Hyderabad & Bangalore. You will work on Amazon\'s core services including retail, logistics, and AWS. Expect high-ownership engineering work with direct impact on millions of customers. The package includes base salary, signing bonus, and RSUs vesting over 4 years.',
        applicationLink: '#',
    },
    {
        _id: 'j2',
        title: 'Product Analyst',
        companyName: 'Flipkart',
        type: 'Job',
        location: 'Bangalore, India',
        package: '₹18 LPA',
        experience: 'Fresher',
        deadline: 'March 30, 2024',
        logo: null,
        badge: 'HOT',
        badgeColor: 'bg-rose-600',
        skills: ['SQL', 'Python', 'Excel', 'A/B Testing', 'Product Thinking'],
        eligibility: '7.5+ CGPA · Any Branch · Batch 2024',
        perks: ['ESOPs', 'Flexible Hours', 'Annual Bonus', 'Insurance', 'Swiggy One'],
        rounds: ['Aptitude Test', 'Case Study', 'Technical Interview', 'HR Round'],
        description: 'Flipkart is looking for data-driven Product Analysts to join its Growth & Monetization team. You\'ll analyze large-scale customer behavior data, run A/B experiments, and provide insights that shape product roadmaps used by 500 million Indians. Excellent opportunity for freshers who love data and products.',
        applicationLink: '#',
    },
    {
        _id: 'j3',
        title: 'VLSI Design Engineer',
        companyName: 'Intel Corporation',
        type: 'Job',
        location: 'Bangalore, India',
        package: '₹24 LPA',
        experience: 'Fresher / 0–2 Yrs',
        deadline: 'April 20, 2024',
        logo: null,
        badge: 'OPEN',
        badgeColor: 'bg-slate-600',
        skills: ['Verilog', 'SystemVerilog', 'FPGA', 'DFT', 'STA'],
        eligibility: '8.0+ CGPA · ECE / EEE · Batch 2024',
        perks: ['Medical Insurance', 'On-Campus Gym', 'Global Rotations', 'Higher Education Sponsorship'],
        rounds: ['Resume Screening', 'Technical Test (HDL)', 'Design Interview ×2', 'Managerial Round'],
        description: 'Intel India\'s chip design centre in Bangalore is hiring fresh VLSI engineers to work on next-generation processor and accelerator designs. You will work on RTL design, verification and physical implementation for Intel\'s roadmap chips. This is a premium opportunity for ECE students passionate about hardware.',
        applicationLink: '#',
    },
    {
        _id: 'j4',
        title: 'Cloud Operations Engineer',
        companyName: 'Infosys (Elite Track)',
        type: 'Job',
        location: 'Pan India',
        package: '₹9.5 LPA',
        experience: 'Fresher',
        deadline: 'March 25, 2024',
        logo: null,
        badge: 'CLOSING SOON',
        badgeColor: 'bg-orange-500',
        skills: ['Linux', 'AWS / Azure', 'Scripting', 'ITIL', 'Kubernetes'],
        eligibility: '7.0+ CGPA · CSE / ECE / EEE / IT · Batch 2024',
        perks: ['Training Bond (2 yrs)', 'PF + Gratuity', 'Annual Hike', 'L&D Budget'],
        rounds: ['Online Test', 'Technical Interview', 'HR Interview'],
        description: 'Infosys InfyTQ Elite Track is a premium hiring program for students with outstanding academics. Selected candidates undergo a 3-month training program and are deployed in cloud and DevOps roles across the globe. An excellent entry point for students targeting international exposure.',
        applicationLink: '#',
    },
    {
        _id: 'j5',
        title: 'Mechanical Design Engineer',
        companyName: 'Tata Motors',
        type: 'Job',
        location: 'Pune, India',
        package: '₹7 LPA',
        experience: 'Fresher',
        deadline: 'April 12, 2024',
        logo: null,
        badge: 'OPEN',
        badgeColor: 'bg-emerald-600',
        skills: ['CATIA', 'SolidWorks', 'FEA', 'GD&T', 'Manufacturing Processes'],
        eligibility: '7.5+ CGPA · MECH / CIVIL · Batch 2024',
        perks: ['Vehicle Allowance', 'Housing Allowance', 'Medical Cover', 'Annual Bonus'],
        rounds: ['Aptitude Test', 'Technical Interview', 'HR Round'],
        description: 'Tata Motors invites Mechanical Engineering graduates to join its EV Design Centre in Pune. You will contribute to the structural and powertrain design of India\'s next generation of electric vehicles. The role offers rapid career progression within India\'s largest automobile manufacturer.',
        applicationLink: '#',
    },
    {
        _id: 'j6',
        title: 'Data Engineer',
        companyName: 'Deloitte USI',
        type: 'Job',
        location: 'Hyderabad / Bangalore',
        package: '₹11.5 LPA',
        experience: 'Fresher / 0–2 Yrs',
        deadline: 'April 30, 2024',
        logo: null,
        badge: 'OPEN',
        badgeColor: 'bg-blue-500',
        skills: ['Python', 'Spark', 'Hadoop', 'SQL', 'Azure Data Factory'],
        eligibility: '6.5+ CGPA · CSE / IT / ECE · Batch 2024',
        perks: ['Global Visa Sponsorship', 'Annual Hike', 'PF', 'Medical Insurance', 'Certification Budget'],
        rounds: ['Aptitude + Verbal Test', 'Technical Panel Interview', 'HR Round'],
        description: 'Deloitte\'s data engineering practice is looking for freshers to join rapidly growing data platform projects for Fortune 500 US clients. You will build scalable data pipelines, work on cloud-native architectures, and consult directly with international stakeholders. High potential for onsite US / UK travel within 12–18 months.',
        applicationLink: '#',
    },
];

// ── Pill ──────────────────────────────────────────────────────────────────────
const Pill = ({ icon: Icon, label, value, color = 'bg-slate-100 text-slate-600' }) => (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${color}`}>
        <Icon size={12} />
        <span className="uppercase tracking-wide">{label}: <span className="font-black">{value}</span></span>
    </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const Jobs = () => {
    const [selected, setSelected] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getPlacements();
                const filtered = data.filter(p => p.type === 'Job');
                setJobs(filtered.length > 0 ? filtered : PLACEHOLDER);
            } catch {
                setJobs(PLACEHOLDER);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const displayed = jobs.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.companyName.toLowerCase().includes(search.toLowerCase())
    );

    const item = jobs.find(j => j._id === selected);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-32">
            {/* ── Header ── */}
            <section className="bg-slate-900 py-16 relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link to="/placements" className="flex items-center gap-2 text-blue-400 font-black uppercase text-[10px] tracking-widest mb-5 hover:text-white transition-colors w-fit">
                        <ArrowLeft size={14} /> Back to Placements
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase">
                        Career <span className="text-blue-400 italic">Opportunities</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium mt-4 uppercase tracking-widest">
                        {jobs.length} Open Positions · Full Time Roles · Batch 2024
                    </p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="max-w-7xl mx-auto px-6 w-full py-12">
                {loading ? (
                    <div className="flex justify-center p-32">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 group-hover:border-blue-200 transition-colors shrink-0 p-3">
                                                {job.logo
                                                    ? <img src={`http://localhost:5000${job.logo}`} className="w-full h-full object-contain" alt="logo" />
                                                    : <Briefcase size={26} className="text-blue-500" />
                                                }
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {job.badge && (
                                                        <span className={`${job.badgeColor || 'bg-blue-600'} text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest`}>
                                                            {job.badge}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Full-Time</span>
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                                <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 font-semibold">
                                                    <span className="flex items-center gap-1"><Building size={11} /> {job.companyName}</span>
                                                    {job.location && <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>}
                                                    {job.experience && <span className="flex items-center gap-1"><Clock size={11} /> {job.experience}</span>}
                                                    {job.package && <span className="flex items-center gap-1 text-blue-600 font-black"><TrendingUp size={11} /> {job.package}</span>}
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
                                                <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-blue-700 group-hover:rotate-12 transition-all shadow-lg shadow-blue-500/30">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {displayed.length === 0 && (
                                        <div className="bg-white rounded-[28px] p-16 text-center border-2 border-dashed border-slate-200">
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No jobs match your search.</p>
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
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-black uppercase text-[11px] tracking-widest transition-colors w-fit group"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Jobs
                                </button>

                                <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
                                    {/* Hero */}
                                    <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-10 md:p-14 text-white flex flex-col md:flex-row justify-between items-start gap-10">
                                        <div className="flex flex-col gap-5 max-w-2xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                                    <Briefcase size={26} className="text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-blue-400 font-black uppercase text-[10px] tracking-widest">{item.companyName}</p>
                                                    <p className="text-slate-300 text-xs font-semibold">Campus Recruitment Drive 2024</p>
                                                </div>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black leading-none tracking-tighter uppercase">{item.title}</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {item.location && <Pill icon={MapPin} label="Location" value={item.location} color="bg-white/10 text-white" />}
                                                {item.experience && <Pill icon={Clock} label="Experience" value={item.experience} color="bg-white/10 text-white" />}
                                                {item.package && <Pill icon={TrendingUp} label="Package" value={item.package} color="bg-blue-500/20 text-blue-300" />}
                                            </div>
                                        </div>
                                        {item.applicationLink && (
                                            <a
                                                href={item.applicationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 shrink-0"
                                            >
                                                Apply For Job <ExternalLink size={16} />
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
                                                    <span className="w-6 h-1.5 bg-blue-500 rounded-full" /> About the Role
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed text-base">{item.description}</p>
                                            </div>

                                            {/* Interview Rounds */}
                                            {item.rounds && (
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                                        <span className="w-6 h-1.5 bg-rose-500 rounded-full" /> Interview Process
                                                    </h3>
                                                    <div className="flex flex-col gap-3">
                                                        {item.rounds.map((r, i) => (
                                                            <div key={i} className="flex items-center gap-4 bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                                                                <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">{i + 1}</span>
                                                                <span className="text-sm font-bold text-slate-700">{r}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Skills required */}
                                            {item.skills && (
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                                        <span className="w-6 h-1.5 bg-violet-500 rounded-full" /> Skills Required
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.skills.map(s => (
                                                            <span key={s} className="bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold px-4 py-2 rounded-xl">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Perks */}
                                            {item.perks && (
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                                        <span className="w-6 h-1.5 bg-amber-500 rounded-full" /> Compensation & Perks
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
                                                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                                                    <Info size={14} /> Quick Facts
                                                </h4>
                                                <div className="flex flex-col gap-4 text-sm">
                                                    {[
                                                        { label: 'Company', value: item.companyName },
                                                        { label: 'Package', value: item.package || 'N/A' },
                                                        { label: 'Experience', value: item.experience || 'N/A' },
                                                        { label: 'Deadline', value: item.deadline || 'N/A' },
                                                        { label: 'Location', value: item.location || 'N/A' },
                                                    ].map(r => (
                                                        <div key={r.label} className="flex justify-between items-center border-b border-white/5 pb-3">
                                                            <span className="text-slate-400 font-bold">{r.label}</span>
                                                            <span className="text-white font-black text-right max-w-[55%] text-xs">{r.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Eligibility */}
                                            {item.eligibility && (
                                                <div className="bg-blue-50 border border-blue-100 rounded-[28px] p-8 flex flex-col gap-4">
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                                        <Users size={14} /> Eligibility Criteria
                                                    </h4>
                                                    <p className="text-blue-800 font-bold text-sm leading-relaxed">{item.eligibility}</p>
                                                </div>
                                            )}

                                            {/* Policy note */}
                                            <div className="bg-slate-100 rounded-[28px] p-6 text-slate-500 text-xs font-medium leading-relaxed">
                                                <Award size={12} className="inline-block mr-1 text-blue-500" />
                                                Verified by TPO Cell. Candidates must register through the internal placement portal. Ensure your resume is approved before the drive.
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

export default Jobs;
