import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown,
  Mail,
  Phone
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';
import { cn } from '../lib/utils';

const communities = [
  {
    id: 'better-man',
    title: 'Better Man',
    price: '₦15,000/yr',
    message: 'Hello, I want to join the Better Man Community at ₦15,000. Please share the payment steps.'
  },
  {
    id: 'innovation-lab',
    title: 'Innovation Lab',
    price: '₦20,500/yr',
    message: 'Hello, I want to join the Innovation Lab Community at ₦20,500. Please share the payment steps.'
  },
  {
    id: 'budding-ceos',
    title: 'Budding CEOs',
    price: '₦28,000/yr',
    message: 'Hello, I want to join the Budding CEOs Community at ₦28,000. Please share the payment steps.'
  }
];

const faqs = [
  {
    question: 'How does payment work?',
    answer: 'Payments are handled securely via direct bank transfer or payment links shared through our official WhatsApp channel. Once you select a community, you will be redirected to WhatsApp to receive the specific payment details.'
  },
  {
    question: 'How does community selection work?',
    answer: 'You can choose the community that best aligns with your current stage and goals. If you are unsure, our team can help you decide during your WhatsApp onboarding.'
  },
  {
    question: 'Can I ask questions before paying?',
    answer: 'Absolutely. We encourage you to talk to us on WhatsApp first. We want to ensure The Inner Circle is the right fit for your growth journey.'
  },
  {
    question: 'What happens after payment?',
    answer: 'After your payment is confirmed, you will receive an official welcome kit, access to your specific community platform, and a schedule for the upcoming sessions and check-ins.'
  }
];

export const JoinPage = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    community: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const handleWhatsAppRedirect = (baseMessage: string) => {
    const communityObj = communities.find(c => c.id === formData.community);
    let finalMessage = baseMessage;
    if (communityObj && formState === 'success') {
      finalMessage = `Hello, I just submitted my application. My name is ${formData.fullName}. I am interested in the ${communityObj.title} circle. I'm ready to proceed with onboarding.`;
    }
    const url = `https://wa.me/2348123456789?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 text-muted font-medium text-xs mb-8 tracking-widest uppercase">
              Membership Application
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-medium text-foreground mb-8 leading-[0.95] tracking-[-0.03em]">
              Request <br />
              <span className="text-brand-primary italic font-serif font-light">Access.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl font-normal">
              Step into a structured ecosystem designed for purpose, growth, and belonging. Submit your application to begin the onboarding process.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-start">
          {/* Left Column: Info & FAQs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-20 lg:pr-8"
          >
            {/* Process */}
            <div>
              <h2 className="text-3xl font-display font-medium text-foreground mb-8 tracking-tight">The Onboarding Process</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-muted/5 border border-border/40 flex items-center justify-center text-sm font-medium text-foreground shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Submit Application</h4>
                    <p className="text-sm text-muted leading-relaxed font-normal">Provide your details and select your preferred circle. We review every application to ensure alignment.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-muted/5 border border-border/40 flex items-center justify-center text-sm font-medium text-foreground shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">WhatsApp Consultation</h4>
                    <p className="text-sm text-muted leading-relaxed font-normal">Connect with our team directly. We'll answer any questions and confirm your community fit.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-sm font-medium text-brand-primary shrink-0">3</div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Secure Membership</h4>
                    <p className="text-sm text-muted leading-relaxed font-normal">Complete your payment securely via our official channels and receive your onboarding kit.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-display font-medium text-foreground mb-8 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border/40 last:border-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full py-6 flex items-center justify-between text-left group"
                    >
                      <span className="font-medium text-foreground group-hover:text-brand-primary transition-colors pr-4">{faq.question}</span>
                      <ChevronDown className={cn("w-5 h-5 text-muted transition-transform duration-300 shrink-0", openFaq === i && "rotate-180 text-brand-primary")} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="pb-6 text-muted leading-relaxed font-normal text-sm">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="pt-8 border-t border-border/40">
              <p className="text-sm text-muted mb-6 font-normal">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="mailto:hello@innercircle.com" className="text-sm font-medium text-foreground hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted/5 border border-border/40 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  hello@innercircle.com
                </a>
                <a href="tel:+2348123456789" className="text-sm font-medium text-foreground hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted/5 border border-border/40 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  +234 812 345 6789
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-32"
          >
            <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border/40 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 relative z-10"
                  >
                    <div className="w-20 h-20 bg-brand-primary/5 border border-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-8">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-display font-medium text-foreground mb-4 tracking-tight">Application Received</h3>
                    <p className="text-muted mb-10 font-normal text-base max-w-sm mx-auto leading-relaxed">
                      Your profile is under review. Please proceed to WhatsApp to complete your onboarding and secure your membership.
                    </p>
                    <Button 
                      variant="primary" 
                      size="lg"
                      className="w-full gap-3"
                      onClick={() => handleWhatsAppRedirect("Hello, I just submitted my application for The Inner Circle. I'm ready to proceed with onboarding.")}
                    >
                      Continue to WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-8 relative z-10"
                  >
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-medium text-foreground uppercase tracking-widest">Select Your Circle</label>
                        <div className="flex flex-col gap-3">
                          {communities.map(c => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setFormData({...formData, community: c.id})}
                              className={cn(
                                "p-4 rounded-2xl border text-left transition-all duration-300 flex justify-between items-center",
                                formData.community === c.id 
                                  ? "border-brand-primary bg-brand-primary/5 shadow-sm" 
                                  : "border-border/40 bg-muted/5 hover:border-brand-primary/30"
                              )}
                            >
                              <span className="font-medium text-foreground text-sm">{c.title}</span>
                              <span className="text-xs font-medium text-muted">{c.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-medium text-foreground uppercase tracking-widest">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all text-sm font-normal"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-medium text-foreground uppercase tracking-widest">Email Address</label>
                          <input 
                            required
                            type="email" 
                            placeholder="email@example.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all text-sm font-normal"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-medium text-foreground uppercase tracking-widest">Phone Number</label>
                          <input 
                            required
                            type="tel" 
                            placeholder="+234 ..."
                            className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all text-sm font-normal"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-medium text-foreground uppercase tracking-widest">Your Goals (Optional)</label>
                        <textarea 
                          rows={3}
                          placeholder="Tell us briefly what you hope to achieve..."
                          className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all resize-none text-sm font-normal"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      variant="primary" 
                      size="lg"
                      className="w-full gap-3"
                      disabled={formState === 'submitting' || !formData.community}
                    >
                      {formState === 'submitting' ? 'Processing...' : 'Submit Application'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    
                    {!formData.community && (
                      <p className="text-xs text-center text-rose-500 mt-2">Please select a circle to continue.</p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
