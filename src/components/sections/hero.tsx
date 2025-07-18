"use client";

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowDown, ArrowRight, Code, Mail, User } from 'lucide-react';

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
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-150, 150], [10, -10]);
    const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  return (
    <section className="min-h-screen container mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[200px] md:auto-rows-auto w-full max-w-6xl mx-auto"
      >
        <motion.div 
            className="md:col-span-4 md:row-span-1"
            style={{ perspective: '800px' }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left - rect.width / 2);
                y.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="w-full h-full"
            variants={bentoCardVariants}
            initial="initial"
            animate="animate"
          >
            <Card className="w-full h-full rounded-2xl p-8 flex flex-col justify-center text-center bg-card/50 shadow-lg min-h-[300px]">
                <AnimatedText text="Amal Shaheen" className="lg:text-7xl" />
                <motion.p 
                    className="font-body text-xl md:text-2xl text-muted-foreground mt-4"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }
                    }}
                >
                    Engineering Student & Full-Stack Developer
                </motion.p>
                <motion.div 
                    className="mt-8 flex justify-center gap-4"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8 } }
                    }}
                >
                    <Link href="#projects" passHref>
                        <Button size="lg">View My Projects</Button>
                    </Link>
                    <Link href="#contact" passHref>
                        <Button size="lg" variant="outline">Contact Me</Button>
                    </Link>
                </motion.div>
            </Card>
          </motion.div>
        </motion.div>

        <BentoCard className="md:col-span-2 md:row-span-2 group">
            <div className='flex flex-col h-full z-10'>
                <h3 className="font-headline text-2xl font-semibold">Core Philosophy</h3>
                <p className="text-muted-foreground mt-2 flex-grow">"Code isn’t just what I do. It’s how I shape a life of intention, contribution, and growth. I want my skills to serve something bigger than myself."</p>
                <div className='flex items-center text-sm font-semibold text-primary mt-4'>
                    A well-rounded software engineer who lives and builds with purpose and impact.
                </div>
            </div>
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-0"></div>
            <Image src="https://placehold.co/600x600.png" alt="Philosophy" data-ai-hint="abstract geometric" layout="fill" className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-10 group-hover:opacity-15 transition-opacity -z-10" />
        </BentoCard>

        <BentoCard className="md:col-span-2 md:row-span-1 group" href="#about">
            <div className='flex flex-col h-full'>
                <User className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-headline text-2xl font-semibold">My Journey</h3>
                <p className="text-muted-foreground mt-2 flex-grow">From C++ to full-stack, a path of growth.</p>
                <div className='flex items-center text-sm font-semibold text-primary mt-4'>
                    Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </BentoCard>

        <BentoCard className="md:col-span-2 md:row-span-1 group" href="#contact">
            <div className='flex flex-col h-full'>
                <Mail className="w-8 h-8 text-primary mb-4" />
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
