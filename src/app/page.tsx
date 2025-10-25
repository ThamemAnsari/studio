'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BackgroundSparkles } from '@/components/background-sparkles';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundSparkles />
      <div className="relative z-10 flex flex-col items-center text-center p-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-headline text-5xl md:text-7xl font-bold text-accent mb-4"
        >
          Eternal Echoes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mb-2"
        >
          For my dearest Jane, a constellation of our moments.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mb-8 italic"
        >
          &quot;Whatever our souls are made of, his and mine are the same.&quot;
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        >
          <Button asChild size="lg" className="animate-pulse">
            <Link href="/home">
              Enter Our World
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
