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
    const newHearts: Heart[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * 2 * Math.PI;
      const distance = 50 + Math.random() * 30;
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
    }, 1000);
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
