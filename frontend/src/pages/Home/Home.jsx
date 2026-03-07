import React from 'react';
import Carousel from '../../components/Carousel';
import Card from '../../components/Card';
import NewsTicker from '../../components/NewsTicker';
import { NavLink, Link } from 'react-router-dom';
import {
    Trophy,
    Briefcase,
    Calendar,
    Users,
    GraduationCap,
    Rocket,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    TrendingUp,
    Award,
    BookOpen,
    Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const carouselItems = [
        {
            title: "Annual Sports Meet 2024",
            description: "Celebrating athleticism across cricket, basketball, volleyball and kabaddi. Over 50 competitions, 300+ student athletes competing.",
            image: "https://images.unsplash.com/photo-1541252260730-0412e3e2104e?q=80&w=2674&auto=format&fit=crop",
            category: "Sports",
            link: "/sports",
            date: "March 15–20, 2024"
        },
        {
            title: "Campus Placements Drive",
            description: "Amazon, Deloitte, Infosys and Intel visit RGUKT Ongole. 500+ students placed in top MNCs this season.",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop",
            category: "Placements",
            link: "/placements",
            date: "Ongoing · 2024"
        },
        {
            title: "Mid Semester Examinations",
            description: "E1–E4 mid-term schedules are out. Check your branch-wise timetable, seating arrangements and hall tickets.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
            category: "Exams",
            link: "/exams",
            date: "April 08–15, 2024"
        },
        {
            title: "Global Tech Symposium",
            description: "Industry leaders and researchers converge to discuss AI, robotics and sustainability at our campus innovation forum.",
            image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2670&auto=format&fit=crop",
            category: "Events",
            link: "/events",
            date: "April 05, 2024"
        },
        {
            title: "Student Achievements 2024",
            description: "Our students win national hackathons, publish research papers, and represent India at international olympiads.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop",
            category: "Achievements",
            link: "/achievements",
            date: "Updated Monthly"
        },
        {
            title: "Pixel Club — Digital Art Expo",
            description: "The Pixel Club annual art exhibition — 120+ digital and traditional artworks from students across all branches.",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop",
            category: "Clubs",
            link: "/clubs/pixel",
            date: "May 10, 2024"
        },
        {
            title: "Coding Club — Hackathon 3.0",
            description: "48-hour competitive programming marathon. Build, code and compete for prizes worth ₹2 lakhs with 250+ participants.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
            category: "Clubs",
            link: "/clubs/coding",
            date: "May 10–12, 2024"
        },
        {
            title: "Artika 2024 — Cultural Fest",
            description: "Three days of music, dance, theatre and street art. The biggest cultural celebration at RGUKT Ongole.",
            image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop",
            category: "Cultural",
            link: "/clubs/cultural",
            date: "March 25–27, 2024"
        },
        {
            title: "Innovation Club — Startup Pitch",
            description: "Student founders pitch their MVPs to angel investors. 12 startups born at RGUKT Ongole are now live products.",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop",
            category: "Innovation",
            link: "/clubs/innovation",
            date: "April 15, 2024"
        },
    ];

    const categoryCards = [
        { title: 'Sports', description: 'Real-time updates on cricket, basketball, and more.', link: '/sports', icon: Trophy, color: 'bg-orange-500', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Placements', description: 'Latest job openings, internship drives, and career news.', link: '/placements', icon: Briefcase, color: 'bg-emerald-500', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop' },
        { title: 'Exam Schedule', description: 'Internal assessments, mid-terms, and final exam dates.', link: '/exams', icon: Calendar, color: 'bg-blue-500', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Upcoming Events', description: 'Workshops, hackathons, and cultural fests calendar.', link: '/events', icon: Rocket, color: 'bg-purple-500', img: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Achievements', description: 'Celebrating academic and co-curricular excellence.', link: '/achievements', icon: Award, color: 'bg-amber-500', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Campus Clubs', description: 'Join creative, technical, and sports-oriented clubs.', link: '/clubs', icon: Users, color: 'bg-rose-500', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2574&auto=format&fit=crop' },
    ];

    const sportsHighlights = [
        {
            title: 'Inter-College Cricket Victory',
            date: 'Mar 05, 2024',
            author: 'Sports Dept',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b565da?q=80&w=2667&auto=format&fit=crop',
            description: 'The college cricket team secured a thrilling victory in the finals against NIT Delhi by 25 runs. Man of the match was Aryan Sharma with 85 runs.'
        },
        {
            title: 'Women\'s Basketball Runner Up',
            date: 'Feb 28, 2024',
            author: 'Sports Dept',
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop',
            description: 'Our women basketball team displayed exceptional skill and reached the state-level finals, securing the silver trophy.'
        }
    ];

    return (
        <div className="flex flex-col gap-10">
            {/* Branding Section */}
            <section className="bg-white mt-8 py-12 border-b border-slate-100 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        {/* Left: Logo + University name (horizontal) */}
                        <div className="flex flex-row items-center gap-5">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl border-4 border-red-100 bg-white shrink-0">
                                <img src="/rgukt-logo.png" alt="RGUKT Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-200">Official Portal</span>
                                    <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Est. 2008</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
                                    Rajiv Gandhi University of <span className="text-red-600">Knowledge Technologies</span>, Ongole
                                </h1>
                                <p className="text-slate-400 font-bold uppercase text-[10px] sm:text-xs tracking-[0.22em]">
                                    Catering to the Educational Needs of Gifted Rural Youth
                                </p>
                            </div>
                        </div>

                        {/* Right: CTA */}
                        <Link to="/about" className="shrink-0 bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-red-700 transition-all hover:-translate-y-1 flex items-center gap-2">
                            More Details <Info size={15} className="text-red-400" />
                        </Link>
                    </motion.div>
                </div>
            </section>


            {/* Urgent News Ticker */}
            <NewsTicker />

            {/* Hero Section */}
            <Carousel items={carouselItems} />

            {/* Category Section */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-[0.3em]">
                            <span className="w-8 h-1 bg-primary rounded-full" />
                            Quick Access
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter leading-none">
                            Portal Categories
                        </h2>
                        <p className="text-gray-500 font-medium max-w-lg leading-relaxed mt-2 text-lg">
                            Explore specialized sections for academic updates, career opportunities, and campus life activities.
                        </p>
                    </div>
                    <NavLink to="/all-categories" className="group flex items-center gap-4 bg-gray-100 hover:bg-primary px-8 py-5 rounded-2xl transition-all duration-500">
                        <span className="text-gray-600 font-bold uppercase tracking-widest text-xs group-hover:text-white">View Full Directory</span>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-white shadow-lg group-hover:rotate-12 transition-all">
                            <ArrowRight className="text-primary group-hover:scale-110 transition-transform" />
                        </div>
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryCards.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Entire card is clickable */}
                            <Link to={cat.link} className="block">
                                <Card
                                    variant="simple"
                                    title={cat.title}
                                    description={cat.description}
                                    link={cat.link}
                                    image={cat.img}
                                >
                                    <div className={`w-12 h-12 ${cat.color} rounded-lg flex items-center justify-center text-white relative z-10`}>
                                        <cat.icon size={24} />
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sports Highlights Section */}
            <section className="bg-primary-dark py-32 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-1/4 h-full bg-primary/20 -skew-x-12 -ml-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-white/10 pb-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3 text-blue-300 font-black uppercase text-xs tracking-[0.3em]">
                                <TrendingUp size={16} />
                                Sports Updates
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                                Athletic Excellence
                            </h2>
                        </div>
                        <Link to="/sports" className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl shadow-blue-500/10">
                            Go to Sports Portal
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {sportsHighlights.map((news, idx) => (
                            <Card
                                key={idx}
                                title={news.title}
                                date={news.date}
                                author={news.author}
                                image={news.image}
                                description={news.description}
                                link="/sports/highlights"
                                badge="MATCH REPORT"
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Events & Clubs Preview */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 w-full">
                {/* Left Column - Upcoming Events */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-3xl font-black text-gray-800 tracking-tight">Upcoming Events</h3>
                        <p className="text-gray-500 font-medium">Don't miss out on campus life excitement.</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex gap-6 group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500">
                                <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary/5 rounded-2xl group-hover:bg-primary transition-colors border-2 border-primary/10">
                                    <span className="text-2xl font-black text-primary group-hover:text-white">1{item}</span>
                                    <span className="text-[10px] font-bold text-primary group-hover:text-white uppercase tracking-widest">MAR</span>
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">Tech Summit 2024</h4>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={12} className="text-primary" /> Auditorium A1
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/events" className="mt-4 flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest group">
                        View Full Calendar <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Middle Column - Campus Stats */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Featured Club */}
                    <div className="card p-10 bg-gradient-to-br from-indigo-600 to-primary text-white flex flex-col justify-between group relative overflow-hidden min-h-[400px]">
                        <div className="absolute top-0 right-0 p-10 opacity-10 blur-sm group-hover:blur-none transition-all duration-1000">
                            <Rocket size={200} />
                        </div>
                        <div className="relative z-10 flex flex-col gap-8">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                                <Users size={32} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black leading-tight mb-4 tracking-tighter">Join the Pixel Creative Club</h3>
                                <p className="text-blue-100/80 font-medium leading-relaxed">Discover your artistic potential with our video editing and graphic design workshops.</p>
                            </div>
                        </div>
                        <button className="relative z-10 mt-auto bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:-translate-y-2 transition-all shadow-xl">
                            Explore Club
                        </button>
                    </div>

                    {/* Achievement Preview */}
                    <div className="card p-10 border-2 border-slate-100 hover:border-primary/10 flex flex-col justify-between group min-h-[400px]">
                        <div className="flex flex-col gap-8">
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border-2 border-primary/10">
                                <GraduationCap size={32} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black leading-tight mb-4 tracking-tighter text-gray-800">Achieving New Heights</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">Congratulations to the Class of 2024 for an incredible graduation ceremony and placement records.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md"><img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" /></div>)}
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">+ 500 Students</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="max-w-7xl mx-auto px-6 w-full mb-[-120px]">
                <div className="bg-primary p-12 md:p-24 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-none mb-6 tracking-tighter">Stay Connected With Campus</h2>
                        <p className="text-blue-100/70 text-lg font-medium">Subscribe to get daily notifications about placements, exams, and event updates.</p>
                    </div>

                    <div className="relative z-10 w-full md:w-auto flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-5 rounded-2xl text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-4 focus:ring-white/20 w-full md:w-[350px] font-semibold"
                        />
                        <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:-translate-y-2 hover:shadow-white/20 transition-all flex items-center justify-center gap-3">
                            Join Now <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
