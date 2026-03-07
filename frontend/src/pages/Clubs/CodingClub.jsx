import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Code2, Terminal, GitBranch, Users } from 'lucide-react';

const CodingClub = () => (
    <ClubTemplate
        name="Coding Club"
        tagline="Competitive Programming · DSA · Open Source"
        description="Train for ICPC, crack coding interviews, build open-source projects and level up your DSA. Weekly contests, practice sessions and placement prep all in one place."
        icon={Code2}
        color="from-slate-700 to-slate-900"
        accentBg="bg-slate-800"
        accentText="text-slate-700"
        heroImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=2550&auto=format&fit=crop',
        ]}
        stats={[
            { value: '250+', label: 'Members' },
            { value: '25', label: 'Contests Hosted' },
            { value: '40+', label: 'Placed via Prep' },
            { value: '5', label: 'Years Active' },
        ]}
        events={[
            { title: 'Weekly Codeforces Contest', date: 'Every Sunday', description: 'Club-internal rated contests on Codeforces to track divisions and growth.' },
            { title: 'DSA Bootcamp — Batch 7', date: 'April 01–30, 2024', description: '30-day intensive DSA revision series covering arrays to graphs.' },
            { title: 'Open Source Sprint', date: 'May 12, 2024', description: 'Contribute to real GitHub repos — earn certificates and swag.' },
        ]}
        about="The Coding Club is a community of competitive programmers, open-source contributors, and placement warriors. We run weekly rated Codeforces contests, month-long DSA bootcamps, mock interview sessions, and project showcase events. Our alumni have cracked FAANG, won ICPC Regionals, and contributed to top open-source repos."
        features={[
            { icon: Terminal, title: 'Weekly Contests', desc: 'Club-internal rated contests every Sunday morning on Codeforces.' },
            { icon: GitBranch, title: 'Open Source', desc: 'Regular Open Source Sprints with contributions to real-world repos.' },
            { icon: Users, title: 'Placement Prep', desc: 'Mock interviews, resume reviews and referral networks for final-year students.' },
        ]}
        meetTime="Every Monday & Wednesday, 6:00 – 8:00 PM · CS Lab 3, Block B"
    />
);

export default CodingClub;
