'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  tx: string;
  ty: string;
}

export function ClickHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  let heartCounter = 0;

  const createHeartBurst = useCallback((e: MouseEvent) => {
    // Check if the click was on a button or link
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    const newHearts: Heart[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * 2 * Math.PI;
      const distance = 60 + Math.random() * 40;
      newHearts.push({
        id: heartCounter++,
        x: e.clientX,
        y: e.clientY,
        size: 15 + Math.random() * 10,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance}px`,
      });
    }

    setHearts(prev => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts(prev => prev.slice(newHearts.length));
    }, 1200);
  }, [heartCounter]);

  useEffect(() => {
    window.addEventListener('click', createHeartBurst);
    return () => {
      window.removeEventListener('click', createHeartBurst);
    };
  }, [createHeartBurst]);

  return (
    <>
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          className="click-heart"
          style={{
            left: heart.x,
            top: heart.y,
            width: heart.size,
            height: heart.size,
            // @ts-ignore
            '--tx': heart.tx,
            '--ty': heart.ty,
          }}
          fill="currentColor"
        />
      ))}
    </>
  );
}
