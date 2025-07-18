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
  },
  {
    title: 'Personal Money Manager',
    description: 'A simple web app to track credits and debits, marking my first full-stack project.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'finance tracker',
    tags: ['Node.js', 'MongoDB', 'Completed'],
    details: 'This app marks my successful transition from frontend-only development to building a complete, end-to-end application. It was a crucial step in understanding backend systems and database management.',
    category: 'Web App',
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
