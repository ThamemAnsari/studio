'use client';

import { playlist } from '@/lib/data';
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  reason: string;
}

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: Song | null;
  play: (trackId?: number) => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(playlist[currentTrackIndex].src);
      audioRef.current.addEventListener('ended', handleTrackEnd);
    }
    return () => {
      audioRef.current?.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handleTrackEnd = () => {
    nextTrack();
  };
  
  const play = (trackId?: number) => {
    if (trackId !== undefined) {
      const trackIndex = playlist.findIndex(t => t.id === trackId);
      if (trackIndex !== -1) {
        setCurrentTrackIndex(trackIndex);
      }
    }
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const value = {
    isPlaying,
    currentTrack: playlist[currentTrackIndex],
    play,
    pause,
    nextTrack,
    prevTrack,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
