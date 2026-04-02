import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './Card';
import { cn } from '../lib/utils';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { getContent } = useSiteData();
  const faqs = useSafeArray<{ question: string; answer: string }>(getContent('home_faqs', []));

  return (
    <section id="faq" className="section-spacing px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          subtitle="Support"
          title="Frequently Asked Questions"
          description="Everything you need to know about joining our exclusive community."
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={cn(
                'rounded-2xl border border-border/50 bg-surface transition-all duration-300 overflow-hidden',
                activeIndex === i ? 'border-brand-primary/30 shadow-sm' : 'hover:border-brand-primary/20 hover:shadow-sm'
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-5 md:p-6 flex items-center justify-between text-left"
              >
                <span className="font-display font-medium text-base md:text-lg text-foreground pr-4">{faq.question}</span>
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0',
                  activeIndex === i ? 'bg-brand-primary text-white rotate-180' : 'bg-muted/10 text-muted'
                )}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted leading-relaxed font-normal text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
