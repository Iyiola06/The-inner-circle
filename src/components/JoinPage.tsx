import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { ArrowRight, CheckCircle2, ChevronDown, Mail, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSiteData, useSafeArray } from '../lib/site-data';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from '../lib/supabase-browser';

export const JoinPage = () => {
  const { data, getContent, formatCurrency, getWhatsappUrl } = useSiteData();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    community: '',
    message: '',
  });

  const processSteps = useSafeArray<any>(getContent('join_process_steps', []));
  const faqs = useSafeArray<any>(getContent('join_faqs', []));
  const appSettings = getContent<any>('app_settings', {});
  const getPriceLabel = (value?: string | null) => {
    if (!value) return 'one-off';
    const normalized = value.toLowerCase().trim();
    return ['year', 'per year', 'yearly', 'yr'].includes(normalized) ? 'one-off' : normalized;
  };

  const selectedCommunity = useMemo(
    () => data.communities.find((community) => community.id === formData.community) || null,
    [data.communities, formData.community],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCommunity) return;

    setFormState('submitting');
    setErrorMessage('');

    try {
      if (!hasSupabaseBrowserConfig()) {
        throw new Error('Secure form submission is not available right now.');
      }

      const supabase = getSupabaseBrowserClient();
      const { error } = await (supabase.from('join_requests') as any).insert({
        community_id: selectedCommunity.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        notes: formData.message || null,
      });

      if (error) {
        throw error;
      }

      setFormState('success');
    } catch (error) {
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application.');
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = selectedCommunity
      ? `Hello, I just submitted my application. My name is ${formData.fullName}. I am interested in the ${selectedCommunity.name} circle. I'm ready to proceed with onboarding.`
      : undefined;
    window.open(getWhatsappUrl(message), '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="space-y-20 lg:pr-8">
            <div>
              <h2 className="text-3xl font-display font-medium text-foreground mb-8 tracking-tight">The Onboarding Process</h2>
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <div key={step.title || index} className="flex gap-6">
                    <div className={cn('w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium shrink-0', index === processSteps.length - 1 ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' : 'bg-muted/5 border-border/40 text-foreground')}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">{step.title}</h4>
                      <p className="text-sm text-muted leading-relaxed font-normal">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-medium text-foreground mb-8 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={faq.question || i} className="border-b border-border/40 last:border-0">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-6 flex items-center justify-between text-left group">
                      <span className="font-medium text-foreground group-hover:text-brand-primary transition-colors pr-4">{faq.question}</span>
                      <ChevronDown className={cn('w-5 h-5 text-muted transition-transform duration-300 shrink-0', openFaq === i && 'rotate-180 text-brand-primary')} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                          <div className="pb-6 text-muted leading-relaxed font-normal text-sm">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border/40">
              <p className="text-sm text-muted mb-6 font-normal">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href={`mailto:${appSettings.supportEmail || 'hello@theinnercirclecommunity.org'}`} className="text-sm font-medium text-foreground hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted/5 border border-border/40 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  {appSettings.supportEmail || 'hello@theinnercirclecommunity.org'}
                </a>
                <a href={`tel:${appSettings.supportPhone || '+2347016941726'}`} className="text-sm font-medium text-foreground hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted/5 border border-border/40 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  {appSettings.supportPhone || '+234 701 694 1726'}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="sticky top-32">
            <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border/40 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 relative z-10">
                    <div className="w-20 h-20 bg-brand-primary/5 border border-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-8">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-display font-medium text-foreground mb-4 tracking-tight">Application Received</h3>
                    <p className="text-muted mb-10 font-normal text-base max-w-sm mx-auto leading-relaxed">
                      Your profile is under review. Please proceed to WhatsApp to complete your onboarding and secure your membership.
                    </p>
                    <Button variant="primary" size="lg" className="w-full gap-3" onClick={handleWhatsAppRedirect}>
                      Continue to WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-medium text-foreground uppercase tracking-widest">Select Your Circle</label>
                        <div className="flex flex-col gap-3">
                          {data.communities.map((community) => (
                            <button key={community.id} type="button" onClick={() => setFormData({ ...formData, community: community.id })} className={cn('p-4 rounded-2xl border text-left transition-all duration-300 flex justify-between items-center', formData.community === community.id ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-border/40 bg-muted/5 hover:border-brand-primary/30')}>
                              <span className="font-medium text-foreground text-sm">{community.name}</span>
                              <span className="text-xs font-medium text-muted">{formatCurrency(community.price)}/{getPriceLabel(community.price_period)}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-medium text-foreground uppercase tracking-widest">Full Name</label>
                        <input required type="text" placeholder="Enter your full name" className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all text-sm font-normal" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-medium text-foreground uppercase tracking-widest">Email Address</label>
                          <input required type="email" placeholder="email@example.com" className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all text-sm font-normal" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-medium text-foreground uppercase tracking-widest">Phone Number</label>
                          <input required type="tel" placeholder="+234 ..." className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all text-sm font-normal" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-medium text-foreground uppercase tracking-widest">Your Goals (Optional)</label>
                        <textarea rows={3} placeholder="Tell us briefly what you hope to achieve..." className="w-full px-4 py-3.5 rounded-xl bg-muted/5 border border-border/40 focus:border-brand-primary/50 focus:bg-surface outline-none transition-all resize-none text-sm font-normal" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full gap-3" disabled={formState === 'submitting' || !formData.community}>
                      {formState === 'submitting' ? 'Processing...' : 'Submit Application'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    {formState === 'error' && <p className="text-xs text-center text-rose-500 mt-2">{errorMessage}</p>}
                    {!formData.community && <p className="text-xs text-center text-rose-500 mt-2">Please select a circle to continue.</p>}
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

