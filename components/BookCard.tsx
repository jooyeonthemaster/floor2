'use client';

import { Book } from '@/types';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface BookCardProps {
  book: Book;
  onPlay: (book: Book) => void;
  onShowPopup: (book: Book) => void;
  isCurrentlyPlaying?: boolean;
}

export function BookCard({ book, onPlay, onShowPopup, isCurrentlyPlaying = false }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isCurrentlyPlaying && cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isCurrentlyPlaying]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
    
    // Check if book needs popup
    if (book.showCopyrightPopup || book.isPictureBook) {
      onShowPopup(book);
    } else {
      onPlay(book);
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Advanced Glow Effect */}
      <div
        ref={glowRef}
        className="absolute -inset-4 bg-gradient-to-r from-black/20 via-black/10 to-black/20 blur-xl opacity-0 transition-all duration-300"
      />
      
      {/* Main Card Container */}
      <div className="relative bg-white border-2 border-black/10 transition-all duration-300 group-hover:border-black/30 group-hover:shadow-2xl">
        {/* Tech Corner Decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-black/20" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-black/20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-black/20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-black/20" />
        {/* Book Cover Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          {/* Scanning Effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 transform skew-x-12"
              />
            )}
          </AnimatePresence>
          
          {!imageError ? (
            <Image
              src={book.coverImage}
              alt={`${book.title} by ${book.author}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
              priority={book.id <= 6}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center p-6">
                <div className="w-16 h-16 border-2 border-black/30 mb-4 mx-auto flex items-center justify-center">
                  <div className="text-2xl font-mono font-bold text-black/60">?</div>
                </div>
                <div className="text-sm font-mono font-semibold text-black mb-2">{book.title}</div>
                <div className="text-xs font-mono text-black/60">{book.author}</div>
              </div>
            </div>
          )}
        
          {/* Advanced Playing Indicator */}
          <AnimatePresence>
            {isCurrentlyPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-3 right-3 z-20"
              >
                <div className="bg-black text-white px-3 py-1 font-mono text-xs flex items-center gap-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-white animate-pulse"
                        style={{
                          height: `${Math.random() * 8 + 4}px`,
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '0.6s'
                        }}
                      />
                    ))}
                  </div>
                  <span>LIVE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Advanced Interaction Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center opacity-0 group-hover:opacity-100"
            >
              {/* Play Button */}
              <div className="relative">
                <div className="w-16 h-16 border-2 border-white bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 mx-auto transition-all duration-300 hover:bg-white/20">
                  <div className="text-white text-2xl font-mono">
                    {isCurrentlyPlaying ? '⏸' : '▶'}
                  </div>
                </div>
                
                {/* Pulse Effect */}
                <div className="absolute inset-0 w-16 h-16 border-2 border-white animate-ping opacity-20 mx-auto" />
              </div>
              
              <div className="text-white font-mono text-sm font-semibold">
                {isCurrentlyPlaying ? 'PAUSE AUDIO' : 'PLAY AUDIO'}
              </div>
              <div className="text-white/80 font-mono text-xs mt-1">
                NEURAL INTERFACE
              </div>
            </motion.div>
          </div>

        </div>

        {/* Advanced Info Panel */}
        <div className="p-4 bg-white border-t border-black/10">
          {/* Title */}
          <h3 className="font-mono font-bold text-black text-sm mb-2 leading-tight">
            {book.title}
          </h3>
          
          {/* Author */}
          <div className="font-mono text-xs text-black/70">
            <span className="text-black/50">BY:</span> {book.author}
          </div>
          
          {/* Tech Status Bar */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 border border-black/30 bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-black/50">READY</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Particle Effects for Active State */}
      <AnimatePresence>
        {isCurrentlyPlaying && (
          <div 
            ref={particlesRef}
            className="absolute inset-0 pointer-events-none"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute w-1 h-1 bg-black/30 rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}