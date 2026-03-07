import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Palette, Mic, Cpu, Pen, Lightbulb, Code2, Trophy, Brush, Star,
    Users, ChevronRight, Rocket
} from 'lucide-react';

// ── All 9 clubs with unique branding ─────────────────────────────────────────
const ALL_CLUBS = [
    {
        id: 'pixel',
        name: 'Pixel Club',
        tagline: 'Digital & Traditional Arts',
        description: 'Where imagination meets canvas. The creative heartbeat of our university, fostering talent in digital illustration, photography, fine arts and campus design.',
        icon: Palette,
        color: 'from-indigo-500 to-purple-600',
        bg: 'bg-indigo-600',
        light: 'bg-indigo-50',
        accent: 'text-indigo-600',
        border: 'border-indigo-100',
        members: '120+',
        events: '15',
        meet: 'Every Friday',
        link: '/clubs/pixel',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop',
    },
    {
        id: 'cultural',
        name: 'Cultural Club',
        tagline: 'Dance, Music & Theatre',
        description: 'Celebrating the rich tapestry of culture through classical dance, folk music, street plays, and annual cultural festivals that unite the entire campus.',
        icon: Mic,
        color: 'from-rose-500 to-pink-600',
        bg: 'bg-rose-600',
        light: 'bg-rose-50',
        accent: 'text-rose-600',
        border: 'border-rose-100',
        members: '200+',
        events: '20',
        meet: 'Every Saturday',
        link: '/clubs/cultural',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop',
    },
    {
        id: 'technical',
        name: 'Technical Club',
        tagline: 'Engineering & Innovation',
        description: 'A hub for hardware enthusiasts, IoT builders and robotics fanatics. We build, break and innovate with real-world engineering projects and national competition entries.',
        icon: Cpu,
        color: 'from-blue-500 to-cyan-600',
        bg: 'bg-blue-600',
        light: 'bg-blue-50',
        accent: 'text-blue-600',
        border: 'border-blue-100',
        members: '180+',
        events: '12',
        meet: 'Every Thursday',
        link: '/clubs/technical',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 'graphic-design',
        name: 'Graphic Design Club',
        tagline: 'Branding & Visual Identity',
        description: 'Crafting the visual voice of our university — from event posters and social media creatives to full brand identities. Master Figma, Illustrator and brand strategy.',
        icon: Pen,
        color: 'from-amber-500 to-orange-600',
        bg: 'bg-amber-500',
        light: 'bg-amber-50',
        accent: 'text-amber-600',
        border: 'border-amber-100',
        members: '90+',
        events: '10',
        meet: 'Every Wednesday',
        link: '/clubs/graphic-design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop',
    },
    {
        id: 'innovation',
        name: 'Innovation Club',
        tagline: 'Startups & Problem Solving',
        description: 'From idea to MVP — the Innovation Club incubates student startups, organises ideathons and connects founders with mentors, investors and resources.',
        icon: Lightbulb,
        color: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-600',
        light: 'bg-emerald-50',
        accent: 'text-emerald-600',
        border: 'border-emerald-100',
        members: '150+',
        events: '18',
        meet: 'Every Tuesday',
        link: '/clubs/innovation',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 'coding',
        name: 'Coding Club',
        tagline: 'Competitive Programming',
        description: 'Train for ICPC, crack coding interviews, build open-source projects and level up your DSA. Weekly contests, practice sessions and placement prep in one place.',
        icon: Code2,
        color: 'from-slate-700 to-slate-900',
        bg: 'bg-slate-800',
        light: 'bg-slate-50',
        accent: 'text-slate-700',
        border: 'border-slate-200',
        members: '250+',
        events: '25',
        meet: 'Every Mon & Wed',
        link: '/clubs/coding',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 'sports',
        name: 'Sports Club',
        tagline: 'Athletics & Team Sports',
        description: 'Training, tournaments and team spirit — the Sports Club oversees cricket, basketball, volleyball, kabaddi and more, with dedicated coaches and inter-college representation.',
        icon: Trophy,
        color: 'from-orange-500 to-red-600',
        bg: 'bg-orange-500',
        light: 'bg-orange-50',
        accent: 'text-orange-600',
        border: 'border-orange-100',
        members: '300+',
        events: '30',
        meet: 'Daily Training',
        link: '/clubs/sports',
        image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 'artix',
        name: 'Artix Club',
        tagline: 'Mixed Media & Street Art',
        description: 'Street murals, spray art, zine-making, and installation art — Artix is where unconventional creativity thrives. Come express, experiment and exhibit without boundaries.',
        icon: Brush,
        color: 'from-violet-500 to-fuchsia-600',
        bg: 'bg-violet-600',
        light: 'bg-violet-50',
        accent: 'text-violet-600',
        border: 'border-violet-100',
        members: '80+',
        events: '8',
        meet: 'Every Sunday',
        link: '/clubs/artix',
        image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2644&auto=format&fit=crop',
    },
    {
        id: 'inauguration',
        name: 'Inauguration Club',
        tagline: 'Events & Ceremonies',
        description: 'The official campus events committee — coordinating college fests, convocations, guest lecture series, and every major ceremony with precision and flair.',
        icon: Star,
        color: 'from-yellow-500 to-amber-600',
        bg: 'bg-yellow-500',
        light: 'bg-yellow-50',
        accent: 'text-yellow-600',
        border: 'border-yellow-100',
        members: '60+',
        events: '35',
        meet: 'Event-based',
        link: '/clubs/inauguration',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
    },
];

const Clubs = () => {
    return (
        <div className="flex flex-col gap-20 pb-32">
            {/* ── Hero Banner ── */}
            <section className="bg-slate-900 pt-24 pb-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -ml-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -mr-64 -mb-64 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl flex flex-col gap-6">
                        <div className="flex items-center gap-3 text-blue-300 font-black uppercase text-[10px] tracking-[0.4em]">
                            <Users size={14} /> Campus Communities · {ALL_CLUBS.length} Active Clubs
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.92] tracking-tighter">
                            FIND YOUR <span className="text-blue-400 italic">PASSION</span>.
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
                            Join one of our {ALL_CLUBS.length} vibrant student clubs — from competitive coding to street art, sports to startups.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Club Cards Grid ── */}
            <section className="max-w-7xl mx-auto px-6 w-full -mt-32 relative z-20 flex flex-col gap-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ALL_CLUBS.map((club, i) => {
                        const Icon = club.icon;
                        return (
                            <motion.div
                                key={club.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    to={club.link}
                                    className="flex flex-col bg-white rounded-[36px] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 overflow-hidden h-full group"
                                >
                                    {/* Cover image */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={club.image}
                                            alt={club.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        {/* Category tag */}
                                        <span className={`absolute top-4 left-4 ${club.bg} text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg`}>
                                            {club.tagline}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col gap-5 p-7 flex-1">
                                        {/* Icon + Name */}
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${club.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform shrink-0`}>
                                                <Icon size={22} />
                                            </div>
                                            <h3 className={`text-xl font-black text-slate-800 tracking-tight group-hover:${club.accent} transition-colors`}>
                                                {club.name}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 flex-1">
                                            {club.description}
                                        </p>

                                        {/* Stats row */}
                                        <div className={`flex items-center gap-4 pt-4 border-t ${club.border} text-[10px] font-black uppercase tracking-widest`}>
                                            <span className="flex items-center gap-1.5 text-slate-400">
                                                <Users size={11} /> {club.members} Members
                                            </span>
                                            <span className="flex items-center gap-1.5 text-slate-400">
                                                <Rocket size={11} /> {club.events} Events
                                            </span>
                                            <span className={`ml-auto flex items-center gap-1 ${club.accent} group-hover:translate-x-1 transition-transform`}>
                                                View <ChevronRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="bg-slate-900 rounded-[48px] p-12 md:p-20 flex flex-col items-center text-center gap-10 relative overflow-hidden shadow-2xl border border-white/5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase relative z-10">
                        THE <span className="text-blue-400 italic">CREATIVE</span><br />COLLECTIVE
                    </h2>
                    <p className="text-slate-400 text-sm font-medium max-w-lg uppercase tracking-widest relative z-10">
                        Every Talent. Every Ambition. Every Story.
                    </p>
                    <button className="relative z-10 bg-white text-primary px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-2xl shadow-blue-500/10">
                        Start Your Legacy
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Clubs;
