"use client";

import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import React from 'react';

export const useTilt = (options?: { stiffness?: number; damping?: number; rotate?: number }) => {
  const { stiffness = 300, damping = 35, rotate = 5 } = options || {};

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness, damping });
  const mouseYSpring = useSpring(y, { stiffness, damping });

  const rotateX = useTransform(mouseYSpring, [-150, 150], [rotate, -rotate]);
  const rotateY = useTransform(mouseXSpring, [-150, 150], [-rotate, rotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = { rotateX, rotateY };

  return { style, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};
