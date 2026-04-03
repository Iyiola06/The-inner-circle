import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Globe, Heart, Users, Zap } from 'lucide-react';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from './supabase-browser';

export interface CommunityRecord {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  summary?: string | null;
  description?: string | null;
  who_its_for?: string | null;
  price: number;
  price_period?: string | null;
  image_url?: string | null;
  hero_image_url?: string | null;
  whatsapp_message?: string | null;
  features?: string[] | null;
  stats?: Array<{ label: string; value: string; icon?: string }> | null;
  comparison_points?: string[] | null;
  focus_label?: string | null;
  focus_stage?: string | null;
  focus_outcome?: string | null;
  community_size_label?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
}

export interface MemberRecord {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  community_slug: string;
  status?: string | null;
  joined_at?: string | null;
  country?: string | null;
}

export interface JoinRequestRecord {
  id: string;
  community_id?: string | null;
  full_name: string;
  email: string;
  phone: string;
  status?: string | null;
  notes?: string | null;
  created_at?: string | null;
}

export interface TestimonialRecord {
  id: string;
  name: string;
  role?: string | null;
  category?: string | null;
  content: string;
  avatar_url?: string | null;
  image_url?: string | null;
  rating?: number | null;
  is_featured?: boolean | null;
  featured_quote?: string | null;
  featured_transformation?: string | null;
  media_thumbnail_url?: string | null;
  media_title?: string | null;
  community_slug?: string | null;
  status?: string | null;
  sort_order?: number | null;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  status?: string | null;
  author?: string | null;
  target?: string | null;
  views?: number | null;
  published_at?: string | null;
}

export interface SiteData {
  communities: CommunityRecord[];
  members: MemberRecord[];
  join_requests: JoinRequestRecord[];
  testimonials: TestimonialRecord[];
  announcements: AnnouncementRecord[];
  content: Record<string, any>;
}

interface SiteDataContextValue {
  data: SiteData;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getContent: <T>(key: string, fallback: T) => T;
  formatCurrency: (amount?: number | null, compact?: boolean) => string;
  getWhatsappUrl: (message?: string) => string;
}

const emptyData: SiteData = {
  communities: [],
  members: [],
  join_requests: [],
  testimonials: [],
  announcements: [],
  content: {},
};

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export const useSafeArray = <T,>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

const formatCount = (value: number) => value.toLocaleString();

const fetchSiteData = async (): Promise<SiteData> => {
  if (!hasSupabaseBrowserConfig()) {
    return emptyData;
  }

  const supabase = getSupabaseBrowserClient();

  const [communitiesResult, membersResult, joinRequestsResult, testimonialsResult, announcementsResult, contentResult] =
    await Promise.all([
      supabase.from('communities').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('members').select('*').order('joined_at', { ascending: false }),
      supabase.from('join_requests').select('*').order('created_at', { ascending: false }),
      supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
      supabase.from('announcements').select('*').order('published_at', { ascending: false }).limit(10),
      supabase.from('site_content').select('key, value'),
    ]);

  const errors = [
    communitiesResult.error,
    membersResult.error,
    joinRequestsResult.error,
    testimonialsResult.error,
    announcementsResult.error,
    contentResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(errors[0]?.message || 'Failed to load site data.');
  }

  const content = Object.fromEntries(
    (contentResult.data || []).map((entry) => [entry.key, entry.value]),
  );

  return {
    communities: (communitiesResult.data || []) as CommunityRecord[],
    members: (membersResult.data || []) as MemberRecord[],
    join_requests: (joinRequestsResult.data || []) as JoinRequestRecord[],
    testimonials: (testimonialsResult.data || []) as TestimonialRecord[],
    announcements: (announcementsResult.data || []) as AnnouncementRecord[],
    content,
  };
};

export const SiteDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<SiteData>(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const nextData = await fetchSiteData();
      setData(nextData);
      setError(null);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Failed to load live data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo<SiteDataContextValue>(() => {
    const getContent = <T,>(key: string, fallback: T): T => {
      return (data.content[key] as T | undefined) ?? fallback;
    };

    const formatCurrency = (amount?: number | null, compact = false) => {
      if (amount == null || Number.isNaN(amount)) {
        return 'N/A';
      }

      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        notation: compact ? 'compact' : 'standard',
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const getWhatsappUrl = (
      message = 'Hello, I want to become a Circler. Please share the available communities and payment steps.',
    ) => {
      const appSettings = getContent<{ whatsappNumber?: string }>('app_settings', {});
      const whatsappNumber = (appSettings.whatsappNumber || '').replace(/\D/g, '');
      if (!whatsappNumber) {
        return '#';
      }
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    return {
      data,
      isLoading,
      error,
      refresh,
      getContent,
      formatCurrency,
      getWhatsappUrl,
    };
  }, [data, error, isLoading]);

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider.');
  }
  return context;
};

export const useCommunityBySlug = (slug: string) => {
  const { data } = useSiteData();
  return useMemo(
    () => data.communities.find((community) => community.slug === slug) || null,
    [data.communities, slug],
  );
};

export const useHomepageStats = () => {
  const { data, getContent } = useSiteData();

  return useMemo(() => {
    const metrics = getContent<Record<string, string | number>>('homepage_metrics', {});
    const activeMembers = data.members.filter((member) => member.status?.toLowerCase() === 'active').length;
    const countries = new Set(
      data.members
        .map((member) => member.country?.trim())
        .filter((country): country is string => Boolean(country)),
    ).size;
    const weeklyMasterminds = Number(metrics.weeklyMasterminds || 0);
    const satisfaction = Number(metrics.satisfaction || 0);
    const circlersDisplay = typeof metrics.circlersDisplay === 'string' ? metrics.circlersDisplay : formatCount(activeMembers);
    const countriesDisplay = typeof metrics.countriesDisplay === 'string' ? metrics.countriesDisplay : formatCount(countries);

    return [
      { label: 'Circlers', value: circlersDisplay, icon: Users },
      { label: 'Countries', value: countriesDisplay, icon: Globe },
      { label: 'Weekly Masterminds', value: weeklyMasterminds ? `${weeklyMasterminds}` : 'N/A', icon: Zap },
      { label: 'Satisfaction', value: satisfaction ? `${satisfaction}%` : 'N/A', icon: Heart },
    ];
  }, [data.members, getContent]);
};

export const useTestimonialStats = () => {
  const { data, getContent } = useSiteData();

  return useMemo(() => {
    const metrics = getContent<Record<string, string | number>>('homepage_metrics', {});
    const activeMembers = data.members.filter((member) => member.status?.toLowerCase() === 'active').length;
    const countries = new Set(
      data.members
        .map((member) => member.country?.trim())
        .filter((country): country is string => Boolean(country)),
    ).size;
    const growthRate = Number(metrics.growthRate || 0);
    const satisfaction = Number(metrics.satisfaction || 0);
    const circlersDisplay = typeof metrics.circlersDisplay === 'string' ? metrics.circlersDisplay : formatCount(activeMembers);
    const countriesDisplay = typeof metrics.countriesDisplay === 'string' ? metrics.countriesDisplay : formatCount(countries);

    return [
      { label: 'Circlers', value: circlersDisplay, icon: Users },
      { label: 'Countries', value: countriesDisplay, icon: Globe },
      { label: 'Growth Rate', value: growthRate ? `${growthRate}%` : 'N/A', icon: Zap },
      { label: 'Satisfaction', value: satisfaction ? `${satisfaction}%` : 'N/A', icon: Heart },
    ];
  }, [data.members, getContent]);
};

export const useCommunityMemberCount = (slug: string) => {
  const { data } = useSiteData();
  return useMemo(
    () =>
      data.members.filter(
        (member) =>
          member.community_slug === slug && member.status?.toLowerCase() !== 'suspended',
      ).length,
    [data.members, slug],
  );
};
