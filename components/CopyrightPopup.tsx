'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Book } from '@/types';

interface CopyrightPopupProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export function CopyrightPopup({ isOpen, onClose, book }: CopyrightPopupProps) {
  if (!book) return null;

  const isPictureBook = book.isPictureBook;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white border-2 border-black/20 shadow-2xl max-w-2xl w-full relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/10 transition-colors duration-200 rounded-full"
              >
                <div className="text-xl font-mono">×</div>
              </button>
              
              {/* Content */}
              <div className="p-8">
                {/* Book Info */}
                <div className="mb-6 text-center">
                  <h3 className="font-mono text-xl font-bold text-black mb-2">
                    {book.title}
                  </h3>
                  <p className="font-mono text-sm text-black/70">
                    BY: {book.author}
                  </p>
                </div>
                
                {/* Main Message */}
                <div className="space-y-6">
                  {isPictureBook ? (
                    <>
                      {/* Picture Book Message */}
                      <div className="text-center">
                        <h4 className="font-mono text-lg font-bold text-black mb-3">
                          그림책 특별 안내
                        </h4>
                        <p className="font-mono text-sm text-black/80 leading-relaxed">
                          이 작품은 그림책으로, AI 낭독 대신 작품의 주제곡이 재생됩니다.<br/>
                          시각적 요소와 음악이 조화를 이루는 특별한 경험을 제공합니다.
                        </p>
                      </div>
                      
                      <div className="border-t border-black/20 pt-4">
                        <p className="font-mono text-xs text-black/60 text-center">
                          This is a picture book. Instead of AI narration, the theme song of the work will be played.<br/>
                          We provide a special experience where visual elements and music harmonize.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Copyright Message */}
                      <div className="text-center">
                        <h4 className="font-mono text-lg font-bold text-black mb-3">
                          저작권 안내
                        </h4>
                        <p className="font-mono text-sm text-black/80 leading-relaxed">
                          저작권 문제로 인해 AI 낭독은 제공되지 않으며,<br/>
                          배경 음악이 대신 재생됩니다. 양해 바랍니다.
                        </p>
                      </div>
                      
                      <div className="border-t border-black/20 pt-4">
                        <p className="font-mono text-xs text-black/60 text-center">
                          Please be advised that due to copyright restrictions, AI narration is currently unavailable.<br/>
                          Background music will be played in its place. We appreciate your understanding.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-8 flex gap-4 justify-center">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-black text-white font-mono text-sm hover:bg-black/80 transition-colors duration-200 border-2 border-black"
                  >
                    확인
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-transparent text-black font-mono text-sm hover:bg-black/10 transition-colors duration-200 border-2 border-black/30"
                  >
                    OK
                  </button>
                </div>
              </div>
              
              {/* Tech Corner Decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black/20" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black/20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black/20" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
