import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './Card';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: 'What is The Inner Circle?',
    answer: 'The Inner Circle is a purpose-driven, faith-centered community and movement of intentional individuals committed to growth, discipline, and impact.',
  },
  {
    question: 'How do I join a community?',
    answer: 'You can join any of our featured communities (Better Man, Innovation Lab, Budding CEOs) by clicking the "Join via WhatsApp" button on their respective cards. Our team will guide you through the payment and onboarding steps.',
  },
  {
    question: 'Is it only for religious people?',
    answer: 'While we are faith-centered and built on strong spiritual values, we welcome anyone who is intentional about their growth and respects our core principles of discipline and excellence.',
  },
  {
    question: 'What are the membership fees used for?',
    answer: 'Membership fees go towards maintaining the community platform, organizing weekly masterminds, providing resources, and supporting our global leadership team.',
  },
  {
    question: 'Can I join multiple communities?',
    answer: 'Yes, you can join multiple communities if you feel they align with your goals. Each community has its own specific focus and specialized track.',
  },
  {
    question: 'What happens after I pay?',
    answer: 'Once your payment is confirmed via WhatsApp, you will be added to the community portal and receive an onboarding kit with all the information you need to get started.',
  },
];

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
              key={i}
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
