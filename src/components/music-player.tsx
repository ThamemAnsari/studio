'use client';

import { useMusic } from '@/contexts/music-provider';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function MusicPlayer() {
  const { isPlaying, currentTrack, play, pause, nextTrack, prevTrack } = useMusic();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="glass-card max-w-md mx-auto">
        <CardContent className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="p-2 bg-primary/20 rounded-md">
                <Music className="w-5 h-5 text-primary" />
             </div>
            <div className="truncate">
              <p className="font-bold text-sm text-foreground truncate">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={prevTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => (isPlaying ? pause() : play())}>
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
