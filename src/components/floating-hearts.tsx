'use client';

import React from 'react';
import { Heart } from 'lucide-react';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const heartSizes = [15, 25, 35];

const hearts = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  style: {
    left: `${random(0, 100)}vw`,
    animationDuration: `${random(5, 8)}s`,
    animationDelay: `${random(0, 5)}s`,
    opacity: random(0.3, 0.6),
    // @ts-ignore
    '--sway': `${random(-20, 20)}px`,
  },
  size: heartSizes[i % heartSizes.length],
}));

export function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          className="floating-heart"
          style={heart.style}
          width={heart.size}
          height={heart.size}
          fill="currentColor"
        />
      ))}
    </div>
  );
}
