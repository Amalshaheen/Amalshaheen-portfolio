"use client";

import React, { useState } from 'react';
import { ProjectCard } from '../ui/project-card';
import { Button } from '../ui/button';

const allProjects = [
  {
    title: 'ThoughtTrail',
    description: 'A personal timeline app for capturing thoughts, voice notes, and photos, reflecting a philosophy of intentional living.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'journal app',
    tags: ['Flutter', 'In Progress'],
    details: 'This project is a direct reflection of my personal philosophy focused on intentional living and self-awareness. It demonstrates my ability to build a project from a philosophical standpoint and manage a passion project alongside academic responsibilities.',
    category: 'Mobile App',
    github: 'https://github.com/Amalshaheen/thought_trail',
  },
  {
    title: 'Personal Money Manager',
    description: 'A simple Flutter web app to track credits and debits, marking my first full-stack style project.',
    image: '/images/Personal Money Manager.png',
    imgHint: 'finance tracker',
    tags: ['Flutter', 'Hive', 'Completed', 'Hosted'],
    details: 'This app marks my successful transition from frontend-only development to building a complete, end-to-end application. It was a crucial step in understanding backend systems and database management.',
    category: 'Mobile App',
  },
  {
    title: 'Shopkeeping App',
    description: 'A business management tool for sales, inventory, and billing, designed for a real-world family business.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'inventory management',
    tags: ['Flutter', 'On Hold'],
    details: 'This ambitious project highlights an entrepreneurial mindset and provided valuable lessons in project scoping, prioritization, and managing real-world constraints and stakeholder expectations.',
    category: 'Mobile App',
  },
  {
    title: 'Useless Projects (Makethon)',
    description: 'A creative cross-platform app built for a fun, innovation-focused event hosted by TinkerHub.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'creative coding',
    tags: ['Flutter', 'Completed'],
    details: 'This project showcases creativity, rapid prototyping skills, and the ability to deliver a functional product under the tight deadlines of an event-driven environment like a makethon.',
    category: 'Mobile App',
  },
  {
    title: 'Netflix Clone App',
    description: 'A Flutter-based Netflix UI clone showcasing responsive layouts and media handling.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'netflix clone ui',
    tags: ['Flutter'],
    details: 'A UI-focused clone demonstrating list/grid layouts, media playback placeholders, and responsive design in Flutter.',
    category: 'Mobile App',
    github: 'https://github.com/Amalshaheen/netflix_clone',
  },
  {
    title: 'Kathaloop',
    description: 'A storytelling/reading app built with Flutter (KathaLoop).',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'story app',
    tags: ['Flutter'],
    details: 'A mobile app focused on presenting stories with simple navigation and pleasant reading experience.',
    category: 'Mobile App',
    github: 'https://github.com/Amalshaheen/katha_loop',
  },
  {
    title: 'Personal Portfolio',
    description: 'Animated and interactive personal website showcasing my skills and projects.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'developer portfolio website',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Hosted'],
    details: 'This portfolio demonstrates my frontend expertise and ability to build clean, animated, production-ready websites using modern frameworks.',
    category: 'Web App',
    live: 'https://amalshaheen.is-a.dev',
    github: 'https://github.com/Amalshaheen/Amalshaheen-portfolio',
  },
  {
    title: 'Notice Maker',
    description: 'A simple tool to quickly generate official college/community notices.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'notice generator UI',
    tags: ['React', 'TailwindCSS'],
    details: 'Built as a separate page within my portfolio, this tool demonstrates my ability to build practical, reusable components for real-world use cases.',
    category: 'Web App',
    live: 'https://amalshaheen.is-a.dev/notice-maker',
  },
  {
    title: 'ProComm Website',
    description: 'Official website for IEEE ComSoc Kerala Section’s ProComm event.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'event website UI',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Collaboration'],
    details: 'Developed collaboratively as Web Master, this website showcases teamwork, responsive design skills, and deploying production-grade sites.',
    category: 'Web App',
    live: 'https://procomm-2025.vercel.app',
  },
  {
    title: 'Dot Dash Dot',
    description: 'A puzzle game inspired by Morse code, focused on logical problem-solving.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'puzzle game UI',
    tags: ['React', 'Game'],
    details: 'This project explores game-like interactivity with React, focusing on minimal UI and clean logic handling.',
    category: 'Web App',
    live: 'https://dash-dot-challenge.vercel.app',
    github: 'https://github.com/Amalshaheen/dash-dot-challenge',
  },
  {
    title: 'Puzzle Camera',
    description: 'A funny puzzle game that splits images into tiles to rearrange, built during Useless Projects 2.0.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'puzzle camera game',
    tags: ['React', 'Team Project', 'Makethon'],
    details: 'Built collaboratively in a short hackathon-style event, this project shows teamwork and rapid prototyping with React.',
    category: 'Web App',
    live: 'https://puzzle-camera.vercel.app',
    github: 'https://github.com/abhiramrtk/puzzle-camera',
  },
];


const categories = ['All', 'Web App', 'Mobile App'];

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">Projects Showcase</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          A selection of projects that demonstrate my skills and my passion for building with purpose.
        </p>

        <div className="flex justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
