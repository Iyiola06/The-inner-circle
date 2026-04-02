import React from 'react';
import { Card, SectionHeading } from './Card';
import { Button } from './Button';
import { Check, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const pricingPlans = [
  {
    name: 'Standard',
    price: '$49',
    period: '/month',
    description: 'Perfect for individuals starting their intentional journey.',
    features: [
      'Access to Community Portal',
      'Weekly Mastermind Sessions',
      'Basic Resource Library',
      'Monthly Networking Events',
    ],
    cta: 'Apply Now',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/month',
    description: 'Our most popular plan for serious growth and leadership.',
    features: [
      'Everything in Standard',
      '1-on-1 Mentorship Session',
      'Exclusive Leadership Workshops',
      'Priority Support',
      'Advanced Resource Library',
    ],
    cta: 'Join Premium',
    popular: true,
  },
  {
    name: 'Elite',
    price: '$249',
    period: '/month',
    description: 'For high-impact leaders seeking maximum transformation.',
    features: [
      'Everything in Premium',
      'Quarterly In-Person Retreats',
      'Private Executive Coaching',
      'VIP Networking Access',
      'Lifetime Resource Access',
    ],
    cta: 'Apply for Elite',
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="section-spacing px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Membership"
          title="Invest in Your Growth"
          description="Choose the plan that best fits your current stage and future ambitions."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'relative p-8 md:p-10 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col',
                plan.popular 
                  ? 'border-brand-primary/30 bg-brand-primary/[0.02] shadow-premium' 
                  : 'border-border/50 bg-surface shadow-sm hover:shadow-premium'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-display font-medium text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-display font-medium text-foreground">{plan.price}</span>
                  <span className="text-muted font-medium text-sm">{plan.period}</span>
                </div>
                <p className="text-muted leading-relaxed text-sm font-normal">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-primary" />
                    </div>
                    <span className="text-sm text-foreground/80 font-normal">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? 'primary' : 'secondary'} 
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    image: 'https://picsum.photos/seed/sarah/100/100',
    content: 'The Inner Circle has completely transformed how I approach my work and my faith. The community is incredibly supportive and intentional.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Tech Entrepreneur',
    image: 'https://picsum.photos/seed/david/100/100',
    content: 'Finally, a space that values both professional excellence and spiritual grounding. The weekly masterminds are a game-changer.',
    rating: 5,
  },
  {
    name: 'Michelle Williams',
    role: 'Non-Profit Leader',
    image: 'https://picsum.photos/seed/michelle/100/100',
    content: 'The mentorship I received here helped me scale my impact while staying true to my core values. I am forever grateful.',
    rating: 5,
  },
];

export const TestimonialSection = () => {
  return (
    <section className="section-spacing px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Circlers Say"
          description="Real stories from real leaders who have found their place in The Inner Circle."
        />

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[85vw] md:min-w-0 snap-center"
            >
              <Card className="h-full flex flex-col gap-6 md:gap-8 relative p-8 md:p-10 border-border/50 shadow-sm hover:shadow-premium transition-shadow duration-500">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-brand-primary/5" />
                
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                  ))}
                </div>
                
                <p className="text-base text-foreground/90 italic leading-relaxed font-normal">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-10 h-10 rounded-full object-cover border border-border/50"
                    referrerPolicy="no-referrer"
                  />
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
