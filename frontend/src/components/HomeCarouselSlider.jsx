import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getHomeCarousels } from '../services/api';

const HomeCarouselSlider = () => {
    const [carousels, setCarousels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getImageUrl = (imgUrl) => {
        if (!imgUrl) return '';
        if (imgUrl.startsWith('http')) return imgUrl;
        return `http://127.0.0.1:5000${imgUrl}`;
    };

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const response = await getHomeCarousels();
                setCarousels(response.data);
            } catch (error) {
                console.error('Failed to fetch carousels:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCarousels();
    }, []);

    useEffect(() => {
        if (carousels.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === carousels.length - 1 ? 0 : prev + 1));
        }, 5000); // 5 seconds auto-scroll
        
        return () => clearInterval(interval);
    }, [carousels.length]);

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === carousels.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? carousels.length - 1 : prev - 1));
    };

    const handleNavigate = (link) => {
        if (!link) return;
        // If it's an external link
        if (link.startsWith('http://') || link.startsWith('https://')) {
            window.open(link, '_blank');
        } else {
            navigate(link);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 mt-10">
                <div className="h-[400px] md:h-[500px] w-full bg-slate-100 rounded-[40px] animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (carousels.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 mt-10">
                <div className="h-[200px] w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-400 gap-4 shadow-sm">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <LinkIcon size={24} className="text-slate-300" />
                    </div>
                    <span className="font-bold text-sm tracking-widest uppercase">No carousel items available</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6 mt-10 group relative">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl bg-black cursor-pointer" onClick={() => handleNavigate(carousels[currentIndex]?.link)}>
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        {/* Image */}
                        <img 
                            src={getImageUrl(carousels[currentIndex]?.image)} 
                            alt={carousels[currentIndex]?.title || "Carousel item"} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'https://placehold.co/1200x600/1e293b/ffffff?text=Image+Unavailable';
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col items-start gap-4">
                            {carousels[currentIndex]?.title && (
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="bg-white/20 backdrop-blur-xl border border-white/20 px-8 py-6 rounded-[32px] max-w-3xl hover:bg-white/30 transition-colors"
                                >
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                                        {carousels[currentIndex]?.title}
                                    </h2>
                                    {carousels[currentIndex]?.description && (
                                        <p className="text-white/80 font-medium mt-4 md:text-lg max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-3">
                                            {carousels[currentIndex]?.description}
                                        </p>
                                    )}
                                    <div className="mt-6 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                                        Explore <ChevronRight size={14} />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {carousels.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrev}
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Pagination Dots */}
                {carousels.length > 1 && (
                    <div className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 z-10">
                        {carousels.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentIndex ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeCarouselSlider;
