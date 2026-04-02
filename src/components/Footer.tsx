import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';

interface FooterProps {
  onViewChange?: (view: any) => void;
}

export const Footer = ({ onViewChange }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const handleViewChange = (e: React.MouseEvent, view: string) => {
    if (onViewChange) {
      e.preventDefault();
      onViewChange(view);
    }
  };

  return (
    <footer className="bg-surface border-t border-border/50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src="/logo1.jpeg" alt="The Inner Circle Logo" className="w-10 h-10 object-cover rounded-xl dark:hidden shadow-sm" />
            <img src="/logo2.jpeg" alt="The Inner Circle Logo" className="w-10 h-10 object-cover rounded-xl hidden dark:block shadow-sm" />
            <span className="font-display font-medium text-xl tracking-tight text-foreground">
              The Inner Circle
            </span>
          </div>
          <p className="text-muted leading-relaxed text-sm font-normal">
            Inner Circle is a purpose-driven, faith-centered community and movement of intentional individuals committed to growth, discipline, and impact.
          </p>
          <div className="flex items-center gap-3">
            {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-xs mb-6 uppercase tracking-widest text-muted">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { label: 'Overview', view: 'landing' },
              { label: 'Communities', view: 'communities' },
              { label: 'Leadership', view: 'leadership' },
              { label: 'Departments', view: 'departments' },
              { label: 'FAQ', view: 'faq' }
            ].map((link) => (
              <li key={link.label}>
                <a 
                  href={`#${link.view}`} 
                  onClick={(e) => handleViewChange(e, link.view)}
                  className="text-muted hover:text-brand-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-xs mb-6 uppercase tracking-widest text-muted">Communities</h4>
          <ul className="space-y-4">
            {[
              { label: 'Better Man', view: 'better-man' },
              { label: 'Innovation Lab', view: 'innovation-lab' },
              { label: 'Budding CEOs', view: 'budding-ceos' },
              { label: 'Health & Wellness', view: 'health-wellness' },
              { label: 'Content', view: 'content' }
            ].map((link) => (
              <li key={link.label}>
                <a 
                  href="#" 
                  onClick={(e) => handleViewChange(e, link.view)}
                  className="text-muted hover:text-brand-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-medium text-xs mb-6 uppercase tracking-widest text-muted">Contact Us</h4>
          <p className="text-muted text-sm leading-relaxed font-normal">Ready to stand out? Join our global community today.</p>
          <div className="space-y-3">
            <Button 
              variant="whatsapp" 
              className="w-full gap-2"
              onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
            >
              <MessageCircle className="w-4 h-4" />
              Join via WhatsApp
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-foreground border border-border/50 hover:bg-muted/5"
              onClick={() => {
                if (onViewChange) onViewChange('communities');
                else document.getElementById('communities')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Communities
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted font-normal">
        <p>© {currentYear} The Inner Circle. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" onClick={(e) => handleViewChange(e, 'privacy')} className="hover:text-brand-primary transition-colors">Privacy Policy</a>
          <a href="#" onClick={(e) => handleViewChange(e, 'terms')} className="hover:text-brand-primary transition-colors">Terms of Service</a>
          <a href="#" onClick={(e) => handleViewChange(e, 'cookie')} className="hover:text-brand-primary transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};
