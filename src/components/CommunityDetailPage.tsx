import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, MessageCircle, Target, Users, Zap } from 'lucide-react';
import { Button } from './Button';
import { getIcon } from '../lib/icon-map';
import { useCommunityBySlug, useCommunityMemberCount, useSiteData, useSafeArray } from '../lib/site-data';

interface CommunityDetailPageProps {
  communityId: string;
  onBack: () => void;
}

export const CommunityDetailPage: React.FC<CommunityDetailPageProps> = ({ communityId, onBack }) => {
  const { formatCurrency, getWhatsappUrl } = useSiteData();
  const community = useCommunityBySlug(communityId);
  const memberCount = useCommunityMemberCount(communityId);
  const getPriceLabel = (value?: string | null) => {
    if (!value) return 'one-off';
    const normalized = value.toLowerCase().trim();
    return ['year', 'per year', 'yearly'].includes(normalized) ? 'one-off' : normalized;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!community) {
    return null;
  }

  const stats = useSafeArray<any>(community.stats).length > 0
    ? useSafeArray<any>(community.stats)
    : [
        { label: 'Active Members', value: memberCount.toLocaleString(), icon: 'Users' },
        { label: 'One-off Payment', value: formatCurrency(community.price), icon: 'Zap' },
        { label: 'Focused Outcome', value: community.focus_outcome || 'Growth', icon: 'Target' },
      ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-12 group gap-2 text-muted hover:text-foreground">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Communities
        </Button>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <p className="text-brand-primary font-medium text-xs uppercase tracking-widest mb-4">{community.tagline}</p>
              <h1 className="text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-6">{community.name}</h1>
              <p className="text-muted text-lg leading-relaxed font-normal">{community.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => {
                const Icon = getIcon(stat.icon, i === 0 ? Users : i === 1 ? Zap : Target);
                return (
                  <div key={stat.label || i} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xl font-display font-medium text-foreground">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="whatsapp" size="lg" className="gap-2" onClick={() => { window.open(getWhatsappUrl(community.whatsapp_message || undefined), '_blank'); }}>
                <MessageCircle className="w-4 h-4" />
                Join via WhatsApp
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-premium">
            <img src={community.hero_image_url || community.image_url || 'https://picsum.photos/seed/community/1200/600'} alt={community.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        <div id="features" className="grid md:grid-cols-2 gap-16 py-24 border-t border-border/50">
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-medium text-foreground">What to Expect</h2>
            <p className="text-muted leading-relaxed font-normal">Joining the {community.name} community means committing to a journey of intentional growth and excellence. Our curated track is designed to provide you with the tools, resources, and network you need to succeed.</p>
            <div className="space-y-4">
              {useSafeArray<string>(community.features).map((feature, i) => (
                <div key={feature + i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  <span className="text-muted font-normal">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface p-12 rounded-3xl border border-border/50 space-y-8">
            <h3 className="text-2xl font-display font-medium text-foreground">Community Membership</h3>
            <p className="text-muted leading-relaxed font-normal">Get full access to the {community.name} track, including all masterminds, resources, and our global network of intentional individuals.</p>
            <div className="pt-8 border-t border-border/50">
              <p className="text-4xl font-display font-medium text-foreground mb-2">{formatCurrency(community.price)} <span className="text-lg text-muted font-normal">/ {getPriceLabel(community.price_period)}</span></p>
              <p className="text-xs text-muted mb-8">One-time payment. Includes all community perks.</p>
              <Button variant="whatsapp" className="w-full gap-2" onClick={() => { window.open(getWhatsappUrl(community.whatsapp_message || undefined), '_blank'); }}>
                <MessageCircle className="w-4 h-4" />
                Join {community.name}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
