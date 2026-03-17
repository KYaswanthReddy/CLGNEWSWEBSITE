import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Calendar, Clock, Layout, ArrowLeft, Instagram, 
    Twitter, Globe, Award, Info, ChevronRight, Share2, 
    CheckCircle2, AlertCircle, Users
} from 'lucide-react';
import { getClubEvent } from '../../services/api';

const ClubEventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const { data } = await getClubEvent(id);
                setEvent(data);
            } catch (err) {
                console.error('Error fetching event detail:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const isUpcoming = (date) => {
        const eventDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate >= today;
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-60 gap-8 bg-slate-950 min-h-screen">
            <div className="w-20 h-20 border-8 border-primary border-t-transparent rounded-full animate-spin shadow-2xl shadow-primary/20"></div>
            <p className="text-slate-500 font-black uppercase text-xs tracking-[0.5em] italic">Decompressing Event Data...</p>
        </div>
    );

    if (!event) return (
        <div className="flex flex-col items-center justify-center p-40 gap-6 bg-slate-50 min-h-screen">
            <AlertCircle size={64} className="text-rose-500" />
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Event Not Found</h2>
            <Link to="/clubs" className="text-primary font-black uppercase text-xs tracking-widest border-b-2 border-primary pb-1">Return to Hub</Link>
        </div>
    );

    return (
        <div className="flex flex-col pb-32 bg-slate-50 min-h-screen font-sans">
            {/* ── Event Hero Banner ── */}
            <section className="h-[70vh] relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0">
                    <img 
                        src={`http://localhost:5000${event.eventImage}`} 
                        alt={event.eventTitle} 
                        className="w-full h-full object-cover opacity-60 scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-32 gap-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link to={`/clubs/${event.clubName.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] mb-10 hover:-translate-x-2 transition-transform bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                            <ArrowLeft size={16} /> {event.clubName} Arena
                        </Link>
                        
                        <div className="flex flex-col gap-6">
                            <div className={`w-fit px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] shadow-2xl ${isUpcoming(event.eventDate) ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                {isUpcoming(event.eventDate) ? 'Upcoming Deployment' : 'Mission Completed'}
                            </div>
                            <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter uppercase italic">{event.eventTitle}</h1>
                            
                            <div className="flex flex-wrap items-center gap-10 mt-6">
                                <div className="flex items-center gap-4 text-white/60 font-black uppercase text-xs tracking-widest">
                                    <Calendar size={20} className="text-primary" /> {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-4 text-white/60 font-black uppercase text-xs tracking-widest">
                                    <Users size={20} className="text-primary" /> {event.clubName}
                                </div>
                                <div className="flex items-center gap-4 text-white/60 font-black uppercase text-xs tracking-widest">
                                    <Layout size={20} className="text-primary" /> {event.activities?.length || 0} Phases
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Main Layout ── */}
            <section className="max-w-7xl mx-auto px-6 w-full -mt-20 relative z-20 flex flex-col gap-24">
                
                {/* Executive Summary */}
                <div className="bg-white p-12 md:p-20 rounded-[64px] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 text-blue-500 font-black uppercase text-[10px] tracking-[0.3em]">
                            <Info size={16} /> Briefing
                        </div>
                        <h2 className="text-5xl font-black text-slate-800 tracking-tighter uppercase">Executive Summary</h2>
                        <p className="text-slate-500 text-xl font-medium leading-relaxed italic border-l-8 border-primary pl-10">
                            {event.description}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* LEFT: Phases and Itinerary */}
                    <div className="lg:col-span-8 flex flex-col gap-20">
                        
                        <div className="flex flex-col gap-10">
                            <div className="flex items-center gap-6">
                                <div className="w-4 h-12 bg-indigo-500 rounded-full" />
                                <h3 className="text-4xl font-black text-slate-800 tracking-tight uppercase italic">Event Itinerary</h3>
                            </div>

                            <div className="flex flex-col gap-10 relative pl-8 border-l-4 border-slate-100 py-4">
                                {event.activities?.map((act, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative bg-white p-10 rounded-[48px] border border-slate-100 shadow-lg group hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                                    >
                                        <div className="absolute top-1/2 -left-[44px] -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-500 group-hover:bg-primary transition-colors shadow-lg z-10" />
                                        
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-primary bg-primary/5 px-4 py-2 rounded-full w-fit uppercase tracking-widest">{act.time || 'TBA'}</span>
                                                <h4 className="text-3xl font-black text-slate-800 uppercase tracking-tight italic group-hover:translate-x-2 transition-transform">{act.name}</h4>
                                            </div>
                                            <div className="flex -space-x-3">
                                                {[1,2,3].map(n => (
                                                    <div key={n} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">P{n}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-medium leading-relaxed italic">{act.description}</p>
                                    </motion.div>
                                ))}
                                {(!event.activities || event.activities.length === 0) && (
                                    <div className="bg-slate-50 p-12 rounded-[48px] border-2 border-dashed border-slate-200 text-center flex flex-col items-center gap-4">
                                        <Clock className="text-slate-200 w-12 h-12" />
                                        <span className="text-slate-300 font-black uppercase text-xs tracking-widest">Phases under active development</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Event Photo Reel */}
                        <div className="flex flex-col gap-10">
                            <div className="flex items-center gap-6">
                                <div className="w-4 h-12 bg-rose-500 rounded-full" />
                                <h3 className="text-4xl font-black text-slate-800 tracking-tight uppercase italic">Digital Gallery</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {event.images?.map((img, i) => (
                                    <motion.div 
                                        key={i}
                                        whileHover={{ scale: 1.02 }}
                                        className="h-80 rounded-[48px] overflow-hidden shadow-2xl border-4 border-white"
                                    >
                                        <img src={`http://localhost:5000${img}`} className="w-full h-full object-cover" alt="Gallery" />
                                    </motion.div>
                                ))}
                                {(!event.images || event.images.length === 0) && (
                                    <div className="col-span-full h-80 bg-slate-100 rounded-[48px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 opacity-40 grayscale">
                                        <Layout size={64} className="text-slate-300" />
                                        <span className="text-slate-400 font-black uppercase text-xs tracking-widest">Awaiting visual synchronization</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Achievements & Socials */}
                    <div className="lg:col-span-4 flex flex-col gap-16">
                        
                        {/* Event Specific Achievements */}
                        <div className="bg-white p-12 rounded-[64px] shadow-xl border border-slate-100 flex flex-col gap-10">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4">
                                    <Award className="text-amber-500 w-10 h-10" /> The Honors
                                </h3>
                                <div className="h-1.5 w-24 bg-amber-500 rounded-full" />
                            </div>
                            <div className="flex flex-col gap-10">
                                {event.achievements?.map((ach, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 shrink-0 shadow-lg border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                            <Star size={24} />
                                        </div>
                                        <div className="flex flex-col gap-1 justify-center">
                                            <h5 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none italic group-hover:text-amber-600 transition-colors">{ach.title}</h5>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ach.recipient}</span>
                                        </div>
                                    </div>
                                ))}
                                {(!event.achievements || event.achievements.length === 0) && (
                                    <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.4em] text-center py-8 italic opacity-50">Awaiting Recognition Matrix</p>
                                )}
                            </div>
                        </div>

                        {/* Connect Matrix */}
                        <div className="bg-slate-950 p-12 rounded-[64px] text-white flex flex-col gap-12 shadow-2xl shadow-black relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
                            <div className="flex flex-col gap-2">
                                <h3 className="text-3xl font-black uppercase tracking-tighter italic">Broadcast</h3>
                                <div className="h-1.5 w-20 bg-primary rounded-full" />
                            </div>
                            <div className="flex flex-col gap-6">
                                <button className="w-full bg-white/5 border border-white/10 hover:bg-primary py-6 rounded-[32px] flex items-center justify-center gap-4 group transition-all">
                                    <Instagram size={24} className="text-primary group-hover:text-white" />
                                    <span className="font-black uppercase text-[10px] tracking-widest">Share to Stories</span>
                                </button>
                                <button className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-slate-900 py-6 rounded-[32px] flex items-center justify-center gap-4 group transition-all">
                                    <Share2 size={24} />
                                    <span className="font-black uppercase text-[10px] tracking-widest">Copy Intelligence Link</span>
                                </button>
                            </div>
                            <div className="flex gap-4 pt-10 border-t border-white/10">
                                {event.socialLinks?.instagram && <a href={event.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl"><Instagram size={24} /></a>}
                                {event.socialLinks?.twitter && <a href={event.socialLinks.twitter} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl"><Twitter size={24} /></a>}
                                {event.socialLinks?.website && <a href={event.socialLinks.website} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl"><Globe size={24} /></a>}
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default ClubEventDetail;
