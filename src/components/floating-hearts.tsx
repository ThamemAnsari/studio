'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  style: React.CSSProperties;
  size: number;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const generateHeart = (id: number): FloatingHeart => {
  const duration = random(4, 6);
  const size = random(20, 40);
  return {
    id,
    size,
    style: {
      left: `${random(0, 100)}vw`,
      animationDuration: `${duration}s`,
      // @ts-ignore
      '--sway': `${random(-40, 40)}px`,
      '--rotation': `${random(-20, 20)}deg`,
    },
  };
};

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHearts(currentHearts => {
        const newHeart = generateHeart(Date.now());
        const updatedHearts = [...currentHearts, newHeart];
        // Limit to a reasonable number to avoid performance issues
        if (updatedHearts.length > 20) {
          return updatedHearts.slice(updatedHearts.length - 20);
        }
        return updatedHearts;
      });
    }, 1000); // Create a new heart every second

    return () => clearInterval(heartInterval);
  }, []);

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
