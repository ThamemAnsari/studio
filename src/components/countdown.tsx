'use client';

import { useState, useEffect } from 'react';
import { ANNIVERSARY_DATE } from '@/lib/data';

const getNextAnniversary = (anniversaryDate: Date) => {
  const now = new Date();
  let nextAnniversary = new Date(anniversaryDate);
  nextAnniversary.setFullYear(now.getFullYear());
  if (now > nextAnniversary) {
    nextAnniversary.setFullYear(now.getFullYear() + 1);
  }
  return nextAnniversary;
};

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      const nextAnniversary = getNextAnniversary(ANNIVERSARY_DATE);
      const difference = nextAnniversary.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null; // Don't render on the server to avoid hydration mismatch
  }

  return (
    <div className="text-center">
      <h2 className="font-headline text-3xl md:text-4xl text-accent mb-4">Countdown to Our Next Anniversary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="glass-card rounded-lg p-4 flex flex-col items-center justify-center">
            <span className="font-headline text-4xl text-primary font-bold">{String(value).padStart(2, '0')}</span>
            <span className="text-sm text-foreground/80 uppercase tracking-widest">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
