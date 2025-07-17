"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './button';

type Project = {
  title: string;
  description: string;
  image: string;
  imgHint: string;
  tags: string[];
  details: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          style={{ perspective: '800px' }}
          className="w-full"
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
          >
            <Card className="w-full h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    data-ai-hint={project.imgHint}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl mb-2">{project.title}</CardTitle>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl">{project.title}</DialogTitle>
          <DialogDescription>
             {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="aspect-video overflow-hidden rounded-lg border">
                <Image src={project.image} alt={project.title} width={600} height={400} data-ai-hint={project.imgHint} className="object-cover w-full h-full" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Case Study</h3>
            <p className="text-sm text-muted-foreground">{project.details}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
