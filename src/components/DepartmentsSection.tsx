import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Heart, PenTool, Palette, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const departments = [
  {
    title: 'Health & Wellness',
    description: 'Fostering physical and mental well-being as a foundation for effective leadership.',
    icon: Heart,
    color: 'bg-rose-500/10 text-rose-500',
  },
  {
    title: 'Content',
    description: 'Equipping members to communicate their purpose effectively through various media.',
    icon: PenTool,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Design',
    description: 'Cultivating creativity and visual excellence in all aspects of life and work.',
    icon: Palette,
    color: 'bg-amber-500/10 text-amber-500',
  },
];

export const DepartmentsSection = () => {
  return (
    <section id="departments" className="section-spacing px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Specialized Tracks"
          title="Departments of Excellence"
          description="Explore our specialized departments designed for holistic growth and skill development."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-3xl bg-surface border border-border/50 hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-premium flex flex-col items-center text-center"
            >
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6', dept.color)}>
                <dept.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-display font-medium text-foreground mb-4">{dept.title}</h3>
              <p className="text-muted leading-relaxed mb-8 flex-grow text-sm font-normal">{dept.description}</p>
              
              <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-medium text-sm group/link">
                Learn More 
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
