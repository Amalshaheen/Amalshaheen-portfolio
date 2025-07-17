"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ContactForm } from '../ui/contact-form';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto rounded-2xl shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</CardTitle>
              <CardDescription className="text-lg pt-2">
                Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
