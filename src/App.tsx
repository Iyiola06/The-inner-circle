import React, { useMemo, useState } from 'react';
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
import { SiteDataProvider, useCommunityBySlug, useSiteData } from './lib/site-data';
import { useSeo } from './lib/seo';

type View =
  | 'landing'
  | 'admin'
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
  const [view, setView] = useState<View>('landing');

  return (
    <>
      <SeoManager view={view} />
      {view === 'admin' ? (
        <div className="relative">
          <AdminDashboard />
        </div>
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
