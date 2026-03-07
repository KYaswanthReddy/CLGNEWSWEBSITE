import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Star, Calendar, Mic, Users } from 'lucide-react';

const InaugurationClub = () => (
    <ClubTemplate
        name="Inauguration Club"
        tagline="Events · Ceremonies · College Fests"
        description="The official campus events committee — coordinating college fests, convocations, guest lecture series and every major ceremony with precision and flair."
        icon={Star}
        color="from-yellow-500 to-amber-700"
        accentBg="bg-yellow-500"
        accentText="text-yellow-600"
        heroImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2669&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2612&auto=format&fit=crop',
        ]}
        stats={[
            { value: '60+', label: 'Members' },
            { value: '35', label: 'Events Managed' },
            { value: '5000+', label: 'Attendees per Fest' },
            { value: '6', label: 'Years Active' },
        ]}
        events={[
            { title: 'Artika 2024 — Coordination', date: 'March 25–27, 2024', description: 'Full-event management for the 3-day annual cultural fest.' },
            { title: 'Convocation Ceremony Setup', date: 'April 20, 2024', description: 'Stage, seating, AV and protocol management for the annual convocation.' },
            { title: 'Industry Guest Lecture Series', date: 'Monthly', description: 'Organise and host monthly guest lectures from industry leaders.' },
        ]}
        about="The Inauguration Club is the backbone behind every major event on campus. From large-scale fests (Artika, Technova) to solemn ceremonies (convocation, freshers' day), our team handles stage design, schedule management, logistics, MC coordination and post-event media documentation. We work with college administration and the student council directly."
        features={[
            { icon: Calendar, title: 'End-to-End Management', desc: 'From venue booking and AV setup to post-event documentation.' },
            { icon: Mic, title: 'Guest Coordination', desc: 'Handle all guest invitations, hospitality and on-stage protocols.' },
            { icon: Users, title: 'College-Sanctioned', desc: 'Officially recognised by the administration — your events carry real authority.' },
        ]}
        meetTime="Event-Based · Core team meets every Monday at 5:00 PM"
    />
);

export default InaugurationClub;
