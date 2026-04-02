import React from 'react';
import { Button } from './Button';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 pb-32 px-6 overflow-hidden">
      {/* Background Elements - Subtler */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-primary/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-brand-deep/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center relative z-10">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 text-muted font-medium text-xs mb-10 tracking-widest uppercase"
          >
            The Inner Circle
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[6.5rem] font-display font-medium text-foreground mb-8 leading-[0.95] tracking-[-0.03em]"
          >
            Circlers <br />
            <span className="text-brand-primary italic font-serif pr-4 font-light">don’t</span> <br />
            blend in.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted text-lg md:text-xl mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            A high-impact community for intentional leaders committed to spiritual mastery and world-class excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto gap-3 group px-8">
              Apply for Membership 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button 
              onClick={() => document.getElementById('communities')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-foreground hover:text-brand-primary transition-colors flex items-center gap-2"
            >
              Explore Circles
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] group">
            <img
              src="https://picsum.photos/seed/innercircle/1000/1250"
              alt="The Inner Circle Community"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          </div>
          <div className="absolute -inset-4 border border-border/40 rounded-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

