"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false); // Start hidden

  useEffect(() => {
    // Delay showing the player to avoid SSR/hydration issues with audio element
    const timer = setTimeout(() => setShowPlayer(true), 100); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!showPlayer) {
    return (
      <div className="fixed bottom-4 right-4 z-50 p-2 bg-card rounded-lg shadow-lg border border-border">
        <p className="text-xs text-muted-foreground">Loading audio player...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 bg-card rounded-lg shadow-lg border border-border flex items-center space-x-3 w-auto max-w-xs">
      <audio
        ref={audioRef}
        src={src}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <Button onClick={togglePlayPause} variant="ghost" size="icon" className="text-accent hover:text-accent/80">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      <div className="flex items-center space-x-2 flex-grow min-w-[100px]">
        <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(currentTime)}</span>
        <Slider
            value={[currentTime]}
            max={duration || 1} // Ensure max is not 0
            step={0.1}
            onValueChange={(value) => {
                if(audioRef.current) audioRef.current.currentTime = value[0];
            }}
            className="w-full"
        />
        <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
      </div>
      <Button onClick={toggleMute} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        className="w-[60px]"
        aria-label="Volume"
      />
    </div>
  );
}
