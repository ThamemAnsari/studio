'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const messages = [
  "You make my heart smile 💙",
  "Every moment with you is magical",
  "You're my favorite notification",
  "Thinking of you... always",
  "You're the reason I believe in love",
];

export function RomanticPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const showRandomPopup = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
      setIsOpen(true);
    };

    const initialTimeout = setTimeout(() => {
      showRandomPopup();
      setInterval(showRandomPopup, 45000);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const autoCloseTimeout = setTimeout(() => {
        setIsOpen(false);
      }, 5000);

      return () => {
        clearTimeout(autoCloseTimeout);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring',- bounce: 0.5 } }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-sm rounded-2xl border border-blue-200 bg-white p-6 text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <div className="mb-4 flex justify-center">
              <Heart className="h-8 w-8 text-blue-400" />
            </div>
            <p className="font-headline text-lg text-gray-700">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
