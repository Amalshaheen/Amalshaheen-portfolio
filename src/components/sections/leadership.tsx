"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Code, Shield } from 'lucide-react';

const timelineEvents = [
  {
    icon: <Building className="h-6 w-6" />,
    date: "July 2024 – Present",
    title: "Campus Lead",
    organization: "TinkerHub GEC Kozhikode",
    description: "Leading the campus chapter, setting strategic direction, and mentoring members.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    date: "March 2024 – Present",
    title: "Mobile Development IG Lead",
    organization: "MuLearn Foundation",
    description: "Curating learning paths and mentoring peers in mobile development, establishing expertise in Flutter.",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    date: "February 2024 – Present",
    title: "Webmaster",
    organization: "IEEE ComSoc Kerala Chapter",
    description: "Maintaining the chapter's web presence, applying technical skills in service of a professional organization.",
  },
  {
    icon: <Building className="h-6 w-6" />,
    date: "November 2023 – June 2024",
    title: "Campus Co-Lead",
    organization: "TinkerHub GEC Kozhikode",
    description: "Assisted in chapter management and ran technical workshops.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    date: "November 2023 – Present",
    title: "Student Volunteer",
    organization: "IEEE",
    description: "Contributing to various work teams and supporting chapter initiatives.",
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

const LeadershipSection = () => {
  return (
    <section id="leadership" className="container mx-auto py-24 px-4">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">Leadership & Community</h2>
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
        I believe in the power of community and actively contribute to fostering inclusive and collaborative tech spaces.
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
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-1/2 px-6">
                <div className={`p-6 rounded-2xl bg-card border shadow-lg ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <p className="text-sm text-primary font-semibold mb-1">{event.date}</p>
                  <h3 className="font-headline text-xl font-semibold">{event.title}</h3>
                  <p className="text-muted-foreground text-base font-medium mb-2">{event.organization}</p>
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

export default LeadershipSection;
