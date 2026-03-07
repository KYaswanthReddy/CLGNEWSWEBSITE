import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Trophy, Dumbbell, Award, Users } from 'lucide-react';

const SportsClub = () => (
    <ClubTemplate
        name="Sports Club"
        tagline="Cricket · Basketball · Volleyball · Kabaddi"
        description="Training, tournaments and team spirit — the Sports Club oversees all athletic activities with dedicated coaches and inter-college representation across 8 sports."
        icon={Trophy}
        color="from-orange-500 to-red-700"
        accentBg="bg-orange-500"
        accentText="text-orange-600"
        heroImage="https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2670&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2611&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2670&auto=format&fit=crop',
        ]}
        stats={[
            { value: '300+', label: 'Members' },
            { value: '30', label: 'Tournaments' },
            { value: '18', label: 'Trophies Won' },
            { value: '8', label: 'Sports Covered' },
        ]}
        events={[
            { title: 'Inter-College Cricket League', date: 'March 20–30, 2024', description: '10-team knockout tournament at the college cricket ground.' },
            { title: 'State Basketball Championship', date: 'April 08, 2024', description: 'Our team represents the district in the state-level championship.' },
            { title: 'Annual Sports Day', date: 'May 15, 2024', description: 'Full-day athletics meet with track events, field events and prize distribution.' },
        ]}
        about="The Sports Club is the athletic powerhouse of our college. With dedicated coaches for cricket, basketball, volleyball, kabaddi, badminton and athletics, we offer structured training programs alongside inter-college tournament participation. Our players have represented the university at Zonal, State and National levels."
        features={[
            { icon: Dumbbell, title: 'Professional Coaching', desc: 'Certified coaches for cricket, basketball, volleyball and kabaddi.' },
            { icon: Award, title: 'State-Level Teams', desc: 'Multiple teams compete at district and state championships every year.' },
            { icon: Users, title: '300+ Athletes', desc: 'The largest student club on campus spanning 8 different sports.' },
        ]}
        meetTime="Daily Training Sessions, 5:30 – 7:30 AM & 4:00 – 6:00 PM · Sports Ground"
    />
);

export default SportsClub;
