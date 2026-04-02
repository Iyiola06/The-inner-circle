import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ThemeProvider } from '../lib/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  onViewChange?: (view: any) => void;
  currentView?: any;
}

export const Layout = ({ children, onViewChange, currentView }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar onViewChange={onViewChange} currentView={currentView} />
        <main>{children}</main>
        <Footer onViewChange={onViewChange} />
      </div>
    </ThemeProvider>
  );
};
