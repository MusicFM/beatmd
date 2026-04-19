"use client";

import { useState, useRef, useEffect } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

interface AudioPlayerProps {
  audioUrl: string;
  compact?: boolean;
}

export default function AudioPlayer({ audioUrl, compact = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Demo: simulate progress when no real audio
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => simulatePlay());
      }
      setIsPlaying(!isPlaying);
    } else {
      // Simulate playback for demo
      simulatePlay();
    }
  };

  const simulatePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    const total = 30; // simulate 30s
    setDuration(total);
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= total) {
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          return 0;
        }
        setProgress(((prev + 0.1) / total) * 100);
        return prev + 0.1;
      });
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setProgress(pct * 100);
    if (audioRef.current) {
      audioRef.current.currentTime = pct * audioRef.current.duration;
    }
  };

  if (compact) {
    return (
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePlay(); }}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isPlaying
            ? "bg-violet-600 scale-110"
            : "bg-white/10 hover:bg-violet-600"
        }`}
      >
        {isPlaying ? (
          <PauseIcon className="w-4 h-4 text-white" />
        ) : (
          <PlayIcon className="w-4 h-4 text-white ml-0.5" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 w-full">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePlay(); }}
        className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
          isPlaying ? "bg-violet-600" : "bg-violet-600 hover:bg-violet-500"
        }`}
      >
        {isPlaying ? (
          <PauseIcon className="w-5 h-5 text-white" />
        ) : (
          <PlayIcon className="w-5 h-5 text-white ml-0.5" />
        )}
      </button>

      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs text-gray-400 w-8 flex-shrink-0">{formatTime(currentTime)}</span>
        <div
          className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-violet-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <span className="text-xs text-gray-400 w-8 flex-shrink-0">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
