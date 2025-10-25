'use client';

import { useMusic } from '@/contexts/music-provider';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { Card, CardContent } from './ui/card';

import { Disc3 } from "lucide-react";

import { motion } from 'framer-motion';
export function MusicPlayer() {
  const { isPlaying, currentTrack, play, pause, nextTrack, prevTrack } = useMusic();

  if (!currentTrack) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 music-player"
    >
      <Card className="glass-card max-w-md mx-auto">
        <CardContent className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-primary/20 rounded-md">
              <Disc3 className={`w-5 h-5 text-primary ${isPlaying ? 'vinyl-record' : ''}`} />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-foreground truncate">{currentTrack.title}</p>
                {isPlaying && (
                  <div className="sound-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={prevTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (isPlaying ? pause() : play())}
              className={isPlaying ? 'animate-pulse' : ''}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
