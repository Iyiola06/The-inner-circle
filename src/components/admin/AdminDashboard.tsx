
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Edit2, Info, LoaderCircle, Megaphone, MessageSquare, Plus, Save, Sparkles, Trash2, Users, Zap } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { ThemeToggle } from '../ThemeToggle';
import { useSiteData, useSafeArray } from '../../lib/site-data';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from '../../lib/supabase-browser';
import { AdminModal, ConfirmDeleteModal, fieldClassName } from './AdminComponents';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'homepage', label: 'Homepage' },
  { id: 'members', label: 'Members' },
  { id: 'communities', label: 'Communities' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'departments', label: 'Departments' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'testimonials', label: 'Testimonials' },
] as const;

type TabId = (typeof tabs)[number]['id'];

type SaveState = {
  type: 'success' | 'error';
  message: string;
} | null;

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [leadershipDraft, setLeadershipDraft] = useState<any>({});
  const [departmentsPageDraft, setDepartmentsPageDraft] = useState<any>({});
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ table: string; id: string; label: string; tableKey?: string } | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<{ type: string; data: any; index?: number } | null>(null);

  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>(null);
  const { data, formatCurrency, refresh, isLoading } = useSiteData();

  useEffect(() => {
    const leadership = (data.content.leadership as Record<string, any> | undefined) || { leaders: [] };
    setLeadershipDraft(leadership);

    const departmentsPage = (data.content.departments_page as Record<string, any> | undefined) || { departments: [], leads: [] };
    setDepartmentsPageDraft(departmentsPage);
  }, [data.content.leadership, data.content.departments_page]);

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

  const deleteRecord = async (
    table: 'announcements' | 'testimonials' | 'communities' | 'members' | 'join_requests',
    id: string,
    successMessage: string,
  ) => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey(`${table}:delete:${id}`);
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from(table) as any).delete().eq('id', id));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: successMessage });
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete record.' });
    } finally {
      setSavingKey(null);
    }
  };

  const openDeleteModal = (table: string, id: string, label: string, tableKey?: string) => {
    setDeleteTarget({ table, id, label, tableKey });
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (type: string, data: any = null, index?: number) => {
    setEditTarget({ type, data, index });
    setIsEditModalOpen(true);
  };

  const saveSiteContent = async (key: string, value: any, successMessage: string) => {
    if (!hasSupabaseBrowserConfig()) {
      setSaveState({ type: 'error', message: 'Secure data connection is not available right now.' });
      return;
    }

    setSavingKey(`site_content:${key}`);
    setSaveState(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await ((supabase.from('site_content') as any).upsert(
        { key, value },
        { onConflict: 'key' },
      ));
      if (error) throw error;
      await refresh();
      setSaveState({ type: 'success', message: successMessage });
    } catch (error) {
      setSaveState({ type: 'error', message: error instanceof Error ? error.message : 'Unable to update site content.' });
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
              <Button variant="primary" className="gap-2" onClick={() => openEditModal('new_member')}>
                <Plus className="w-4 h-4" />
                New Member
              </Button>
            )}
            {activeTab === 'communities' && (
              <Button variant="primary" className="gap-2" onClick={() => openEditModal('new_community')}>
                <Plus className="w-4 h-4" />
                New Community
              </Button>
            )}
            {activeTab === 'announcements' && (
              <Button variant="primary" className="gap-2" onClick={() => openEditModal('new_announcement')}>
                <Plus className="w-4 h-4" />
                New Announcement
              </Button>
            )}
            {activeTab === 'departments' && (
              <Button variant="primary" className="gap-2" onClick={() => openEditModal('new_department')}>
                <Plus className="w-4 h-4" />
                New Department
              </Button>
            )}
            {activeTab === 'leadership' && (
              <Button variant="primary" className="gap-2" onClick={() => openEditModal('new_leader')}>
                <Plus className="w-4 h-4" />
                New Leader
              </Button>
            )}
            {activeTab === 'testimonials' && (
              <Button variant="primary" className="gap-2" onClick={() => openEditModal('new_testimonial')}>
                <Plus className="w-4 h-4" />
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
                          {announcement.body && <p className="text-xs text-muted line-clamp-1 mt-1">{announcement.body}</p>}
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
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-display font-medium text-foreground mb-2">Homepage Hero</h3>
                  <p className="text-muted">Manage the main headline and landing page stats.</p>
                </div>
                <Button 
                  variant="primary" 
                  className="gap-2"
                  onClick={() => openEditModal('edit_hero', data.content.hero)}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Hero Content
                </Button>
              </div>
              <div className="p-6 rounded-2xl bg-muted/5 border border-border/40 space-y-2">
                <p className="text-foreground font-medium">{(data.content.hero as any)?.title || 'Inner Circle Community'}</p>
                <p className="text-sm text-muted">{(data.content.hero as any)?.subtitle}</p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-display font-medium text-foreground mb-2">Community Metrics</h3>
                  <p className="text-muted">Update the key impact numbers shown on the homepage.</p>
                </div>
                <Button 
                  variant="primary" 
                  className="gap-2"
                  onClick={() => openEditModal('edit_homepage_metrics', data.content.homepage_metrics)}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Metrics
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries((data.content.homepage_metrics as Record<string, any>) || {}).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl border border-border/40 bg-muted/5">
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-lg font-medium text-foreground">{val}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-display font-medium text-foreground">Join Requests</h2>
                <p className="text-sm text-muted">New applications pending review.</p>
              </div>
              <div className="space-y-4">
                {(!data.join_requests || data.join_requests.length === 0) ? (
                  <p className="text-sm text-muted">No pending join requests.</p>
                ) : (
                  data.join_requests.map((req) => (
                    <div key={req.id} className="grid md:grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-4 p-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 items-center">
                      <div>
                        <p className="font-medium text-foreground">{req.full_name}</p>
                        <p className="text-sm text-muted">{req.email}</p>
                      </div>
                      <p className="text-sm text-foreground">{data.communities.find((c) => c.id === req.community_id)?.name || 'Unknown Community'}</p>
                      <p className="text-sm text-muted">{req.phone || 'No phone'}</p>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-brand-primary uppercase font-medium">{req.status || 'new'}</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="p-2 rounded-xl border border-border/50 text-muted hover:text-brand-primary hover:border-brand-primary/30 transition-colors"
                            onClick={() => openEditModal('edit_join_request', req)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-xl border border-border/50 text-muted hover:text-red-600 hover:border-red-500/30 transition-colors"
                            onClick={() => openDeleteModal('join_requests', req.id, req.full_name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

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
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="p-2 rounded-xl border border-border/50 text-muted hover:text-brand-primary hover:border-brand-primary/30 transition-colors"
                        onClick={() => openEditModal('edit_member', member)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-xl border border-border/50 text-muted hover:text-red-600 hover:border-red-500/30 transition-colors"
                        onClick={() => openDeleteModal('members', member.id, member.full_name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          </div>
        )}
        {activeTab === 'communities' && (
          <div className="grid gap-6">
            {data.communities.map((community) => (
              <Card key={community.id} className="p-8">
                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div>
                      <h2 className="text-2xl font-display font-medium text-foreground mb-2">{community.name}</h2>
                      <p className="text-muted line-clamp-2">{community.tagline || community.summary}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-xl bg-muted/5 border border-border/40">
                        <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Slug</p>
                        <p className="text-xs font-medium text-foreground">{community.slug}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/5 border border-border/40">
                        <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Price</p>
                        <p className="text-xs font-medium text-foreground">{formatCurrency(community.price)}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/5 border border-border/40">
                        <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Stats</p>
                        <p className="text-xs font-medium text-foreground">{data.members.filter((m) => m.community_slug === community.slug).length} Members</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2 mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary"
                      onClick={() => openEditModal('edit_community', community)}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-red-600"
                      onClick={() => openDeleteModal('communities', community.id, community.name)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="grid gap-6">
            {data.announcements.map((announcement) => (
              <Card key={announcement.id} className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${announcement.status === 'published' ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-muted/10 text-muted border border-border'}`}>
                        {announcement.status || 'draft'}
                      </span>
                      <h2 className="text-2xl font-display font-medium text-foreground">{announcement.title}</h2>
                    </div>
                    
                    {announcement.body && (
                      <div className="bg-muted/5 p-4 rounded-xl border border-border/40">
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {announcement.body}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-6 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 opacity-50" />
                        <span>By {announcement.author || 'Admin'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 opacity-50" />
                        <span>Target: {announcement.target || 'All Communities'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 opacity-50" />
                        <span>{(announcement.views || 0).toLocaleString()} Views</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2 mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary"
                      onClick={() => openEditModal('edit_announcement', announcement)}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-red-600"
                      onClick={() => openDeleteModal('announcements', announcement.id, announcement.title)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {activeTab === 'testimonials' && (
          <div className="grid gap-6">
            {data.testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center gap-3">
                      <div className="flex text-amber-500">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Sparkles key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      {testimonial.is_featured && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[8px] font-bold uppercase tracking-widest border border-brand-primary/20">
                          Featured
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-medium text-foreground mb-1">{testimonial.name}</h2>
                      <p className="text-brand-primary text-xs font-medium uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                    <p className="text-muted text-sm italic leading-relaxed">"{testimonial.content}"</p>
                    {testimonial.community_slug && (
                      <p className="text-[10px] text-muted uppercase tracking-widest">Community: {testimonial.community_slug}</p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2 mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary"
                      onClick={() => openEditModal('edit_testimonial', testimonial)}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-red-600"
                      onClick={() => openDeleteModal('testimonials', testimonial.id, testimonial.name)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(leadershipDraft.leaders || []).map((leader: any, index: number) => (
              <Card key={index} className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/50">
                    <img src={leader.imageUrl || 'https://picsum.photos/seed/leader/200/200'} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal('edit_leader', leader, index)} className="p-2.5 hover:bg-muted/10 rounded-xl transition-colors border border-border/50">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => openDeleteModal('leadership', index.toString(), leader.name, 'leadership')} className="p-2.5 hover:bg-rose-500/10 text-rose-500 rounded-xl transition-colors border border-rose-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-1">{leader.name}</h3>
                <p className="text-brand-primary text-xs uppercase tracking-widest font-medium mb-4">{leader.role}</p>
                <p className="text-muted text-sm line-clamp-3 mb-6">{leader.bio}</p>
                <div className="flex items-center gap-3">
                  {leader.socials?.instagram && <div className="w-8 h-8 rounded-full bg-muted/5 flex items-center justify-center"><MessageSquare className="w-3.5 h-3.5 opacity-40" /></div>}
                  {leader.socials?.linkedin && <div className="w-8 h-8 rounded-full bg-muted/5 flex items-center justify-center"><MessageSquare className="w-3.5 h-3.5 opacity-40" /></div>}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Department Heads</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(departmentsPageDraft.leads || []).map((lead: any, index: number) => (
                  <Card key={index} className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/50">
                        <img src={lead.imageUrl || 'https://picsum.photos/seed/lead/200/200'} alt={lead.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('edit_dept_lead', lead, index)} className="p-2.5 hover:bg-muted/10 rounded-xl transition-colors border border-border/50">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => openDeleteModal('departments_page', index.toString(), lead.name, 'leads')} className="p-2.5 hover:bg-rose-500/10 text-rose-500 rounded-xl transition-colors border border-rose-500/10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-medium text-foreground mb-1">{lead.name}</h3>
                    <p className="text-brand-primary text-xs uppercase tracking-widest font-medium mb-1">{lead.role}</p>
                    <p className="text-muted text-xs font-normal">{lead.specialty}</p>
                  </Card>
                ))}
                <button onClick={() => openEditModal('new_dept_lead')} className="p-8 rounded-3xl border-2 border-dashed border-border/50 hover:border-brand-primary/30 transition-all flex flex-col items-center justify-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-muted">Add New Head</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Departments</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {(departmentsPageDraft.departments || []).map((dept: any, index: number) => (
                  <Card key={index} className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('edit_department', dept, index)} className="p-2.5 hover:bg-muted/10 rounded-xl transition-colors border border-border/50">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => openDeleteModal('departments_page', index.toString(), dept.title, 'departments')} className="p-2.5 hover:bg-rose-500/10 text-rose-500 rounded-xl transition-colors border border-rose-500/10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-2xl font-display font-medium text-foreground mb-4">{dept.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3 font-normal">{dept.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useSafeArray<string>(dept.activities).slice(0, 3).map((act, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-muted/5 border border-border/50 text-[10px] font-medium text-muted uppercase tracking-wider">{act}</span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-10 text-muted">
            <LoaderCircle className="w-5 h-5 animate-spin mr-3" />
            Refreshing live data...
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Delete ${deleteTarget?.label}`}
        isLoading={savingKey?.includes('delete')}
        onConfirm={async () => {
          if (!deleteTarget) return;
          if (['members', 'join_requests', 'communities', 'announcements', 'testimonials'].includes(deleteTarget.table)) {
            await deleteRecord(deleteTarget.table as any, deleteTarget.id, `${deleteTarget.label} deleted.`);
          } else if (['leadership', 'departments_page'].includes(deleteTarget.table) && deleteTarget.tableKey) {
            setSavingKey(`${deleteTarget.table}:delete`);
            try {
              const currentData = deleteTarget.table === 'leadership' ? { ...leadershipDraft } : { ...departmentsPageDraft };
              const targetIdx = parseInt(deleteTarget.id);
              currentData[deleteTarget.tableKey] = currentData[deleteTarget.tableKey].filter((_: any, idx: number) => idx !== targetIdx);

              await saveSiteContent(deleteTarget.table, currentData, `${deleteTarget.label} deleted.`);
              setIsDeleteModalOpen(false);
              setDeleteTarget(null);
            } catch (err) {
              console.error(err);
            } finally {
              setSavingKey(null);
            }
          }
        }}
      />

      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={
          editTarget?.type === 'new_leader' ? 'Add New Leader' :
          editTarget?.type === 'edit_leader' ? 'Edit Leader' :
          editTarget?.type === 'new_dept_lead' ? 'Add Department Head' :
          editTarget?.type === 'edit_dept_lead' ? 'Edit Department Head' :
          editTarget?.type === 'new_department' ? 'Add Department' :
          editTarget?.type === 'edit_department' ? 'Edit Department' :
          editTarget?.type === 'new_member' ? 'Add New Member' :
          editTarget?.type === 'edit_member' ? 'Edit Member' :
          editTarget?.type === 'new_community' ? 'Add New Community' :
          editTarget?.type === 'edit_community' ? 'Edit Community' :
          editTarget?.type === 'new_announcement' ? 'Add New Announcement' :
          editTarget?.type === 'edit_announcement' ? 'Edit Announcement' :
          editTarget?.type === 'new_testimonial' ? 'Add New Testimonial' :
          editTarget?.type === 'edit_testimonial' ? 'Edit Testimonial' :
          editTarget?.type === 'edit_join_request' ? 'Update Join Request' :
          editTarget?.type === 'edit_hero' ? 'Edit Homepage Hero' :
          editTarget?.type === 'edit_homepage_metrics' ? 'Edit Homepage Metrics' :
          'Item Editor'
        }
      >
        <div className="space-y-6">
          {editTarget?.type === 'edit_hero' && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Title" value={editTarget.data?.title || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, title: e.target.value } })} />
              <textarea className={`${fieldClassName} min-h-32`} placeholder="Subtitle" value={editTarget.data?.subtitle || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, subtitle: e.target.value } })} />
              <div className="grid grid-cols-2 gap-4">
                <input className={fieldClassName} placeholder="Stat 1" value={Array.isArray(editTarget.data?.stats) ? editTarget.data?.stats[0] || '' : ''} onChange={e => {
                  const stats = [...(editTarget.data?.stats || ['', ''])];
                  stats[0] = e.target.value;
                  setEditTarget({ ...editTarget, data: { ...editTarget.data, stats } });
                }} />
                <input className={fieldClassName} placeholder="Stat 2" value={Array.isArray(editTarget.data?.stats) ? editTarget.data?.stats[1] || '' : ''} onChange={e => {
                  const stats = [...(editTarget.data?.stats || ['', ''])];
                  stats[1] = e.target.value;
                  setEditTarget({ ...editTarget, data: { ...editTarget.data, stats } });
                }} />
              </div>
            </div>
          )}

          {editTarget?.type === 'edit_homepage_metrics' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Members Display</label>
                <input className={fieldClassName} placeholder="e.g. 30+" value={editTarget.data?.circlersDisplay || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, circlersDisplay: e.target.value } })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Countries</label>
                <input className={fieldClassName} placeholder="e.g. 2" value={editTarget.data?.countriesDisplay || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, countriesDisplay: e.target.value } })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Weekly Masterminds</label>
                <input className={fieldClassName} type="number" value={editTarget.data?.weeklyMasterminds || 0} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, weeklyMasterminds: Number(e.target.value) } })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Satisfaction %</label>
                <input className={fieldClassName} type="number" value={editTarget.data?.satisfaction || 0} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, satisfaction: Number(e.target.value) } })} />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Growth Rate %</label>
                <input className={fieldClassName} type="number" value={editTarget.data?.growthRate || 0} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, growthRate: Number(e.target.value) } })} />
              </div>
            </div>
          )}
          {editTarget?.type.includes('leader') && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Full Name" value={editTarget.data?.name || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, name: e.target.value } })} />
              <input className={fieldClassName} placeholder="Role" value={editTarget.data?.role || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, role: e.target.value } })} />
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Profile Image</label>
                <AdminMediaUpload 
                  currentImageUrl={editTarget.data?.imageUrl} 
                  onUploadSuccess={(url) => setEditTarget({ ...editTarget, data: { ...editTarget.data, imageUrl: url } })} 
                />
              </div>
              <textarea className={`${fieldClassName} min-h-32`} placeholder="Biography" value={editTarget.data?.bio || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, bio: e.target.value } })} />
              <div className="grid grid-cols-2 gap-4">
                <input className={fieldClassName} placeholder="Instagram URL" value={editTarget.data?.socials?.instagram || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, socials: { ...editTarget.data?.socials, instagram: e.target.value } } })} />
                <input className={fieldClassName} placeholder="LinkedIn URL" value={editTarget.data?.socials?.linkedin || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, socials: { ...editTarget.data?.socials, linkedin: e.target.value } } })} />
              </div>
            </div>
          )}

          {(editTarget?.type.includes('dept_lead')) && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Full Name" value={editTarget.data?.name || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, name: e.target.value } })} />
              <input className={fieldClassName} placeholder="Role" value={editTarget.data?.role || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, role: e.target.value } })} />
              <input className={fieldClassName} placeholder="Specialty" value={editTarget.data?.specialty || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, specialty: e.target.value } })} />
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Profile Image</label>
                <AdminMediaUpload 
                  currentImageUrl={editTarget.data?.imageUrl} 
                  onUploadSuccess={(url) => setEditTarget({ ...editTarget, data: { ...editTarget.data, imageUrl: url } })} 
                />
              </div>
            </div>
          )}

          {editTarget?.type.includes('department') && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Title" value={editTarget.data?.title || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, title: e.target.value } })} />
              <input className={fieldClassName} placeholder="Icon (Heart, Palette, etc)" value={editTarget.data?.icon || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, icon: e.target.value } })} />
              <textarea className={`${fieldClassName} min-h-32`} placeholder="Description" value={editTarget.data?.description || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, description: e.target.value } })} />
              <input className={fieldClassName} placeholder="Activities (comma separated)" value={Array.isArray(editTarget.data?.activities) ? editTarget.data?.activities.join(', ') : editTarget.data?.activities || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, activities: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) } })} />
            </div>
          )}

          {editTarget?.type.includes('member') && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Full Name" value={editTarget.data?.full_name || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, full_name: e.target.value } })} />
              <input className={fieldClassName} placeholder="Email" value={editTarget.data?.email || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, email: e.target.value } })} />
              <input className={fieldClassName} placeholder="Phone" value={editTarget.data?.phone || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, phone: e.target.value } })} />
              <select className={fieldClassName} value={editTarget.data?.community_slug || ''} onChange={e => {
                const comm = data.communities.find(c => c.slug === e.target.value);
                setEditTarget({ ...editTarget, data: { ...editTarget.data, community_slug: e.target.value, community_id: comm?.id || null } });
              }}>
                <option value="">Select Community</option>
                {data.communities.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <select className={fieldClassName} value={editTarget.data?.status || 'active'} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, status: e.target.value } })}>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
          )}

          {editTarget?.type.includes('community') && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Name" value={editTarget.data?.name || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, name: e.target.value, slug: toSlug(e.target.value) } })} />
              <input className={fieldClassName} placeholder="Slug" value={editTarget.data?.slug || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, slug: toSlug(e.target.value) } })} />
              <input className={fieldClassName} placeholder="Tagline" value={editTarget.data?.tagline || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, tagline: e.target.value } })} />
              <input className={fieldClassName} placeholder="Price" type="number" value={editTarget.data?.price || 0} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, price: Number(e.target.value) } })} />
              <textarea className={`${fieldClassName} min-h-32`} placeholder="Description" value={editTarget.data?.description || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, description: e.target.value } })} />
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted ml-1">Community Image</label>
                <AdminMediaUpload 
                  currentImageUrl={editTarget.data?.image_url} 
                  onUploadSuccess={(url) => setEditTarget({ ...editTarget, data: { ...editTarget.data, image_url: url } })} 
                />
              </div>
            </div>
          )}

          {editTarget?.type.includes('announcement') && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Title" value={editTarget.data?.title || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, title: e.target.value } })} />
              <textarea className={`${fieldClassName} min-h-32`} placeholder="Announcement Body" value={editTarget.data?.body || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, body: e.target.value } })} />
              <input className={fieldClassName} placeholder="Author" value={editTarget.data?.author || 'Admin'} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, author: e.target.value } })} />
              <input className={fieldClassName} placeholder="Target (e.g. All Communities)" value={editTarget.data?.target || 'All Communities'} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, target: e.target.value } })} />
              <select className={fieldClassName} value={editTarget.data?.status || 'draft'} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, status: e.target.value } })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          )}

          {editTarget?.type.includes('testimonial') && (
            <div className="space-y-4">
              <input className={fieldClassName} placeholder="Name" value={editTarget.data?.name || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, name: e.target.value } })} />
              <input className={fieldClassName} placeholder="Role" value={editTarget.data?.role || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, role: e.target.value } })} />
              <textarea className={`${fieldClassName} min-h-32`} placeholder="Content" value={editTarget.data?.content || ''} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, content: e.target.value } })} />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted ml-1">Avatar Image</label>
                  <AdminMediaUpload 
                    currentImageUrl={editTarget.data?.avatar_url} 
                    onUploadSuccess={(url) => setEditTarget({ ...editTarget, data: { ...editTarget.data, avatar_url: url } })} 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted ml-1">Featured Image (Optional)</label>
                  <AdminMediaUpload 
                    currentImageUrl={editTarget.data?.image_url} 
                    onUploadSuccess={(url) => setEditTarget({ ...editTarget, data: { ...editTarget.data, image_url: url } })} 
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input className={fieldClassName} placeholder="Rating (1-5)" type="number" min="1" max="5" value={editTarget.data?.rating || 5} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, rating: Number(e.target.value) } })} />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={editTarget.data?.is_featured || false} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, is_featured: e.target.checked } })} />
                  Featured
                </label>
              </div>
            </div>
          )}

          {editTarget?.type === 'edit_join_request' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-muted/5 border border-border/50">
                <p className="text-sm font-medium text-foreground">{editTarget.data?.full_name}</p>
                <p className="text-xs text-muted mt-1">{editTarget.data?.email} • {editTarget.data?.phone}</p>
                {editTarget.data?.notes && <p className="text-sm text-muted mt-4 italic">"{editTarget.data.notes}"</p>}
              </div>
              <select className={fieldClassName} value={editTarget.data?.status || 'new'} onChange={e => setEditTarget({ ...editTarget, data: { ...editTarget.data, status: e.target.value } })}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="gap-2" onClick={async () => {
              if (!editTarget) return;
              setSavingKey('edit_modal');
              try {
                const supabase = getSupabaseBrowserClient();
                const type = editTarget.type;
                const d = editTarget.data;

                if (type.includes('leader')) {
                  const current = { ...leadershipDraft };
                  const list = [...(current.leaders || [])];
                  if (type === 'new_leader') list.push(d);
                  else if (editTarget.index !== undefined) list[editTarget.index] = d;
                  current.leaders = list;
                  await saveSiteContent('leadership', current, 'Leadership updated.');
                } else if (type === 'edit_hero') {
                  await saveSiteContent('hero', d, 'Hero content updated.');
                } else if (type === 'edit_homepage_metrics') {
                  await saveSiteContent('homepage_metrics', d, 'Homepage metrics updated.');
                } else if (type.includes('dept_lead') || type.includes('department')) {
                  const current = { ...departmentsPageDraft };
                  const key = type.includes('lead') ? 'leads' : 'departments';
                  const list = [...(current[key] || [])];
                  if (type.startsWith('new')) list.push(d);
                  else if (editTarget.index !== undefined) list[editTarget.index] = d;
                  current[key] = list;
                  await saveSiteContent('departments_page', current, 'Departments updated.');
                } else {
                  // Direct table updates
                  const table = type.includes('member') ? 'members' : 
                                type.includes('community') ? 'communities' :
                                type.includes('announcement') ? 'announcements' :
                                type.includes('testimonial') ? 'testimonials' :
                                type.includes('join_request') ? 'join_requests' : '';
                  
                  if (table) {
                    const { error } = d.id 
                      ? await (supabase.from(table) as any).update(d).eq('id', d.id)
                      : await (supabase.from(table) as any).insert(d);
                    
                    if (error) throw error;
                    await refresh();
                    setSaveState({ type: 'success', message: `${table} updated.` });
                  }
                }
                setIsEditModalOpen(false);
              } catch (err) {
                console.error(err);
                setSaveState({ type: 'error', message: err instanceof Error ? err.message : 'Save failed.' });
              } finally {
                setSavingKey(null);
              }
            }}>
              {savingKey === 'edit_modal' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};
