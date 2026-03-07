import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';
import { Plus, Trash2, Edit2, Calendar, Layout, Info, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(null); // 'create' or 'edit'
    const [formData, setFormData] = useState({ name: '', date: '', month: '', year: '', description: '', image: null });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data } = await getEvents();
            setEvents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) data.append(key, formData[key]);
        });

        try {
            if (editingId) {
                await updateEvent(editingId, data);
            } else {
                await createEvent(data);
            }
            setShowModal(null);
            fetchEvents();
            setFormData({ name: '', date: '', month: '', year: '', description: '', image: null });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            fetchEvents();
        }
    };

    const openEdit = (event) => {
        setEditingId(event._id);
        setFormData({ name: event.name, date: event.date, month: event.month, year: event.year, description: event.description || '', image: null });
        setShowModal('edit');
    };

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                <header className="flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Manage Events</h1>
                        <p className="text-slate-500 font-medium">Add, edit, or remove campus events dynamically.</p>
                    </div>
                    <button
                        onClick={() => { setEditingId(null); setShowModal('create'); }}
                        className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
                    >
                        <Plus size={20} /> Create New Event
                    </button>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center p-32">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 flex flex-col justify-between group">
                                <div className="flex flex-col gap-6">
                                    {event.image && (
                                        <div className="w-full h-48 rounded-[32px] overflow-hidden">
                                            <img src={`http://localhost:5000${event.image}`} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-widest">
                                        <Calendar size={14} /> {event.date} {event.month}, {event.year}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 group-hover:text-primary transition-colors">{event.name}</h3>
                                </div>

                                <div className="flex items-center gap-4 mt-10 pt-8 border-t border-slate-50">
                                    <button onClick={() => openEdit(event)} className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(event._id)} className="w-14 h-14 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
                        >
                            <div className="p-10 bg-primary text-white flex justify-between items-center">
                                <h2 className="text-2xl font-black uppercase tracking-widest">{editingId ? 'Edit Event' : 'Create New Event'}</h2>
                                <button onClick={() => setShowModal(null)} className="text-white hover:rotate-90 transition-transform">
                                    <Plus size={32} className="rotate-45" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-12 flex flex-col gap-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3 md:col-span-2">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Event Name</label>
                                        <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                            <Layout size={20} className="text-primary" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g., Tech Summit 2024"
                                                className="bg-transparent outline-none w-full font-bold text-slate-700"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date</label>
                                        <input
                                            type="text"
                                            required
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            placeholder="DD"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Month</label>
                                        <input
                                            type="text"
                                            required
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none"
                                            value={formData.month}
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                            placeholder="Month"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Year</label>
                                        <input
                                            type="text"
                                            required
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            placeholder="YYYY"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Upload Image</label>
                                        <label className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100">
                                            <Upload size={20} className="text-primary" />
                                            <span className="text-slate-400 font-bold text-sm">{formData.image ? formData.image.name : 'Choose File'}</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                            />
                                        </label>
                                    </div>

                                    <div className="flex flex-col gap-3 md:col-span-2">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Description</label>
                                        <textarea
                                            rows="4"
                                            className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none resize-none"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Write event details..."
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="mt-4 bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                                    {editingId ? 'Update Event' : 'Publish Event'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageEvents;
