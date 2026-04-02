import React from 'react';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { getIcon } from '../lib/icon-map';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const BrandOverview = () => {
  const { getContent } = useSiteData();
  const content = getContent<any>('brand_overview', {});
  const visionValues = useSafeArray<any>(content.visionValues).length > 0
    ? useSafeArray<any>(content.visionValues)
    : [
        { icon: 'ShieldCheck', label: 'Spiritually grounded' },
        { icon: 'Target', label: 'Mentally sharp' },
        { icon: 'Zap', label: 'Skillfully equipped' },
        { icon: 'Users', label: 'Community-oriented' },
      ];
  const memberAvatars = useSafeArray<string>(content.memberAvatars).length > 0
    ? useSafeArray<string>(content.memberAvatars)
    : ['/logo1.jpeg', '/logo2.jpeg', '/logo1.jpeg'];
  const missionBullets = useSafeArray<string>(content.missionBullets).length > 0
    ? useSafeArray<string>(content.missionBullets)
    : ['Faith-centered growth', 'Disciplined accountability', 'Creative excellence'];

  return (
    <section id="overview" className="section-spacing px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-xs mb-4 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              {content.badge || 'Our Essence'}
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-foreground leading-[1.05] tracking-tight">
              {content.title || 'A Movement of'} <br />
              <span className="text-brand-primary">{content.highlight || 'Intentional Souls.'}</span>
            </h2>
            <p className="text-muted text-lg md:text-xl leading-relaxed font-normal">
              {content.description || 'Inner Circle is a purpose-driven, faith-centered ecosystem for individuals committed to spiritual depth, mental clarity, and world-class impact.'}
            </p>

            <div className="pt-6 grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-display font-medium text-foreground mb-1">{content.commitmentValue || '100%'}</p>
                <p className="text-[10px] font-medium text-muted uppercase tracking-widest">{content.commitmentLabel || 'Commitment'}</p>
              </div>
              <div>
                <p className="text-4xl font-display font-medium text-foreground mb-1">{content.standardValue || 'Elite'}</p>
                <p className="text-[10px] font-medium text-muted uppercase tracking-widest">{content.standardLabel || 'Standard'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-premium group">
              <img
                src={content.imageUrl || 'https://picsum.photos/seed/vision/1000/1000'}
                alt="Vision"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:absolute md:-bottom-12 md:-right-12 glass p-10 rounded-3xl shadow-premium border border-white/20 max-w-xs mt-8 md:mt-0 mx-auto md:mx-0">
              <div className="w-12 h-1 bg-brand-primary mb-6 rounded-full" />
              <p className="text-brand-primary font-medium text-[10px] uppercase tracking-widest mb-4">Our Vision</p>
              <p className="text-foreground font-medium leading-relaxed text-lg italic font-serif">
                "{content.visionQuote || 'To raise a disciplined circle of purpose-driven individuals equipped with clarity, competence, and character.'}"
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div className="space-y-4">
              <h3 className="text-3xl font-display font-medium text-foreground flex items-center gap-4">
                <div className="w-10 h-1 bg-brand-primary rounded-full" />
                Vision Values
              </h3>
              <p className="text-muted font-normal">The pillars that define our collective excellence.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {visionValues.map((value, i) => {
                const Icon = getIcon(value.icon);
                return (
                  <motion.div
                    key={value.label || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-surface border border-border/50 hover:border-brand-primary/30 hover:shadow-sm transition-all group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-foreground text-sm">{value.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="space-y-10 p-12 md:p-16 rounded-3xl bg-brand-primary text-white shadow-premium relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-white/20 transition-colors duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-deep/50 rounded-full blur-[80px] -ml-32 -mb-32" />

            <div className="relative z-10 space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-medium">Mission Preview</h3>
              <p className="text-white/80 text-lg leading-relaxed font-normal">
                {content.missionPreview || 'To raise a disciplined circle of purpose-driven individuals equipped with clarity, competence, character, and capacity to influence their spaces through faith, creativity, and service.'}
              </p>
              <div className="flex flex-wrap gap-3">
                {missionBullets.map((item, i) => (
                  <span key={item + i} className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs uppercase tracking-widest font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <div className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {memberAvatars.map((src, i) => (
                      <div key={src + i} className="w-10 h-10 rounded-full border-2 border-brand-primary overflow-hidden shadow-sm">
                        <img src={src} alt="Member" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium text-white/60 uppercase tracking-widest">Join the Circle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
