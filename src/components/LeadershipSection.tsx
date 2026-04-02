import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const leaders = [
  {
    name: 'Ogunjobi Niyiola',
    role: 'Founder & Visionary',
    image: 'https://picsum.photos/seed/leader1/400/500',
    bio: 'A purpose-driven leader committed to raising a disciplined circle of intentional individuals.',
  },
  {
    name: 'Sarah Adeyemi',
    role: 'Community Moderator',
    image: 'https://picsum.photos/seed/leader2/400/500',
    bio: 'Passionate about fostering growth and accountability within the Inner Circle community.',
  },
  {
    name: 'David Okafor',
    role: 'Innovation Lead',
    image: 'https://picsum.photos/seed/leader3/400/500',
    bio: 'Helping creatives and problem-solvers build the future through faith and innovation.',
  },
  {
    name: 'Elena Mensah',
    role: 'Spirituality Lead',
    image: 'https://picsum.photos/seed/leader4/400/500',
    bio: 'Guiding members on their spiritual journey and deepening their connection to faith.',
  },
];

export const LeadershipSection = () => {
  return (
    <section id="leadership" className="section-spacing px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Global Leadership"
          title="The Minds Behind the Circle"
          description="Meet the intentional leaders and moderators who guide our global community."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-premium transition-shadow duration-500 mb-6">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3">
                    {[Instagram, Twitter, Linkedin].map((Icon, j) => (
                      <a key={j} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-brand-primary transition-all border border-white/20">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
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
