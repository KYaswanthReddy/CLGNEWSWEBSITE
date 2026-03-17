import React, { useState, useEffect } from 'react';
import { getExams, createExam, updateExam, deleteExam } from '../../services/api';
import { Plus, Trash2, Edit2, Calendar, Layout, Info, Upload, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadExam = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(null);
    const [formData, setFormData] = useState({
        branch: 'CSE',
        year: 'E1',
        semester: 'Sem 1',
        examType: 'Mid 1',
        subjects: [{ name: '', date: '', time: '' }]
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            setLoading(true);
            const { data } = await getExams();
            setExams(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSubject = () => {
        setFormData({ ...formData, subjects: [...formData.subjects, { name: '', date: '', time: '' }] });
    };

    const handleRemoveSubject = (idx) => {
        setFormData({ ...formData, subjects: formData.subjects.filter((_, i) => i !== idx) });
    };

    const handleSubjectChange = (idx, field, val) => {
        const newSubjects = [...formData.subjects];
        newSubjects[idx][field] = val;
        setFormData({ ...formData, subjects: newSubjects });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateExam(editingId, formData);
            } else {
                await createExam(formData);
            }
            setShowModal(null);
            fetchExams();
            setFormData({ branch: 'CSE', year: 'E1', semester: 'Sem 1', examType: 'Mid 1', subjects: [{ name: '', date: '', time: '' }] });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            await deleteExam(id);
            fetchExams();
        }
    };

    const openEdit = (exam) => {
        setEditingId(exam._id);
        setFormData({ branch: exam.branch, year: exam.year, semester: exam.semester, examType: exam.examType, subjects: exam.subjects });
        setShowModal('edit');
    };

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                <header className="flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Exam Schedules</h1>
                        <p className="text-slate-500 font-medium">Manage mid-term and semester examination timetables.</p>
                    </div>
                    <button
                        onClick={() => { setEditingId(null); setShowModal('create'); }}
                        className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
                    >
                        <Plus size={20} /> Create New Schedule
                    </button>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center p-32">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10">
                        {exams.map((exam) => (
                            <div key={exam._id} className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
                                <div className="flex flex-col md:flex-row items-center gap-10 w-full md:w-3/5">
                                    <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center border-2 border-primary/10">
                                        <BookOpen size={32} className="text-primary" />
                                    </div>
                                    <div className="flex flex-col text-center md:text-left">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{exam.branch} • {exam.year} • {exam.semester}</span>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">{exam.examType} Time Table</h3>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center md:justify-start gap-2 mt-1">
                                            {exam.subjects.length} Subjects Scheduled
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full md:w-2/5 justify-between md:justify-end">
                                    <button onClick={() => openEdit(exam)} className="bg-slate-50 text-slate-600 px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">
                                        Manage
                                    </button>
                                    <button onClick={() => handleDelete(exam._id)} className="w-14 h-14 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for Create/Edit */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden my-auto"
                        >
                            <div className="p-10 bg-primary text-white flex justify-between items-center">
                                <h2 className="text-2xl font-black uppercase tracking-widest">{editingId ? 'Edit Schedule' : 'Create New Schedule'}</h2>
                                <button onClick={() => setShowModal(null)} className="text-white hover:rotate-90 transition-transform">
                                    <Plus size={32} className="rotate-45" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-12 flex flex-col gap-10 h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Branch</label>
                                        <select
                                            value={formData.branch}
                                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none cursor-pointer"
                                        >
                                            <option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option><option>CIVIL</option><option>IT</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Academic Year</label>
                                        <select
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none cursor-pointer"
                                        >
                                            <option>E1</option><option>E2</option><option>E3</option><option>E4</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Semester</label>
                                        <select
                                            value={formData.semester}
                                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none cursor-pointer"
                                        >
                                            <option>Sem 1</option><option>Sem 2</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Exam Type</label>
                                        <select
                                            value={formData.examType}
                                            onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none cursor-pointer"
                                        >
                                            <option>Mid 1</option><option>Mid 2</option><option>Mid 3</option><option>Semester Exam</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                        <h3 className="text-xl font-black text-slate-600 uppercase tracking-widest">Subjects List</h3>
                                        <button
                                            type="button"
                                            onClick={handleAddSubject}
                                            className="bg-primary/10 text-primary px-5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all"
                                        >
                                            Add Subject
                                        </button>
                                    </div>

                                    {formData.subjects.map((sub, idx) => (
                                        <div key={idx} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-6 items-end relative group">
                                            <div className="flex flex-col gap-3 flex-1">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Subject Name</label>
                                                <input
                                                    type="text"
                                                    value={sub.name}
                                                    onChange={(e) => handleSubjectChange(idx, 'name', e.target.value)}
                                                    className="bg-white p-4 rounded-xl border border-slate-100 font-bold outline-none"
                                                    placeholder="e.g., Mathematics-I"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3 w-full md:w-1/4">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date</label>
                                                <input
                                                    type="text"
                                                    value={sub.date}
                                                    onChange={(e) => handleSubjectChange(idx, 'date', e.target.value)}
                                                    className="bg-white p-4 rounded-xl border border-slate-100 font-bold outline-none"
                                                    placeholder="Mar 20"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3 w-full md:w-1/4">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Time</label>
                                                <input
                                                    type="text"
                                                    value={sub.time}
                                                    onChange={(e) => handleSubjectChange(idx, 'time', e.target.value)}
                                                    className="bg-white p-4 rounded-xl border border-slate-100 font-bold outline-none"
                                                    placeholder="10:00 AM"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSubject(idx)}
                                                className="w-14 h-14 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all md:self-end"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button type="submit" className="mt-4 bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all sticky bottom-0 z-10">
                                    {editingId ? 'Update Timetable' : 'Publish Timetable'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UploadExam;
