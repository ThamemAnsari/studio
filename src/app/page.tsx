'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BackgroundSparkles } from '@/components/background-sparkles';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WelcomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    // Navigate after animation
    setTimeout(() => {
      window.location.href = '/home';
    }, 300);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <BackgroundSparkles />
      
      {/* Floating Hearts Animation - Fixed for SSR */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const randomX = (i * 73) % 100; // Pseudo-random but consistent
          const randomScale = 0.5 + ((i * 37) % 50) / 100;
          const randomRotate = (i * 47) % 360;
          const randomDuration = 5 + ((i * 29) % 3);
          const randomDelay = (i * 19) % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute text-blue-400/30"
              style={{
                left: `${randomX}%`,
                bottom: 0
              }}
              initial={{ 
                y: 50,
                scale: randomScale,
                rotate: randomRotate
              }}
              animate={{ 
                y: -100,
                rotate: randomRotate + 360
              }}
              transition={{ 
                duration: randomDuration,
                repeat: Infinity,
                ease: 'linear',
                delay: randomDelay
              }}
            >
              <Heart fill="currentColor" size={15 + ((i * 31) % 20)} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center p-4 max-w-4xl">
        {/* Decorative heart icon above title */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6"
        >
          <Heart 
            className="h-16 w-16 text-blue-500 fill-blue-500/20 animate-pulse" 
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Title with gradient and glow */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-headline text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
          style={{
            textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
          }}
        >
          Eternal Echoes
        </motion.h1>

        {/* Subtitle with enhanced styling */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="font-body text-xl md:text-2xl text-slate-700 max-w-2xl mb-3 font-medium"
        >
          For my dearest Jane, a constellation of our moments ✨
        </motion.p>

        {/* Quote with elegant styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="relative mb-10"
        >
          <div className="absolute -left-4 -top-2 text-6xl text-blue-300/40 font-serif">"</div>
          <p className="font-body text-lg md:text-xl text-slate-600 max-w-2xl italic px-8 py-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-blue-200/50 shadow-lg">
            Whatever our souls are made of, his and mine are the same.
          </p>
          <div className="absolute -right-4 -bottom-2 text-6xl text-blue-300/40 font-serif">"</div>
          <p className="text-sm text-slate-500 mt-2">— Emily Brontë</p>
        </motion.div>

        {/* Enhanced Button with instant response */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button 
            onClick={handleButtonClick}
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 hover:scale-110 active:scale-105 border-2 border-blue-400/50"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <span className="relative z-10 flex items-center gap-2">
              Enter Our World
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </span>
          </Button>
        </motion.div>

        {/* Subtle hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm text-slate-500 mt-6 animate-pulse"
        >
          Click to begin our journey 💙
        </motion.p>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* UNIQUE ROMANTIC POPUP */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
              onClick={handleContinue}
            />

            {/* Popup Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 25
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative max-w-2xl w-full pointer-events-auto">
                {/* Orbiting Hearts */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30);
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        marginLeft: '-12px',
                        marginTop: '-12px'
                      }}
                      animate={{
                        rotate: [angle, angle + 360],
                        x: [
                          Math.cos(angle * Math.PI / 180) * 200,
                          Math.cos((angle + 360) * Math.PI / 180) * 200
                        ],
                        y: [
                          Math.sin(angle * Math.PI / 180) * 200,
                          Math.sin((angle + 360) * Math.PI / 180) * 200
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.1
                      }}
                    >
                      <Heart className="w-6 h-6 text-red-500 fill-red-500/70" />
                    </motion.div>
                  );
                })}

                {/* Main Card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-blue-200 overflow-hidden"
                >
                  {/* Close Button */}
                  <button
                    onClick={handleContinue}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all hover:scale-110 active:scale-95 shadow-lg z-10"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Sparkle Background */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${(i * 13) % 100}%`,
                          top: `${(i * 17) % 100}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeInOut'
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center space-y-6">
                    {/* Animated Heart */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="flex justify-center"
                    >
                      <div className="relative">
                        <Heart className="w-24 h-24 text-red-500 fill-red-500" />
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        >
                          <div className="w-24 h-24 rounded-full border-4 border-red-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Ready to Step Inside?
                      </h2>
                      <p className="text-xl text-gray-700 font-medium mb-6">
                        A world crafted with love, just for you
                      </p>
                    </motion.div>

                    {/* Romantic Quote */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg max-w-xl mx-auto"
                    >
                      <p className="text-lg italic text-gray-700 leading-relaxed">
                        "You are my today and all of my tomorrows."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">— Leo Christopher</p>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinue}
                      className="group relative px-10 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative flex items-center gap-3">
                        Yes, Take Me There
                        <Heart className="w-6 h-6 fill-current animate-pulse" />
                      </span>
                    </motion.button>

                    {/* Hint */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-sm text-gray-500"
                    >
                      Click anywhere to continue ✨
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}