import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Lightbulb, Rocket, TrendingUp, Users } from 'lucide-react';

const InnovationClub = () => (
    <ClubTemplate
        name="Innovation Club"
        tagline="Startups · Ideathons · Problem Solving"
        description="From idea to MVP — the Innovation Club incubates student startups, organises ideathons and connects founders with mentors, investors and resources."
        icon={Lightbulb}
        color="from-emerald-600 to-teal-800"
        accentBg="bg-emerald-600"
        accentText="text-emerald-600"
        heroImage="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1652358977490-b5a7e7fc1021?q=80&w=2574&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop',
        ]}
        stats={[
            { value: '150+', label: 'Members' },
            { value: '18', label: 'Ideathons' },
            { value: '12', label: 'Startups Founded' },
            { value: '4', label: 'Years Active' },
        ]}
        events={[
            { title: '24-Hour Ideathon', date: 'March 28, 2024', description: 'Solve a real social impact challenge in 24 hours with a team of 4.' },
            { title: 'Startup Pitch Night', date: 'April 15, 2024', description: 'Student founders pitch their MVPs to a panel of angel investors.' },
            { title: 'Design Thinking Bootcamp', date: 'May 02, 2024', description: 'Full-day human-centred design workshop with external facilitators.' },
        ]}
        about="The Innovation Club is your launchpad. We help students move from raw ideas to working prototypes, connecting them with mentors from industry, alumni who are founders, and access to the college incubation cell. Past teams have gone on to receive seed funding, win Smart India Hackathon, and launch real products in the market."
        features={[
            { icon: Lightbulb, title: 'Incubation Support', desc: 'Access to college incubation cell, co-working space and mentorship.' },
            { icon: TrendingUp, title: 'Investor Connect', desc: 'Annual pitch night where student startups meet real angel investors.' },
            { icon: Rocket, title: 'Hackathon Pipeline', desc: 'We train and send teams to SIH, Hack36, and other national hackathons.' },
        ]}
        meetTime="Every Tuesday, 5:00 – 7:00 PM · Innovation Hub, Block D"
    />
);

export default InnovationClub;
