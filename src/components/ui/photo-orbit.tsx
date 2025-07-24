"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface PhotoOrbitProps {
  className?: string;
  photoSrc: string;
  alt: string;
}

export const PhotoOrbit: React.FC<PhotoOrbitProps> = ({ 
  className = "", 
  photoSrc, 
  alt 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth following - reduced for subtlety
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  // Transform values for magnetic effect - much more conservative range
  const magneticX = useTransform(springX, [0, windowSize.width], [-8, 8]);
  const magneticY = useTransform(springY, [0, windowSize.height], [-6, 6]);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    updateWindowSize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={`fixed pointer-events-none z-30 ${className}`}
      style={{
        x: magneticX,
        y: magneticY,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        delay: 0.8, 
        duration: 1.5, 
        type: "spring", 
        stiffness: 60,
        damping: 15
      }}
    >
      {/* Orbiting container - only the container rotates, not the photo */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Main photo container - DOES NOT rotate with container */}
        <motion.div 
          className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          whileHover={{ scale: 1.1 }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-full blur-md scale-110"></div>
          
          {/* Photo container - counter-rotates to keep photo upright */}
          <motion.div 
            className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl backdrop-blur-sm"
            animate={{
              rotate: [0, -360], // Counter-rotate to keep photo upright
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full"></div>
            <Image 
              src={photoSrc}
              alt={alt}
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full filter brightness-105"
              data-ai-hint="professional headshot, friendly smile, engineering student"
            />
            <div className="absolute inset-0 rounded-full border border-white/20"></div>
          </motion.div>
        </motion.div>

        {/* Orbiting elements - these DO rotate around the photo */}
        <motion.div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary/60 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        
        <motion.div
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent/60 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        />

        {/* Floating particles */}
        <motion.div
          className="absolute top-1/2 -right-5 w-1 h-1 bg-primary/40 rounded-full"
          animate={{
            x: [0, 8, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        
        <motion.div
          className="absolute top-1/4 -left-4 w-1 h-1 bg-accent/40 rounded-full"
          animate={{
            x: [0, -6, 0],
            y: [0, -3, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1.5
          }}
        />
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-0.5 bg-green-400 rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoOrbit;
