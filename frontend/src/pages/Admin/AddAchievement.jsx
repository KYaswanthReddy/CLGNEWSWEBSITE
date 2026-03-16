import React, { useState, useEffect } from 'react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../../services/api';
import { Plus, Trash2, Edit2, Award, Upload, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddAchievement = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', externalLink: '', image: null });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            setLoading(true);
            const { data } = await getAchievements();
            setAchievements(data);
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
                await updateAchievement(editingId, data);
            } else {
                await createAchievement(data);
            }
            setShowModal(null);
            fetchAchievements();
            setFormData({ title: '', description: '', externalLink: '', image: null });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this achievement?')) {
            await deleteAchievement(id);
            fetchAchievements();
        }
    };

    const openEdit = (item) => {
        setEditingId(item._id);
        setFormData({ title: item.title, description: item.description, externalLink: item.externalLink || '', image: null });
        setShowModal('edit');
    };

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                <header className="flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Achievements Wall</h1>
                        <p className="text-slate-500 font-medium">Highlight student & faculty excellence across various domains.</p>
                    </div>
                    <button
                        onClick={() => { setEditingId(null); setShowModal('create'); }}
                        className="bg-primary text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3"
                    >
                        <Plus size={20} /> Add Excellence
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center p-32"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.map((item) => (
                            <div key={item._id} className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-100 flex flex-col justify-between group h-full">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-2 text-amber-500 font-black uppercase text-[10px] tracking-widest bg-amber-50 w-fit px-4 py-1.5 rounded-full border border-amber-100/50">
                                        <Award size={14} /> Achievement
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tighter group-hover:text-primary transition-colors">{item.title}</h3>
                                    {item.image && (
                                        <div className="w-full h-44 rounded-3xl overflow-hidden mt-2">
                                            <img src={`http://localhost:5000${item.image}`} alt="achievement" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <p className="text-slate-500 font-medium leading-relaxed italic text-sm line-clamp-3">"{item.description}"</p>
                                </div>
                                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-50">
                                    <button onClick={() => openEdit(item)} className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">Edit</button>
                                    <button onClick={() => handleDelete(item._id)} className="w-14 h-14 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden p-12">
                            <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-8">
                                <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Achievement Entry</h2>
                                <button onClick={() => setShowModal(null)} className="text-slate-400 hover:rotate-90 transition-transform"><Plus size={32} className="rotate-45" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-[60vh] overflow-y-auto pr-4">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Achievement Title</label>
                                    <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" required placeholder="e.g. Winner of Smart India Hackathon" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Description</label>
                                    <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none resize-none" required placeholder="Who what and where..." />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">External Link (News/Source)</label>
                                    <input value={formData.externalLink} onChange={e => setFormData({ ...formData, externalLink: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" placeholder="https://news.college.edu/..." />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Achievement Image</label>
                                    <label className="bg-slate-50 p-5 rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer flex flex-col items-center justify-center gap-3">
                                        <Upload size={32} className="text-primary" />
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Image Upload</span>
                                        <input type="file" className="hidden" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
                                    </label>
                                </div>
                                <button type="submit" className="bg-primary text-white py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-[1.02] transition-all sticky bottom-0">Add Achievement</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddAchievement;
