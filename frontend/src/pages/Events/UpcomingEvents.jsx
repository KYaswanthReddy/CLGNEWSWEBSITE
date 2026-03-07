import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents } from '../../services/api';
import {
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    Users,
    X,
    ArrowRight,
    ChevronRight,
    Star,
    CheckCircle
} from 'lucide-react';

const UpcomingEvents = () => {
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await getEvents();
                // Map API data to include a Date object for the calendar logic
                const monthMap = {
                    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
                    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'June': 5,
                    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
                };

                const processedEvents = data.map(e => {
                    const monthIndex = monthMap[e.month] !== undefined ? monthMap[e.month] : parseInt(e.month) - 1;
                    return {
                        ...e,
                        jsDate: new Date(parseInt(e.year), monthIndex, parseInt(e.date))
                    };
                });
                setEvents(processedEvents);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        const event = events.find(e => e.jsDate.toDateString() === newDate.toDateString());
        if (event) {
            setSelectedEvent(event);
        } else {
            setSelectedEvent(null);
        }
    };

    const isEventDay = (date) => {
        return events.some(e => e.jsDate.toDateString() === date.toDateString());
    };

    return (
        <div className="flex flex-col gap-24 pb-32">
            {/* Event Banner */}
            <section className="h-[400px] bg-primary relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
                <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col gap-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4 shadow-xl">
                            CAMPUS CALENDAR
                        </h1>
                        <p className="text-blue-100/70 text-lg font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-xs font-black">
                            Track Workshops, Fests, & Guest Lectures
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Calendar & Details Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 w-full -mt-32 relative z-20">
                {/* Left Side: Calendar Container */}
                <div className="lg:col-span-12 flex flex-col lg:flex-row gap-16 bg-white p-12 rounded-[48px] shadow-2xl border border-slate-100">

                    <div className="lg:w-1/2 flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-4 uppercase">
                                <CalendarIcon size={28} className="text-primary" /> Month Overview
                            </h2>
                            <p className="text-gray-500 font-medium font-bold text-xs uppercase tracking-widest">Select a date to view activities.</p>
                        </div>

                        <div className="calendar-styled border border-slate-100 rounded-[32px] p-6 shadow-sm overflow-hidden">
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                className="w-full !border-none !font-sans overflow-hidden"
                                tileClassName={({ date, view }) =>
                                    view === 'month' && isEventDay(date) ? 'bg-primary/10 text-primary font-black rounded-xl relative before:content-[""] before:absolute before:bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full' : null
                                }
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Activities for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                            <div className="h-2 w-20 bg-primary rounded-full mt-2" />
                        </div>

                        <div className="flex-grow">
                            {selectedEvent ? (
                                <motion.div
                                    key={selectedEvent._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-slate-900 p-10 rounded-[40px] text-white flex flex-col gap-8 shadow-2xl relative overflow-hidden h-full min-h-[400px]"
                                >
                                    <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                                        <Star size={120} />
                                    </div>

                                    <div className="relative z-10 flex flex-col gap-6">
                                        {selectedEvent.image && (
                                            <div className="w-full h-40 rounded-3xl overflow-hidden mb-4">
                                                <img src={`http://localhost:5000${selectedEvent.image}`} alt={selectedEvent.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <span className="text-[10px] font-black tracking-widest bg-white/10 px-4 py-2 rounded-lg border border-white/10 mb-2 inline-block uppercase w-fit">UPCOMING EVENT</span>
                                        <h4 className="text-4xl font-black leading-tight tracking-tight mb-4">{selectedEvent.name}</h4>
                                        <p className="text-blue-100/70 text-lg leading-relaxed mb-8">{selectedEvent.description}</p>
                                    </div>

                                    <div className="relative z-10 grid grid-cols-2 gap-6 mt-auto pt-10 border-t border-white/10">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest"><Clock size={14} /> Schedule</div>
                                            <span className="text-sm font-bold uppercase tracking-tighter">{selectedEvent.date} {selectedEvent.month}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest"><MapPin size={14} /> Venue</div>
                                            <span className="text-sm font-bold uppercase tracking-tighter">Main Campus</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[400px] border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center p-20 text-center gap-6 group">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border-2 border-slate-100 group-hover:bg-primary/5 transition-colors">
                                        <CalendarIcon size={32} className="text-gray-300 group-hover:text-primary transition-colors" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-400 font-black uppercase tracking-widest">No events scheduled.</h4>
                                    <p className="text-slate-400 text-sm max-w-xs leading-relaxed font-bold">Please select dates with indicators to view campus activities.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured list below */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col gap-10">
                    <h2 className="text-4xl font-black text-gray-800 tracking-tight px-4 border-l-8 border-primary uppercase">All Campus Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {events.map((e, i) => (
                            <div key={i} className="bg-white p-10 rounded-[40px] flex flex-col gap-8 shadow-xl border border-slate-100 hover:-translate-y-4 group cursor-pointer transition-all duration-500">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex flex-col items-center justify-center border-2 border-primary/10 group-hover:bg-primary transition-colors">
                                        <span className="text-xl font-black text-primary group-hover:text-white leading-none tracking-tighter">{e.date}</span>
                                        <span className="text-[10px] font-black text-primary/60 group-hover:text-white uppercase tracking-widest">{e.month.substring(0, 3)}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full"><Users size={14} className="text-primary" /> Active Event</span>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-gray-800 leading-tight mb-2 group-hover:text-primary transition-colors uppercase tracking-tighter">{e.name}</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3 font-bold">{e.description}</p>
                                </div>
                                <div className="mt-4 pt-6 border-t border-slate-50 flex justify-between items-center group-hover:border-primary/20 transition-colors">
                                    <div className="flex items-center gap-2 text-xs font-black text-primary group-hover:translate-x-2 transition-transform uppercase tracking-widest">More Details <ChevronRight size={14} /></div>
                                    <CheckCircle size={20} className="text-emerald-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpcomingEvents;
