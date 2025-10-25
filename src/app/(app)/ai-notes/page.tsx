'use client';

import { AINoteForm } from '@/components/ai-note-form';
import { motion } from 'framer-motion';

export default function AINotesPage() {
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-center mb-8"
      >
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">AI Love Notes</h1>
        <p className="mt-2 text-lg text-foreground/80">A little help from the stars to say what&apos;s in your heart.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AINoteForm />
      </motion.div>
    </div>
  );
}
