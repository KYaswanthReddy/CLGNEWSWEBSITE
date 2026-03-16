import React, { useState, useEffect } from 'react';
import { getClubs, getClub, addClubUpdate, updateClubUpdate, deleteClubUpdate, createClub, updateClub, deleteClub } from '../../services/api';
import { Plus, Trash2, Edit2, Users, Upload, MessageSquare, Calendar, Clock, ChevronRight, ArrowLeft, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);
    const [clubData, setClubData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Club Modals
    const [showClubModal, setShowClubModal] = useState(null); // 'create', 'edit'
    const [clubFormData, setClubFormData] = useState({ name: '', description: '', image: null });
    const [editingClubId, setEditingClubId] = useState(null);

    // Update Modals
    const [showUpdateModal, setShowUpdateModal] = useState(null); // 'create', 'edit'
    const [updateFormData, setUpdateFormData] = useState({ title: '', message: '', date: '', timings: '', images: [] });
    const [editingUpdateId, setEditingUpdateId] = useState(null);

    useEffect(() => {
        fetchClubs();
    }, []);

    useEffect(() => {
        if (selectedClub) {
            fetchClubDetails(selectedClub.name);
        }
    }, [selectedClub]);

    const fetchClubs = async () => {
        try {
            setLoading(true);
            const { data } = await getClubs();
            setClubs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchClubDetails = async (name) => {
        try {
            const { data } = await getClub(name);
            setClubData(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Club CRUD
    const handleClubSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', clubFormData.name);
        data.append('description', clubFormData.description);
        if (clubFormData.image) data.append('image', clubFormData.image);

        try {
            if (editingClubId) {
                await updateClub(editingClubId, data);
            } else {
                await createClub(data);
            }
            setShowClubModal(null);
            fetchClubs();
            setClubFormData({ name: '', description: '', image: null });
        } catch (err) {
            console.error(err);
        }
    };

    const handleClubDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Delete this club and all its data?')) {
            await deleteClub(id);
            fetchClubs();
            if (selectedClub && selectedClub._id === id) setSelectedClub(null);
        }
    };

    const openEditClub = (club, e) => {
        e.stopPropagation();
        setEditingClubId(club._id);
        setClubFormData({ name: club.name, description: club.description || '', image: null });
        setShowClubModal('edit');
    };

    // Update CRUD
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(updateFormData).forEach(key => {
            if (key === 'images') {
                Array.from(updateFormData.images).forEach(file => data.append('images', file));
            } else {
                data.append(key, updateFormData[key]);
            }
        });

        try {
            if (editingUpdateId) {
                await updateClubUpdate(selectedClub.name, editingUpdateId, data);
            } else {
                await addClubUpdate(selectedClub.name, data);
            }
            setShowUpdateModal(null);
            fetchClubDetails(selectedClub.name);
            setUpdateFormData({ title: '', message: '', date: '', timings: '', images: [] });
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateDelete = async (updateId) => {
        if (window.confirm('Delete this club announcement?')) {
            await deleteClubUpdate(selectedClub.name, updateId);
            fetchClubDetails(selectedClub.name);
        }
    };

    const openEditUpdate = (update) => {
        setEditingUpdateId(update._id);
        setUpdateFormData({ title: update.title, message: update.message, date: update.date || '', timings: update.timings || '', images: [] });
        setShowUpdateModal('edit');
    };

    if (!selectedClub) {
        return (
            <div className="p-10 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto flex flex-col gap-10">
                    <header className="flex justify-between items-end mb-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Club Directory</h1>
                            <p className="text-slate-500 font-medium font-bold">Manage campus organizations and their content.</p>
                        </div>
                        <button
                            onClick={() => { setEditingClubId(null); setShowClubModal('create'); }}
                            className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
                        >
                            <Plus size={20} /> Create New Club
                        </button>
                    </header>

                    {loading ? (
                        <div className="flex justify-center p-32"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {clubs.map((club) => (
                                <div
                                    key={club._id}
                                    onClick={() => setSelectedClub(club)}
                                    className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-100 flex flex-col justify-between gap-6 group hover:shadow-2xl transition-all duration-700 cursor-pointer relative overflow-hidden h-[400px]"
                                >
                                    <div className="flex flex-col gap-6 relative z-10">
                                        <div className="flex justify-between items-start">
                                            <div className="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center border-2 border-white/20 p-4 transition-transform group-hover:rotate-12">
                                                {club.image ? (
                                                    <img src={`http://localhost:5000${club.image}`} alt="logo" className="w-full h-full object-contain" />
                                                ) : (
                                                    <Users size={32} className="text-white" />
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={(e) => openEditClub(club, e)} className="p-3 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-xl transition-all">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={(e) => handleClubDelete(club._id, e)} className="p-3 bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase line-clamp-1">{club.name} Club</h3>
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">{club.updates.length} Updates Shared</p>
                                        </div>
                                        <p className="text-slate-500 font-medium text-sm line-clamp-3 leading-relaxed">{club.description || 'No description provided.'}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest relative z-10 group-hover:translate-x-2 transition-transform">
                                        Manage Content <ChevronRight size={14} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Club Create/Edit Modal */}
                <AnimatePresence>
                    {showClubModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden p-12">
                                <h2 className="text-3xl font-black text-primary uppercase tracking-tighter mb-10">{editingClubId ? 'Edit Club' : 'Create New Club'}</h2>
                                <form onSubmit={handleClubSubmit} className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Club Name</label>
                                        <input value={clubFormData.name} onChange={e => setClubFormData({ ...clubFormData, name: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" required placeholder="e.g. Coding Club" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Description</label>
                                        <textarea rows="3" value={clubFormData.description} onChange={e => setClubFormData({ ...clubFormData, description: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none resize-none" placeholder="What is this club about?" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Club Logo</label>
                                        <label className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 cursor-pointer">
                                            <Upload size={20} className="text-primary" />
                                            <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">{clubFormData.image ? clubFormData.image.name : 'Select Logo'}</span>
                                            <input type="file" className="hidden" onChange={e => setClubFormData({ ...clubFormData, image: e.target.files[0] })} />
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setShowClubModal(null)} className="flex-1 bg-slate-50 text-slate-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest">Cancel</button>
                                        <button type="submit" className="flex-[2] bg-primary text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">{editingClubId ? 'Update Club' : 'Create Club'}</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                <header className="flex justify-between items-end">
                    <div className="flex flex-col gap-6">
                        <button onClick={() => setSelectedClub(null)} className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] hover:-translate-x-2 transition-transform">
                            <ArrowLeft size={14} /> Back to Directory
                        </button>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter uppercase">
                            {selectedClub.name} Club <span className="text-primary">Management</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => { setEditingUpdateId(null); setShowUpdateModal('create'); }}
                        className="bg-primary text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3"
                    >
                        <Plus size={20} /> Add Update
                    </button>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {clubData?.updates.map((update) => (
                        <div key={update._id} className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-start gap-10 group">
                            <div className="flex flex-col gap-6 flex-1">
                                <div className="flex items-center gap-3 font-black text-primary uppercase text-[10px] tracking-[0.3em]">
                                    <Calendar size={14} /> {update.date || 'No Date'} • {update.timings || 'No Time'}
                                </div>
                                <h3 className="text-3xl font-black text-slate-800">{update.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{update.message}</p>

                                {update.images && update.images.length > 0 && (
                                    <div className="flex gap-4 flex-wrap mt-4">
                                        {update.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={`http://localhost:5000${img}`}
                                                alt="update"
                                                className="w-32 h-32 object-cover rounded-2xl border-2 border-slate-100 shadow-lg"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 min-w-[120px]">
                                <button onClick={() => openEditUpdate(update)} className="w-14 h-14 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <Edit2 size={20} />
                                </button>
                                <button onClick={() => handleUpdateDelete(update._id)} className="w-14 h-14 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* update Create/Edit Modal */}
            <AnimatePresence>
                {showUpdateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-3xl rounded-[48px] shadow-2xl overflow-hidden p-12">
                            <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-8">
                                <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Club Announcement</h2>
                                <button onClick={() => setShowUpdateModal(null)} className="text-slate-400 hover:rotate-90 transition-transform"><Plus size={32} className="rotate-45" /></button>
                            </div>
                            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Update Title</label>
                                    <input value={updateFormData.title} onChange={e => setUpdateFormData({ ...updateFormData, title: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" required />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Event Date (optional)</label>
                                        <input value={updateFormData.date} onChange={e => setUpdateFormData({ ...updateFormData, date: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" placeholder="e.g. Mar 25" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Timings (optional)</label>
                                        <input value={updateFormData.timings} onChange={e => setUpdateFormData({ ...updateFormData, timings: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none" placeholder="e.g. 2 PM - 5 PM" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Message / Announcement</label>
                                    <textarea rows="4" value={updateFormData.message} onChange={e => setUpdateFormData({ ...updateFormData, message: e.target.value })} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none resize-none" required />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Upload Pictures</label>
                                    <label className="bg-slate-50 p-5 rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer flex flex-col items-center justify-center gap-3">
                                        <Upload size={32} className="text-primary" />
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Drag & Drop or Click</span>
                                        <input type="file" multiple className="hidden" onChange={e => setUpdateFormData({ ...updateFormData, images: e.target.files })} />
                                        {updateFormData.images.length > 0 && <span className="text-primary font-black">{updateFormData.images.length} files selected</span>}
                                    </label>
                                </div>
                                <button type="submit" className="bg-primary text-white py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all">
                                    Save Announcement
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageClubs;
