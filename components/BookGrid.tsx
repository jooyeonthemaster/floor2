'use client';

import { Book } from '@/types';
import { BookCard } from './BookCard';
import { CopyrightPopup } from './CopyrightPopup';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Tech3DBackground } from './Tech3DBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  const { currentBook, playBook, isPlaying, currentTime, duration, seekTo } = useAudioPlayer();
  const [isLoaded, setIsLoaded] = useState(false);
  const [popupBook, setPopupBook] = useState<Book | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Tech3DBackground />
      
      <AnimatePresence>
        {isLoaded && (
          <motion.section 
            className="w-full relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Futuristic Header */}
            <motion.div 
              className="relative mb-20 pt-16"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="max-w-7xl mx-auto px-6">
                {/* Main Title with Advanced Typography */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="relative inline-block"
                  >
                    {/* Title Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent blur-3xl" />
                    
                    <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-mono font-black text-black mb-6 tracking-tighter">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-black">
                        보이는 것보다 청아한
                      </span>
                    </h1>
                    
                    {/* Subtitle with Tech Styling */}
                    <div className="relative">
                      <div className="absolute -top-2 -bottom-2 -left-4 -right-4 border border-black/10 transform rotate-1" />
                      <div className="absolute -top-1 -bottom-1 -left-2 -right-2 border border-black/20 transform -rotate-1" />
                      
                      <p className="relative text-xl md:text-2xl font-mono font-medium text-black/80 bg-white/80 backdrop-blur-sm px-8 py-4">
                        FUTURISTIC • INTERACTIVE • IMMERSIVE
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Tech Info Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-mono text-black/60"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border border-black/30 bg-black/10 animate-pulse" />
                      <span>29 DIGITAL EXPERIENCES</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-black/30" />
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border border-black/30 bg-black/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <span>3D AUDIO VISUALIZATION</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-black/30" />
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border border-black/30 bg-black/10 animate-pulse" style={{ animationDelay: '1s' }} />
                      <span>ADVANCED INTERACTION</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Command Line Interface Style */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="bg-black/5 border border-black/20 backdrop-blur-sm p-6 font-mono text-sm max-w-2xl mx-auto mb-12"
                >
                  <div className="text-black/60 mb-2">$ system.status --interface</div>
                  <div className="text-black/80">→ 3D rendering: ACTIVE</div>
                  <div className="text-black/80">→ audio systems: READY</div>
                  <div className="text-black/80">→ interaction layer: ENABLED</div>
                  <div className="text-green-600 mt-2">◉ all systems operational</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Advanced Book Grid */}
            <motion.div 
              className="max-w-7xl mx-auto px-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1 + (index * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    <BookCard
                      book={book}
                      onPlay={playBook}
                      onShowPopup={setPopupBook}
                      isCurrentlyPlaying={currentBook?.id === book.id && isPlaying}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Advanced Audio Control Interface */}
            <AnimatePresence>
              {currentBook && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="fixed bottom-6 left-6 right-6 z-50"
                >
                  <div className="bg-white/90 backdrop-blur-lg border-2 border-black/20 shadow-2xl max-w-4xl mx-auto">
                    {/* Tech Header */}
                    <div className="bg-black text-white px-6 py-2 font-mono text-xs flex justify-between items-center">
                      <span>AUDIO_SYSTEM.EXE</span>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>ACTIVE</span>
                      </div>
                    </div>
                    
                    {/* Main Interface */}
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          {/* Status Indicator with Play/Pause Control */}
                          <div 
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => playBook(currentBook)}
                          >
                            <div className={`w-4 h-4 border-2 border-black ${
                              isPlaying ? 'bg-black animate-pulse' : 'bg-transparent'
                            }`} />
                            <div className="font-mono">
                              <div className="text-lg font-bold text-black">
                                {isPlaying ? '► PLAYING' : '⏸ PAUSED'}
                              </div>
                              <div className="text-sm text-black/60">
                                {currentBook.title}
                              </div>
                            </div>
                          </div>
                          
                          {/* Book Info */}
                          <div className="font-mono text-sm border-l border-black/20 pl-6">
                            <div className="text-black/80">AUTHOR: {currentBook.author}</div>
                          </div>
                          
                          {/* Time Display */}
                          <div className="font-mono text-sm border-l border-black/20 pl-6">
                            <div className="text-black/80">
                              TIME: {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                        
                        {/* Audio Visualizer */}
                        {isPlaying && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-1 bg-black rounded-full animate-pulse"
                                style={{
                                  height: `${Math.random() * 16 + 8}px`,
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: '0.8s'
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="mt-4 bg-black/10 h-1 relative overflow-hidden cursor-pointer hover:h-2 transition-all duration-200"
                        onClick={(e) => {
                          if (duration > 0) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const percentage = clickX / rect.width;
                            const newTime = percentage * duration;
                            seekTo(newTime);
                          }
                        }}
                      >
                        <div 
                          className="absolute inset-y-0 left-0 bg-black transition-all duration-300"
                          style={{ 
                            width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
                          }}
                        />
                        {/* Progress Bar Hover Indicator */}
                        <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-black/20 transition-opacity duration-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
      
      {/* Copyright Popup */}
      <CopyrightPopup
        isOpen={!!popupBook}
        onClose={() => {
          if (popupBook) {
            playBook(popupBook);
          }
          setPopupBook(null);
        }}
        book={popupBook}
      />
    </>
  );
}