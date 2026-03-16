import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Rocket } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { title: 'Campus Life', links: ['Clubs', 'Sports', 'Events', 'Achievements'] },
        { title: 'Academic', links: ['Exam Schedule', 'Placements', 'Curriculum', 'Gallery'] },
        { title: 'Support', links: ['Help Center', 'Official Website', 'Privacy Policy', 'Terms of Service'] },
    ];

    return (
        <footer className="bg-primary-dark text-white relative pt-20 pb-10 overflow-hidden shadow-2xl">
            {/* Decorative Gradient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 via-transparent to-transparent opacity-50 z-0 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-primary to-blue-600 z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
                    {/* Logo & Info */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-xl shadow-blue-500/20">
                                <Rocket className="text-primary w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white tracking-tight leading-none uppercase">College News</span>
                                <span className="text-[10px] text-blue-300 font-bold tracking-widest uppercase mt-1">Official University Portal</span>
                            </div>
                        </Link>
                        <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs font-medium">
                            Empowering students with real-time news, academic updates, and campus achievements since 1995.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1 shadow-md border border-white/10 group">
                                    <Facebook className="w-4 h-4 text-blue-100 group-hover:text-white" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1 shadow-md border border-white/10 group">
                                    <Twitter className="w-4 h-4 text-blue-100 group-hover:text-white" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1 shadow-md border border-white/10 group">
                                    <Instagram className="w-4 h-4 text-blue-100 group-hover:text-white" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1 shadow-md border border-white/10 group">
                                    <Linkedin className="w-4 h-4 text-blue-100 group-hover:text-white" />
                                </a>
                            </div>
                            <div className="flex flex-col gap-1 text-[10px] font-black uppercase tracking-widest text-blue-400/60">
                                <span className="flex items-center gap-2 italic hover:text-white cursor-pointer transition-colors"><Instagram size={10} /> @college_insta</span>
                                <span className="flex items-center gap-2 italic hover:text-white cursor-pointer transition-colors"><Twitter size={10} /> @college_twitter</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col gap-6">
                            <h3 className="text-md font-bold text-white tracking-wider uppercase border-l-4 border-blue-400 pl-4">{section.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-blue-100/60 hover:text-white transition-all text-sm font-medium hover:translate-x-2 inline-block">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-md font-bold text-white tracking-wider uppercase border-l-4 border-blue-400 pl-4">Contact Campus</h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                <p className="text-sm text-blue-100/70 leading-relaxed font-medium">
                                    University Main Road, Tech Park, City - 560012, India
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <p className="text-sm text-blue-100/70 font-medium">+91 1234 567 890</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <p className="text-sm text-blue-100/70 font-medium">news@college.edu</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-6">
                    <p className="text-xs text-blue-100/40 font-bold uppercase tracking-[0.2em] order-2 md:order-1">
                        © {currentYear} College News. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 order-1 md:order-2">
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Digital Library</span>
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Alumni Portal</span>
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Staff Login</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
