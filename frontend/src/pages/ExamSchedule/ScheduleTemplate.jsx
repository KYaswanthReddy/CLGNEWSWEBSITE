import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, ChevronLeft, FileText, Layers, Zap, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getExamSchedules } from '../../services/api';

// ── Year selector cards shown at /exams (no year prop passed)
const YEARS = [
    { id: 'E1', label: 'First Year', subtitle: 'E1', color: 'from-blue-600 to-blue-800', icon: '📘' },
    { id: 'E2', label: 'Second Year', subtitle: 'E2', color: 'from-emerald-600 to-emerald-800', icon: '📗' },
    { id: 'E3', label: 'Third Year', subtitle: 'E3', color: 'from-amber-600 to-amber-800', icon: '📙' },
    { id: 'E4', label: 'Final Year', subtitle: 'E4', color: 'from-rose-600 to-rose-800', icon: '📕' },
];

const BRANCHES = [
    { title: 'CSE', icon: Zap, color: 'bg-blue-600', description: 'Computer Science & Engg' },
    { title: 'ECE', icon: Zap, color: 'bg-emerald-600', description: 'Electronics & Communication' },
    { title: 'EEE', icon: Zap, color: 'bg-amber-600', description: 'Electrical & Electronics' },
    { title: 'MECH', icon: Zap, color: 'bg-rose-600', description: 'Mechanical Engineering' },
    { title: 'CIVIL', icon: BookOpen, color: 'bg-violet-600', description: 'Civil Engineering' },
];

const SEMESTERS = ['Sem 1', 'Sem 2'];
const EXAMS = ['Mid 1', 'Mid 2', 'Mid 3', 'Semester Exam'];

const slide = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

// ── Year Selector (shown when no year is pre-selected via route)
const YearSelector = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-16 pb-24">
            {/* Compact hero */}
            <section className="bg-primary-dark py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-3 text-blue-300 font-bold uppercase text-[10px] tracking-[0.4em] mb-3">
                            <Calendar size={14} /> Examination Cell
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
                            Exam Schedules
                        </h1>
                        <p className="text-blue-100/60 text-base font-medium mt-4 max-w-lg">
                            Select your academic year to browse exam timetables.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Year Cards */}
            <section className="max-w-5xl mx-auto px-6 w-full -mt-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {YEARS.map((y, i) => (
                        <motion.button
                            key={y.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            onClick={() => navigate(`/exams/${y.id.toLowerCase()}`)}
                            className={`bg-gradient-to-br ${y.color} p-8 rounded-[32px] shadow-2xl flex flex-col items-center justify-center gap-4 group hover:scale-105 transition-all duration-300 min-h-[200px] text-white`}
                        >
                            <span className="text-5xl">{y.icon}</span>
                            <div className="text-center">
                                <div className="text-3xl font-black tracking-tight">{y.subtitle}</div>
                                <div className="text-white/70 text-[11px] font-bold uppercase tracking-widest mt-1">{y.label}</div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                Select →
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>
        </div>
    );
};

// ── Main template for a specific year (E1 / E2 / E3 / E4)
const ScheduleTemplate = ({ year }) => {
    // If no year given, show the year selector
    if (!year) return <YearSelector />;

    const [step, setStep] = useState(1); // 1=branch 2=sem 3=exam 4=results
    const [sel, setSel] = useState({ branch: '', semester: '', exam: '' });
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getExamSchedules();
                setSchedules(data.filter(s => s.year === year));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [year]);

    const pick = (type, value) => {
        setSel(prev => ({ ...prev, [type]: value }));
        setStep(s => s + 1);
    };

    const reset = () => { setStep(1); setSel({ branch: '', semester: '', exam: '' }); };

    const filtered = schedules.find(s =>
        s.branch === sel.branch &&
        s.semester === sel.semester &&
        s.examType === sel.exam
    )?.subjects || [];

    // Breadcrumb label
    const crumb = [
        year,
        sel.branch,
        sel.semester,
        sel.exam,
    ].filter(Boolean).join(' › ');

    return (
        <div className="flex flex-col gap-16 pb-24">
            {/* Compact hero */}
            <section className="bg-primary-dark py-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 text-blue-300 font-bold uppercase text-[10px] tracking-[0.4em] mb-3">
                            <Calendar size={14} /> Examination Cell
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">
                            {year} &mdash; {step === 1 ? 'Select Branch' : sel.branch}
                        </h1>
                        {crumb && (
                            <p className="text-blue-300/70 text-xs font-bold uppercase tracking-widest mt-3">{crumb}</p>
                        )}
                    </motion.div>

                    {step > 1 && (
                        <div className="flex items-center gap-3 text-white/60 text-xs font-black uppercase tracking-widest">
                            <button onClick={reset} className="hover:text-white transition-colors flex items-center gap-1">
                                <ChevronLeft size={14} /> Restart
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 w-full">
                {loading ? (
                    <div className="flex justify-center p-24">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <AnimatePresence mode="wait">

                        {/* ── Step 1: Branch */}
                        {step === 1 && (
                            <motion.div key="s1" {...slide} className="flex flex-col gap-8">
                                <h2 className="text-2xl font-black text-gray-800 px-4 border-l-4 border-primary uppercase">Select Branch</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                                    {BRANCHES.map((b) => (
                                        <button
                                            key={b.title}
                                            onClick={() => pick('branch', b.title)}
                                            className="bg-white p-6 rounded-[28px] shadow-xl border border-slate-100 flex flex-col items-center justify-center gap-4 group hover:bg-primary-dark transition-all duration-500 min-h-[180px]"
                                        >
                                            <div className={`w-12 h-12 ${b.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                                                <b.icon size={24} />
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-black text-gray-800 group-hover:text-white transition-colors">{b.title}</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-blue-200 transition-colors mt-1">{b.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── Step 2: Semester */}
                        {step === 2 && (
                            <motion.div key="s2" {...slide} className="flex flex-col gap-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-gray-800 px-4 border-l-4 border-primary uppercase">Select Semester</h2>
                                    <button onClick={reset} className="text-gray-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1">
                                        <ChevronLeft size={14} /> Back
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {SEMESTERS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => pick('semester', s)}
                                            className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 flex items-center justify-between group hover:bg-primary transition-all duration-500"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white transition-colors">
                                                    <Layers size={24} />
                                                </div>
                                                <span className="text-2xl font-black text-gray-800 group-hover:text-white transition-colors uppercase">{s}</span>
                                            </div>
                                            <ChevronRight className="text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-all" size={24} />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── Step 3: Exam type */}
                        {step === 3 && (
                            <motion.div key="s3" {...slide} className="flex flex-col gap-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-gray-800 px-4 border-l-4 border-primary uppercase">Select Exam</h2>
                                    <button onClick={() => setStep(2)} className="text-gray-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1">
                                        <ChevronLeft size={14} /> Back
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                                    {EXAMS.map((e) => (
                                        <button
                                            key={e}
                                            onClick={() => pick('exam', e)}
                                            className="bg-white p-8 rounded-[28px] shadow-xl border border-slate-100 flex flex-col items-center justify-center gap-5 group hover:scale-105 transition-all duration-300 min-h-[180px] relative overflow-hidden"
                                        >
                                            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <FileText size={28} />
                                            </div>
                                            <h4 className="text-xl font-black text-gray-800 uppercase tracking-tight">{e}</h4>
                                            <div className="bg-primary text-white w-full py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase text-[10px] tracking-widest text-center">
                                                View
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── Step 4: Results */}
                        {step === 4 && (
                            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-black tracking-widest text-primary uppercase bg-primary/5 px-3 py-1.5 rounded-full w-fit">Official Schedule</span>
                                        <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
                                            {sel.branch} · {sel.semester} · {sel.exam}
                                        </h2>
                                    </div>
                                    <button onClick={reset} className="text-gray-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors">← New Search</button>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {filtered.length > 0 ? filtered.map((row, i) => (
                                        <div key={i} className="bg-white p-7 rounded-[24px] border-2 border-slate-50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/20 transition-all group">
                                            <div className="flex items-center gap-6 w-full md:w-1/3">
                                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors border-2 border-slate-100">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject</span>
                                                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors uppercase tracking-tight">{row.subjectName}</h4>
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-full md:w-1/4 gap-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={10} className="text-primary" /> Date</span>
                                                <span className="text-base font-black text-gray-800 uppercase">
                                                    {new Date(row.examDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex flex-col w-full md:w-1/4 gap-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Layers size={10} className="text-primary" /> Time</span>
                                                <span className="text-sm font-bold text-gray-500 uppercase">{row.examTime}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="bg-white p-16 rounded-[32px] text-center border-2 border-dashed border-slate-200">
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No schedule found for this selection.</p>
                                            <button onClick={reset} className="mt-6 text-primary font-black text-xs uppercase tracking-widest hover:underline">← Try Again</button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </section>
        </div>
    );
};

export default ScheduleTemplate;
