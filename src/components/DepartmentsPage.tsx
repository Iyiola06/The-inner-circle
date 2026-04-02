import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { getIcon } from '../lib/icon-map';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const DepartmentsPage = () => {
  const { getContent, getWhatsappUrl } = useSiteData();
  const page = getContent<any>('departments_page', {});
  const departments = useSafeArray<any>(page.departments);
  const supportCards = useSafeArray<any>(page.supportCards);
  const leads = useSafeArray<any>(page.leads);
  const contributionPoints = useSafeArray<string>(page.contributionPoints);

  return (
    <div className="pt-20">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-sm mb-8 shadow-sm">{page.heroBadge || 'The Ecosystem'}</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-foreground mb-8 leading-[1.05] tracking-tight">{page.heroTitle || 'Structured for'} <span className="text-brand-primary">{page.heroHighlight || 'Excellence'}</span>.</h1>
            <p className="text-xl text-muted leading-relaxed font-normal">{page.heroDescription || 'Inner Circle is more than a group; it is a structured, intentional ecosystem.'}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {departments.map((dept, i) => {
            const Icon = getIcon(dept.icon);
            return (
              <motion.div key={dept.id || dept.title || i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn('grid lg:grid-cols-2 gap-16 items-center')}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6', dept.bg || 'bg-brand-primary/10', dept.color || 'text-brand-primary')}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight">{dept.title}</h2>
                    <p className="text-lg text-muted leading-relaxed font-normal">{dept.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center gap-2 text-sm uppercase tracking-widest">Key Activities</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {useSafeArray<string>(dept.activities).map((activity, idx) => (
                        <div key={activity + idx} className="flex items-center gap-2 text-sm text-muted font-normal">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border/50 shadow-premium group">
                    <img src={dept.imageUrl || dept.image || 'https://picsum.photos/seed/department/800/600'} alt={dept.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-spacing px-6 bg-muted/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading subtitle="Holistic Support" title={page.supportTitle || 'A Sustainable Ecosystem'} description={page.supportDescription || 'Our departments form a cohesive support system that ensures the community functions holistically and sustainably.'} />
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            {supportCards.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.div key={item.title || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-surface border border-border/50 shadow-sm hover:shadow-premium transition-shadow duration-500">
                  <Icon className="w-8 h-8 text-brand-primary mx-auto mb-6" />
                  <h3 className="text-lg font-display font-medium text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed font-normal">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Leadership" title="Department Leads" description="The professional, credible voices guiding our specialized tracks." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {leads.map((lead, i) => (
              <motion.div key={lead.name || i} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-border/50 shadow-sm group-hover:shadow-premium transition-shadow duration-500">
                    <img src={lead.imageUrl || lead.image || 'https://picsum.photos/seed/lead/400/400'} alt={lead.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
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

      <section className="section-spacing px-6 bg-brand-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-surface rounded-3xl p-12 md:p-20 border border-border/50 shadow-premium relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <SectionHeading subtitle="Contribute" title={page.contributionTitle || 'Serve with Purpose'} align="left" />
                <p className="text-lg text-muted leading-relaxed mt-6 font-normal">{page.contributionDescription || 'We invite members into purposeful contribution across our departments.'}</p>
                <div className="mt-8">
                  <Button variant="primary" className="gap-2" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
                    Apply to Join a Department
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {contributionPoints.map((text, i) => (
                  <div key={text + i} className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border/50 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium text-foreground text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-12 md:p-24 rounded-3xl bg-surface border border-border/50 shadow-premium relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 leading-tight">{page.ctaTitle || 'Ready to be part of the'} <br /> <span className="text-brand-primary">{page.ctaHighlight || 'Ecosystem?'}</span></h2>
            <p className="text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">{page.ctaDescription || 'Join a structured community that values excellence, discipline, and holistic support.'}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>Become a Circler</Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
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
