"use client";

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import React, { useEffect } from "react";

export const CursorFollowGradient = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 300, mass: 2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  const gradientTransform = useTransform(
    [springX, springY],
    ([latestX, latestY]) => `radial-gradient(400px at ${latestX}px ${latestY}px, hsla(var(--primary), 0.15), transparent 80%)`
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        background: gradientTransform,
        pointerEvents: 'none',
      }}
    />
  );
};
