'use client';

import { Countdown } from '@/components/countdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="container mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-center"
      >
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
          Welcome to Our Love Story
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          A special place for you, my love.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="glass-card transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <CardContent className="p-6">
            <Countdown />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
