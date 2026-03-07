import React from 'react';
import ClubTemplate from '../../components/ClubTemplate';
import { Cpu, Bot, Zap, Users } from 'lucide-react';

const TechnicalClub = () => (
    <ClubTemplate
        name="Technical Club"
        tagline="Engineering · Robotics · IoT"
        description="A hub for hardware enthusiasts, IoT builders and robotics fanatics. We build, break and innovate with real-world engineering projects and national competition entries."
        icon={Cpu}
        color="from-blue-600 to-cyan-800"
        accentBg="bg-blue-600"
        accentText="text-blue-600"
        heroImage="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
        galleryImages={[
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2540&auto=format&fit=crop',
        ]}
        stats={[
            { value: '180+', label: 'Members' },
            { value: '12', label: 'Projects Built' },
            { value: '6', label: 'Competitions Won' },
            { value: '4', label: 'Years Active' },
        ]}
        events={[
            { title: 'Robotics Build-athon', date: 'March 22, 2024', description: '48-hour challenge to build a line-following robot from scratch.' },
            { title: 'IoT Workshop Series', date: 'April 10–14, 2024', description: 'Five-day hands-on series covering ESP32, MQTT, and cloud dashboards.' },
            { title: 'Technova 2024', date: 'May 05, 2024', description: 'Annual technical symposium with project expo and paper presentations.' },
        ]}
        about="The Technical Club is where engineering theory meets real hands-on practice. Members work on robotics, embedded systems, drone building, IoT networks and more — using the college's dedicated maker-space lab. We routinely represent our college at national-level fests like Robocon, Technoxian and Avishkar."
        features={[
            { icon: Bot, title: 'Robotics Lab', desc: 'Dedicated maker-space with 3D printers, soldering stations and microcontrollers.' },
            { icon: Zap, title: 'National Competitions', desc: 'Represent the college at Robocon, Technoxian & other national events.' },
            { icon: Users, title: '180+ Members', desc: 'Students from ECE, EEE, CSE and MECH collaborating across domains.' },
        ]}
        meetTime="Every Thursday, 5:00 – 7:00 PM · Electronics Lab, Block C"
    />
);

export default TechnicalClub;
