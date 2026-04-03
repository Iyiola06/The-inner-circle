import React from 'react';
import { SectionHeading } from './Card';
import { Button } from './Button';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Contact Us"
          title="Get in Touch"
          description="Have questions or want to learn more about our community? We're here to help."
        />

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-display font-bold text-foreground">Let's connect.</h3>
              <p className="text-muted text-lg leading-relaxed">
                Whether you're a potential member, a partner, or just curious, we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'hello@theinnercirclecommunity.org' },
                { icon: Phone, label: 'Phone', value: '+234 701 694 1726' },
                { icon: MapPin, label: 'Location', value: 'Global Community, Based in London' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xl font-display font-bold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl border border-border bg-surface shadow-xl shadow-brand-primary/5 space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-muted uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-xl border border-border bg-muted/5 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-muted uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-xl border border-border bg-muted/5 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-muted uppercase tracking-widest">Subject</label>
              <select className="w-full px-6 py-4 rounded-xl border border-border bg-muted/5 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none">
                <option>Membership Inquiry</option>
                <option>Partnership Proposal</option>
                <option>General Question</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-muted uppercase tracking-widest">Message</label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full px-6 py-4 rounded-xl border border-border bg-muted/5 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none"
              />
            </div>
            <Button variant="primary" size="lg" className="w-full gap-2">
              Send Message <Send className="w-5 h-5" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
