"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Server, Smartphone, Wrench, Languages, GitBranch, Github } from 'lucide-react';

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
)

const FirebaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M12.3 4.85c.31-.21.57-.45.8-.72a.5.5 0 0 0-.35-.88C11.69 3.65 6.66 2.3 4.5 5.5c-2.04 3.03.4 7.8 4 9.5.31.14.65.14.96 0l.3-.14c.3-.14.45-.37.45-.64v-4.59c0-.49-.44-.88-.97-.73-2.12.6-2.92-1.2-1.3-2.5C9.03 5.42 11.23 4.5 12.3 4.85Z"/><path d="m13.2 12.45 4.5 2.1c.4.18.88.03 1.15-.34.3-.4.27-.97-.08-1.32l-3.3-3.3c-.4-.4-.99-.5-1.45-.16l-.37.27c-.3.22-.3.65 0 .88Z"/><path d="M13.2 12.45c0 .49.44.88.97.73 2.12-.6 2.92 1.2 1.3 2.5-1.25 1-3.45 1.9-4.5 1.55a.5.5 0 0 1-.35-.88c.23-.27.49-.51.8-.72Z"/></svg>
)

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    skills: [
      { name: 'Flutter', icon: <></> },
      { name: 'ReactJS', icon: <></> },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="w-8 h-8 text-primary" />,
    skills: [
      { name: 'Firebase', icon: <></> },
      { name: 'Next.js Backend', icon: <></> },
      { name: 'Node.js', icon: <></> },
      { name: 'Express.js', icon: <></> },
      { name: 'MongoDB', icon: <></> },
      { name: 'Hive', icon: <></> },
      
    ],
  },
  {
    title: 'Programming Languages',
    icon: <Languages className="w-8 h-8 text-primary" />,
    skills: [
      { name: 'Dart', icon: <></> },
      { name: 'JavaScript', icon: <></> },
      { name: 'Python', icon: <></> },
      { name: 'C++', icon: <></> },
      { name: 'C', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'Verilog', icon: <></> },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: <Wrench className="w-8 h-8 text-primary" />,
    skills: [
      { name: 'Git', icon: <GitBranch/> },
      { name: 'GitHub', icon: <GithubIcon/> },
      { name: 'Firebase', icon: <FirebaseIcon/> },
      { name: 'Github Copilot', icon: <Github/> },
    ],
  },
];


const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">Technical Skills</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          A toolbox of technologies I use to build robust and efficient applications.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
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
                      {category.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center text-muted-foreground">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
