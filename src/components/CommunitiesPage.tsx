import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSiteData, useSafeArray } from '../lib/site-data';
import { getIcon } from '../lib/icon-map';

export const CommunitiesPage = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const { data, getContent, formatCurrency, getWhatsappUrl } = useSiteData();
  const benefits = useSafeArray<any>(getContent('community_benefits', [])).length > 0
    ? useSafeArray<any>(getContent('community_benefits', []))
    : [
        { title: 'Purposeful Growth', description: 'Every circle is built to sharpen a different dimension of your life and leadership.', icon: 'Sparkles' },
        { title: 'Accountability', description: 'Grow in rooms that challenge you to stay disciplined and consistent.', icon: 'Shield' },
        { title: 'Practical Development', description: 'Get frameworks, insight and support you can apply in real life.', icon: 'Target' },
      ];
  const faqs = useSafeArray<any>(getContent('community_faqs', [])).length > 0
    ? useSafeArray<any>(getContent('community_faqs', []))
    : [
        { question: 'How do I join a community?', answer: 'Choose your preferred circle and our team will guide you through the next step.' },
        { question: 'Can I join more than one community?', answer: 'Yes, if the tracks align with your current goals and capacity.' },
      ];
  const comparisonRows = useSafeArray<any>(getContent('community_comparison_rows', [])).length > 0
    ? useSafeArray<any>(getContent('community_comparison_rows', []))
    : [
        { label: 'Primary Focus', values: ['Self-Leadership', 'Creative Strategy', 'Business Operations'] },
        { label: 'Ideal Stage', values: ['Personal Mastery', 'Idea / Concept', 'Active Venture'] },
      ];
  const ecosystemStats = [
    { label: 'Active Circles', value: `${data.communities.length}` },
    { label: 'Visible Benefits', value: `${benefits.length}` },
    { label: 'FAQ Blocks', value: `${faqs.length}` },
  ];
  const getPriceLabel = (value?: string | null) => {
    if (!value) return 'one-off';
    const normalized = value.toLowerCase().trim();
    return ['year', 'per year', 'yearly'].includes(normalized) ? 'one-off' : normalized;
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-brand-primary/[0.02] blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 text-muted font-medium text-xs mb-10 tracking-widest uppercase">
              The Ecosystem
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-medium text-foreground mb-8 leading-[0.95] tracking-[-0.03em]">
              Sub <br />
              <span className="text-brand-primary italic font-serif font-light">Communities.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-normal">
              Purpose-built spaces for personal mastery, creative execution and business leadership.
            </p>
          </motion.div>
        </div>
      </section>

      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="lg:hidden fixed bottom-8 left-8 right-8 z-50 pointer-events-none">
        <Button variant="primary" size="lg" className="w-full shadow-premium gap-2 pointer-events-auto" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
          Request Access
        </Button>
      </motion.div>

      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto space-y-40">
          {data.communities.map((community, i) => (
            <motion.div key={community.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className={cn('grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center', i % 2 !== 0 && 'lg:grid-cols-[0.9fr_1.1fr]')}>
              <div className={cn('space-y-12', i % 2 !== 0 && 'lg:order-2')}>
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-brand-primary font-display font-medium text-5xl md:text-6xl tracking-tight">{formatCurrency(community.price)}</span>
                    <span className="text-muted text-sm uppercase tracking-widest font-medium">{getPriceLabel(community.price_period)}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground leading-[1.1] tracking-tight">{community.name}</h2>
                  <p className="text-xl text-muted font-normal tracking-tight">{community.tagline || community.summary}</p>
                </div>

                <div className="space-y-10">
                  <p className="text-lg text-foreground/80 leading-relaxed font-normal">{community.description}</p>

                  <div className="py-8 border-y border-border/40">
                    <h4 className="font-medium text-foreground mb-4 text-xs uppercase tracking-widest">Ideal For</h4>
                    <p className="text-muted text-base font-normal leading-relaxed">{community.who_its_for}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {useSafeArray<string>(community.features).map((feature, idx) => (
                      <div key={feature + idx} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-brand-primary/60" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-3 group px-8" onClick={() => { window.open(getWhatsappUrl(community.whatsapp_message || undefined), '_blank'); }}>
                    Become a Circler
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className={cn('relative', i % 2 !== 0 && 'lg:order-1')}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted/5 group border border-border/30">
                  <img src={community.image_url || community.hero_image_url || 'https://picsum.photos/seed/community/800/1000'} alt={community.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-muted/5 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 tracking-tight">Compare Circles</h2>
            <p className="text-lg text-muted font-normal leading-relaxed max-w-2xl mx-auto">A side-by-side look at our flagship communities to help you decide which path aligns with your current goals.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {ecosystemStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/50 bg-surface px-5 py-6 text-center shadow-sm">
                <p className="text-2xl font-display font-medium text-foreground">{item.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto pb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-6 px-6 text-left font-medium text-xs uppercase tracking-widest text-muted border-b border-border/40 w-1/4">Feature</th>
                  {data.communities.map((community) => (
                    <th key={community.id} className="py-6 px-6 text-left font-display font-medium text-2xl text-foreground border-b border-border/40 w-1/4">{community.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label || i} className="group hover:bg-surface/50 transition-colors">
                    <td className="py-6 px-6 font-medium text-foreground text-sm border-b border-border/20 group-last:border-0">{row.label}</td>
                    {useSafeArray<string>(row.values).map((value, idx) => (
                      <td key={value + idx} className="py-6 px-6 text-left text-muted font-normal text-sm border-b border-border/20 group-last:border-0">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 tracking-tight">Who These Communities Are For</h2>
            <p className="text-lg text-muted font-normal leading-relaxed max-w-2xl mx-auto">Each community is designed for a different kind of growth journey, but they all share the same culture of faith, discipline and impact.</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = getIcon(benefit.icon);
              return (
                <motion.div key={benefit.title || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center mb-6 text-muted group-hover:text-brand-primary group-hover:border-brand-primary/30 transition-all duration-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted leading-relaxed font-normal">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-muted/5 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={faq.question || i} className="border-b border-border/40 last:border-0">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-6 flex items-center justify-between text-left group">
                  <span className="font-medium text-foreground group-hover:text-brand-primary transition-colors">{faq.question}</span>
                  <ChevronDown className={cn('w-5 h-5 text-muted transition-transform duration-300', openFaq === i && 'rotate-180 text-brand-primary')} />
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
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="p-16 md:p-24 rounded-3xl bg-brand-primary text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/[0.05] rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium mb-8 leading-[0.95] tracking-tight">Your Circle is Waiting. <br /> <span className="text-white/70 italic font-serif font-light">Become a Circler.</span></h2>
              <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-normal">Join a purpose-driven community of intentional individuals committed to growth, discipline and impact.</p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-3 bg-white text-brand-primary border-none hover:bg-white/90 px-8" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
                  Become a Circler
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
