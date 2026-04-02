import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageCircle, CheckCircle2, Users, Target, Zap } from 'lucide-react';
import { Button } from './Button';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';

interface CommunityDetailPageProps {
  communityId: string;
  onBack: () => void;
}

const communityData: Record<string, any> = {
  'better-man': {
    title: 'Better Man',
    subtitle: 'Masculinity & Discipline',
    description: 'A specialized track for men committed to building character, discipline, and intentionality in every area of life.',
    image: 'https://picsum.photos/seed/betterman/1200/600',
    features: [
      'Weekly character-building masterminds',
      'Accountability partnerships',
      'Physical fitness and discipline tracks',
      'Spiritual growth and leadership training'
    ],
    stats: [
      { label: 'Active Members', value: '500+', icon: Users },
      { label: 'Weekly Sessions', value: '3', icon: Zap },
      { label: 'Success Rate', value: '98%', icon: Target }
    ]
  },
  'innovation-lab': {
    title: 'Innovation Lab',
    subtitle: 'Creativity & Tech',
    description: 'Where faith meets innovation. A hub for creatives, tech enthusiasts, and problem-solvers building the future.',
    image: 'https://picsum.photos/seed/innovation/1200/600',
    features: [
      'Tech-focused workshops and bootcamps',
      'Creative project collaborations',
      'Mentorship from industry leaders',
      'Product development and launch support'
    ],
    stats: [
      { label: 'Creators', value: '300+', icon: Users },
      { label: 'Projects Launched', value: '45', icon: Zap },
      { label: 'Innovation Score', value: 'High', icon: Target }
    ]
  },
  'budding-ceos': {
    title: 'Budding CEOs',
    subtitle: 'Business & Entrepreneurship',
    description: 'Empowering the next generation of ethical business leaders and entrepreneurs to build impactful ventures.',
    image: 'https://picsum.photos/seed/ceos/1200/600',
    features: [
      'Business strategy and planning sessions',
      'Financial literacy and investment training',
      'Networking with established entrepreneurs',
      'Pitch competitions and funding advice'
    ],
    stats: [
      { label: 'Entrepreneurs', value: '400+', icon: Users },
      { label: 'Businesses Started', value: '120', icon: Zap },
      { label: 'Growth Rate', value: '150%', icon: Target }
    ]
  },
  'health-wellness': {
    title: 'Health & Wellness',
    subtitle: 'Vibrant Living',
    description: 'A community focused on holistic well-being, physical health, and mental clarity through intentional living.',
    image: 'https://picsum.photos/seed/health/1200/600',
    features: [
      'Guided fitness and nutrition plans',
      'Mental health and clarity workshops',
      'Holistic living and wellness retreats',
      'Community-led health challenges'
    ],
    stats: [
      { label: 'Active Members', value: '250+', icon: Users },
      { label: 'Workshops', value: 'Weekly', icon: Zap },
      { label: 'Well-being Score', value: '95%', icon: Target }
    ]
  },
  'content': {
    title: 'Content Creators',
    subtitle: 'Digital Impact',
    description: 'For storytellers, digital creators, and influencers using their voice to inspire and impact the world.',
    image: 'https://picsum.photos/seed/content/1200/600',
    features: [
      'Content strategy and creation workshops',
      'Digital storytelling and branding sessions',
      'Collaboration opportunities with creators',
      'Platform growth and impact training'
    ],
    stats: [
      { label: 'Creators', value: '200+', icon: Users },
      { label: 'Total Reach', value: '1M+', icon: Zap },
      { label: 'Engagement Rate', value: 'High', icon: Target }
    ]
  }
};

export const CommunityDetailPage: React.FC<CommunityDetailPageProps> = ({ communityId, onBack }) => {
  const data = communityData[communityId] || communityData['better-man'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-12 group gap-2 text-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Communities
        </Button>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <p className="text-brand-primary font-medium text-xs uppercase tracking-widest mb-4">
                {data.subtitle}
              </p>
              <h1 className="text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-6">
                {data.title}
              </h1>
              <p className="text-muted text-lg leading-relaxed font-normal">
                {data.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {data.stats.map((stat: any, i: number) => (
                <div key={i} className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xl font-display font-medium text-foreground">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="whatsapp" 
                size="lg"
                className="gap-2"
                onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
              >
                <MessageCircle className="w-4 h-4" />
                Join via WhatsApp
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-premium"
          >
            <img 
              src={data.image} 
              alt={data.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div id="features" className="grid md:grid-cols-2 gap-16 py-24 border-t border-border/50">
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-medium text-foreground">What to Expect</h2>
            <p className="text-muted leading-relaxed font-normal">
              Joining the {data.title} community means committing to a journey of intentional growth and excellence. Our curated track is designed to provide you with the tools, resources, and network you need to succeed.
            </p>
            <div className="space-y-4">
              {data.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  <span className="text-muted font-normal">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface p-12 rounded-3xl border border-border/50 space-y-8">
            <h3 className="text-2xl font-display font-medium text-foreground">Community Membership</h3>
            <p className="text-muted leading-relaxed font-normal">
              Get full access to the {data.title} track, including all masterminds, resources, and our global network of intentional individuals.
            </p>
            <div className="pt-8 border-t border-border/50">
              <p className="text-4xl font-display font-medium text-foreground mb-2">₦50,000 <span className="text-lg text-muted font-normal">/ year</span></p>
              <p className="text-xs text-muted mb-8">Billed annually. Includes all community perks.</p>
              <Button 
                variant="whatsapp" 
                className="w-full gap-2"
                onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
              >
                <MessageCircle className="w-4 h-4" />
                Join {data.title}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
