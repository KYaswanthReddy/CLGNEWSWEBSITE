import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Card from '../../components/Card';
import {
    Trophy,
    ChevronRight,
    Target,
    Dribbble,
    Activity,
    Flame,
    Star,
    Users,
    Newspaper,
    Calendar,
    MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getSportsNews } from '../../services/api';

const Sports = () => {
    const [sportsNews, setSportsNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await getSportsNews();
                setSportsNews(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const sportCategories = [
        { title: 'Cricket', icon: Target, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b565da?q=80&w=2667&auto=format&fit=crop', description: 'Our most popular sport with a state-level championship team.', link: '/sports/cricket' },
        { title: 'Basketball', icon: Dribbble, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop', description: 'Experience the rush with our dynamic basketball squads.', link: '/sports/basketball' },
        { title: 'Kabaddi', icon: Activity, image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2614&auto=format&fit=crop', description: 'Traditional sport with unmatched energy and strength.', link: '/sports/kabaddi' },
        { title: 'Badminton', icon: Flame, image: 'https://images.unsplash.com/photo-1613918431703-0ed0937a07bf?q=80&w=2670&auto=format&fit=crop', description: 'Smash your way to victory in our indoor badminton court.', link: '/sports/badminton' },
        { title: 'Throwball', icon: Target, image: 'https://images.unsplash.com/photo-1628108422303-343be3839213?q=80&w=2670&auto=format&fit=crop', description: 'Teamwork and precision defined in our throwball games.', link: '/sports/throwball' },
        { title: 'Kho-Kho', icon: Activity, image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2614&auto=format&fit=crop', description: 'Fast-paced agility and teamwork in traditional kho-kho.', link: '/sports/khokho' },
        { title: 'Running', icon: Star, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2670&auto=format&fit=crop', description: 'Athletic track events for the swift and the brave.', link: '/sports/running' },
        { title: 'Volleyball', icon: Dribbble, image: 'https://images.unsplash.com/photo-1592656631147-f1aa211495c0?q=80&w=2670&auto=format&fit=crop', description: 'Service, set and spike at our campus volleyball sand court.', link: '/sports/volleyball' },
    ];

    return (
        <div className="flex flex-col gap-24 pb-32">
            {/* Banner */}
            <section className="h-[500px] bg-primary-dark relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1541252260730-0412e3e2104e?q=80&w=2674&auto=format&fit=crop" alt="Sports Banner" className="w-full h-full object-cover opacity-30 active:scale-110 transition-transform duration-[8000ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center gap-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="flex items-center gap-3 text-blue-400 font-black uppercase text-xs tracking-[0.3em] mb-4">
                            <Trophy size={16} />
                            Athletics Department
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                            ELITE <span className="text-primary italic">SPORTS</span> NEWS
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl font-medium max-w-3xl leading-relaxed opacity-80 font-black uppercase tracking-widest text-xs">
                            Discover the pulse of campus athletics.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Latest News Grid */}
            <section className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-20">
                <div className="flex flex-col gap-6">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter uppercase leading-none">Latest Sports <span className="text-primary">Headlines</span></h2>
                    <div className="h-2 w-32 bg-primary rounded-full" />
                </div>

                {loading ? (
                    <div className="flex justify-center p-32"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {sportsNews.map((news, i) => (
                            <motion.div
                                key={news._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[48px] shadow-xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    {news.image ? (
                                        <img src={`http://localhost:5000${news.image}`} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white">
                                            <Newspaper size={64} className="opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                                        {news.category || 'General'}
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col flex-1 gap-6">
                                    <div className="flex items-center gap-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                                        <div className="flex items-center gap-2"><Calendar size={14} /> {new Date(news.date).toLocaleDateString()}</div>
                                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <div className="flex items-center gap-2 font-black text-emerald-500"><MapPin size={14} /> Campus Arena</div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800 leading-tight group-hover:text-primary transition-colors uppercase tracking-tighter">{news.title}</h3>
                                    <p className="text-gray-500 text-sm font-bold leading-relaxed line-clamp-3">
                                        {news.content}
                                    </p>
                                    <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Full Coverage</span>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Sports Grid */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-slate-100 pb-12">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter leading-none uppercase">
                            Our Sports <span className="text-primary italic">Clubs</span>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white px-8 py-5 rounded-2xl border border-slate-200 flex flex-col items-center">
                            <span className="text-3xl font-black text-primary">15+</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Sports</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-black uppercase text-xs">
                    {sportCategories.map((sport, idx) => (
                        <motion.div
                            key={sport.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link to={sport.link} className="flex flex-col gap-6 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-[10] transition-all duration-[1500ms]" />
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center relative z-10 shadow-lg group-hover:bg-white transition-colors">
                                    <sport.icon className="text-white w-8 h-8 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-2xl font-black text-gray-800 group-hover:text-white transition-colors tracking-tighter uppercase">{sport.title}</h3>
                                    <p className="text-gray-500 font-bold leading-relaxed group-hover:text-blue-100 transition-colors">{sport.description}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center relative z-10 group-hover:border-white/10 uppercase tracking-widest text-[10px]">
                                    <span className="text-primary group-hover:text-white">Learn More</span>
                                    <ChevronRight className="text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Sports;
