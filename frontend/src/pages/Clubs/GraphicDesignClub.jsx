import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Pen, Layout, Eye, Users } from 'lucide-react';

const GraphicDesignClub = () => (
    <ClubTemplate
        name="Graphic Design Club"
        tagline="Branding · UI/UX · Visual Identity"
        description="Crafting the visual voice of our university — from event posters and social media creatives to full brand identities. Master Figma, Illustrator and brand strategy."
        icon={Pen}
        color="from-amber-500 to-orange-700"
        accentBg="bg-amber-500"
        accentText="text-amber-600"
        heroImage="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2452&auto=format&fit=crop',
        ]}
        stats={[
            { value: '90+', label: 'Members' },
            { value: '10', label: 'Brand Projects' },
            { value: '1000+', label: 'Creatives Made' },
            { value: '3', label: 'Years Active' },
        ]}
        events={[
            { title: 'Figma Masterclass', date: 'March 20, 2024', description: 'From wireframes to high-fidelity prototypes — a full-day Figma workshop.' },
            { title: 'College Fest Poster Design Drive', date: 'April 01, 2024', description: 'Rapid design sprint to create all visual assets for Artika 2024.' },
            { title: 'Brand Identity Challenge', date: 'May 08, 2024', description: 'Create a complete brand identity for a real local startup in 72 hours.' },
        ]}
        about="The Graphic Design Club is the visual backbone of our campus. We design every official poster, banner, social media creative and large-format print for college events. Members learn industry tools (Figma, Adobe Suite), study typography and colour theory, and receive live briefs from college departments — real work, real deadlines."
        features={[
            { icon: Layout, title: 'Figma & Adobe Suite', desc: 'Structured workshops on all major design tools used in the industry.' },
            { icon: Eye, title: 'Real Briefs', desc: 'Design official college creatives — actual work that goes up on campus.' },
            { icon: Users, title: '90+ Members', desc: 'Artists, technologists and marketers collaborating under one roof.' },
        ]}
        meetTime="Every Wednesday, 4:00 – 6:00 PM · Design Studio, Block A"
    />
);

export default GraphicDesignClub;
