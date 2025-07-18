"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
  }),
};

const textVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <motion.h1
      className={cn("font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-balance", className)}
      variants={textContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={textVariants}
          className="inline-block mr-2 lg:mr-3"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
