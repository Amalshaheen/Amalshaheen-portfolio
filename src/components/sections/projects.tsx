"use client";

import React, { useState } from 'react';
import { ProjectCard } from '../ui/project-card';
import { Button } from '../ui/button';

const allProjects = [
  {
    title: 'Digital Garden CMS',
    description: 'A custom CMS for managing and publishing content to a personal digital garden.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'content management',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
    details: 'This project involved building a full-stack application from scratch. The main challenge was designing a flexible schema that could accommodate various types of content, from blog posts to project showcases. I acted as the sole developer, handling everything from UI/UX design to database architecture and deployment.',
    category: 'Web App',
  },
  {
    title: 'Community Event Platform',
    description: 'A platform for organizing and managing tech community events, workshops, and hackathons.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'event platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    details: 'As a co-lead of a large student developer community, I identified the need for a centralized platform to manage our activities. I led a team of three developers to build this platform. My role focused on backend development and project management, ensuring we delivered a scalable and user-friendly solution.',
    category: 'Web App',
  },
  {
    title: 'Framer Motion Cheatsheet',
    description: 'An interactive cheatsheet for Framer Motion, helping developers quickly find and understand animations.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'animation cheatsheet',
    tags: ['Open Source', 'Framer Motion', 'React'],
    details: 'This is a popular open-source project I started to help the community. It features live-editable code snippets and visual demonstrations of various animation properties. It has received over 500 stars on GitHub and multiple community contributions.',
    category: 'Open Source',
  },
  {
    title: 'Portfolio Website',
    description: 'This very website, designed as a digital garden to showcase my work and thoughts.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'portfolio design',
    tags: ['Next.js', 'TailwindCSS', 'UI/UX'],
    details: 'I designed and built this portfolio to reflect my identity as a purpose-driven builder. The project involved creating a custom design system, implementing complex animations with Framer Motion, and structuring the site in a modular, maintainable way using Next.js App Router.',
    category: 'Web App',
  },
];

const categories = ['All', 'Web App', 'Open Source'];

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
          Here are some of the projects I'm proud of. Each one represents a unique challenge and a learning opportunity.
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
