import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowLeft, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';

const faqs = [
  {
    category: 'General',
    items: [
      {
        question: 'What is The Inner Circle?',
        answer: 'The Inner Circle is a purpose-driven, faith-centered community and movement of intentional individuals committed to growth, discipline, and impact.',
      },
      {
        question: 'Is it only for religious people?',
        answer: 'While we are faith-centered and built on strong spiritual values, we welcome anyone who is intentional about their growth and respects our core principles of discipline and excellence.',
      },
      {
        question: 'What are the membership fees used for?',
        answer: 'Membership fees go towards maintaining the community platform, organizing weekly masterminds, providing resources, and supporting our global leadership team.',
      },
    ]
  },
  {
    category: 'Membership',
    items: [
      {
        question: 'How do I join a community?',
        answer: 'You can join any of our featured communities (Better Man, Innovation Lab, Budding CEOs) by clicking the "Join via WhatsApp" button on their respective cards. Our team will guide you through the payment and onboarding steps.',
      },
      {
        question: 'Can I join multiple communities?',
        answer: 'Yes, you can join multiple communities if you feel they align with your goals. Each community has its own specific focus and specialized track.',
      },
      {
        question: 'What happens after I pay?',
        answer: 'Once your payment is confirmed via WhatsApp, you will be added to the community portal and receive an onboarding kit with all the information you need to get started.',
      },
    ]
  },
  {
    category: 'Onboarding',
    items: [
      {
        question: 'What is the onboarding process?',
        answer: 'After payment, you will receive a welcome kit and be assigned a mentor or moderator. You will then be introduced to your specific community track.',
      },
      {
        question: 'How long does it take to get access?',
        answer: 'Access is typically granted within 24-48 hours after payment verification.',
      },
    ]
  }
];

interface FAQPageProps {
  onBack: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-12 group gap-2 text-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>

        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-primary font-medium text-xs uppercase tracking-widest mb-4"
          >
            Support Center
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-6"
          >
            Frequently Asked <br /> <span className="text-brand-primary">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Everything you need to know about joining our exclusive community and maximizing your membership.
          </motion.p>
        </div>

        <div className="space-y-16">
          {faqs.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest border-b border-border/50 pb-4">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((faq, i) => {
                  const id = `${catIdx}-${i}`;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'rounded-2xl border border-border/50 bg-surface transition-all duration-300 overflow-hidden',
                        activeIndex === id ? 'border-brand-primary/30 shadow-sm' : 'hover:border-brand-primary/20 hover:shadow-sm'
                      )}
                    >
                      <button
                        onClick={() => setActiveIndex(activeIndex === id ? null : id)}
                        className="w-full p-6 flex items-center justify-between text-left"
                      >
                        <span className="font-display font-medium text-lg text-foreground pr-4">{faq.question}</span>
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0',
                          activeIndex === id ? 'bg-brand-primary text-white rotate-180' : 'bg-muted/10 text-muted'
                        )}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {activeIndex === id && (
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
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-3xl bg-brand-primary/5 border border-brand-primary/10 text-center">
          <h3 className="text-2xl font-display font-medium text-foreground mb-4">Still have questions?</h3>
          <p className="text-muted mb-8 max-w-md mx-auto">Our team is ready to help you with any specific inquiries about the Inner Circle.</p>
          <Button 
            variant="whatsapp" 
            className="gap-2"
            onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Us
          </Button>
        </div>
      </div>
    </div>
  );
};
