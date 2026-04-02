import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { getIcon } from '../lib/icon-map';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const AboutPage = () => {
  const { getContent, getWhatsappUrl } = useSiteData();
  const about = getContent<any>('about_page', {});
  const storyParagraphs = useSafeArray<string>(about.storyParagraphs).length > 0
    ? useSafeArray<string>(about.storyParagraphs)
    : [
        'Inner Circle began with a simple yet profound realization: in a world of noise and distraction, true impact belongs to the intentional.',
        'What started as a small gathering has evolved into a faith-centered movement of individuals committed to growth, discipline, and impact.',
        'Our journey is defined by the lives transformed through structure, accountability, and community.',
      ];
  const visionCards = useSafeArray<any>(about.visionCards).length > 0
    ? useSafeArray<any>(about.visionCards)
    : [
        { title: 'Spiritually Grounded', description: 'Rooted in faith and timeless principles.', icon: 'Anchor', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Mentally Sharp', description: 'Developing wisdom, clarity, and discernment.', icon: 'Zap', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Community Oriented', description: 'Growing inside meaningful accountability.', icon: 'Users', color: 'text-amber-500', bg: 'bg-amber-500/10' },
      ];
  const coreValues = useSafeArray<string>(about.coreValues).length > 0
    ? useSafeArray<string>(about.coreValues)
    : ['Accountability', 'Consistency', 'Excellence', 'Faith'];
  const leaders = useSafeArray<any>(about.leaders).length > 0
    ? useSafeArray<any>(about.leaders)
    : [
        { name: 'Ogunjobi Niyiola', role: 'Founder & Visionary', imageUrl: 'https://picsum.photos/seed/leader1/400/500' },
        { name: 'Sarah Adeyemi', role: 'Community Moderator', imageUrl: 'https://picsum.photos/seed/leader2/400/500' },
      ];
  const philosophyItems = useSafeArray<any>(about.philosophyItems).length > 0
    ? useSafeArray<any>(about.philosophyItems)
    : [
        { label: 'Growth', icon: 'Sparkles' },
        { label: 'Character', icon: 'Shield' },
        { label: 'Impact', icon: 'Target' },
        { label: 'Clarity', icon: 'BookOpen' },
      ];
  const philosophyParagraphs = useSafeArray<string>(about.philosophyParagraphs).length > 0
    ? useSafeArray<string>(about.philosophyParagraphs)
    : [
        'We do not just gather; we grow. The Inner Circle is designed as a structured ecosystem for holistic development.',
        'Our ecosystem provides the clarity to see your path, the competence to walk it, the character to sustain it, and the capacity to influence others.',
      ];

  return (
    <div className="pt-20">
      <section className="relative min-h-[70vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-deep/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-sm mb-8 shadow-sm">{about.heroBadge || 'Our Story & Vision'}</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-foreground mb-8 leading-[1.05] tracking-tight">{about.heroTitle || 'Built for the'} <span className="text-brand-primary">{about.heroHighlight || 'Intentional'}</span>.</h1>
              <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl font-normal">{about.heroDescription || 'The Inner Circle is more than a community; it is a movement of individuals committed to standing out through discipline, faith, and excellence.'}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-premium border border-border/50">
            <img src={about.storyImageUrl || 'https://picsum.photos/seed/story/800/1000'} alt="Brand Story" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-8">
            <SectionHeading subtitle="The Genesis" title={about.storyTitle || 'A Purpose-Driven Movement'} align="left" />
            <div className="space-y-6 text-lg text-muted leading-relaxed font-normal">
              {storyParagraphs.map((paragraph, index) => (
                <p key={paragraph + index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Our Vision" title={about.visionTitle || 'The Five Pillars of a Circler'} description={about.visionDescription || 'We envision a generation of leaders who are holistically developed across these core dimensions.'} />
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {visionCards.map((card, i) => {
              const Icon = getIcon(card.icon);
              return (
                <motion.div key={card.title || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 rounded-3xl bg-surface border border-border/50 hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-premium text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto transition-transform duration-500 group-hover:scale-110 ${card.bg || 'bg-brand-primary/10'} ${card.color || 'text-brand-primary'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed font-normal">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 -z-10" />
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-12 md:p-24 rounded-3xl bg-surface border border-border/50 shadow-premium text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-brand-primary font-medium uppercase tracking-widest text-xs mb-8 block">Our Mission</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground leading-tight mb-8">{about.missionQuote || 'To raise a disciplined circle of purpose-driven individuals who are equipped with clarity, competence, character and capacity to influence their spaces through faith, creativity, leadership and service.'}</h2>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading subtitle="Our Culture" title={about.cultureTitle || 'The Values That Define Us'} description={about.cultureDescription || 'Our culture is built on a set of non-negotiable values that guide our interactions and growth.'} align="left" />
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {coreValues.map((value, i) => (
                <motion.div key={value + i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  <span className="font-medium text-foreground">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-premium">
            <img src={about.cultureImageUrl || 'https://picsum.photos/seed/culture/800/800'} alt="Community Culture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <section className="section-spacing px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Global Leadership" title="The Minds Behind the Circle" description="Meet the intentional leaders and moderators who guide our global community." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <motion.div key={leader.name || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-premium mb-6">
                  <img src={leader.imageUrl || leader.image || 'https://picsum.photos/seed/leader/400/500'} alt={leader.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-display font-medium text-foreground mb-1">{leader.name}</h3>
                  <p className="text-muted font-medium text-sm">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface rounded-3xl border border-border/50 p-12 md:p-20 shadow-premium relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <SectionHeading subtitle="Our Philosophy" title={about.philosophyTitle || 'More Than a Group - An Ecosystem'} align="left" />
                <div className="space-y-6 text-lg text-muted leading-relaxed mt-8 font-normal">
                  {philosophyParagraphs.map((paragraph, index) => (
                    <p key={paragraph + index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {philosophyItems.map((item, i) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div key={item.label || i} className="p-8 rounded-2xl bg-surface border border-border/50 shadow-sm flex flex-col items-center text-center gap-4">
                      <Icon className="w-6 h-6 text-brand-primary" />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-10 grid sm:grid-cols-3 gap-4 relative z-10">
              {[
                { label: 'Core Values', value: `${coreValues.length}` },
                { label: 'Leadership Voices', value: `${leaders.length}` },
                { label: 'Growth Pillars', value: `${visionCards.length}` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/50 bg-background/60 px-5 py-6 text-center shadow-sm">
                  <p className="text-2xl font-display font-medium text-foreground">{item.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-12 md:p-24 rounded-3xl bg-brand-primary text-white shadow-premium relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 leading-tight">{about.ctaTitle || 'Ready to stand out?'} <br /> Join The Inner Circle.</h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">{about.ctaDescription || 'Become part of a disciplined circle of purpose-driven individuals equipped to influence their spaces through faith and excellence.'}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-white text-brand-primary border-none hover:bg-white/90 shadow-sm" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>Become a Circler</Button>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-white border border-white/20 hover:bg-white/10" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
                <MessageCircle className="w-4 h-4" />
                Talk to us on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
