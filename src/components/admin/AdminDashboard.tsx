import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Megaphone, MessageSquare, Users, Zap } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { useSiteData } from '../../lib/site-data';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'members', label: 'Members' },
  { id: 'communities', label: 'Communities' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'testimonials', label: 'Testimonials' },
] as const;

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('overview');
  const { data, formatCurrency } = useSiteData();

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

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-3">Admin Portal</p>
            <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-3">Live Ecosystem Dashboard</h1>
            <p className="text-muted text-lg">Every section here is reading from the backend instead of demo arrays.</p>
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
                          <p className="text-xs uppercase tracking-widest text-muted mt-2">{announcement.status || 'Draft'} • {announcement.target || 'All Communities'}</p>
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
            <h2 className="text-2xl font-display font-medium text-foreground mb-6">Members</h2>
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
          <div className="grid lg:grid-cols-2 gap-6">
            {data.communities.map((community) => (
              <Card key={community.id} className="p-8">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-medium text-foreground mb-2">{community.name}</h2>
                    <p className="text-muted">{community.tagline || community.summary}</p>
                  </div>
                  <p className="text-lg font-medium text-foreground">{formatCurrency(community.price)}</p>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-6">{community.description}</p>
                <div className="text-sm text-muted">Members: {data.members.filter((member) => member.community_slug === community.slug).length}</div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <Card className="p-8">
            <h2 className="text-2xl font-display font-medium text-foreground mb-6">Announcements</h2>
            <div className="space-y-4">
              {data.announcements.map((announcement) => (
                <div key={announcement.id} className="p-5 rounded-2xl border border-border/50 bg-surface">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{announcement.title}</p>
                      <p className="text-sm text-muted mt-2">{announcement.author || 'Admin'} • {announcement.target || 'All Communities'}</p>
                    </div>
                    <div className="text-sm text-muted">{announcement.status || 'Draft'} • {(announcement.views || 0).toLocaleString()} views</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'testimonials' && (
          <Card className="p-8">
            <h2 className="text-2xl font-display font-medium text-foreground mb-6">Testimonials</h2>
            <div className="space-y-4">
              {data.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-5 rounded-2xl border border-border/50 bg-surface">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted mt-1">{testimonial.role} • {testimonial.category}</p>
                      <p className="text-sm text-foreground/80 mt-4">"{testimonial.content}"</p>
                    </div>
                    <div className="text-sm text-muted">Rating: {testimonial.rating || 5}/5</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

