import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import { useSiteData } from '../lib/site-data';

export const AnnouncementBanner = () => {
  const { data } = useSiteData();
  const [isVisible, setIsVisible] = useState(false);

  // Find the most recent published announcement
  const announcement = data.announcements.find(a => a.status === 'published');

  useEffect(() => {
    if (announcement) {
      // Small delay for entrance effect
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  if (!announcement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-brand-primary text-white overflow-hidden z-[60]"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-1.5 bg-white/20 rounded-lg shrink-0">
                <Megaphone className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm font-medium truncate">
                <span className="opacity-80 hidden sm:inline">{announcement.title}: </span>
                {announcement.body}
              </p>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              {announcement.target !== 'All Communities' && (
                <span className="hidden md:inline px-2 py-0.5 bg-white/10 rounded font-mono text-[10px] uppercase tracking-wider">
                  Target: {announcement.target}
                </span>
              )}
              <button 
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close announcement"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Subtle animated background element */}
          <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
