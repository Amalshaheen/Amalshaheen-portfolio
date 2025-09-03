"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Microchip, Rocket, Server } from 'lucide-react';

const journeyPoints = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "The Spark: C++ & Python",
    description: "My journey began in high school with C++, which sparked my initial curiosity. I then self-taught Python for practical automation even before starting college.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "From Theory to Practice with Flutter",
    description: "I transitioned from the academic world of C to practical app development by learning Flutter, which empowered me to build tangible, real-world projects.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Bridging the ECE-CS Gap",
    description: "Despite pursuing an ECE degree, my true passion lies in Computer Science. I am actively self-studying CS fundamentals to build a strong theoretical foundation.",
  },
  {
    icon: <Microchip  className="h-6 w-6" />,
    title: "Becoming a Maker",
    description: "I'm currently diving deep into building Maker Mindset - where curiosity fuels my learning. started hardware based projects.",
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
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">My Journey</h2>
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
        A narrative of growth, curiosity, and the drive to build with purpose.
      </p>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        
        {journeyPoints.map((point, index) => (
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
                  <h3 className="font-headline text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground text-sm">{point.description}</p>
                </div>
              </div>

              <div className="w-1/2 flex justify-center">
                 <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-background border-4 border-primary rounded-full flex items-center justify-center text-primary">
                  {point.icon}
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
