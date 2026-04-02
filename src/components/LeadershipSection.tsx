import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { useSiteData, useSafeArray } from '../lib/site-data';

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
};

export const LeadershipSection = () => {
  const { getContent } = useSiteData();
  const leadership = getContent<any>('leadership', {});
  const leaders = useSafeArray<any>(leadership.leaders);

  return (
    <section id="leadership" className="section-spacing px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle={leadership.subtitle || 'Global Leadership'}
          title={leadership.title || 'The Minds Behind the Circle'}
          description={leadership.description || 'Meet the intentional leaders and moderators who guide our global community.'}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-premium transition-shadow duration-500 mb-6">
                <img
                  src={leader.imageUrl || leader.image || 'https://picsum.photos/seed/leader/400/500'}
                  alt={leader.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3">
                    {Object.entries(leader.socials || {}).map(([platform, href]) => {
                      const Icon = socialIcons[platform as keyof typeof socialIcons];
                      if (!Icon || !href) return null;
                      return (
                        <a key={platform} href={String(href)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-brand-primary transition-all border border-white/20">
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="text-center px-2">
                <h3 className="text-xl font-display font-medium text-foreground mb-1">{leader.name}</h3>
                <p className="text-brand-primary font-medium text-[10px] uppercase tracking-widest mb-3">{leader.role}</p>
                <p className="text-muted text-sm leading-relaxed line-clamp-2 font-normal">{leader.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
