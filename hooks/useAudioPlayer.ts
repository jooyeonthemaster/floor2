'use client';

import { useState, useRef, useCallback } from 'react';
import { Book, AudioPlayer } from '@/types';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playBook = useCallback((book: Book) => {
    // If the same book is clicked
    if (currentBook?.id === book.id) {
      if (isPlaying) {
        // Pause current audio
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        // Resume audio
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.warn('Audio play failed:', error);
          // Fallback: show visual feedback even if audio fails
          setIsPlaying(true);
          setTimeout(() => setIsPlaying(false), 3000);
        });
      }
      return;
    }

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Set new book
    setCurrentBook(book);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    // Try to play new audio
    try {
      if (audioRef.current) {
        setIsLoading(true);
        audioRef.current.src = book.audioFile;
        audioRef.current.volume = volume;
        
        // Load the audio first
        audioRef.current.load();
        
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          console.log('Successfully playing:', book.title, book.audioFile);
        }).catch((error) => {
          console.warn('Audio file failed to play:', error);
          setIsLoading(false);
          // Show visual feedback even if audio file is missing
          setIsPlaying(true);
          // Auto-stop after 5 seconds for demo
          setTimeout(() => setIsPlaying(false), 5000);
        });
      }
    } catch (error) {
      console.warn('Failed to initialize audio:', error);
      setIsLoading(false);
      // Still show the book as selected for visual feedback
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 5000);
    }
  }, [currentBook, isPlaying, volume]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const setVolumeLevel = useCallback((level: number) => {
    setVolume(level);
    if (audioRef.current) {
      audioRef.current.volume = level;
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
    }
  }, [duration]);

  // Initialize audio element
  if (typeof window !== 'undefined' && !audioRef.current) {
    audioRef.current = new Audio();
    
    audioRef.current.addEventListener('loadstart', () => {
      setIsLoading(true);
    });
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current?.duration || 0);
      setIsLoading(false);
    });
    
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    });
    
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      console.log('Audio playback ended');
    });

    audioRef.current.addEventListener('error', (e) => {
      console.warn('Audio error:', e);
      setIsPlaying(false);
      setIsLoading(false);
    });
    
    audioRef.current.addEventListener('canplay', () => {
      console.log('Audio can start playing');
    });
  }

  return {
    currentBook,
    isPlaying,
    volume,
    currentTime,
    duration,
    playBook,
    stopAudio,
    setVolume: setVolumeLevel,
    seekTo,
  };
}