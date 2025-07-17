"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'The Art of Scrollytelling in Web Design',
    description: 'Exploring how to create immersive narrative experiences on the web using modern tools.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'abstract code',
    tags: ['Web Development', 'UI/UX', 'Framer Motion'],
  },
  {
    title: 'Building a Design System with TailwindCSS',
    description: 'A practical guide to creating a scalable and maintainable design system for your projects.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'design system',
    tags: ['CSS', 'TailwindCSS', 'Frontend'],
  },
  {
    title: 'My Journey into Community Building',
    description: 'Lessons learned from leading a tech community and fostering a culture of collaboration.',
    image: 'https://placehold.co/600x400.png',
    imgHint: 'community people',
    tags: ['Community', 'Leadership'],
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4">Resources & Blog</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Sharing insights, tutorials, and reflections from my journey in tech and community.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full flex flex-col group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden">
                    <Image src={post.image} alt={post.title} data-ai-hint={post.imgHint} width={600} height={400} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <CardTitle className="font-headline text-xl mb-2">{post.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
                  <a href="#" className="flex items-center font-semibold text-primary group-hover:underline">
                    Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
