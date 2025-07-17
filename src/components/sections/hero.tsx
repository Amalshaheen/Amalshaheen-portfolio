"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Code, MessageSquare, User } from 'lucide-react';

const bentoCardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
};

const BentoCard = ({ className, children, href }: { className: string, children: React.ReactNode, href?: string }) => {
  const Component = href ? Link : 'div';
  return (
    <motion.div
      variants={bentoCardVariants}
      whileHover="hover"
      className="relative"
    >
      <Component href={href || ''} className="h-full">
        <Card className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 ${className}`}>
          {children}
        </Card>
      </Component>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen container mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[200px] md:auto-rows-auto w-full max-w-6xl mx-auto"
      >
        <motion.div variants={bentoCardVariants} className="md:col-span-4 md:row-span-1">
          <Card className="w-full h-full rounded-2xl p-8 flex items-center bg-card/50 shadow-lg">
            <AnimatedText text="Hi, I’m Amal — a self-taught developer, community builder, and seeker of purposeful tech." />
          </Card>
        </motion.div>

        <BentoCard className="md:col-span-2 md:row-span-2 group" href="#projects">
            <div className='flex flex-col h-full'>
                <Code className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-headline text-2xl font-semibold">Projects</h3>
                <p className="text-muted-foreground mt-2 flex-grow">A selection of my work, from web apps to open source contributions.</p>
                <div className='flex items-center text-sm font-semibold text-primary mt-4'>
                    View Projects <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
            <Image src="https://placehold.co/600x400.png" alt="Projects" data-ai-hint="code project" layout="fill" className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity -z-10" />
        </BentoCard>

        <BentoCard className="md:col-span-2 md:row-span-1 group" href="#about">
            <div className='flex flex-col h-full'>
                <User className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-headline text-2xl font-semibold">About Me</h3>
                <p className="text-muted-foreground mt-2 flex-grow">My journey, skills, and what drives me.</p>
                <div className='flex items-center text-sm font-semibold text-primary mt-4'>
                    Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </BentoCard>

        <BentoCard className="md:col-span-2 md:row-span-1 group" href="#contact">
            <div className='flex flex-col h-full'>
                <MessageSquare className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-headline text-2xl font-semibold">Let's Connect</h3>
                <p className="text-muted-foreground mt-2 flex-grow">Reach out for collaborations or a friendly chat.</p>
                <div className='flex items-center text-sm font-semibold text-primary mt-4'>
                    Get In Touch <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </BentoCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
