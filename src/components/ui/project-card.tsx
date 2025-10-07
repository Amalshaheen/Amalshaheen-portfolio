"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTilt } from '@/hooks/use-tilt';

type Project = {
  title: string;
  description: string;
  image: string;
  imgHint: string;
  tags: string[];
  details: string;
  github?: string;
  live?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const { style, onMouseMove, onMouseLeave } = useTilt({ rotate: 10 });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          style={{ perspective: '800px' }}
          className="w-full"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            style={style}
            className="w-full h-full"
          >
            <Card className="w-full h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
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
                {/* GitHub / Live buttons (render only when links are provided) */}
                {(project.github || project.live) && (
                  <div className="flex items-center gap-3 mt-4">
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </Button>
                      </Link>
                    )}
                    {project.live && (
                      <Link href={project.live} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="sm" className="flex items-center">
                          <ExternalLink className="h-4 w-4" />
                          <span>Live</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
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
            <h3 className="font-headline text-xl font-semibold">Key Takeaway</h3>
            <p className="text-sm text-muted-foreground">{project.details}</p>
            {/* Buttons in the dialog detail view */}
            {(project.github || project.live) && (
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {project.github && (
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </Button>
                  </Link>
                )}
                {project.live && (
                  <Link href={project.live} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" size="sm" className="flex items-center">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live</span>
                    </Button>
                  </Link>
                )}
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
