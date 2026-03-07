import React, { useState, useEffect } from 'react';
import { getPlacements, createPlacement, updatePlacement, deletePlacement } from '../../services/api';
import { Plus, Trash2, Edit2, Briefcase, Building, Upload, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddPlacement = () => {
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(null);
    const [formData, setFormData] = useState({ type: 'Internship', title: '', description: '', companyName: '', applicationLink: '', logo: null });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPlacements();
    }, []);

    const fetchPlacements = async () => {
        try {
            setLoading(true);
            const { data } = await getPlacements();
            setPlacements(data);
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
                await updatePlacement(editingId, data);
            } else {
                await createPlacement(data);
            }
            setShowModal(null);
            fetchPlacements();
            setFormData({ type: 'Internship', title: '', description: '', companyName: '', applicationLink: '', logo: null });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this placement update?')) {
            await deletePlacement(id);
            fetchPlacements();
        }
    };

    const openEdit = (item) => {
        setEditingId(item._id);
        setFormData({ type: item.type, title: item.title, description: item.description, companyName: item.companyName, applicationLink: item.applicationLink || '', logo: null });
        setShowModal('edit');
    };

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                <header className="flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Placement Portal</h1>
                        <p className="text-slate-500 font-medium font-bold">Manage internships and job opportunities across companies.</p>
                    </div>
                    <button
                        onClick={() => { setEditingId(null); setShowModal('create'); }}
                        className="bg-primary text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3"
                    >
                        <Plus size={20} /> Add Update
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center p-32"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {placements.map((item) => (
                            <div key={item._id} className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10 group">
                                <div className="flex flex-col md:flex-row items-center gap-10 w-full md:w-3/5">
                                    <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center border-2 border-primary/10">
                                        {item.logo ? (
                                            <img src={`http://localhost:5000${item.logo}`} className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <Building size={32} className="text-primary" />
                                        )}
                                    </div>
                                    <div className="flex flex-col text-center md:text-left">
                                        <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${item.type === 'Internship' ? 'text-emerald-500' : 'text-blue-500'}`}>{item.type}</span>
                                        <h3 className="text-3xl font-black text-slate-800">{item.companyName}</h3>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center md:justify-start gap-2 mt-1">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-2/5 justify-between md:justify-end">
                                    <button onClick={() => openEdit(item)} className="bg-slate-50 text-slate-600 px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">Edit</button>
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
                                <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Placement Listing</h2>
                                <button onClick={() => setShowModal(null)} className="text-slate-400 hover:rotate-90 transition-transform"><Plus size={32} className="rotate-45" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-[60vh] overflow-y-auto pr-4">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Type</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none cursor-pointer">
                                        <option>Internship</option>
                                        <option>Job</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Company Name</label>
                                        <input value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" required placeholder="e.g. Amazon" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Role Title</label>
                                        <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" required placeholder="e.g. SDE-1" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Application Link (optional)</label>
                                    <input value={formData.applicationLink} onChange={e => setFormData({ ...formData, applicationLink: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" placeholder="https://careers.google.com/..." />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Description</label>
                                    <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none resize-none" required placeholder="Write job/internship details..." />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Company Logo</label>
                                    <input type="file" onChange={e => setFormData({ ...formData, logo: e.target.files[0] })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none cursor-pointer" />
                                </div>
                                <button type="submit" className="bg-primary text-white py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-[1.02] transition-all sticky bottom-0">Save Opportunity</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddPlacement;
