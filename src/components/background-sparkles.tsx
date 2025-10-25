'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (id: number) => {
  const size = random(1, 3);
  return {
    id,
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${random(0, 20)}s`,
  };
};

export function BackgroundSparkles() {
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 50 }).map((_, i) => generateSparkle(i));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      {sparkles.map(sparkle => (
        <div key={sparkle.id} className="sparkle" style={{ ...sparkle }} />
      ))}
    </div>
  );
}
