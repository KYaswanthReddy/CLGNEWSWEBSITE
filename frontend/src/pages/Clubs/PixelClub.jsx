import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Palette, Users, Star, Image as Img } from 'lucide-react';

const PixelClub = () => (
    <ClubTemplate
        name="Pixel Club"
        tagline="Digital & Traditional Arts"
        description="Where imagination meets canvas — the creative heartbeat of our university, fostering talent in digital illustration, photography and fine arts."
        icon={Palette}
        color="from-indigo-600 to-purple-800"
        accentBg="bg-indigo-600"
        accentText="text-indigo-600"
        heroImage="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2574&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2576&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2509&auto=format&fit=crop',
        ]}
        stats={[
            { value: '120+', label: 'Members' },
            { value: '15', label: 'Events Held' },
            { value: '4', label: 'Awards Won' },
            { value: '3', label: 'Years Active' },
        ]}
        events={[
            { title: 'Digital Art Workshop', date: 'March 15, 2024', description: 'Advanced Procreate & Photoshop techniques for digital painting.' },
            { title: 'Campus Mural Project', date: 'April 02, 2024', description: 'Collaborative wall painting at the student activity center.' },
            { title: 'Annual Art Expo', date: 'May 10, 2024', description: 'Showcasing the best artworks from all members to the entire city.' },
        ]}
        about="Pixel Club serves as a platform for students to express their creativity, learn new artistic skills, and collaborate on large-scale art projects. We provide resources from canvases to high-end drawing tablets. Whether you are a digital illustrator or a traditional painter, Pixel Club is your creative home."
        features={[
            { icon: Users, title: '120+ Members', desc: 'A diverse group of artists from all academic branches.' },
            { icon: Star, title: 'Weekly Meets', desc: 'Every Friday 4–6 PM in the Creative Studio, Room 204.' },
            { icon: Img, title: 'Bi-Annual Expo', desc: 'Two exhibitions every year showcasing member artworks publicly.' },
        ]}
        meetTime="Every Friday, 4:00 – 6:00 PM · Creative Studio"
    />
);

export default PixelClub;
