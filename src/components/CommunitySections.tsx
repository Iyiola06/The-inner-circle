import React from 'react';
import { Card } from './Card';
import { SectionHeading } from './Card';
import { Users, Target, Zap, Shield, Heart, Globe, Star, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const communityFeatures = [
  {
    icon: Users,
    title: 'Exclusive Network',
    description: 'Connect with high-performing, intentional individuals across various industries.',
  },
  {
    icon: Target,
    title: 'Goal Alignment',
    description: 'Structured frameworks to help you define and achieve your most ambitious goals.',
  },
  {
    icon: Zap,
    title: 'Weekly Masterminds',
    description: 'Deep-dive sessions focusing on leadership, creativity, and spiritual growth.',
  },
  {
    icon: Shield,
    title: 'Safe Space',
    description: 'A high-trust environment where vulnerability is welcomed and growth is mandatory.',
  },
];

export const CommunitySection = () => {
  return (
    <section id="community" className="section-spacing px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="The Experience"
          title="Designed for those who refuse to settle."
          description="We provide the environment, the tools, and the community you need to reach your full potential."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityFeatures.map((feature, i) => (
            <Card key={i} className="flex flex-col gap-6">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const departments = [
  {
    icon: Star,
    title: 'Leadership',
    description: 'Developing intentional leaders who lead with integrity and purpose.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Heart,
    title: 'Spirituality',
    description: 'Deepening your spiritual grounding and connection to your faith.',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'Creating sustainable change and leaving a lasting legacy in the world.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    icon: Award,
    title: 'Discipline',
    description: 'Building the habits and systems that drive consistent excellence.',
    color: 'bg-amber-500/10 text-amber-500',
  },
];

export const DepartmentSection = () => {
  return (
    <section id="departments" className="section-spacing px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Our Focus"
          title="Specialized Departments for Holistic Growth"
          description="Choose your path or explore them all. Each department is led by experienced mentors."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl border border-border bg-surface hover:border-brand-primary/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-all duration-500" />
              
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110', dept.color)}>
                <dept.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">{dept.title}</h3>
              <p className="text-muted leading-relaxed mb-8">{dept.description}</p>
              
              <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm group/link">
                Learn More 
                <span className="w-5 h-5 rounded-full border border-brand-primary/30 flex items-center justify-center group-hover/link:bg-brand-primary group-hover/link:text-white transition-all">
                  →
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
