
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, LoaderCircle, Megaphone, MessageSquare, Plus, Save, Trash2, Users, Zap } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { useSiteData } from '../../lib/site-data';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from '../../lib/supabase-browser';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'homepage', label: 'Homepage' },
  { id: 'members', label: 'Members' },
  { id: 'communities', label: 'Communities' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'testimonials', label: 'Testimonials' },
] as const;

type TabId = (typeof tabs)[number]['id'];

type SaveState = {
  type: 'success' | 'error';
  message: string;
} | null;

const fieldClassName =
  'w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-brand-primary';

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [announcementDrafts, setAnnouncementDrafts] = useState<Record<string, any>>({});
  const [testimonialDrafts, setTestimonialDrafts] = useState<Record<string, any>>({});
  const [communityDrafts, setCommunityDrafts] = useState<Record<string, any>>({});
  const [heroContentDraft, setHeroContentDraft] = useState<Record<string, any>>({});
  const [homepageMetricsDraft, setHomepageMetricsDraft] = useState<Record<string, any>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>(null);
  const { data, formatCurrency, refresh, isLoading } = useSiteData();

  useEffect(() => {
    setAnnouncementDrafts(
      Object.fromEntries(
        data.announcements.map((announcement) => [
          announcement.id,
          {
            title: announcement.title || '',
            author: announcement.author || 'Admin',
            target: announcement.target || 'All Communities',
            status: announcement.status || 'draft',
            published_at: announcement.published_at ? new Date(announcement.published_at).toISOString().slice(0, 16) : '',
          },
        ]),
      ),
    );

    setTestimonialDrafts(
      Object.fromEntries(
        data.testimonials.map((testimonial) => [
          testimonial.id,
          {
            name: testimonial.name || '',
            role: testimonial.role || '',
            category: testimonial.category || '',
            content: testimonial.content || '',
            rating: testimonial.rating || 5,
            is_featured: Boolean(testimonial.is_featured),
            community_slug: testimonial.community_slug || '',
          },
        ]),
      ),
    );

    setCommunityDrafts(
      Object.fromEntries(
        data.communities.map((community) => [
          community.id,
          {
            name: community.name || '',
            slug: community.slug || '',
            tagline: community.tagline || '',
            summary: community.summary || '',
            description: community.description || '',
            who_its_for: community.who_its_for || '',
            price: community.price || 0,
            price_period: community.price_period || 'one-off',
          },
        ]),
      ),
    );

    const heroContent = (data.content.hero as Record<string, any> | undefined) || {};
    setHeroContentDraft({
      title: heroContent.title || "Circlers don't",
      highlight: heroContent.highlight || 'blend in,',
      subtitleLine: heroContent.subtitleLine || 'they stand out',
      description: heroContent.description || 'We are a purpose-driven individuals committed to personal growth, spiritual development and intentional living.',
      primaryCta: heroContent.primaryCta || 'Become a Circler',
      secondaryCta: heroContent.secondaryCta || 'Explore Communities',
      statOne: Array.isArray(heroContent.stats) ? heroContent.stats[0] || '30+ Circlers' : '30+ Circlers',
      statTwo: Array.isArray(heroContent.stats) ? heroContent.stats[1] || '2 countries' : '2 countries',
    });

    const homepageMetrics = (data.content.homepage_metrics as Record<string, any> | undefined) || {};
    setHomepageMetricsDraft({
      circlersDisplay: homepageMetrics.circlersDisplay || '30+',
      countriesDisplay: homepageMetrics.countriesDisplay || '2',
      weeklyMasterminds: homepageMetrics.weeklyMasterminds || 3,
      satisfaction: homepageMetrics.satisfaction || 98,
      growthRate: homepageMetrics.growthRate || 100,
    });
  }, [data.announcements, data.communities, data.content.hero, data.content.homepage_metrics, data.testimonials]);

  const activeMembers = useMemo(
    () => data.members.filter((member) => member.status?.toLowerCase() === 'active'),
    [data.members],
  );

  const overviewStats = [
    { label: 'Total Members', value: activeMembers.length.toLocaleString(), icon: Users },
    { label: 'Active Communities', value: data.communities.length.toString(), icon: Zap },
    { label: 'Testimonials', value: data.testimonials.length.toString(), icon: MessageSquare },
    { label: 'Broadcasts', value: data.announcements.length.toString(), icon: Megaphone },
  ];

  const membersByCommunity = data.communities.map((community) => ({
    community: community.name,
    members: data.members.filter((member) => member.community_slug === community.slug).length,
  }));

  const persistRecord = async (
    table: 'announcements' | 'testimonials' | 'communities',
    id: string,
    values: Record<string, any>,
    successMessage: string,
  ) => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey(`${table}:${id}`);
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from(table) as any).update(values).eq('id', id));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: successMessage });
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to save changes.' });
    } finally {
      setSavingKey(null);
    }
  };

  const deleteRecord = async (
    table: 'announcements' | 'testimonials' | 'communities' | 'members',
    id: string,
    successMessage: string,
  ) => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    if (!window.confirm('Delete this record? This action cannot be undone.')) return;

    setSavingKey(`${table}:delete:${id}`);
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from(table) as any).delete().eq('id', id));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: successMessage });
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete record.' });
    } finally {
      setSavingKey(null);
    }
  };
  const createAnnouncement = async () => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey('announcements:new');
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from('announcements') as any).insert({
        title: 'New announcement',
        author: 'Admin',
        target: 'All Communities',
        status: 'draft',
      }));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: 'Announcement created.' });
      setActiveTab('announcements');
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to create announcement.' });
    } finally {
      setSavingKey(null);
    }
  };

  const createCommunity = async () => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey('communities:new');
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const seed = Date.now().toString().slice(-6);
      const { error } = await ((supabase.from('communities') as any).insert({
        slug: `new-community-${seed}`,
        name: 'New Community',
        tagline: 'Add a short positioning line',
        summary: 'Add a short summary',
        description: 'Add the full community description here.',
        who_its_for: 'Describe who this community is for.',
        price: 0,
        price_period: 'one-off',
        sort_order: data.communities.length + 1,
        is_active: true,
      }));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: 'Community created.' });
      setActiveTab('communities');
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to create community.' });
    } finally {
      setSavingKey(null);
    }
  };

  const createTestimonial = async () => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey('testimonials:new');
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from('testimonials') as any).insert({
        name: 'New Testimonial',
        role: 'Member',
        category: 'Growth',
        content: 'Add the testimonial content here.',
        rating: 5,
        is_featured: false,
        is_published: true,
        sort_order: data.testimonials.length + 1,
      }));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: 'Testimonial created.' });
      setActiveTab('testimonials');
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to create testimonial.' });
    } finally {
      setSavingKey(null);
    }
  };

  const createMember = async () => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey('members:new');
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const defaultCommunity = data.communities[0];
      const seed = Date.now().toString().slice(-6);
      const { error } = await ((supabase.from('members') as any).insert({
        full_name: 'New Member',
        email: `new-member-${seed}@example.com`,
        community_slug: defaultCommunity?.slug || 'better-man',
        community_id: defaultCommunity?.id || null,
        status: 'active',
      }));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: 'Member created.' });
      setActiveTab('members');
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to create member.' });
    } finally {
      setSavingKey(null);
    }
  };

  const saveSiteContent = async (key: string, value: Record<string, any>, successMessage: string) => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey(`site_content:${key}`);
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from('site_content') as any).upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: 'key' },
      ));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: successMessage });
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to save homepage content.' });
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-3">Admin Portal</p>
            <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-3">Live Ecosystem Dashboard</h1>
            <p className="text-muted text-lg">You can now create, edit, and delete community content and records here.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? 'px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm font-medium' : 'px-5 py-2.5 rounded-full border border-border/60 bg-surface text-foreground text-sm font-medium'}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-border/50 bg-surface p-5">
          <div>
            <p className="text-sm font-medium text-foreground">Admin changes are saved securely.</p>
            <p className="text-xs uppercase tracking-widest text-muted mt-2">Homepage, members, communities, announcements and testimonials are editable here</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {saveState && (
              <p className={saveState.type === 'success' ? 'text-sm text-emerald-600 dark:text-emerald-400' : 'text-sm text-red-600 dark:text-red-400'}>
                {saveState.message}
              </p>
            )}
            {activeTab === 'members' && (
              <Button variant="primary" className="gap-2" onClick={() => void createMember()} disabled={savingKey === 'members:new'}>
                {savingKey === 'members:new' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                New Member
              </Button>
            )}
            {activeTab === 'communities' && (
              <Button variant="primary" className="gap-2" onClick={() => void createCommunity()} disabled={savingKey === 'communities:new'}>
                {savingKey === 'communities:new' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                New Community
              </Button>
            )}
            {activeTab === 'announcements' && (
              <Button variant="primary" className="gap-2" onClick={() => void createAnnouncement()} disabled={savingKey === 'announcements:new'}>
                {savingKey === 'announcements:new' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                New Announcement
              </Button>
            )}
            {activeTab === 'testimonials' && (
              <Button variant="primary" className="gap-2" onClick={() => void createTestimonial()} disabled={savingKey === 'testimonials:new'}>
                {savingKey === 'testimonials:new' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                New Testimonial
              </Button>
            )}
          </div>
        </div>
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <Card className="p-8 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted font-medium mb-2">{stat.label}</p>
                    <p className="text-4xl font-display font-medium text-foreground">{stat.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-brand-primary" />
                  <h2 className="text-2xl font-display font-medium text-foreground">Community Distribution</h2>
                </div>
                <div className="space-y-4">
                  {membersByCommunity.map((item) => (
                    <div key={item.community} className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-surface">
                      <span className="font-medium text-foreground">{item.community}</span>
                      <span className="text-sm text-muted">{item.members} members</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-display font-medium text-foreground mb-6">Recent Broadcasts</h2>
                <div className="space-y-4">
                  {data.announcements.slice(0, 5).map((announcement) => (
                    <div key={announcement.id} className="p-4 rounded-2xl border border-border/50 bg-surface">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-foreground">{announcement.title}</p>
                          <p className="text-xs uppercase tracking-widest text-muted mt-2">{announcement.status || 'Draft'} | {announcement.target || 'All Communities'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{(announcement.views || 0).toLocaleString()} views</p>
                          <p className="text-xs text-muted">{announcement.published_at ? new Date(announcement.published_at).toLocaleDateString() : 'Unscheduled'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'homepage' && (
          <div className="grid xl:grid-cols-2 gap-6">
            <Card className="p-8">
              <h2 className="text-2xl font-display font-medium text-foreground mb-6">Hero Content</h2>
              <div className="grid gap-4">
                <input className={fieldClassName} value={heroContentDraft.title || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Hero title line 1" />
                <input className={fieldClassName} value={heroContentDraft.highlight || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, highlight: event.target.value }))} placeholder="Hero highlight" />
                <input className={fieldClassName} value={heroContentDraft.subtitleLine || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, subtitleLine: event.target.value }))} placeholder="Hero title line 3" />
                <textarea className={`${fieldClassName} min-h-28`} value={heroContentDraft.description || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, description: event.target.value }))} placeholder="Hero description" />
                <input className={fieldClassName} value={heroContentDraft.primaryCta || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, primaryCta: event.target.value }))} placeholder="Primary CTA" />
                <input className={fieldClassName} value={heroContentDraft.secondaryCta || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, secondaryCta: event.target.value }))} placeholder="Secondary CTA" />
                <input className={fieldClassName} value={heroContentDraft.statOne || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, statOne: event.target.value }))} placeholder="Hero stat 1" />
                <input className={fieldClassName} value={heroContentDraft.statTwo || ''} onChange={(event) => setHeroContentDraft((current) => ({ ...current, statTwo: event.target.value }))} placeholder="Hero stat 2" />
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  className="gap-2"
                  disabled={savingKey === 'site_content:hero'}
                  onClick={() =>
                    void saveSiteContent(
                      'hero',
                      {
                        title: heroContentDraft.title,
                        highlight: heroContentDraft.highlight,
                        subtitleLine: heroContentDraft.subtitleLine,
                        description: heroContentDraft.description,
                        primaryCta: heroContentDraft.primaryCta,
                        secondaryCta: heroContentDraft.secondaryCta,
                        stats: [heroContentDraft.statOne, heroContentDraft.statTwo].filter(Boolean),
                      },
                      'Hero content updated.',
                    )
                  }
                >
                  {savingKey === 'site_content:hero' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Hero
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-display font-medium text-foreground mb-6">Homepage Stats</h2>
              <div className="grid gap-4">
                <input className={fieldClassName} value={homepageMetricsDraft.circlersDisplay || ''} onChange={(event) => setHomepageMetricsDraft((current) => ({ ...current, circlersDisplay: event.target.value }))} placeholder="Circlers display e.g. 30+" />
                <input className={fieldClassName} value={homepageMetricsDraft.countriesDisplay || ''} onChange={(event) => setHomepageMetricsDraft((current) => ({ ...current, countriesDisplay: event.target.value }))} placeholder="Countries display e.g. 2" />
                <input className={fieldClassName} type="number" value={homepageMetricsDraft.weeklyMasterminds ?? 0} onChange={(event) => setHomepageMetricsDraft((current) => ({ ...current, weeklyMasterminds: Number(event.target.value) }))} placeholder="Weekly masterminds" />
                <input className={fieldClassName} type="number" value={homepageMetricsDraft.satisfaction ?? 0} onChange={(event) => setHomepageMetricsDraft((current) => ({ ...current, satisfaction: Number(event.target.value) }))} placeholder="Satisfaction" />
                <input className={fieldClassName} type="number" value={homepageMetricsDraft.growthRate ?? 0} onChange={(event) => setHomepageMetricsDraft((current) => ({ ...current, growthRate: Number(event.target.value) }))} placeholder="Growth rate" />
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  className="gap-2"
                  disabled={savingKey === 'site_content:homepage_metrics'}
                  onClick={() =>
                    void saveSiteContent(
                      'homepage_metrics',
                      {
                        circlersDisplay: homepageMetricsDraft.circlersDisplay,
                        countriesDisplay: homepageMetricsDraft.countriesDisplay,
                        weeklyMasterminds: Number(homepageMetricsDraft.weeklyMasterminds || 0),
                        satisfaction: Number(homepageMetricsDraft.satisfaction || 0),
                        growthRate: Number(homepageMetricsDraft.growthRate || 0),
                      },
                      'Homepage stats updated.',
                    )
                  }
                >
                  {savingKey === 'site_content:homepage_metrics' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Homepage Stats
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'members' && (
          <Card className="p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-display font-medium text-foreground">Members</h2>
              <p className="text-sm text-muted">Members are live from the backend. You can add placeholder members or remove records here.</p>
            </div>
            <div className="space-y-4">
              {data.members.map((member) => (
                <div key={member.id} className="grid md:grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-4 p-4 rounded-2xl border border-border/50 bg-surface items-center">
                  <div>
                    <p className="font-medium text-foreground">{member.full_name}</p>
                    <p className="text-sm text-muted">{member.email}</p>
                  </div>
                  <p className="text-sm text-foreground">{data.communities.find((community) => community.slug === member.community_slug)?.name || member.community_slug}</p>
                  <p className="text-sm text-muted">{member.phone || 'No phone'}</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted uppercase">{member.status || 'active'}</p>
                    <button
                      type="button"
                      className="p-2 rounded-xl border border-border/50 text-muted hover:text-red-600 hover:border-red-500/30 transition-colors"
                      onClick={() => void deleteRecord('members', member.id, 'Member deleted.')}
                      disabled={savingKey === `members:delete:${member.id}`}
                    >
                      {savingKey === `members:delete:${member.id}` ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        {activeTab === 'communities' && (
          <div className="grid gap-6">
            {data.communities.map((community) => {
              const draft = communityDrafts[community.id] || {};
              const currentSavingKey = `communities:${community.id}`;

              return (
                <Card key={community.id} className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-medium text-foreground mb-2">{community.name}</h2>
                      <p className="text-muted">{community.tagline || community.summary}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-foreground">{formatCurrency(community.price)}</p>
                      <p className="text-sm text-muted mt-2">Members: {data.members.filter((member) => member.community_slug === community.slug).length}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input className={fieldClassName} value={draft.name || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], name: event.target.value, slug: toSlug(event.target.value) || current[community.id]?.slug || community.slug } }))} placeholder="Community name" />
                    <input className={fieldClassName} value={draft.slug || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], slug: toSlug(event.target.value) } }))} placeholder="Slug" />
                    <input className={fieldClassName} value={draft.tagline || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], tagline: event.target.value } }))} placeholder="Tagline" />
                    <input className={fieldClassName} value={draft.summary || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], summary: event.target.value } }))} placeholder="Summary" />
                    <input className={fieldClassName} type="number" value={draft.price ?? 0} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], price: Number(event.target.value) } }))} placeholder="Price" />
                    <textarea className={`${fieldClassName} min-h-32 md:col-span-2`} value={draft.description || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], description: event.target.value } }))} placeholder="Description" />
                    <textarea className={`${fieldClassName} min-h-28 md:col-span-2`} value={draft.who_its_for || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], who_its_for: event.target.value } }))} placeholder="Who this is for" />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      variant="secondary"
                      className="gap-2 text-red-600 border-red-500/20 hover:bg-red-500/5"
                      disabled={savingKey === `communities:delete:${community.id}`}
                      onClick={() => void deleteRecord('communities', community.id, 'Community deleted.')}
                    >
                      {savingKey === `communities:delete:${community.id}` ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      className="gap-2"
                      disabled={savingKey === currentSavingKey}
                      onClick={() =>
                        void persistRecord(
                          'communities',
                          community.id,
                          {
                            name: draft.name,
                            slug: draft.slug || community.slug,
                            tagline: draft.tagline,
                            summary: draft.summary,
                            description: draft.description,
                            who_its_for: draft.who_its_for,
                            price: Number(draft.price || 0),
                            price_period: draft.price_period || 'one-off',
                          },
                          `${draft.name || community.name} updated.`,
                        )
                      }
                    >
                      {savingKey === currentSavingKey ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Community
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="grid gap-6">
            {data.announcements.map((announcement) => {
              const draft = announcementDrafts[announcement.id] || {};
              const currentSavingKey = `announcements:${announcement.id}`;

              return (
                <Card key={announcement.id} className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className={fieldClassName} value={draft.title || ''} onChange={(event) => setAnnouncementDrafts((current) => ({ ...current, [announcement.id]: { ...current[announcement.id], title: event.target.value } }))} placeholder="Title" />
                    <input className={fieldClassName} value={draft.author || ''} onChange={(event) => setAnnouncementDrafts((current) => ({ ...current, [announcement.id]: { ...current[announcement.id], author: event.target.value } }))} placeholder="Author" />
                    <input className={fieldClassName} value={draft.target || ''} onChange={(event) => setAnnouncementDrafts((current) => ({ ...current, [announcement.id]: { ...current[announcement.id], target: event.target.value } }))} placeholder="Target" />
                    <select className={fieldClassName} value={draft.status || 'draft'} onChange={(event) => setAnnouncementDrafts((current) => ({ ...current, [announcement.id]: { ...current[announcement.id], status: event.target.value } }))}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                    <input className={`${fieldClassName} md:col-span-2`} type="datetime-local" value={draft.published_at || ''} onChange={(event) => setAnnouncementDrafts((current) => ({ ...current, [announcement.id]: { ...current[announcement.id], published_at: event.target.value } }))} />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-sm text-muted">Views: {(announcement.views || 0).toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="secondary"
                        className="gap-2 text-red-600 border-red-500/20 hover:bg-red-500/5"
                        disabled={savingKey === `announcements:delete:${announcement.id}`}
                        onClick={() => void deleteRecord('announcements', announcement.id, 'Announcement deleted.')}
                      >
                        {savingKey === `announcements:delete:${announcement.id}` ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        className="gap-2"
                        disabled={savingKey === currentSavingKey}
                        onClick={() =>
                          void persistRecord(
                            'announcements',
                            announcement.id,
                            {
                              title: draft.title,
                              author: draft.author,
                              target: draft.target,
                              status: draft.status,
                              published_at: draft.published_at ? new Date(draft.published_at).toISOString() : null,
                            },
                            'Announcement updated.',
                          )
                        }
                      >
                        {savingKey === currentSavingKey ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Announcement
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        {activeTab === 'testimonials' && (
          <div className="grid gap-6">
            {data.testimonials.map((testimonial) => {
              const draft = testimonialDrafts[testimonial.id] || {};
              const currentSavingKey = `testimonials:${testimonial.id}`;

              return (
                <Card key={testimonial.id} className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className={fieldClassName} value={draft.name || ''} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], name: event.target.value } }))} placeholder="Name" />
                    <input className={fieldClassName} value={draft.role || ''} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], role: event.target.value } }))} placeholder="Role" />
                    <input className={fieldClassName} value={draft.category || ''} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], category: event.target.value } }))} placeholder="Category" />
                    <input className={fieldClassName} value={draft.community_slug || ''} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], community_slug: event.target.value } }))} placeholder="Community slug" />
                    <textarea className={`${fieldClassName} min-h-32 md:col-span-2`} value={draft.content || ''} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], content: event.target.value } }))} placeholder="Testimonial content" />
                    <input className={fieldClassName} type="number" min="1" max="5" value={draft.rating ?? 5} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], rating: Number(event.target.value) } }))} placeholder="Rating" />
                    <label className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground">
                      <input type="checkbox" checked={Boolean(draft.is_featured)} onChange={(event) => setTestimonialDrafts((current) => ({ ...current, [testimonial.id]: { ...current[testimonial.id], is_featured: event.target.checked } }))} />
                      Featured testimonial
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      variant="secondary"
                      className="gap-2 text-red-600 border-red-500/20 hover:bg-red-500/5"
                      disabled={savingKey === `testimonials:delete:${testimonial.id}`}
                      onClick={() => void deleteRecord('testimonials', testimonial.id, 'Testimonial deleted.')}
                    >
                      {savingKey === `testimonials:delete:${testimonial.id}` ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      className="gap-2"
                      disabled={savingKey === currentSavingKey}
                      onClick={() =>
                        void persistRecord(
                          'testimonials',
                          testimonial.id,
                          {
                            name: draft.name,
                            role: draft.role,
                            category: draft.category,
                            content: draft.content,
                            community_slug: draft.community_slug || null,
                            rating: Number(draft.rating || 5),
                            is_featured: Boolean(draft.is_featured),
                          },
                          'Testimonial updated.',
                        )
                      }
                    >
                      {savingKey === currentSavingKey ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Testimonial
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-10 text-muted">
            <LoaderCircle className="w-5 h-5 animate-spin mr-3" />
            Refreshing live data...
          </div>
        )}
      </div>
    </div>
  );
};
