import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-6 bg-background border-t">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Amal. All Rights Reserved.</p>
        <p className="text-sm mt-2">Built with Next.js, Tailwind CSS, and Framer Motion.</p>
      </div>
    </footer>
  );
};

export default Footer;
