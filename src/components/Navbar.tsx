import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../lib/constants';

interface NavbarProps {
  onViewChange?: (view: any) => void;
  currentView?: any;
}

export const Navbar = ({ onViewChange, currentView }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview', view: 'landing' },
    { name: 'About', href: '#about', view: 'about' },
    { name: 'Communities', href: '#communities', view: 'communities' },
    { name: 'Departments', href: '#departments', view: 'departments' },
    { name: 'Testimonials', href: '#testimonials', view: 'testimonials' },
    { name: 'Join', href: '#join', view: 'join' },
    { name: 'Leadership', href: '#leadership', view: 'leadership' },
    { name: 'FAQ', href: '#faq', view: 'faq' },
  ];

  const handleNavClick = (view: string, href: string) => {
    if (onViewChange) {
      onViewChange(view);
    }
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#') && currentView === view) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-4',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 rounded-full transition-all duration-500",
        isScrolled ? "glass shadow-2xl border-white/10" : "bg-transparent"
      )}>
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('landing', '#')}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 bg-foreground rounded-lg flex items-center justify-center text-background font-medium text-lg transition-transform group-hover:scale-105">
            IC
          </div>
          <span className="font-display font-medium text-lg tracking-tight text-foreground hidden sm:block">
            The Inner Circle
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.view, link.href)}
              className={cn(
                "text-sm font-medium transition-colors relative group/link",
                currentView === link.view ? "text-foreground" : "text-foreground/60 hover:text-foreground"
              )}
            >
              {link.name}
              {currentView === link.view && (
                <motion.span 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-foreground rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2 border-none bg-transparent hover:bg-muted/10"
              onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button variant="primary" size="sm" className="shadow-brand-primary/10">
              Join Now
            </Button>
          </div>
          <button
            className="lg:hidden p-2 text-foreground hover:bg-muted/10 rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] lg:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-surface z-[70] lg:hidden flex flex-col shadow-2xl border-l border-border/50"
            >
              <div className="p-6 flex items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-foreground rounded-lg flex items-center justify-center text-background font-medium text-lg">
                    IC
                  </div>
                  <span className="font-display font-medium text-lg text-foreground tracking-tight">The Inner Circle</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted/10 rounded-full transition-all"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.view, link.href)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all",
                      currentView === link.view 
                        ? "bg-muted/10 text-foreground" 
                        : "text-foreground/60 hover:bg-muted/5 hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>

              <div className="p-6 border-t border-border/50 space-y-4 bg-muted/5">
                <div className="flex items-center justify-between mb-2 px-2">
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">Appearance</span>
                  <ThemeToggle />
                </div>
                <Button variant="primary" className="w-full justify-center">
                  Become a Circler
                </Button>
                <Button 
                  variant="whatsapp" 
                  className="w-full gap-2 justify-center"
                  onClick={() => { window.open(getWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL), '_blank'); }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Join via WhatsApp
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
