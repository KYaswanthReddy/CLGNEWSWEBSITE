import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Brush, Spray, Frame, Users } from 'lucide-react';

const ArtixClub = () => (
    <ClubTemplate
        name="Artix Club"
        tagline="Street Art · Mixed Media · Zine Making"
        description="Street murals, spray art, zine-making and installation art — Artix is where unconventional creativity thrives. Come express, experiment and exhibit without boundaries."
        icon={Brush}
        color="from-violet-600 to-fuchsia-800"
        accentBg="bg-violet-600"
        accentText="text-violet-600"
        heroImage="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2644&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2644&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2487&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1569503689697-f7d5d90d6f00?q=80&w=2670&auto=format&fit=crop',
        ]}
        stats={[
            { value: '80+', label: 'Members' },
            { value: '8', label: 'Mural Projects' },
            { value: '5', label: 'Exhibitions' },
            { value: '2', label: 'Years Active' },
        ]}
        events={[
            { title: 'Campus Mural Weekend', date: 'March 23–24, 2024', description: 'Two-day outdoor spray-painting event to cover the sports building wall.' },
            { title: 'Zine Making Workshop', date: 'April 06, 2024', description: 'Create your own self-published zine — writing, illustration and folding included.' },
            { title: 'Pop-Up Art Exhibition', date: 'May 18, 2024', description: 'A surprise outdoor exhibition on campus with guerrilla art installations.' },
        ]}
        about="Artix is the rebel art club of our campus — where rules don't exist and self-expression is the only rule. From spray-painted murals on campus walls to elaborate mixed-media installations, to hand-printed zines — we celebrate every form of unconventional art. No prior training required; just passion and willingness to get your hands dirty."
        features={[
            { icon: Brush, title: 'Street Murals', desc: 'Large-format spray art and brush murals created directly on campus walls.' },
            { icon: Frame, title: 'Pop-Up Exhibitions', desc: 'Surprise outdoor exhibitions and guerrilla installations that shock and inspire.' },
            { icon: Users, title: 'No-Rules Policy', desc: 'Open to all students regardless of skill level or discipline.' },
        ]}
        meetTime="Every Sunday, 10:00 AM – 1:00 PM · Campus Outdoor Studio"
    />
);

export default ArtixClub;
