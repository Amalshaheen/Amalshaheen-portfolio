"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Users, Zap, Award } from 'lucide-react';

const roles = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Community Lead",
    organization: "TinkerHub",
    date: "2021 - Present",
    description: "Leading a vibrant community of developers. Organized 20+ workshops and a national-level hackathon, impacting over 500 students.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Project Mentor",
    organization: "Open Source Initiative",
    date: "2022 - 2023",
    description: "Mentored new contributors, providing guidance on code quality, PR etiquette, and navigating large codebases.",
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Hackathon Judge",
    organization: "TechFest Annual",
    date: "2023",
    description: "Evaluated over 50 project submissions based on innovation, technical complexity, and presentation.",
  },
];

const LeadershipSection = () => {
  return (
    <section id="leadership" className="container mx-auto py-24 px-4">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">Leadership & Community</h2>
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
        I believe in the power of community and actively contribute to fostering inclusive and collaborative tech spaces.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {role.icon}
                  </div>
                  <div>
                    <CardTitle className="font-headline text-2xl">{role.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{role.organization}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-primary mb-2">{role.date}</p>
                <CardDescription>{role.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;
