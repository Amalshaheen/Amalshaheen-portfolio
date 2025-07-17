import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full p-6 bg-background border-t">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-4 mb-4">
            <Link href="https://www.linkedin.com/in/amal-shaheen-84b860287" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                </Button>
            </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Amal Shaheen. All Rights Reserved.</p>
        <p className="text-sm mt-2">Built with Next.js, Tailwind CSS, and Framer Motion.</p>
      </div>
    </footer>
  );
};

export default Footer;
