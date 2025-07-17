"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Users, Briefcase } from 'lucide-react';
import { Separator } from '../ui/separator';

const timelineEvents = [
  {
    icon: <Book className="h-6 w-6" />,
    date: "2020",
    title: "Began Self-Taught Journey",
    description: "Started my journey into the world of programming with a deep dive into Python and web development fundamentals.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    date: "2021",
    title: "First Full-Stack Project",
    description: "Built and deployed my first major project, a social media platform for local artists, using Django and React.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    date: "2022",
    title: "Co-Lead of TinkerHub",
    description: "Co-led a community of over 200 student developers, organizing workshops, hackathons, and mentorship programs.",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    date: "2023",
    title: "Internship at TechCorp",
    description: "Worked as a software engineering intern, contributing to the development of a large-scale data processing pipeline.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  },
};

const AboutSection = () => {
  return (
    <section id="about" className="container mx-auto py-24 px-4">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">A Scrollytelling Journey</h2>
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
        A timeline of my journey, highlighting key milestones in learning, building, and community contribution.
      </p>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        
        {timelineEvents.map((event, index) => (
          <motion.div 
            key={index} 
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <div className="flex items-center" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
              <div className="w-1/2 px-6">
                <div className={`p-6 rounded-2xl bg-card border shadow-lg text-left ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <p className="text-sm text-primary font-semibold mb-1">{event.date}</p>
                  <h3 className="font-headline text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </div>
              </div>

              <div className="w-1/2 flex justify-center">
                 <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-background border-4 border-primary rounded-full flex items-center justify-center text-primary">
                  {event.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
