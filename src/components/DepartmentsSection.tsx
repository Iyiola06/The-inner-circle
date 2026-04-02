import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { getIcon } from '../lib/icon-map';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const DepartmentsSection = () => {
  const { getContent } = useSiteData();
  const departments = useSafeArray<any>(getContent('departments_preview', [])).length > 0
    ? useSafeArray<any>(getContent('departments_preview', []))
    : [
        {
          title: 'Health and Wellness Department',
          description: "Great communities don't just grow people intellectually, they care for the whole person. The Health & Wellness Department exists to ensure Inner Circle members are supported in their physical health, mental clarity, and emotional balance.",
          icon: 'Heart',
          color: 'bg-brand-primary/10 text-brand-primary',
        },
        {
          title: 'Content Department',
          description: 'The Content Department is responsible for capturing and communicating what Inner Circle is building through written pieces, social content, community resources, and everything in between.',
          icon: 'FileText',
          color: 'bg-brand-primary/10 text-brand-primary',
        },
        {
          title: 'Design Department',
          description: 'The Design Department shapes the visual identity of Inner Circle, crafting the graphics, assets, templates, and designs that represent the community with clarity and excellence.',
          icon: 'Palette',
          color: 'bg-brand-primary/10 text-brand-primary',
        },
      ];

  return (
    <section id="departments" className="section-spacing px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-muted font-medium mb-4">Departments</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 tracking-tight">Departments of Service</h2>
          <p className="text-muted max-w-2xl mx-auto font-normal leading-relaxed">Inner Circle is strengthened by departments that support the whole person and the whole community.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {departments.map((dept, i) => {
            const Icon = getIcon(dept.icon);
            return (
              <motion.div
                key={dept.title || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-3xl bg-surface border border-border/50 hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-premium flex flex-col items-center text-center"
              >
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6', dept.color || 'bg-brand-primary/10 text-brand-primary')}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-display font-medium text-foreground mb-4">{dept.title}</h3>
                <p className="text-muted leading-relaxed mb-8 flex-grow text-sm font-normal">{dept.description}</p>

                <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-medium text-sm group/link">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
