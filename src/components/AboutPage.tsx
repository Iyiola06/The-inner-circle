import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { 
  Shield, 
  Zap, 
  Target, 
  Users, 
  Heart, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Compass,
  Sparkles,
  BookOpen,
  Anchor
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';
import { cn } from '../lib/utils';

const visionCards = [
  {
    title: 'Spiritually Grounded',
    description: 'Rooted in faith and timeless principles that provide a firm foundation for life.',
    icon: Anchor,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Mentally Sharp',
    description: 'Cultivating a keen mind through continuous learning, critical thinking, and wisdom.',
    icon: Zap,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Skillfully Equipped',
    description: 'Developing competence and mastery in specific areas of influence and service.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Community Oriented',
    description: 'Building deep, meaningful connections that foster accountability and shared growth.',
    icon: Users,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    title: 'Purpose Aligned',
    description: 'Living with intentionality, ensuring every action contributes to a greater mission.',
    icon: Compass,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  }
];

const coreValues = [
  'Accountability',
  'Consistency',
  'Excellence',
  'Faith',
  'Intentional Growth',
  'Discipline',
  'Service'
];

const leaders = [
  {
    name: 'Ogunjobi Niyiola',
    role: 'Founder & Visionary',
    image: 'https://picsum.photos/seed/leader1/400/500',
    bio: 'A purpose-driven leader committed to raising a disciplined circle of intentional individuals.'
  },
  {
    name: 'Sarah Adeyemi',
    role: 'Community Moderator',
    image: 'https://picsum.photos/seed/leader2/400/500',
    bio: 'Passionate about fostering growth and accountability within the Inner Circle community.'
  },
  {
    name: 'David Okafor',
    role: 'Innovation Lead',
    image: 'https://picsum.photos/seed/leader3/400/500',
    bio: 'Helping creatives and problem-solvers build the future through faith and innovation.'
  }
];

export const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-deep/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-sm mb-8 shadow-sm">
                Our Story & Vision
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-foreground mb-8 leading-[1.05] tracking-tight">
                Built for the <span className="text-brand-primary">Intentional</span>.
              </h1>
              <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl font-normal">
                The Inner Circle is more than a community; it is a movement of individuals committed to standing out through discipline, faith, and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Brand Story Section */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-premium border border-border/50">
                <img 
                  src="https://picsum.photos/seed/story/800/1000" 
                  alt="Brand Story" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass p-8 rounded-2xl shadow-premium border border-border/50 hidden md:block">
                <p className="text-foreground font-display font-medium text-3xl mb-1">Est. 2023</p>
                <p className="text-muted font-medium text-xs uppercase tracking-wider">A Global Movement</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <SectionHeading
                subtitle="The Genesis"
                title="A Purpose-Driven Movement"
                align="left"
              />
              <div className="space-y-6 text-lg text-muted leading-relaxed font-normal">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:italic first-letter:text-brand-primary first-letter:mr-3 first-letter:float-left">
                  Inner Circle began with a simple yet profound realization: in a world of noise and distraction, true impact belongs to the intentional. We saw a need for a space where faith isn't just a Sunday ritual, but the very foundation of character and competence.
                </p>
                <p>
                  What started as a small gathering has evolved into a faith-centered movement of individuals committed to growth, discipline, and impact. We believe that when you combine spiritual grounding with professional excellence, you become unstoppable.
                </p>
                <p>
                  Our journey is defined by the lives transformed—men and women who have found their voice, sharpened their skills, and discovered a community that holds them to a higher standard.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Why Inner Circle Exists */}
      <section className="section-spacing px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <SectionHeading
                subtitle="The Why"
                title="The Need for Depth"
                align="left"
              />
              <div className="space-y-6 text-lg text-muted leading-relaxed mt-8 font-normal">
                <p>
                  In an era of superficiality, we exist to build depth. In a culture of convenience, we choose discipline. We recognized that many high-achievers were successful in their careers but felt a void in their spiritual and personal development.
                </p>
                <p>
                  We believe that every individual has a unique assignment that requires a specific level of discipline and spiritual alignment to fulfill. The Inner Circle exists to bridge the gap between potential and manifestation by providing the structure, community, and spiritual grounding necessary for true leadership.
                </p>
                <div className="pt-6">
                  <blockquote className="border-l-2 border-brand-primary pl-6 italic font-serif text-2xl text-foreground">
                    "True leadership is not about position, but about the character developed in the secret place of discipline."
                  </blockquote>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-premium">
                <img 
                  src="https://picsum.photos/seed/why/800/800" 
                  alt="Why we exist" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary rounded-full blur-[80px] opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Vision Section */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            subtitle="Our Vision"
            title="The Five Pillars of a Circler"
            description="We envision a generation of leaders who are holistically developed across these core dimensions."
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {visionCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-surface border border-border/50 hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-premium text-center"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto transition-transform duration-500 group-hover:scale-110', card.bg, card.color)}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-medium text-foreground mb-3">{card.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-normal">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mission Section */}
      <section className="section-spacing px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 -z-10" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 rounded-3xl bg-surface border border-border/50 shadow-premium text-center relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <span className="text-brand-primary font-medium uppercase tracking-widest text-xs mb-8 block">Our Mission</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground leading-tight mb-8">
              “To raise a disciplined circle of purpose-driven individuals who are equipped with clarity, competence, character and capacity to influence their spaces through faith, creativity, leadership and service.”
            </h2>
            <div className="w-16 h-px bg-border mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* 6. Core Values / Culture Section */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-premium">
                <img 
                  src="https://picsum.photos/seed/culture/800/800" 
                  alt="Community Culture" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-primary rounded-full blur-[80px] opacity-20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                subtitle="Our Culture"
                title="The Values That Define Us"
                description="Our culture is built on a set of non-negotiable values that guide our interactions and growth."
                align="left"
              />
              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                {coreValues.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Leadership / Moderators Showcase */}
      <section className="section-spacing px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            subtitle="Global Leadership"
            title="The Minds Behind the Circle"
            description="Meet the intentional leaders and moderators who guide our global community."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-premium mb-6">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white/90 text-sm leading-relaxed font-normal">{leader.bio}</p>
                  </div>
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

      {/* 8. Community Philosophy Section */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface rounded-3xl border border-border/50 p-12 md:p-20 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <SectionHeading
                  subtitle="Our Philosophy"
                  title="More Than a Group — An Ecosystem"
                  align="left"
                />
                <div className="space-y-6 text-lg text-muted leading-relaxed mt-8 font-normal">
                  <p>
                    We don't just gather; we grow. The Inner Circle is designed as a structured ecosystem for holistic development. We believe that character is built in the quiet moments of discipline, and impact is achieved through the collective strength of a focused community.
                  </p>
                  <p>
                    Our ecosystem provides the clarity to see your path, the competence to walk it, the character to sustain it, and the capacity to influence others.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Growth', icon: Sparkles },
                  { label: 'Character', icon: Shield },
                  { label: 'Clarity', icon: BookOpen },
                  { label: 'Impact', icon: Target }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-surface border border-border/50 shadow-sm flex flex-col items-center text-center gap-4">
                    <item.icon className="w-6 h-6 text-brand-primary" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA Section */}
      <section className="section-spacing px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 rounded-3xl bg-brand-primary text-white shadow-premium relative overflow-hidden"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 leading-tight">
              Ready to stand out? <br />
              Join The Inner Circle.
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Become part of a disciplined circle of purpose-driven individuals equipped to influence their spaces through faith and excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto gap-2 bg-white text-brand-primary border-none hover:bg-white/90 shadow-sm"
                onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
              >
                Become a Circler
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto gap-2 text-white border border-white/20 hover:bg-white/10"
                onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
              >
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
