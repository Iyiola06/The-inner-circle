import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { 
  Heart, 
  FileText, 
  Palette, 
  Shield, 
  Zap, 
  Target, 
  Users, 
  Sparkles,
  MessageCircle,
  ArrowRight,
  Activity,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';
import { cn } from '../lib/utils';

const departments = [
  {
    id: 'health-wellness',
    title: 'Health & Wellness',
    description: 'Supports physical health, mental clarity, emotional balance, wellness resources, and intentional check-ins. We believe that a healthy Circler is an effective Circler.',
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    image: 'https://picsum.photos/seed/health/800/600',
    impact: '98% Member Satisfaction',
    activities: ['Weekly Wellness Check-ins', 'Mental Health Resources', 'Fitness Challenges']
  },
  {
    id: 'content',
    title: 'Content Department',
    description: 'Responsible for written pieces, social content, internal resources, and communicating what the community is building. We shape the narrative of the movement.',
    icon: FileText,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    image: 'https://picsum.photos/seed/content/800/600',
    impact: 'Global Audience Reach',
    activities: ['Editorial Strategy', 'Community Newsletters', 'Resource Curation']
  },
  {
    id: 'design',
    title: 'Design Department',
    description: 'Shapes the visual identity through graphics, templates, assets, and design systems that represent the community with excellence. We make the vision visible.',
    icon: Palette,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    image: 'https://picsum.photos/seed/design/800/600',
    impact: 'Premium Brand Identity',
    activities: ['Visual Systems', 'Template Design', 'Asset Management']
  }
];

const leads = [
  {
    name: 'Dr. Jane Smith',
    role: 'Health & Wellness Lead',
    image: 'https://picsum.photos/seed/lead1/400/400',
    specialty: 'Holistic Wellness'
  },
  {
    name: 'Samuel Adebayo',
    role: 'Content Strategy Lead',
    image: 'https://picsum.photos/seed/lead2/400/400',
    specialty: 'Narrative Design'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Visual Identity Lead',
    image: 'https://picsum.photos/seed/lead3/400/400',
    specialty: 'Brand Systems'
  }
];

export const DepartmentsPage = () => {
  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-sm mb-8 shadow-sm">
                The Ecosystem
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-medium text-foreground mb-8 leading-[1.05] tracking-tight">
                Structured for <span className="text-brand-primary">Excellence</span>.
              </h1>
              <p className="text-xl text-muted leading-relaxed font-normal">
                Inner Circle is more than a group; it is a structured, intentional ecosystem. Our departments ensure every member is supported, every resource is premium, and every interaction is excellent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Department Showcase Section */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "grid lg:grid-cols-2 gap-16 items-center",
                i % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", dept.bg, dept.color)}>
                    <dept.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight">{dept.title}</h2>
                  <p className="text-lg text-muted leading-relaxed font-normal">{dept.description}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center gap-2 text-sm uppercase tracking-widest">
                    <Activity className="w-4 h-4 text-brand-primary" />
                    Key Activities
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {dept.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted font-normal">
                        <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-border/50 shadow-sm">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm font-medium text-foreground">{dept.impact}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border/50 shadow-premium group">
                  <img 
                    src={dept.image} 
                    alt={dept.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-primary rounded-full blur-[60px] opacity-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Ecosystem Support Section */}
      <section className="section-spacing px-6 bg-muted/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-brand-primary rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-primary rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading
            subtitle="Holistic Support"
            title="A Sustainable Ecosystem"
            description="Our departments don't work in isolation. They form a cohesive support system that ensures the community functions holistically and sustainably."
          />
          
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            {[
              { title: 'Member Care', icon: Heart, desc: 'Ensuring every individual is seen and supported.' },
              { title: 'Strategic Flow', icon: Layers, desc: 'Maintaining the rhythm of growth and communication.' },
              { title: 'Visual Excellence', icon: Palette, desc: 'Upholding a standard of beauty and clarity.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-surface border border-border/50 shadow-sm hover:shadow-premium transition-shadow duration-500"
              >
                <item.icon className="w-8 h-8 text-brand-primary mx-auto mb-6" />
                <h3 className="text-lg font-display font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Department Lead Spotlight Section */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            subtitle="Leadership"
            title="Department Leads"
            description="The professional, credible voices guiding our specialized tracks."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {leads.map((lead, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 bg-brand-primary rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-border/50 shadow-sm group-hover:shadow-premium transition-shadow duration-500">
                    <img 
                      src={lead.image} 
                      alt={lead.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-1">{lead.name}</h3>
                <p className="text-brand-primary font-medium text-sm mb-2">{lead.role}</p>
                <p className="text-xs text-muted font-normal">{lead.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Opportunities to Contribute Section */}
      <section className="section-spacing px-6 bg-brand-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-surface rounded-3xl p-12 md:p-20 border border-border/50 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[60px]" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <SectionHeading
                  subtitle="Contribute"
                  title="Serve with Purpose"
                  align="left"
                />
                <p className="text-lg text-muted leading-relaxed mt-6 font-normal">
                  We invite members into purposeful contribution. Whether you're a designer, a writer, or a wellness enthusiast, there's a place for you to serve and grow within our departments.
                </p>
                <div className="mt-8">
                  <Button 
                    variant="primary" 
                    className="gap-2"
                    onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
                  >
                    Apply to Join a Department
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  'Contribute your skills to a global movement',
                  'Work alongside industry professionals',
                  'Build your portfolio with premium projects',
                  'Impact lives through specialized service'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border/50 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium text-foreground text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="section-spacing px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 rounded-3xl bg-surface border border-border/50 shadow-premium relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 leading-tight">
              Ready to be part of the <br />
              <span className="text-brand-primary">Ecosystem?</span>
            </h2>
            <p className="text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Join a structured community that values excellence, discipline, and holistic support.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto gap-2"
                onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
              >
                Become a Circler
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto gap-2"
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
