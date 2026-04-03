import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnnouncementBanner } from './AnnouncementBanner';

interface LayoutProps {
  children: React.ReactNode;
  onViewChange?: (view: any) => void;
  currentView?: any;
}

export const Layout = ({ children, onViewChange, currentView }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-brand-primary focus:text-white"
      >
        Skip to content
      </a>
      <AnnouncementBanner />
      <Navbar onViewChange={onViewChange} currentView={currentView} />
      <main id="main-content">{children}</main>
      <Footer onViewChange={onViewChange} />
    </div>
  );
};
