import React, { useState, useEffect } from 'react';
import { Award, Star, TrendingUp, Users, ChevronRight, GraduationCap, Trophy, Zap, BookOpen, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAchievements } from '../../services/api';

// ── Rich placeholder data shown when backend has no entries ──────────────────
const PLACEHOLDER_ACHIEVEMENTS = [
    {
        _id: 'p1',
        title: 'Smart India Hackathon 2024 — Winners',
        description: 'Team InnoVision from our college clinched 1st place in the Smart India Hackathon 2024, competing against 500+ teams nationwide with their AI-powered crop-disease detection tool.',
        category: 'Technical',
        externalLink: '',
        badge: 'NATIONAL',
        color: 'bg-amber-500',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop',
    },
    {
        _id: 'p2',
        title: 'State-Level Best NSS Volunteer Award',
        description: 'Priya Sharma (3rd year CSE) received the State-Level Best NSS Volunteer Award for her consistent efforts in rural digital literacy programs and blood donation drives.',
        category: 'Social',
        externalLink: '',
        badge: 'STATE',
        color: 'bg-rose-500',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2574&auto=format&fit=crop',
    },
    {
        _id: 'p3',
        title: 'Google Summer of Code — Selected',
        description: 'Arjun Mehta (2nd year IT) was selected for Google Summer of Code 2024, one of only 1,800 students globally accepted to the prestigious open-source contribution program.',
        category: 'Technical',
        externalLink: '',
        badge: 'GLOBAL',
        color: 'bg-blue-500',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop',
    },
    {
        _id: 'p4',
        title: 'Inter-University Gold Medal — Mathematics',
        description: 'Kavitha Reddy secured the Gold Medal at the Inter-University Mathematics Olympiad 2024, solving 8/10 problems in record time, bringing prestigious honours to our institution.',
        category: 'Academic',
        externalLink: '',
        badge: 'GOLD',
        color: 'bg-emerald-500',
        image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2671&auto=format&fit=crop',
    },
    {
        _id: 'p5',
        title: 'Published Research — IEEE Conference',
        description: 'Prof. Suresh Kumar and student researchers published a breakthrough paper on "Efficient Edge Computing in IoT Networks" at the IEEE International Conference, Singapore.',
        category: 'Research',
        externalLink: '',
        badge: 'INTERNATIONAL',
        color: 'bg-purple-500',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop',
    },
    {
        _id: 'p6',
        title: 'Startup Incubation — ₹15L Seed Funding',
        description: 'FarmSmart, a startup founded by 4 final-year students, secured ₹15 Lakh in seed funding from IIT Bombay\'s incubation centre for their precision agriculture IoT solution.',
        category: 'Entrepreneurship',
        externalLink: '',
        badge: 'STARTUP',
        color: 'bg-orange-500',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop',
    },
];

const BADGE_COLORS = {
    NATIONAL: 'bg-amber-100 text-amber-700 border-amber-200',
    STATE: 'bg-rose-100 text-rose-700 border-rose-200',
    GLOBAL: 'bg-blue-100 text-blue-700 border-blue-200',
    GOLD: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    INTERNATIONAL: 'bg-purple-100 text-purple-700 border-purple-200',
    STARTUP: 'bg-orange-100 text-orange-700 border-orange-200',
};

const StudentAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getAchievements();
                // Use placeholder if backend returns empty array
                setAchievements(data && data.length > 0 ? data : PLACEHOLDER_ACHIEVEMENTS);
            } catch (err) {
                console.error(err);
                // Fallback to placeholder on network error too
                setAchievements(PLACEHOLDER_ACHIEVEMENTS);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categories = [
        { title: 'Academic Excellence', count: '12', icon: GraduationCap, color: 'bg-blue-500' },
        { title: 'Sports Achievements', count: '5', icon: Trophy, color: 'bg-emerald-500' },
        { title: 'Technical Innovators', count: '8', icon: Zap, color: 'bg-amber-500' },
        { title: 'Social Leaders', count: '4', icon: Users, color: 'bg-rose-500' },
    ];

    return (
        <div className="flex flex-col gap-24 pb-32">

            {/* ── Hero Banner ── */}
            <section className="bg-primary/5 py-32 md:py-48 relative overflow-hidden text-center">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-10">
                    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <div className="flex items-center justify-center gap-3 text-primary font-black uppercase text-xs tracking-[0.4em] mb-4">
                            <div className="w-12 h-1 bg-primary rounded-full" />
                            Official Wall of Fame
                            <div className="w-12 h-1 bg-primary rounded-full" />
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-gray-800 tracking-tighter leading-none mb-8">
                            CELEBRATING <span className="text-primary italic">EXCELLENCE</span>
                        </h1>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed text-lg">
                            Recognizing the extraordinary journey of our campus stars — from national hackathons to global research stages.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Category Stats ── */}
            <section className="max-w-7xl mx-auto px-6 w-full -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 flex flex-col items-center justify-center gap-6 group hover:-translate-y-4 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform`}>
                                <cat.icon size={32} />
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-gray-800 tracking-tighter">{cat.count}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{cat.title}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Achievement Grid ── */}
            <section className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-16">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-[0.3em]">
                        <span className="w-8 h-1 bg-primary rounded-full" />
                        Hall of Famers
                    </div>
                    <h2 className="text-4xl font-black text-gray-800 tracking-tight uppercase">Recent Highlights</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center p-32">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {achievements.map((item, i) => {
                            const badgeKey = item.badge || 'NATIONAL';
                            const badgeClass = BADGE_COLORS[badgeKey] || 'bg-slate-100 text-slate-600 border-slate-200';
                            const imgSrc = item.image
                                ? (item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`)
                                : null;

                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-[40px] shadow-xl border border-slate-100 flex flex-col overflow-hidden hover:-translate-y-3 group transition-all duration-500"
                                >
                                    {/* Image */}
                                    {imgSrc && (
                                        <div className="w-full h-52 overflow-hidden">
                                            <img
                                                src={imgSrc}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-5 p-8 flex-1">
                                        {/* Badge */}
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border w-fit flex items-center gap-1.5 ${badgeClass}`}>
                                            <Award size={12} /> {badgeKey}
                                        </span>

                                        <h3 className="text-xl font-black text-gray-800 leading-tight group-hover:text-primary transition-colors tracking-tight uppercase">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic flex-1">
                                            "{item.description}"
                                        </p>

                                        {item.externalLink && (
                                            <a
                                                href={item.externalLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest hover:translate-x-1 transition-transform"
                                            >
                                                Read Full Story <ChevronRight size={14} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── Legacy Makers CTA ── */}
            <section className="bg-primary py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3 text-blue-300 font-black uppercase text-xs tracking-[0.3em]">
                                <Star size={18} /> Student Spotlight
                            </div>
                            <h3 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter">
                                THE LEGACY<br />MAKERS
                            </h3>
                        </div>
                        <p className="text-blue-100/70 text-lg leading-relaxed">
                            Exhibited unparalleled brilliance in all spheres — from technical innovation to social leadership.
                        </p>
                        <div className="flex flex-col gap-6 pt-10 border-t border-white/10">
                            {[
                                { icon: Globe, text: '6 International Awards this Session' },
                                { icon: Trophy, text: '50+ National-Level Recognitions' },
                                { icon: BookOpen, text: '12 Research Papers Published' },
                            ].map(({ icon: Icon, text }, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Icon className="text-blue-400" size={20} />
                                    <span className="text-white font-black tracking-tight">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="aspect-square bg-white p-12 rounded-[56px] shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-12 text-primary/10">
                                <Award size={180} />
                            </div>
                            <div className="h-full flex flex-col justify-end gap-6 relative z-10">
                                <div className="w-24 h-24 rounded-3xl bg-primary shadow-xl shadow-primary/40 flex items-center justify-center text-white mb-4">
                                    <GraduationCap size={48} />
                                </div>
                                <h4 className="text-4xl font-black text-gray-800 leading-tight tracking-tight uppercase">
                                    STUDENT<br />OF THE YEAR
                                </h4>
                                <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3 italic">
                                    <span className="w-8 h-1 bg-gray-200 rounded-full" /> CLASS OF 2024
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentAchievements;
