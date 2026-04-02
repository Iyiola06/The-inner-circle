import React from 'react';
import { Card, SectionHeading } from './Card';
import { Button } from './Button';
import { Check, Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useSiteData, useSafeArray } from '../lib/site-data';

export const PricingSection = () => {
  const { getContent } = useSiteData();
  const pricingPlans = useSafeArray<any>(getContent('pricing_plans', []));

  return (
    <section id="pricing" className="section-spacing px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Membership" title="Invest in Your Growth" description="Choose the plan that best fits your current stage and future ambitions." />

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div key={plan.name || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={cn('relative p-8 md:p-10 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col', plan.popular ? 'border-brand-primary/30 bg-brand-primary/[0.02] shadow-premium' : 'border-border/50 bg-surface shadow-sm hover:shadow-premium')}>
              {plan.popular && <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">Most Popular</div>}
              <div className="mb-8">
                <h3 className="text-xl font-display font-medium text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-display font-medium text-foreground">{plan.price}</span>
                  <span className="text-muted font-medium text-sm">{plan.period}</span>
                </div>
                <p className="text-muted leading-relaxed text-sm font-normal">{plan.description}</p>
              </div>
              <div className="space-y-4 mb-10 flex-grow">
                {useSafeArray<string>(plan.features).map((feature, j) => (
                  <div key={feature + j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-primary" />
                    </div>
                    <span className="text-sm text-foreground/80 font-normal">{feature}</span>
                  </div>
                ))}
              </div>
              <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">{plan.cta}</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TestimonialSection = () => {
  const { data } = useSiteData();
  const testimonials = data.testimonials.slice(0, 3);

  return (
    <section className="section-spacing px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Testimonials" title="What Our Circlers Say" description="Real stories from real leaders who have found their place in The Inner Circle." />

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((testimonial, i) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="min-w-[85vw] md:min-w-0 snap-center">
              <Card className="h-full flex flex-col gap-6 md:gap-8 relative p-8 md:p-10 border-border/50 shadow-sm hover:shadow-premium transition-shadow duration-500">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-brand-primary/5" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating || 5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                  ))}
                </div>
                <p className="text-base text-foreground/90 italic leading-relaxed font-normal">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                  <img src={testimonial.avatar_url || 'https://picsum.photos/seed/avatar/100/100'} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border border-border/50" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
                    <p className="text-[10px] text-muted font-medium uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
