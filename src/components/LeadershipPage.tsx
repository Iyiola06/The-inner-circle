import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

const leaders = [
  {
    name: 'Ogunjobi Niyiola',
    role: 'Founder & Visionary',
    image: 'https://picsum.photos/seed/leader1/400/500',
    bio: 'A purpose-driven leader committed to raising a disciplined circle of intentional individuals. Niyiola has spent over a decade building communities that foster growth, accountability, and spiritual depth.',
  },
  {
    name: 'Sarah Adeyemi',
    role: 'Community Moderator',
    image: 'https://picsum.photos/seed/leader2/400/500',
    bio: 'Passionate about fostering growth and accountability within the Inner Circle community. Sarah ensures that every member feels heard and supported on their journey.',
  },
  {
    name: 'David Okafor',
    role: 'Innovation Lead',
    image: 'https://picsum.photos/seed/leader3/400/500',
    bio: 'Helping creatives and problem-solvers build the future through faith and innovation. David leads our tech and creative initiatives, bridging the gap between faith and modern solutions.',
  },
  {
    name: 'Elena Mensah',
    role: 'Spirituality Lead',
    image: 'https://picsum.photos/seed/leader4/400/500',
    bio: 'Guiding members on their spiritual journey and deepening their connection to faith. Elena provides the spiritual foundation that anchors all our community activities.',
  },
];

interface LeadershipPageProps {
  onBack: () => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onBack }) => {
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
          Back to Home
        </Button>

        <div className="mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-primary font-medium text-xs uppercase tracking-widest mb-4"
          >
            Our Leadership
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-6"
          >
            The Minds Behind <br /> <span className="text-brand-primary">The Circle</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl leading-relaxed font-normal"
          >
            Meet the intentional leaders and moderators who guide our global community, fostering a culture of discipline, excellence, and impact.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {leaders.map((leader, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-full md:w-64 aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-sm flex-shrink-0">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-display font-medium text-foreground mb-1">{leader.name}</h3>
                  <p className="text-brand-primary font-medium text-xs uppercase tracking-widest">{leader.role}</p>
                </div>
                <p className="text-muted leading-relaxed font-normal">{leader.bio}</p>
                <div className="flex items-center gap-3 pt-2">
                  {[Instagram, Twitter, Linkedin].map((Icon, j) => (
                    <a key={j} href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
