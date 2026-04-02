import React from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../lib/site-data';

export const CommunitiesSection = () => {
  const { data, formatCurrency, getWhatsappUrl } = useSiteData();
  const communities = data.communities.slice(0, 3);

  return (
    <section id="communities" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 tracking-tight">
              Sub Communities
            </h2>
            <p className="text-lg text-muted font-normal leading-relaxed">
              Choose the circle that matches your current season of growth, leadership, and purpose.
            </p>
          </div>
          <button
            onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-deep transition-colors"
          >
            Explore All Communities <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {communities.map((community, i) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-2xl bg-muted/5 border border-border/30">
                <img
                  src={community.image_url || community.hero_image_url || 'https://picsum.photos/seed/community/800/1000'}
                  alt={community.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4 gap-6">
                  <h3 className="text-2xl font-display font-medium text-foreground">{community.name}</h3>
                  <div className="text-right">
                    <div className="text-lg font-medium text-foreground">{formatCurrency(community.price)}</div>
                    <div className="text-xs text-muted uppercase tracking-widest mt-1">{community.price_period || 'per year'}</div>
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-8 text-sm font-normal flex-grow">
                  {community.summary || community.description}
                </p>

                <div className="pt-6 border-t border-border/40">
                  <button
                    onClick={() => { window.open(getWhatsappUrl(community.whatsapp_message || undefined), '_blank'); }}
                    className="flex items-center justify-between w-full text-sm font-medium text-foreground group/btn hover:text-brand-primary transition-colors"
                  >
                    <span>Become a Circler</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
