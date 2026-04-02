import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, LoaderCircle, Megaphone, MessageSquare, Plus, Save, Users, Zap } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { useSiteData } from '../../lib/site-data';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from '../../lib/supabase-browser';

const tabs = [
  { id: 'overview', label: 'Overview' },
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

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [announcementDrafts, setAnnouncementDrafts] = useState<Record<string, any>>({});
  const [testimonialDrafts, setTestimonialDrafts] = useState<Record<string, any>>({});
  const [communityDrafts, setCommunityDrafts] = useState<Record<string, any>>({});
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
            tagline: community.tagline || '',
            summary: community.summary || '',
            description: community.description || '',
            who_its_for: community.who_its_for || '',
            price: community.price || 0,
            price_period: community.price_period || 'year',
          },
        ]),
      ),
    );
  }, [data.announcements, data.communities, data.testimonials]);

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
      setSaveState({ type: 'error', message: 'Supabase browser configuration is missing.' });
      return;
    }

    setSavingKey(`${table}:${id}`);
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from(table) as any).update(values).eq('id', id));

      if (error) {
        throw error;
      }

      await refresh();
      setSaveState({ type: 'success', message: successMessage });
    } catch (error) {
      setSaveState({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to save changes.',
      });
    } finally {
      setSavingKey(null);
    }
  };

  const createAnnouncement = async () => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Supabase browser configuration is missing.' });
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

      if (error) {
        throw error;
      }

      await refresh();
      setSaveState({ type: 'success', message: 'Announcement created.' });
      setActiveTab('announcements');
    } catch (error) {
      setSaveState({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to create announcement.',
      });
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
            <p className="text-muted text-lg">You can now edit the live communities, announcements, and testimonials here.</p>
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
            <p className="text-sm font-medium text-foreground">Admin changes save directly to Supabase.</p>
            <p className="text-xs uppercase tracking-widest text-muted mt-2">Read-only members | editable content records</p>
          </div>
          <div className="flex items-center gap-3">
            {saveState && (
              <p className={saveState.type === 'success' ? 'text-sm text-emerald-600 dark:text-emerald-400' : 'text-sm text-red-600 dark:text-red-400'}>
                {saveState.message}
              </p>
            )}
            {activeTab === 'announcements' && (
              <Button variant="primary" className="gap-2" onClick={() => void createAnnouncement()} disabled={savingKey === 'announcements:new'}>
                {savingKey === 'announcements:new' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                New Announcement
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

        {activeTab === 'members' && (
          <Card className="p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-display font-medium text-foreground">Members</h2>
              <p className="text-sm text-muted">Members are live from the backend. This tab is currently read-only.</p>
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
                  <p className="text-sm text-muted uppercase">{member.status || 'active'}</p>
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
                    <input className={fieldClassName} value={draft.name || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], name: event.target.value } }))} placeholder="Community name" />
                    <input className={fieldClassName} value={draft.tagline || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], tagline: event.target.value } }))} placeholder="Tagline" />
                    <input className={fieldClassName} value={draft.summary || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], summary: event.target.value } }))} placeholder="Summary" />
                    <input className={fieldClassName} type="number" value={draft.price ?? 0} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], price: Number(event.target.value) } }))} placeholder="Price" />
                    <textarea className={`${fieldClassName} min-h-32 md:col-span-2`} value={draft.description || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], description: event.target.value } }))} placeholder="Description" />
                    <textarea className={`${fieldClassName} min-h-28 md:col-span-2`} value={draft.who_its_for || ''} onChange={(event) => setCommunityDrafts((current) => ({ ...current, [community.id]: { ...current[community.id], who_its_for: event.target.value } }))} placeholder="Who this is for" />
                  </div>

                  <div className="mt-6 flex justify-end">
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
                            tagline: draft.tagline,
                            summary: draft.summary,
                            description: draft.description,
                            who_its_for: draft.who_its_for,
                            price: Number(draft.price || 0),
                            price_period: draft.price_period || 'year',
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

                  <div className="mt-6 flex justify-end">
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
