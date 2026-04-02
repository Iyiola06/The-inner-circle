import React from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';

export const FinalCTA = () => {
  return (
    <section className="section-spacing px-6 bg-surface relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-24 rounded-3xl bg-brand-primary text-white shadow-premium relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 leading-[1.05] tracking-tight">
              Ready to stand out? <br />
              <span className="text-white/80">Join The Inner Circle.</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Become part of a disciplined circle of purpose-driven individuals equipped to influence their spaces through faith and excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto gap-2 bg-white text-brand-primary border-none hover:bg-white/90 shadow-sm"
                onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
              >
                <MessageCircle className="w-4 h-4" />
                Join via WhatsApp
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto gap-2 text-white border border-white/20 hover:bg-white/10"
                onClick={() => document.getElementById('communities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Communities <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="mt-12 text-white/60 text-[10px] font-medium uppercase tracking-widest">
              Secure payment & instant onboarding via WhatsApp
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
