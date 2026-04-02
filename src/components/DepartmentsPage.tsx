import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { ArrowRight, Briefcase, CheckCircle2, MessageCircle, Sparkles, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { getIcon } from '../lib/icon-map';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const DepartmentsPage = () => {
  const { getContent, getWhatsappUrl } = useSiteData();
  const page = getContent<any>('departments_page', {});
  const departments = useSafeArray<any>(page.departments);
  const supportCards = useSafeArray<any>(page.supportCards).length > 0
    ? useSafeArray<any>(page.supportCards)
    : [
        { title: 'Whole-Person Care', desc: 'We support members beyond ideas and ambition, with room for physical, emotional and creative wellbeing.', icon: 'Heart' },
        { title: 'Clear Communication', desc: 'Stories, resources and updates are shaped intentionally so the community stays informed and inspired.', icon: 'MessageSquare' },
        { title: 'Visual Excellence', desc: 'Design keeps the brand, resources and experience of Inner Circle clear, beautiful and consistent.', icon: 'Palette' },
      ];
  const leads = useSafeArray<any>(page.leads).length > 0
    ? useSafeArray<any>(page.leads)
    : [
        { name: 'Department Lead', role: 'Health and Wellness Lead', specialty: 'Whole-person care', imageUrl: 'https://picsum.photos/seed/wellness-lead/400/400' },
        { name: 'Department Lead', role: 'Content Lead', specialty: 'Storytelling and communication', imageUrl: 'https://picsum.photos/seed/content-lead/400/400' },
        { name: 'Department Lead', role: 'Design Lead', specialty: 'Visual identity and assets', imageUrl: 'https://picsum.photos/seed/design-lead/400/400' },
      ];
  const departmentItems = departments.length > 0
    ? departments
    : [
        {
          title: 'Health and Wellness Department',
          description: "Great communities don't just grow people intellectually, they care for the whole person. The Health & Wellness Department exists to ensure Inner Circle members are supported in their physical health, mental clarity, and emotional balance. From wellness resources to intentional check-ins, this department makes sure no one is running on empty while trying to build something great.",
          activities: ['Wellness resources', 'Intentional check-ins', 'Physical health support', 'Mental clarity support'],
          icon: 'Heart',
          bg: 'bg-brand-primary/10',
          color: 'text-brand-primary',
          imageUrl: 'https://picsum.photos/seed/health-department/800/600',
        },
        {
          title: 'Content Department',
          description: 'The Content Department is responsible for capturing and communicating what Inner Circle is building through written pieces, social content, community resources, and everything in between.',
          activities: ['Written content', 'Social content', 'Community resources', 'Internal communication'],
          icon: 'FileText',
          bg: 'bg-brand-primary/10',
          color: 'text-brand-primary',
          imageUrl: 'https://picsum.photos/seed/content-department/800/600',
        },
        {
          title: 'Design Department',
          description: 'First impressions matter, and so does every impression after that. The Design Department shapes the visual identity of Inner Circle crafting the graphics, assets, templates, and designs that represent the community with clarity and excellence.',
          activities: ['Graphics and assets', 'Templates', 'Visual identity', 'Community design systems'],
          icon: 'Palette',
          bg: 'bg-brand-primary/10',
          color: 'text-brand-primary',
          imageUrl: 'https://picsum.photos/seed/design-department/800/600',
        },
      ];
  const contributionPoints = useSafeArray<string>(page.contributionPoints).length > 0
    ? useSafeArray<string>(page.contributionPoints)
    : [
        'Contribute your skills to a global movement',
        'Work alongside industry professionals',
        'Build your portfolio with premium projects',
        'Impact lives through specialized service',
      ];
  const contributionHighlights = useSafeArray<any>(page.contributionHighlights).length > 0
    ? useSafeArray<any>(page.contributionHighlights)
    : [
        { label: 'Open Tracks', value: '3', icon: Briefcase },
        { label: 'Lead Mentors', value: `${leads.length || 3}`, icon: Users },
        { label: 'Live Projects', value: '12+', icon: Sparkles },
      ];
  const contributionRoles = useSafeArray<string>(page.contributionRoles).length > 0
    ? useSafeArray<string>(page.contributionRoles)
    : ['Writers', 'Designers', 'Strategists', 'Community Builders', 'Wellness Leads', 'Operators'];

  return (
    <div className="pt-20">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-sm mb-8 shadow-sm">{page.heroBadge || 'Departments'}</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-foreground mb-8 leading-[1.05] tracking-tight">{page.heroTitle || 'Serve with'} <span className="text-brand-primary">{page.heroHighlight || 'Purpose'}</span>.</h1>
            <p className="text-xl text-muted leading-relaxed font-normal">{page.heroDescription || 'The departments of Inner Circle help us care for people well, communicate clearly and represent the community with excellence.'}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {departmentItems.map((dept, i) => {
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-deep/10 rounded-full blur-[80px]" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <SectionHeading subtitle="Contribute" title={page.contributionTitle || 'Serve with Purpose'} align="left" />
                <p className="text-lg text-muted leading-relaxed mt-6 font-normal">{page.contributionDescription || 'We invite members into purposeful contribution across our departments.'}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {contributionHighlights.map((item, i) => {
                    const Icon = typeof item.icon === 'string' ? getIcon(item.icon) : item.icon;
                    return (
                      <div key={item.label || i} className="rounded-2xl border border-border/50 bg-background/70 px-5 py-6 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-2xl font-display font-medium text-foreground">{item.value}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted mt-2">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8">
                  <Button variant="primary" className="gap-2" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
                    Apply to Join a Department
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border/50 bg-background/70 p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-5">Why Join a Department</p>
                  <div className="space-y-4">
                    {contributionPoints.map((text, i) => (
                      <div key={text + i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                        </div>
                        <span className="font-medium text-foreground text-sm leading-relaxed">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-muted font-medium mb-5">Teams We Are Building</p>
                  <div className="flex flex-wrap gap-3">
                    {contributionRoles.map((role, i) => (
                      <span key={role + i} className="px-4 py-2 rounded-full bg-surface border border-border/50 text-sm font-medium text-foreground">
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border/40">
                    <p className="text-sm text-muted leading-relaxed">
                      Members do not just volunteer here. They ship meaningful work, sharpen their craft, and grow inside a disciplined support system.
                    </p>
                  </div>
                </div>
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
