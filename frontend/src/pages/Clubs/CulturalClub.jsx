import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Mic, Music, Drama, Users } from 'lucide-react';

const CulturalClub = () => (
    <ClubTemplate
        name="Cultural Club"
        tagline="Dance · Music · Theatre"
        description="Celebrating the rich tapestry of culture through classical dance, folk music, street plays, and annual festivals that unite the entire campus."
        icon={Mic}
        color="from-rose-600 to-pink-800"
        accentBg="bg-rose-600"
        accentText="text-rose-600"
        heroImage="https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504059255-3f2e1c53a59f?q=80&w=2662&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
        ]}
        stats={[
            { value: '200+', label: 'Members' },
            { value: '20', label: 'Events Held' },
            { value: '8', label: 'Awards Won' },
            { value: '5', label: 'Years Active' },
        ]}
        events={[
            { title: 'Kuchipudi Practice Workshop', date: 'March 18, 2024', description: 'Classical dance training with our resident faculty choreographer.' },
            { title: 'Street Play — "Awaaz"', date: 'April 05, 2024', description: 'Social awareness street play performed at the college gate plaza.' },
            { title: 'Artika 2024 Cultural Fest', date: 'March 25–27, 2024', description: 'Three-day mega cultural festival open to all students and guests.' },
        ]}
        about="The Cultural Club is the soul of campus life. We celebrate diversity by organising classical and folk dance performances, independent music concerts, theatre productions and the grand annual fest 'Artika'. Our members learn from professional trainers and represent the college in inter-university cultural competitions."
        features={[
            { icon: Mic, title: 'Live Performances', desc: 'Monthly concerts and stage productions for the entire campus.' },
            { icon: Users, title: '200+ Members', desc: 'Dancers, musicians, actors and event managers all in one community.' },
            { icon: Mic, title: 'Annual Fest — Artika', desc: '3-day cultural extravaganza with 5000+ attendees every year.' },
        ]}
        meetTime="Every Saturday, 3:00 – 6:00 PM · Open Air Amphitheatre"
    />
);

export default CulturalClub;
