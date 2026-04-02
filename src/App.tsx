import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { BrandOverview } from './components/BrandOverview';
import { CommunitiesSection } from './components/CommunitiesSection';
import { LeadershipSection } from './components/LeadershipSection';
import { TestimonialSection } from './components/PricingSections';
import { DepartmentsSection } from './components/DepartmentsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { AboutPage } from './components/AboutPage';
import { CommunitiesPage } from './components/CommunitiesPage';
import { DepartmentsPage } from './components/DepartmentsPage';
import { TestimonialsPage } from './components/TestimonialsPage';
import { JoinPage } from './components/JoinPage';
import { LeadershipPage } from './components/LeadershipPage';
import { FAQPage } from './components/FAQPage';
import { CommunityDetailPage } from './components/CommunityDetailPage';
import { LegalPage } from './components/LegalPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ThemeProvider } from './lib/ThemeContext';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<
    'landing' | 'admin' | 'about' | 'communities' | 'departments' | 'testimonials' | 'join' | 
    'leadership' | 'faq' | 'better-man' | 'innovation-lab' | 'budding-ceos' | 'health-wellness' | 'content' |
    'privacy' | 'terms' | 'cookie'
  >('landing');

  if (view === 'admin') {
    return (
      <ThemeProvider>
        <div className="relative">
          <AdminDashboard />
          {/*
          <button 
            onClick={() => setView('landing')}
            className="fixed bottom-8 right-8 px-6 py-3 bg-brand-primary text-white rounded-full font-bold shadow-2xl z-50 hover:bg-brand-deep transition-all"
          >
            Back to Website
          </button>
          */}
        </div>
      </ThemeProvider>
    );
  }

  return (
    <Layout onViewChange={setView} currentView={view}>
      {/* View Switcher for Demo - Commented out per user request
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <div className="flex gap-2 flex-wrap justify-end max-w-md">
          <button 
            onClick={() => setView('landing')}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all",
              view === 'landing' ? "bg-brand-primary text-white" : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
            )}
          >
            Home
          </button>
          <button 
            onClick={() => setView('about')}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all",
              view === 'about' ? "bg-brand-primary text-white" : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
            )}
          >
            About
          </button>
          <button 
            onClick={() => setView('communities')}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all",
              view === 'communities' ? "bg-brand-primary text-white" : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
            )}
          >
            Communities
          </button>
          <button 
            onClick={() => setView('departments')}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all",
              view === 'departments' ? "bg-brand-primary text-white" : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
            )}
          >
            Departments
          </button>
          <button 
            onClick={() => setView('testimonials')}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all",
              view === 'testimonials' ? "bg-brand-primary text-white" : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
            )}
          >
            Testimonials
          </button>
          <button 
            onClick={() => setView('join')}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all",
              view === 'join' ? "bg-brand-primary text-white" : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
            )}
          >
            Join
          </button>
        </div>
        <button 
          onClick={() => setView('admin')}
          className="px-6 py-3 bg-brand-primary text-white rounded-full font-medium text-sm shadow-2xl hover:bg-brand-deep transition-all self-end"
        >
          Admin Portal
        </button>
      </div>
      */}

      {view === 'landing' && (
        <>
          <Hero />
          <StatsSection />
          <BrandOverview />
          <CommunitiesSection />
          <LeadershipSection />
          <TestimonialSection />
          <DepartmentsSection />
          <FAQSection />
          <FinalCTA />
        </>
      )}
      {view === 'about' && <AboutPage />}
      {view === 'communities' && <CommunitiesPage />}
      {view === 'departments' && <DepartmentsPage />}
      {view === 'testimonials' && <TestimonialsPage />}
      {view === 'join' && <JoinPage />}
      {view === 'leadership' && <LeadershipPage onBack={() => setView('landing')} />}
      {view === 'faq' && <FAQPage onBack={() => setView('landing')} />}
      {['better-man', 'innovation-lab', 'budding-ceos', 'health-wellness', 'content'].includes(view) && (
        <CommunityDetailPage communityId={view} onBack={() => setView('landing')} />
      )}
      {['privacy', 'terms', 'cookie'].includes(view) && (
        <LegalPage type={view as any} onBack={() => setView('landing')} />
      )}
    </Layout>
  );
}
