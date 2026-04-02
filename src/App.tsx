import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { ThemeProvider } from './lib/ThemeContext';
import { SiteDataProvider, useCommunityBySlug, useSiteData } from './lib/site-data';
import { useSeo } from './lib/seo';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from './lib/supabase-browser';

type View =
  | 'landing'
  | 'admin'
  | 'admin-login'
  | 'about'
  | 'communities'
  | 'departments'
  | 'testimonials'
  | 'join'
  | 'leadership'
  | 'faq'
  | 'better-man'
  | 'innovation-lab'
  | 'budding-ceos'
  | 'health-wellness'
  | 'content'
  | 'privacy'
  | 'terms'
  | 'cookie';

const seoMap: Record<View, { title: string; description: string; path: string; keywords: string[]; noindex?: boolean }> = {
  landing: {
    title: 'Faith-Centered Community for Intentional Leaders',
    description: 'The Inner Circle helps intentional leaders grow in discipline, spiritual depth, creativity, and excellence through communities, masterminds, and mentorship.',
    path: '/',
    keywords: ['faith-centered community', 'intentional leaders', 'leadership growth', 'masterminds', 'personal development'],
  },
  'admin-login': {
    title: 'Admin Login',
    description: 'Secure administrator login for The Inner Circle.',
    path: '/admin-login',
    keywords: ['admin login'],
    noindex: true,
  },
  about: {
    title: 'About The Inner Circle',
    description: 'Learn about The Inner Circle, our mission, values, and the leadership behind our faith-centered growth ecosystem.',
    path: '/about',
    keywords: ['about the inner circle', 'mission', 'values', 'faith-centered leadership'],
  },
  communities: {
    title: 'Communities',
    description: 'Explore The Inner Circle communities for discipline, innovation, entrepreneurship, wellness, and purposeful growth.',
    path: '/communities',
    keywords: ['communities', 'innovation lab', 'better man', 'budding CEOs', 'growth communities'],
  },
  departments: {
    title: 'Departments',
    description: 'See how The Inner Circle departments support wellness, content, design, and structured excellence across the ecosystem.',
    path: '/departments',
    keywords: ['departments', 'wellness', 'content team', 'design team', 'community support'],
  },
  testimonials: {
    title: 'Testimonials',
    description: 'Read real transformation stories and testimonials from members of The Inner Circle ecosystem.',
    path: '/testimonials',
    keywords: ['testimonials', 'member stories', 'community impact', 'leadership transformation'],
  },
  join: {
    title: 'Join The Inner Circle',
    description: 'Apply to join The Inner Circle and start your onboarding into a disciplined, faith-centered growth ecosystem.',
    path: '/join',
    keywords: ['join the inner circle', 'membership application', 'community onboarding'],
  },
  leadership: {
    title: 'Leadership Team',
    description: 'Meet the leadership team guiding The Inner Circle community, culture, and vision.',
    path: '/leadership',
    keywords: ['leadership team', 'founder', 'community leadership'],
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Find answers about membership, onboarding, communities, and how The Inner Circle works.',
    path: '/faq',
    keywords: ['FAQ', 'membership questions', 'community questions', 'onboarding FAQ'],
  },
  'better-man': {
    title: 'Better Man Community',
    description: 'Discover the Better Man community for men pursuing discipline, character, and intentional leadership.',
    path: '/communities/better-man',
    keywords: ['better man', 'mens community', 'discipline', 'character building'],
  },
  'innovation-lab': {
    title: 'Innovation Lab Community',
    description: 'Explore the Innovation Lab community for creatives, builders, and problem-solvers shaping the future with purpose.',
    path: '/communities/innovation-lab',
    keywords: ['innovation lab', 'creative community', 'builders', 'tech and creativity'],
  },
  'budding-ceos': {
    title: 'Budding CEOs Community',
    description: 'Join the Budding CEOs community for founders and entrepreneurs building with strategy, structure, and purpose.',
    path: '/communities/budding-ceos',
    keywords: ['budding CEOs', 'entrepreneur community', 'founders', 'business leadership'],
  },
  'health-wellness': {
    title: 'Health and Wellness',
    description: 'Learn how The Inner Circle supports health, wellness, and holistic growth across the ecosystem.',
    path: '/departments/health-wellness',
    keywords: ['health and wellness', 'wellness department', 'holistic growth'],
  },
  content: {
    title: 'Content Department',
    description: 'See how The Inner Circle content department shapes stories, resources, and communication across the ecosystem.',
    path: '/departments/content',
    keywords: ['content department', 'community content', 'storytelling'],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Read the privacy policy for The Inner Circle.',
    path: '/privacy',
    keywords: ['privacy policy'],
  },
  terms: {
    title: 'Terms and Conditions',
    description: 'Review the terms and conditions for using The Inner Circle.',
    path: '/terms',
    keywords: ['terms and conditions'],
  },
  cookie: {
    title: 'Cookie Policy',
    description: 'Review the cookie policy for The Inner Circle.',
    path: '/cookie-policy',
    keywords: ['cookie policy'],
  },
  admin: {
    title: 'Admin Dashboard',
    description: 'Internal administration area for The Inner Circle.',
    path: '/admin',
    keywords: ['admin'],
    noindex: true,
  },
};

const pathToView = (pathname: string): View => {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  switch (normalized) {
    case '/':
      return 'landing';
    case '/admin':
      return 'admin';
    case '/admin-login':
      return 'admin-login';
    case '/about':
      return 'about';
    case '/communities':
      return 'communities';
    case '/departments':
      return 'departments';
    case '/testimonials':
      return 'testimonials';
    case '/join':
      return 'join';
    case '/leadership':
      return 'leadership';
    case '/faq':
      return 'faq';
    case '/communities/better-man':
      return 'better-man';
    case '/communities/innovation-lab':
      return 'innovation-lab';
    case '/communities/budding-ceos':
      return 'budding-ceos';
    case '/departments/health-wellness':
      return 'health-wellness';
    case '/departments/content':
      return 'content';
    case '/privacy':
      return 'privacy';
    case '/terms':
      return 'terms';
    case '/cookie-policy':
      return 'cookie';
    default:
      return 'landing';
  }
};

const viewToPath = (view: View) => seoMap[view]?.path || '/';

const SeoManager = ({ view }: { view: View }) => {
  const { data } = useSiteData();
  const community = useCommunityBySlug(view);
  const seo = seoMap[view] || seoMap.landing;

  const structuredData = useMemo(() => {
    const base = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Inner Circle',
        url: window.location.origin,
        logo: `${window.location.origin}/logo1.jpeg`,
        sameAs: [],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Inner Circle',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];

    if (view === 'faq') {
      return [
        ...base,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (data.content.faq_categories || []).flatMap((category: any) =>
            (category.items || []).map((item: any) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          ),
        },
      ];
    }

    if (community) {
      return [
        ...base,
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: community.name,
          description: community.description,
          provider: {
            '@type': 'Organization',
            name: 'The Inner Circle',
          },
          areaServed: 'Global',
        },
      ];
    }

    return base;
  }, [community, data.content.faq_categories, view]);

  useSeo({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    keywords: seo.keywords,
    noindex: seo.noindex,
    structuredData,
  });

  return null;
};

function AppContent() {
  const [view, setViewState] = useState<View>(() => pathToView(window.location.pathname));
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState<'idle' | 'authenticated' | 'forbidden'>('idle');
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const setView = useCallback((nextView: View, options?: { replace?: boolean }) => {
    setViewState(nextView);
    const nextPath = viewToPath(nextView);
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (currentPath !== nextPath) {
      if (options?.replace) {
        window.history.replaceState({}, '', nextPath);
      } else {
        window.history.pushState({}, '', nextPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const syncAdminState = useCallback(async (): Promise<'idle' | 'authenticated' | 'forbidden'> => {
    if (!hasSupabaseBrowserConfig()) {
      setAuthStatus('idle');
      setAdminEmail(null);
      setIsAuthLoading(false);
      return 'idle';
    }

    const supabase = getSupabaseBrowserClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setAuthStatus('idle');
      setAdminEmail(null);
      setIsAuthLoading(false);
      return 'idle';
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email')
      .eq('id', session.user.id)
      .maybeSingle();

    const profileRecord = (profile as { role?: string | null; email?: string | null } | null) ?? null;
    setAdminEmail(session.user.email || profileRecord?.email || null);
    const nextStatus = profileRecord?.role === 'admin' ? 'authenticated' : 'forbidden';
    setAuthStatus(nextStatus);
    setIsAuthLoading(false);
    return nextStatus;
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setViewState(pathToView(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    void syncAdminState();

    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncAdminState();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncAdminState]);

  const handleAdminLogin = useCallback(async (email: string, password: string) => {
    if (!hasSupabaseBrowserConfig()) {
      return { success: false, error: 'Supabase browser credentials are missing from the app environment.' };
    }

    setIsAuthLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setIsAuthLoading(false);
      return { success: false, error: error.message };
    }

    const nextStatus = await syncAdminState();

    if (nextStatus === 'forbidden') {
      return { success: false, error: 'This account does not have admin access.' };
    }

    setView('admin', { replace: true });
    return { success: true };
  }, [authStatus, setView, syncAdminState]);

  const handleAdminLogout = useCallback(async () => {
    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setAuthStatus('idle');
    setAdminEmail(null);
    setView('admin-login', { replace: true });
  }, [setView]);

  useEffect(() => {
    if (!isAuthLoading && view === 'admin' && authStatus !== 'authenticated') {
      setView('admin-login', { replace: true });
    }
  }, [authStatus, isAuthLoading, setView, view]);

  const adminGate = isAuthLoading ? (
    <section className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-brand-primary font-medium mb-3">Admin Access</p>
        <h1 className="text-3xl font-display font-medium text-foreground mb-3">Checking your session</h1>
        <p className="text-muted">Please wait while we verify your administrator access.</p>
      </div>
    </section>
  ) : authStatus === 'authenticated' ? (
    <div className="relative">
      <AdminDashboard />
    </div>
  ) : (
    <Layout onViewChange={setView} currentView={view}>
      <AdminLoginPage
        onSubmit={handleAdminLogin}
        isLoading={isAuthLoading}
        authStatus={authStatus}
        userEmail={adminEmail}
        onLogout={handleAdminLogout}
      />
    </Layout>
  );

  return (
    <>
      <SeoManager view={view} />
      {view === 'admin' ? (
        adminGate
      ) : view === 'admin-login' ? (
        <Layout onViewChange={setView} currentView={view}>
          <AdminLoginPage
            onSubmit={handleAdminLogin}
            isLoading={isAuthLoading}
            authStatus={authStatus}
            userEmail={adminEmail}
            onLogout={handleAdminLogout}
          />
        </Layout>
      ) : (
        <Layout onViewChange={setView} currentView={view}>
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
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SiteDataProvider>
        <AppContent />
      </SiteDataProvider>
    </ThemeProvider>
  );
}
