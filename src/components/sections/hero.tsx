"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowDown, ArrowRight, User, Mail } from 'lucide-react';
import { useTilt } from '@/hooks/use-tilt';

const bentoCardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
};

const BentoCard = React.memo(({ className, children, href }: { className: string, children: React.ReactNode, href?: string }) => {
  const { style, onMouseMove, onMouseLeave } = useTilt();
  
  const content = (
    <Card className={`w-full h-full rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 ${className}`}>
      {children}
    </Card>
  );

  return (
    <motion.div
      variants={bentoCardVariants}
      whileHover="hover"
      className="relative"
      style={{ perspective: '800px' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div style={style} className="h-full">
        {href ? (
          <Link href={href} className="h-full block">
            {content}
          </Link>
        ) : (
          <div className="h-full">{content}</div>
        )}
      </motion.div>
    </motion.div>
  );
});

const HeroSection = () => {
  const { style, onMouseMove, onMouseLeave } = useTilt();

  return (
    <section className="min-h-screen w-full">
      {/* Mobile-optimized container with proper spacing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:p-6 lg:p-8 flex flex-col justify-center min-h-screen relative">
        
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.15 }}
          className="w-full max-w-6xl mx-auto space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:grid-rows-3 md:gap-6 md:auto-rows-auto"
        >
          {/* Main hero card with integrated profile photo */}
          <motion.div 
            className="w-full md:col-span-4 md:row-span-1 relative"
            style={{ perspective: '800px' }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <motion.div
              style={style}
              className="w-full h-full"
              variants={bentoCardVariants}
              initial="initial"
              animate="animate"
            >
              <Card className="w-full rounded-2xl p-6 sm:p-8 md:p-8 bg-card/50 shadow-lg min-h-[320px] sm:min-h-[350px] md:min-h-[400px] relative overflow-hidden flex flex-col lg:flex-row items-center justify-center gap-2">
                {/* Profile Photo */}
                  <motion.div 
                    className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl backdrop-blur-sm flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.5, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ 
                      delay: 0.3, 
                      duration: 1.2, 
                      type: "spring", 
                      stiffness: 100,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full z-10"></div>
                    <Image 
                      src="https://avatars.githubusercontent.com/u/149858542?v=4"
                      alt="Amal Shaheen - Professional Profile"
                      fill
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                      className="object-cover rounded-full filter brightness-105 hover:brightness-110 transition-all duration-300"
                      priority
                      data-ai-hint="professional headshot, friendly smile, engineering student"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 z-20"></div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <AnimatedText text="Amal Shaheen" className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight" />
                    <motion.p 
                      className="font-body text-base sm:text-lg md:text-xl lg:text-xl text-muted-foreground mt-2 md:mt-3 max-w-2xl mx-auto lg:mx-0"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      Engineering Student & Full-Stack Developer
                    </motion.p>
                    <motion.div 
                      className="mt-4 sm:mt-6 md:mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8 } }
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href="#projects" passHref>
                        <Button size="lg" className="w-full sm:w-auto text-sm md:text-base">View My Projects</Button>
                      </Link>
                      <Link href="#contact" passHref>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm md:text-base">Contact Me</Button>
                      </Link>
                    </motion.div>
                  </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Philosophy card */}
          <motion.div
            className="w-full md:col-span-4 md:row-span-1"
            variants={bentoCardVariants}
            initial="initial"
            animate="animate"
          >
            <BentoCard className="group h-full">
                <div className='flex flex-col h-full z-10 min-h-[200px]'>
                    <h3 className="font-headline text-xl sm:text-2xl font-semibold">Core Philosophy</h3>
                    <p className="text-muted-foreground mt-3 flex-grow text-sm sm:text-base leading-relaxed">"Code isn't just what I do. It's how I shape a life of intention, contribution, and growth. I want my skills to serve something bigger than myself."</p>
                    <div className='flex items-center text-xs sm:text-sm font-semibold text-primary mt-4'>
                        A well-rounded software engineer who lives and builds with purpose and impact.
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-0"></div>
                <Image src="https://placehold.co/600x600.png" alt="Philosophy" data-ai-hint="abstract geometric" fill className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-10 group-hover:opacity-15 transition-opacity -z-10" />
            </BentoCard>
          </motion.div>

          {/* Journey card */}
          <motion.div
            className="w-full md:col-span-2 md:row-span-1"
            variants={bentoCardVariants}
            initial="initial"
            animate="animate"
          >
            <BentoCard className="group h-full" href="#about">
                <div className='flex flex-col h-full min-h-[180px]'>
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3" />
                    <h3 className="font-headline text-xl sm:text-2xl font-semibold">My Journey</h3>
                    <p className="text-muted-foreground mt-2 flex-grow text-sm sm:text-base">From C++ to full-stack, a path of growth.</p>
                    <div className='flex items-center text-xs sm:text-sm font-semibold text-primary mt-4'>
                        Learn More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </BentoCard>
          </motion.div>

          {/* Contact card */}
          <motion.div
            className="w-full md:col-span-2 md:row-span-1"
            variants={bentoCardVariants}
            initial="initial"
            animate="animate"
          >
            <BentoCard className="group h-full" href="#contact">
                <div className='flex flex-col h-full min-h-[180px]'>
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3" />
                    <h3 className="font-headline text-xl sm:text-2xl font-semibold">Let's Connect</h3>
                    <p className="text-muted-foreground mt-2 flex-grow text-sm sm:text-base">Reach out for collaborations or a friendly chat.</p>
                    <div className='flex items-center text-xs sm:text-sm font-semibold text-primary mt-4'>
                        Get In Touch <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </BentoCard>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
