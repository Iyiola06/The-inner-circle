import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { CheckCircle2, ChevronLeft, ChevronRight, Play, Quote, Star, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSiteData, useSafeArray, useTestimonialStats } from '../lib/site-data';

export const TestimonialsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, getContent, getWhatsappUrl } = useSiteData();
  const testimonialStats = useTestimonialStats();
  const featuredStories = data.testimonials.filter((testimonial) => testimonial.is_featured).length > 0
    ? data.testimonials.filter((testimonial) => testimonial.is_featured)
    : data.testimonials.slice(0, 2);
  const videoSpotlights = useSafeArray<any>(getContent('testimonial_videos', [])).length > 0
    ? useSafeArray<any>(getContent('testimonial_videos', []))
    : [
        { title: 'Member breakthrough', imageUrl: 'https://picsum.photos/seed/video1/800/450' },
        { title: 'Leadership story', imageUrl: 'https://picsum.photos/seed/video2/800/450' },
        { title: 'Community growth', imageUrl: 'https://picsum.photos/seed/video3/800/450' },
      ];
  const trustPoints = useSafeArray<string>(getContent('testimonial_trust_points', [])).length > 0
    ? useSafeArray<string>(getContent('testimonial_trust_points', []))
    : [
        'Purpose-driven growth ecosystem',
        'Faith-centered culture of excellence',
        'Structured accountability and support',
      ];
  const categories = ['All', ...Array.from(new Set(data.testimonials.map((testimonial) => testimonial.category).filter(Boolean)))];
  const filteredTestimonials = activeCategory === 'All' ? data.testimonials : data.testimonials.filter((testimonial) => testimonial.category === activeCategory);

  const nextSlide = () => setCurrentSlide((prev) => (featuredStories.length ? (prev + 1) % featuredStories.length : 0));
  const prevSlide = () => setCurrentSlide((prev) => (featuredStories.length ? (prev - 1 + featuredStories.length) % featuredStories.length : 0));
  const activeStory = featuredStories[currentSlide];

  return (
    <div className="pt-20">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-border/50 text-foreground font-medium text-sm mb-8 shadow-sm">Impact & Transformation</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-foreground mb-8 leading-[1.05] tracking-tight">Real Stories of <br /> <span className="text-brand-primary">Intentional Growth.</span></h1>
            <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto font-normal">Discover how The Inner Circle has empowered individuals to master discipline, sharpen their creativity, and lead with purpose.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing px-6 bg-muted/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Success Stories" title="Featured Transformations" description="Deep dives into the journeys of our most intentional Circlers." />

          {activeStory && (
            <div className="relative mt-12">
              <AnimatePresence mode="wait">
                <motion.div key={activeStory.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-premium">
                    <img src={activeStory.image_url || activeStory.avatar_url || 'https://picsum.photos/seed/story/800/1000'} alt={activeStory.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="glass p-6 rounded-2xl border border-white/20">
                        <p className="text-white font-medium text-lg mb-1">{activeStory.name}</p>
                        <p className="text-white/70 text-xs uppercase tracking-widest font-medium">{activeStory.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <Quote className="w-12 h-12 text-brand-primary/20" />
                    <p className="text-2xl md:text-3xl font-display font-medium text-foreground leading-relaxed italic">"{activeStory.featured_quote || activeStory.content}"</p>
                    <div className="p-8 rounded-3xl bg-surface border border-brand-primary/20 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-[60px]" />
                      <h4 className="text-brand-primary font-medium uppercase tracking-widest text-xs mb-4">The Transformation</h4>
                      <p className="text-lg text-foreground font-medium">{activeStory.featured_transformation || activeStory.content}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                      <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
                      <div className="flex gap-2 ml-4">
                        {featuredStories.map((story, i) => (
                          <div key={story.id} className={cn('w-2 h-2 rounded-full transition-all', currentSlide === i ? 'w-8 bg-brand-primary' : 'bg-border')} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <SectionHeading subtitle="Voices" title="The Circler Experience" description="Real feedback from members across our global ecosystem." align="left" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={cn('px-6 py-2 rounded-full text-sm font-medium transition-all border', activeCategory === cat ? 'bg-brand-primary text-white border-brand-primary shadow-sm' : 'bg-surface text-muted border-border/50 hover:border-brand-primary/30')}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((testimonial, i) => (
                <motion.div key={testimonial.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-8 rounded-3xl bg-surface border border-border/50 hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-premium group">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={testimonial.avatar_url || 'https://picsum.photos/seed/avatar/100/100'} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-brand-primary/20" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                      <p className="text-[10px] text-muted font-medium uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, ratingIndex) => (
                      <Star key={ratingIndex} className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed font-normal text-sm">"{testimonial.content}"</p>
                  <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-3 py-1.5 rounded-full">{testimonial.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Social Proof" title="Voices in Motion" description="Watch and listen to the impact of the Inner Circle ecosystem." />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {videoSpotlights.map((spotlight, i) => (
              <motion.div key={spotlight.title || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-premium cursor-pointer transition-shadow duration-500">
                <img src={spotlight.imageUrl || 'https://picsum.photos/seed/video/800/450'} alt={spotlight.title || 'Video Testimonial'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-medium text-xs uppercase tracking-widest">{spotlight.title || `Video Spotlight ${i + 1}`}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading subtitle="Our Reach" title="A Growing Ecosystem of Excellence" description="The numbers tell a story of consistent impact and intentional community building." align="left" />
              <div className="grid grid-cols-2 gap-6 mt-12">
                {testimonialStats.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-surface border border-border/50 shadow-sm text-center">
                    <stat.icon className="w-6 h-6 text-brand-primary mx-auto mb-4" />
                    <p className="text-3xl font-display font-medium text-foreground mb-1">{stat.value}</p>
                    <p className="text-[10px] text-muted font-medium uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {trustPoints.map((text, i) => (
                <motion.div key={text + i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border/50 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-12 md:p-24 rounded-3xl bg-brand-primary text-white shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 leading-tight">Your Story Starts <br /> <span className="text-white/80">Right Here.</span></h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">Join the circle of intentional individuals who are redefining what it means to grow with purpose.</p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-white text-brand-primary border-none hover:bg-white/90 shadow-sm" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
                  Become a Circler
                </Button>
                <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-white border border-white/20 hover:bg-white/10" onClick={() => { window.open(getWhatsappUrl(), '_blank'); }}>
                  <MessageCircle className="w-4 h-4" />
                  Join via WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
