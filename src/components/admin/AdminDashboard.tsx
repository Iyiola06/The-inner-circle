import React, { useState } from 'react';
import { 
  AdminSidebar, 
  AdminTopbar, 
  AdminTable, 
  AdminBadge, 
  AdminEmptyState, 
  AdminLoadingState,
  AdminPagination,
  AdminDrawer,
  AdminModal,
  AdminRichTextEditor,
  AdminMediaUpload
} from './AdminComponents';
import { Card } from '../Card';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  CreditCard, 
  Zap, 
  Star, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Megaphone,
  MessageSquare,
  Palette,
  CheckCircle,
  XCircle,
  Clock,
  Edit2,
  Trash2,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Eye,
  Calendar,
  Tag,
  ChevronLeft,
  Download,
  RefreshCw,
  Sun,
  Moon,
  Type,
  Box,
  Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../Button';
import { cn } from '../../lib/utils';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const stats = [
  { label: 'Total Members', value: '1,248', change: '+12%', trend: 'up', icon: Users },
  { label: 'Active Communities', value: '3', change: '0%', trend: 'neutral', icon: Zap },
  { label: 'Testimonials Collected', value: '86', change: '+5%', trend: 'up', icon: MessageSquare },
  { label: 'Pending Join Requests', value: '14', change: '+2', trend: 'up', icon: Clock },
];

const chartData = [
  { name: 'Jan', members: 400 },
  { name: 'Feb', members: 600 },
  { name: 'Mar', members: 800 },
  { name: 'Apr', members: 1000 },
  { name: 'May', members: 1100 },
  { name: 'Jun', members: 1248 },
];

const performanceData = [
  { name: 'Better Man', value: 142, color: '#166D9C' },
  { name: 'Innovation Lab', value: 86, color: '#0F5C85' },
  { name: 'Budding CEOs', value: 54, color: '#0B1220' },
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [editorTitle, setEditorTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('brand');
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#166D9C',
    deepColor: '#0F5C85',
    borderRadius: 'xl',
    buttonStyle: 'pill',
    cardStyle: 'glass',
    displayFont: 'Outfit',
    bodyFont: 'Inter',
    enableGlass: true,
    enableMotion: true,
    enableShadows: true,
  });
  const [testimonials, setTestimonials] = useState([
    { 
      name: 'Alex Rivera', 
      community: 'Innovation Lab', 
      status: 'Pending', 
      content: 'The Inner Circle has completely transformed how I approach my creative work. The discipline and community support are unmatched.',
      date: '2 hours ago',
      rating: 5,
      featured: false
    },
    { 
      name: 'Sarah Chen', 
      community: 'Budding CEOs', 
      status: 'Approved', 
      content: 'Being part of this ecosystem has opened doors I never thought possible. The networking alone is worth 10x the price.',
      date: '1 day ago',
      rating: 5,
      featured: true
    },
    { 
      name: 'Marcus Bell', 
      community: 'Better Man', 
      status: 'Pending', 
      content: 'I finally found a group of men who hold me accountable and push me to be my best self every single day.',
      date: '3 days ago',
      rating: 4,
      featured: false
    },
    { 
      name: 'Elena Gomez', 
      community: 'Innovation Lab', 
      status: 'Approved', 
      content: 'The resources provided here are world-class. I have grown more in 3 months than I did in the previous 3 years.',
      date: '1 week ago',
      rating: 5,
      featured: false
    },
  ]);
  const [announcements, setAnnouncements] = useState([
    { 
      title: 'New Onboarding Workflow', 
      date: 'Oct 12, 2024', 
      status: 'Published', 
      author: 'Admin', 
      target: 'All Communities',
      views: '1,242'
    },
    { 
      title: 'Community Guidelines Update', 
      date: 'Oct 10, 2024', 
      status: 'Draft', 
      author: 'Admin', 
      target: 'Better Man',
      views: '0'
    },
    { 
      title: 'Upcoming CEO Summit 2024', 
      date: 'Oct 05, 2024', 
      status: 'Published', 
      author: 'Admin', 
      target: 'Budding CEOs',
      views: '842'
    },
  ]);

  const renderContent = () => {
    if (isLoading) return <AdminLoadingState />;
    
    if (isEditorOpen) {
      return (
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsEditorOpen(false)}
              className="flex items-center gap-2 text-muted hover:text-foreground transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-muted/5 flex items-center justify-center group-hover:bg-muted/10">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium uppercase tracking-widest">Back to List</span>
            </button>
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="gap-2">
                <Eye className="w-4 h-4" /> Preview
              </Button>
              <Button variant="primary" className="gap-2">
                Publish Announcement
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-medium text-muted uppercase tracking-widest">Announcement Title</label>
                <input 
                  type="text" 
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  placeholder="Enter a compelling title..." 
                  className="w-full text-4xl font-display font-medium bg-transparent border-none outline-none placeholder:text-muted/30"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-medium text-muted uppercase tracking-widest">Content Body</label>
                <AdminRichTextEditor value={editorContent} onChange={setEditorContent} />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-medium text-muted uppercase tracking-widest">Media Assets</label>
                <AdminMediaUpload />
              </div>
            </div>

            <div className="space-y-8">
              <Card className="p-8 space-y-8">
                <h3 className="text-xl font-display font-medium text-foreground">Publishing Controls</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Status</label>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/5 border border-border">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium text-foreground">Draft</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Target Community</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all">
                      <option>All Communities</option>
                      <option>Better Man</option>
                      <option>Innovation Lab</option>
                      <option>Budding CEOs</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Scheduling</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input 
                        type="datetime-local" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Category / Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['Event', 'Update', 'Resource'].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium uppercase tracking-widest flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Add a tag..." 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all" 
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-border space-y-3">
                  <Button variant="secondary" className="w-full">Save as Draft</Button>
                  <Button variant="ghost" className="w-full text-rose-500 hover:bg-rose-500/10">Discard Changes</Button>
                </div>
              </Card>

              <Card className="p-8 bg-surface border-dashed border-2 border-border">
                <h3 className="text-lg font-display font-medium text-foreground mb-4">Live Preview</h3>
                <div className="aspect-[4/3] rounded-2xl bg-muted/5 border border-border flex items-center justify-center text-center p-6">
                  <div className="space-y-2">
                    <Eye className="w-8 h-8 text-muted mx-auto mb-2" />
                    <p className="text-xs font-medium text-muted uppercase tracking-widest">Preview Panel</p>
                    <p className="text-xs text-muted">Your announcement will appear here as members see it.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">Ecosystem Overview</h1>
                <p className="text-muted text-xl font-medium">Welcome back, Admin. Here's the state of the Inner Circle.</p>
              </motion.div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Button variant="secondary" size="lg" className="flex-grow md:flex-grow-0 gap-3">
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Export Report</span>
                </Button>
                <Button variant="primary" size="lg" className="flex-grow md:flex-grow-0 gap-3 ">
                  <Plus className="w-5 h-5" />
                  Add Member
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <Card className="p-10 group hover:border-brand-primary/30 transition-all duration-500 shadow-premium hover:shadow-premium-hover relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -mr-12 -mt-12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-700  shadow-brand-primary/0 group-hover:">
                        <stat.icon className="w-7 h-7" />
                      </div>
                      <div className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest border",
                        stat.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : stat.trend === 'down' ? 'text-rose-500 bg-rose-500/10 border-rose-500/20' : 'text-muted bg-muted/10 border-border'
                      )}>
                        {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : stat.trend === 'down' ? <ArrowDownRight className="w-3.5 h-3.5" /> : null}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-muted text-xs font-medium uppercase tracking-widest mb-3 relative z-10">{stat.label}</p>
                    <p className="text-4xl font-display font-medium text-foreground tracking-tight relative z-10">{stat.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts & Activity Grid */}
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Membership Growth Chart */}
              <div className="lg:col-span-2">
                <Card className="p-10 h-full shadow-premium">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="font-display font-medium text-2xl tracking-tight">Membership Growth</h3>
                      <p className="text-muted text-sm font-medium mt-1">Real-time ecosystem expansion metrics.</p>
                    </div>
                    <select className="bg-muted/5 border border-border rounded-xl px-4 py-2 text-xs font-medium text-muted uppercase tracking-widest outline-none focus:border-brand-primary/30 transition-all">
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                    </select>
                  </div>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#166D9C" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#166D9C" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em' }} 
                          dy={15}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--color-surface)', 
                            borderRadius: '1.5rem', 
                            border: '1px solid var(--color-border)',
                            boxShadow: 'var(--shadow-premium)',
                            padding: '1.5rem'
                          }} 
                          itemStyle={{ fontWeight: 500, fontSize: '14px' }}
                          labelStyle={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px', marginBottom: '0.5rem', color: 'var(--color-muted)' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="members" 
                          stroke="#166D9C" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorMembers)" 
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Recent Activity Feed */}
              <Card className="p-10 shadow-premium">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="font-display font-medium text-2xl tracking-tight">Live Activity</h3>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse  " />
                </div>
                <div className="space-y-8">
                  {[
                    { user: 'Alex Rivera', action: 'joined Innovation Lab', time: '2 mins ago', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { user: 'Sarah Chen', action: 'submitted a testimonial', time: '1 hour ago', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { user: 'Marcus Bell', action: 'requested to join Better Man', time: '3 hours ago', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { user: 'Admin', action: 'published an announcement', time: '5 hours ago', icon: Megaphone, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                  ].map((activity, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 group cursor-pointer"
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ", activity.bg, activity.color)}>
                        <activity.icon className="w-6 h-6" />
                      </div>
                      <div className="border-b border-border pb-4 flex-grow group-last:border-0">
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          <span className="font-medium text-foreground">{activity.user}</span> <span className="text-muted">{activity.action}</span>
                        </p>
                        <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1.5">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="secondary" className="w-full mt-10 font-medium uppercase tracking-widest text-xs py-4 rounded-2xl">
                  View Full Audit Log
                </Button>
              </Card>
            </div>

            {/* Performance & Announcements Grid */}
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Community Performance Overview */}
              <Card className="p-10 shadow-premium">
                <h3 className="font-display font-medium text-2xl mb-10 tracking-tight">Ecosystem Performance</h3>
                <div className="h-[250px] w-full mb-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em' }} 
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ 
                          backgroundColor: 'var(--color-surface)', 
                          borderRadius: '1.5rem', 
                          border: '1px solid var(--color-border)',
                          boxShadow: 'var(--shadow-premium)',
                          padding: '1.5rem'
                        }} 
                        itemStyle={{ fontWeight: 500, fontSize: '14px' }}
                        labelStyle={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px', marginBottom: '0.5rem', color: 'var(--color-muted)' }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-5">
                  {performanceData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-border group hover:border-brand-primary/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full " style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }} />
                        <span className="text-xs font-medium text-muted uppercase tracking-widest">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.value} members</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Announcements Summary Panel */}
              <div className="lg:col-span-2">
                <Card className="p-10 h-full shadow-premium">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="font-display font-medium text-2xl tracking-tight">Recent Broadcasts</h3>
                    <Button variant="ghost" size="sm" className="text-brand-primary font-medium uppercase tracking-widest text-xs">Manage All</Button>
                  </div>
                  <div className="space-y-6">
                    {[
                      { title: 'New Onboarding Workflow', date: 'Oct 12, 2024', status: 'Published', views: '1.2k' },
                      { title: 'Community Guidelines Update', date: 'Oct 10, 2024', status: 'Draft', views: '0' },
                      { title: 'Upcoming CEO Summit 2024', date: 'Oct 05, 2024', status: 'Published', views: '842' },
                    ].map((item, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-muted/5 border border-border flex items-center justify-between group hover:border-brand-primary/30 transition-all duration-500 ">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-500">
                            <Megaphone className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="text-lg font-display font-medium text-foreground mb-1 tracking-tight">{item.title}</h3>
                            <p className="text-xs text-muted font-medium uppercase tracking-widest">Created on {item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-center hidden md:block">
                            <p className="text-xs font-medium text-muted uppercase tracking-widest mb-1">Views</p>
                            <p className="text-sm font-medium text-foreground">{item.views}</p>
                          </div>
                          <AdminBadge variant={item.status === 'Published' ? 'success' : 'neutral'}>{item.status}</AdminBadge>
                          <button className="p-3 hover:bg-brand-primary/10 rounded-2xl transition-all text-muted hover:text-brand-primary ">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="primary" size="lg" className="w-full mt-10 gap-3  ">
                    <Plus className="w-5 h-5" /> Create New Broadcast
                  </Button>
                </Card>
              </div>
            </div>

            {/* Quick Actions & System Health */}
            <div className="grid lg:grid-cols-3 gap-10">
              <Card className="p-10 lg:col-span-2 shadow-premium">
                <h3 className="font-display font-medium text-2xl mb-10 tracking-tight">Command Center</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Add Member', icon: Users, color: 'bg-blue-500' },
                    { label: 'New Post', icon: Megaphone, color: 'bg-emerald-500' },
                    { label: 'Review Feedback', icon: MessageSquare, color: 'bg-amber-500' },
                    { label: 'Update Theme', icon: Palette, color: 'bg-purple-500' },
                  ].map((action, i) => (
                    <button key={i} className="flex flex-col items-center gap-4 p-8 rounded-[2rem] border border-border hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all group ">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white  group-hover:scale-110 transition-transform duration-500", action.color)}>
                        <action.icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-medium text-muted uppercase tracking-widest group-hover:text-foreground transition-colors">{action.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-10 shadow-premium">
                <h3 className="font-display font-medium text-2xl mb-10 tracking-tight">System Integrity</h3>
                <div className="space-y-8">
                  {[
                    { label: 'Database', status: 'Healthy', color: 'bg-emerald-500' },
                    { label: 'Auth Service', status: 'Healthy', color: 'bg-emerald-500' },
                    { label: 'Storage', status: 'Warning', color: 'bg-amber-500' },
                    { label: 'API Gateway', status: 'Healthy', color: 'bg-emerald-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-border group hover:border-brand-primary/30 transition-all">
                      <span className="text-xs font-medium text-muted uppercase tracking-widest">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-foreground">{item.status}</span>
                        <div className={cn("w-2.5 h-2.5 rounded-full ", item.color, `shadow-${item.color.split('-')[1]}-500/50`)} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-10 border-t border-border">
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-muted mb-4">
                    <span>Uptime</span>
                    <span className="text-emerald-500">99.9%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/10 rounded-full overflow-hidden ">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '99.9%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500  " 
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'members':
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">Member Ecosystem</h1>
                <p className="text-muted text-xl font-medium">Manage the elite individuals within your communities.</p>
              </motion.div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:w-80 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-brand-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search members..." 
                    className="w-full pl-14 pr-6 py-4 rounded-2xl border border-border bg-surface text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all "
                  />
                </div>
                <Button variant="primary" size="lg" className="gap-3 whitespace-nowrap ">
                  <Plus className="w-5 h-5" /> Add Member
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="flex flex-wrap items-center gap-6 p-8 rounded-[2rem] bg-surface border border-border shadow-premium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted/5 flex items-center justify-center text-muted">
                  <Filter className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-muted uppercase tracking-widest">Refine View:</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <select className="px-6 py-3 rounded-xl border border-border bg-muted/5 text-xs font-medium text-foreground uppercase tracking-widest outline-none focus:border-brand-primary/30 transition-all cursor-pointer">
                  <option>All Communities</option>
                  <option>Better Man</option>
                  <option>Innovation Lab</option>
                  <option>Budding CEOs</option>
                </select>
                <select className="px-6 py-3 rounded-xl border border-border bg-muted/5 text-xs font-medium text-foreground uppercase tracking-widest outline-none focus:border-brand-primary/30 transition-all cursor-pointer">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
                <select className="px-6 py-3 rounded-xl border border-border bg-muted/5 text-xs font-medium text-foreground uppercase tracking-widest outline-none focus:border-brand-primary/30 transition-all cursor-pointer">
                  <option>Joined: Any Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <button className="ml-auto text-xs font-medium text-brand-primary uppercase tracking-widest hover:underline transition-all">Clear All Filters</button>
            </div>

            <div className="space-y-0">
              <AdminTable 
                title="Ecosystem Members"
                columns={['Name', 'Email', 'Community', 'Status', 'Join Date', 'Contact']}
                data={[
                  { name: 'Alex Rivera', email: 'alex@example.com', community: 'Innovation Lab', status: <AdminBadge variant="success">Active</AdminBadge>, joined: 'Mar 12, 2024', contact: '+234 801 234 5678' },
                  { name: 'Sarah Chen', email: 'sarah@example.com', community: 'Budding CEOs', status: <AdminBadge variant="success">Active</AdminBadge>, joined: 'Feb 28, 2024', contact: '+234 802 345 6789' },
                  { name: 'Marcus Bell', email: 'marcus@example.com', community: 'Better Man', status: <AdminBadge variant="warning">Pending</AdminBadge>, joined: 'Apr 01, 2024', contact: '+234 803 456 7890' },
                  { name: 'Elena Gomez', email: 'elena@example.com', community: 'Innovation Lab', status: <AdminBadge variant="success">Active</AdminBadge>, joined: 'Jan 15, 2024', contact: '+234 804 567 8901' },
                  { name: 'David Okafor', email: 'david@example.com', community: 'Budding CEOs', status: <AdminBadge variant="error">Suspended</AdminBadge>, joined: 'Dec 10, 2023', contact: '+234 805 678 9012' },
                ]}
                actions
                selectable
              />
              <AdminPagination currentPage={1} totalPages={12} />
            </div>

            {/* Member Detail Drawer Placeholder */}
            <AdminDrawer 
              isOpen={false} 
              onClose={() => {}} 
              title="Member Intelligence"
            >
              <div className="space-y-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-4xl font-display font-medium mb-6  relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    AR
                  </div>
                  <h4 className="text-2xl font-display font-medium text-foreground tracking-tight">Alex Rivera</h4>
                  <p className="text-muted font-medium mt-1">alex@example.com</p>
                  <div className="mt-6">
                    <AdminBadge variant="success">Active Tier</AdminBadge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-muted/5 border border-border ">
                    <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2">Ecosystem</p>
                    <p className="font-medium text-foreground">Innovation Lab</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-muted/5 border border-border ">
                    <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2">Onboarded</p>
                    <p className="font-medium text-foreground">Mar 12, 2024</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-xs font-medium text-muted uppercase tracking-widest">Communication Channels</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-border group hover:border-brand-primary/30 transition-all">
                      <span className="text-sm font-medium text-muted">Primary Phone</span>
                      <span className="text-sm font-medium text-foreground">+234 801 234 5678</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-border group hover:border-brand-primary/30 transition-all">
                      <span className="text-sm font-medium text-muted">WhatsApp Status</span>
                      <span className="text-sm font-medium text-brand-primary flex items-center gap-2">
                        Connected <div className="w-2 h-2 rounded-full bg-emerald-500  " />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border flex gap-3">
                  <Button variant="secondary" className="flex-grow">Edit Profile</Button>
                  <Button variant="ghost" className="text-rose-500 hover:bg-rose-500/10">Suspend</Button>
                </div>
              </div>
            </AdminDrawer>
          </div>
        );
      case 'communities':
        return (
          <div className="space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">Communities</h1>
                <p className="text-muted text-xl font-medium">Orchestrate your flagship ecosystems and monitor their impact.</p>
              </motion.div>
              <Button variant="primary" size="lg" className="gap-3  w-full md:w-auto">
                <Plus className="w-5 h-5" /> Create New Ecosystem
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {[
                { 
                  title: 'Better Man', 
                  lead: 'John Doe', 
                  price: '₦15,000', 
                  members: 142, 
                  revenue: '₦2,130,000', 
                  status: 'Active', 
                  icon: Users, 
                  color: 'text-rose-500', 
                  bg: 'bg-rose-500/10',
                  growth: '+12% this month'
                },
                { 
                  title: 'Innovation Lab', 
                  lead: 'Sarah Chen', 
                  price: '₦20,500', 
                  members: 86, 
                  revenue: '₦1,763,000', 
                  status: 'Active', 
                  icon: Zap, 
                  color: 'text-blue-500', 
                  bg: 'bg-blue-500/10',
                  growth: '+8% this month'
                },
                { 
                  title: 'Budding CEOs', 
                  lead: 'Marcus Bell', 
                  price: '₦28,000', 
                  members: 54, 
                  revenue: '₦1,512,000', 
                  status: 'Active', 
                  icon: Star, 
                  color: 'text-purple-500', 
                  bg: 'bg-purple-500/10',
                  growth: '+15% this month'
                },
              ].map((community, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <Card className="p-10 group hover:border-brand-primary/30 transition-all duration-500 flex flex-col h-full shadow-premium hover:shadow-premium-hover relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center  transition-transform duration-500 group-hover:scale-110", community.bg, community.color)}>
                        <community.icon className="w-8 h-8" />
                      </div>
                      <AdminBadge variant="success">{community.status}</AdminBadge>
                    </div>
                    
                    <div className="mb-10 relative z-10">
                      <h3 className="text-3xl font-display font-medium text-foreground mb-3 tracking-tight">{community.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted font-medium">
                        <div className="w-8 h-8 rounded-full bg-muted/10 flex items-center justify-center text-xs font-medium">
                          {community.lead.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>Lead: <span className="font-medium text-foreground">{community.lead}</span></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10 relative z-10">
                      <div className="p-6 rounded-2xl bg-muted/5 border border-border  group-hover:bg-brand-primary/5 transition-colors duration-500">
                        <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2">Members</p>
                        <p className="text-2xl font-display font-medium text-foreground tracking-tight">{community.members}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-muted/5 border border-border  group-hover:bg-brand-primary/5 transition-colors duration-500">
                        <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2">Price</p>
                        <p className="text-2xl font-display font-medium text-foreground tracking-tight">{community.price}</p>
                      </div>
                    </div>

                    <div className="space-y-5 mb-10 relative z-10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted font-medium">Monthly Revenue</span>
                        <span className="font-medium text-foreground text-lg tracking-tight">{community.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted font-medium">Growth Rate</span>
                        <span className="font-medium text-emerald-500 flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full text-xs">
                          <TrendingUp className="w-3 h-3" /> {community.growth}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-border flex gap-4 relative z-10">
                      <Button variant="secondary" size="lg" className="flex-grow gap-3 font-medium">
                        <Edit2 className="w-5 h-5" /> Edit Ecosystem
                      </Button>
                      <Button variant="secondary" size="lg" className="px-5 hover:bg-muted/10">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Performance Summary Section */}
            <div className="grid lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Card className="p-10 shadow-premium">
                  <h3 className="text-2xl font-display font-medium text-foreground mb-10 tracking-tight">Ecosystem Health</h3>
                  <div className="space-y-8">
                    {[
                      { label: 'Better Man Retention', value: '94%', trend: '+2%', progress: 94 },
                      { label: 'Innovation Lab Engagement', value: '82%', trend: '+5%', progress: 82 },
                      { label: 'Budding CEOs Conversion', value: '12%', trend: '-1%', progress: 12 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted uppercase tracking-widest">{item.label}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-medium text-foreground tracking-tight">{item.value}</span>
                            <span className={cn(
                              "text-xs font-medium px-2 py-0.5 rounded-full",
                              item.trend.startsWith('+') ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                            )}>{item.trend}</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-muted/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ delay: 0.6 + (i * 0.1), duration: 1 }}
                            className={cn(
                              "h-full rounded-full",
                              item.progress > 80 ? "bg-emerald-500" : item.progress > 50 ? "bg-brand-primary" : "bg-amber-500"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Card className="p-10 bg-surface border-dashed border-2 border-border flex flex-col items-center justify-center text-center group hover:border-brand-primary/30 transition-all duration-500 cursor-pointer h-full shadow-premium hover:shadow-premium-hover">
                  <div className="w-20 h-20 rounded-3xl bg-muted/5 flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ">
                    <Plus className="w-10 h-10 text-muted group-hover:text-brand-primary transition-all duration-500" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-foreground mb-3 tracking-tight">Launch New Ecosystem</h3>
                  <p className="text-muted max-w-[280px] font-medium leading-relaxed">Expand The Inner Circle ecosystem with a new specialized community and elite resources.</p>
                </Card>
              </motion.div>
            </div>

            {/* Community Detail Panel Placeholder */}
            <AdminDrawer 
              isOpen={false} 
              onClose={() => {}} 
              title="Community Details"
            >
              <div className="space-y-10">
                <div className="p-8 rounded-[2rem] bg-brand-primary/5 border border-brand-primary/10 flex items-center gap-6 ">
                  <div className="w-20 h-20 rounded-2xl bg-brand-primary flex items-center justify-center text-white  ">
                    <Zap className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-medium text-foreground mb-1 tracking-tight">Innovation Lab</h4>
                    <AdminBadge variant="success">Active Ecosystem</AdminBadge>
                  </div>
                </div>

                <div className="space-y-8">
                  <h5 className="text-xs font-medium text-muted uppercase tracking-widest">Performance Metrics</h5>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-muted/5 border border-border ">
                      <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2">Avg. Engagement</p>
                      <p className="text-2xl font-display font-medium text-foreground tracking-tight">84%</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/5 border border-border ">
                      <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2">Churn Rate</p>
                      <p className="text-2xl font-display font-medium text-foreground tracking-tight">2.4%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-xs font-medium text-muted uppercase tracking-widest">Community Lead</h5>
                  <div className="flex items-center gap-5 p-6 rounded-2xl bg-muted/5 border border-border ">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-display font-medium text-xl">SC</div>
                    <div>
                      <p className="font-display font-medium text-lg text-foreground tracking-tight">Sarah Chen</p>
                      <p className="text-xs text-muted font-medium uppercase tracking-widest">Senior Innovation Strategist</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-border flex gap-4">
                  <Button variant="primary" size="lg" className="flex-grow  ">Manage Members</Button>
                  <Button variant="secondary" size="lg">Settings</Button>
                </div>
              </div>
            </AdminDrawer>

            {/* Add/Update Community Modal Placeholder */}
            <AdminModal 
              isOpen={false} 
              onClose={() => {}} 
              title="Create New Community"
            >
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Community Name</label>
                    <input type="text" placeholder="e.g. Creative Collective" className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Monthly Price (₦)</label>
                    <input type="number" placeholder="0.00" className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-muted uppercase tracking-widest">Community Lead</label>
                  <select className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium">
                    <option>Select a lead...</option>
                    <option>John Doe</option>
                    <option>Sarah Chen</option>
                    <option>Marcus Bell</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-muted uppercase tracking-widest">Description</label>
                  <textarea rows={5} placeholder="Describe the purpose of this community..." className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none font-medium leading-relaxed" />
                </div>
                <div className="pt-8 flex gap-6">
                  <Button variant="primary" size="lg" className="flex-grow  ">Create Community</Button>
                  <Button variant="secondary" size="lg" className="flex-grow">Cancel</Button>
                </div>
              </div>
            </AdminModal>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">Announcements</h1>
                <p className="text-muted text-xl font-medium">Broadcast elite updates and resources to your ecosystems.</p>
              </motion.div>
              <div className="flex gap-4 w-full md:w-auto">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="flex-grow md:flex-grow-0 text-rose-500 hover:bg-rose-500/10 border-rose-500/20"
                  onClick={() => setAnnouncements([])}
                >
                  Clear All
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="flex-grow md:flex-grow-0 gap-3"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setAnnouncements([
                        { 
                          title: 'New Onboarding Workflow', 
                          date: 'Oct 12, 2024', 
                          status: 'Published', 
                          author: 'Admin', 
                          target: 'All Communities',
                          views: '1,242'
                        },
                        { 
                          title: 'Community Guidelines Update', 
                          date: 'Oct 10, 2024', 
                          status: 'Draft', 
                          author: 'Admin', 
                          target: 'Better Man',
                          views: '0'
                        },
                        { 
                          title: 'Upcoming CEO Summit 2024', 
                          date: 'Oct 05, 2024', 
                          status: 'Published', 
                          author: 'Admin', 
                          target: 'Budding CEOs',
                          views: '842'
                        },
                      ]);
                      setIsLoading(false);
                    }, 1000);
                  }}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-grow md:flex-grow-0 gap-3 "
                  onClick={() => {
                    setEditorTitle('');
                    setEditorContent('');
                    setIsEditorOpen(true);
                  }}
                >
                  <Plus className="w-5 h-5" /> New Broadcast
                </Button>
              </div>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { label: 'Total Published', value: announcements.filter(a => a.status === 'Published').length.toString(), icon: Megaphone, color: 'text-brand-primary' },
                { label: 'Drafts', value: announcements.filter(a => a.status === 'Draft').length.toString(), icon: Edit2, color: 'text-amber-500' },
                { label: 'Total Views', value: announcements.reduce((acc, a) => acc + parseInt(a.views.replace(',', '')), 0).toLocaleString(), icon: TrendingUp, color: 'text-emerald-500' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <Card className="p-10 shadow-premium hover:shadow-premium-hover transition-all duration-500 group">
                    <div className={cn("w-14 h-14 rounded-2xl bg-muted/5 flex items-center justify-center mb-8 transition-all group-hover:scale-110", stat.color)}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <p className="text-muted text-xs font-medium uppercase tracking-widest mb-3">{stat.label}</p>
                    <p className="text-4xl font-display font-medium text-foreground tracking-tight">{stat.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              {announcements.length === 0 ? (
                <AdminEmptyState 
                  title="No Announcements Yet" 
                  description="Start broadcasting to your community members by creating your first announcement."
                  actionLabel="Create Announcement"
                  onAction={() => setIsEditorOpen(true)}
                />
              ) : announcements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <div className="p-8 rounded-[2rem] bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-brand-primary/30 transition-all duration-500 shadow-premium hover:shadow-premium-hover relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="flex items-center gap-8 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0  group-hover:scale-110 transition-transform duration-500">
                        <Megaphone className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-medium text-foreground mb-2 tracking-tight">{item.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted uppercase tracking-widest">
                          <span className="flex items-center gap-2 bg-muted/5 px-3 py-1 rounded-full"><Clock className="w-3 h-3" /> {item.date}</span>
                          <span className="flex items-center gap-2 bg-muted/5 px-3 py-1 rounded-full"><Users className="w-3 h-3" /> {item.target}</span>
                          <span className="flex items-center gap-2 bg-muted/5 px-3 py-1 rounded-full text-emerald-500"><TrendingUp className="w-3 h-3" /> {item.views} views</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-6 md:pt-0 border-border relative z-10">
                      <AdminBadge variant={item.status === 'Published' ? 'success' : 'neutral'}>{item.status}</AdminBadge>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setEditorTitle(item.title);
                            setEditorContent('This is the content for ' + item.title);
                            setIsEditorOpen(true);
                          }}
                          className="p-3 hover:bg-brand-primary/10 rounded-2xl transition-all text-muted hover:text-brand-primary "
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 hover:bg-rose-500/10 rounded-2xl transition-all text-muted hover:text-rose-500 ">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 hover:bg-muted/10 rounded-2xl transition-all text-muted hover:text-foreground ">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Create Announcement Modal Placeholder */}
            <AdminModal 
              isOpen={false} 
              onClose={() => {}} 
              title="Create Announcement"
            >
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-medium text-muted uppercase tracking-widest">Broadcast Title</label>
                  <input type="text" placeholder="Enter announcement title..." className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Target Community</label>
                    <select className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium">
                      <option>All Communities</option>
                      <option>Better Man</option>
                      <option>Innovation Lab</option>
                      <option>Budding CEOs</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Schedule (Optional)</label>
                    <input type="datetime-local" className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-muted uppercase tracking-widest">Content</label>
                  <textarea rows={8} placeholder="Write your announcement here..." className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none font-medium leading-relaxed" />
                </div>
                <div className="flex items-center gap-5 p-6 rounded-3xl bg-brand-primary/5 border border-brand-primary/10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary ">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-muted leading-relaxed font-medium">
                    This announcement will be sent as a high-priority notification to all members in the target ecosystem.
                  </p>
                </div>
                <div className="pt-8 flex gap-6">
                  <Button variant="primary" size="lg" className="flex-grow  ">Publish Now</Button>
                  <Button variant="secondary" size="lg" className="flex-grow">Save as Draft</Button>
                </div>
              </div>
            </AdminModal>
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">Social Proof</h1>
                <p className="text-muted text-xl font-medium">Curate the impact stories that define the Inner Circle.</p>
              </motion.div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="flex-grow md:flex-grow-0 text-rose-500 hover:bg-rose-500/10 border-rose-500/20"
                  onClick={() => setTestimonials([])}
                >
                  Clear All
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="flex-grow md:flex-grow-0 gap-3"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setTestimonials([
                        { 
                          name: 'Alex Rivera', 
                          community: 'Innovation Lab', 
                          status: 'Pending', 
                          content: 'The Inner Circle has completely transformed how I approach my creative work. The discipline and community support are unmatched.',
                          date: '2 hours ago',
                          rating: 5,
                          featured: false
                        },
                        { 
                          name: 'Sarah Chen', 
                          community: 'Budding CEOs', 
                          status: 'Approved', 
                          content: 'Being part of this ecosystem has opened doors I never thought possible. The networking alone is worth 10x the price.',
                          date: '1 day ago',
                          rating: 5,
                          featured: true
                        },
                        { 
                          name: 'Marcus Bell', 
                          community: 'Better Man', 
                          status: 'Pending', 
                          content: 'I finally found a group of men who hold me accountable and push me to be my best self every single day.',
                          date: '3 days ago',
                          rating: 4,
                          featured: false
                        },
                        { 
                          name: 'Elena Gomez', 
                          community: 'Innovation Lab', 
                          status: 'Approved', 
                          content: 'The resources provided here are world-class. I have grown more in 3 months than I did in the previous 3 years.',
                          date: '1 week ago',
                          rating: 5,
                          featured: false
                        },
                      ]);
                      setIsLoading(false);
                    }, 1000);
                  }}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                <Button variant="primary" size="lg" className="flex-grow md:flex-grow-0 gap-3 " onClick={() => setIsTestimonialModalOpen(true)}>
                  <Plus className="w-5 h-5" />
                  Add Manual
                </Button>
              </div>
            </div>

            {/* Testimonial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Total Stories', value: testimonials.length.toString(), icon: MessageSquare, color: 'text-brand-primary' },
                { label: 'Pending Approval', value: testimonials.filter(t => t.status === 'Pending').length.toString(), icon: Clock, color: 'text-amber-500' },
                { label: 'Featured', value: testimonials.filter(t => t.featured).length.toString(), icon: Star, color: 'text-purple-500' },
                { label: 'Avg. Rating', value: (testimonials.reduce((acc, t) => acc + t.rating, 0) / (testimonials.length || 1)).toFixed(1), icon: Star, color: 'text-emerald-500' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <Card className="p-10 shadow-premium hover:shadow-premium-hover transition-all duration-500 group">
                    <div className={cn("w-14 h-14 rounded-2xl bg-muted/5 flex items-center justify-center mb-8 transition-all group-hover:scale-110", stat.color)}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <p className="text-muted text-xs font-medium uppercase tracking-widest mb-3">{stat.label}</p>
                    <p className="text-4xl font-display font-medium text-foreground tracking-tight">{stat.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {testimonials.length === 0 ? (
                <div className="md:col-span-2">
                  <AdminEmptyState 
                    title="No Testimonials Found" 
                    description="There are currently no testimonials to moderate. Encourage your members to share their stories."
                    actionLabel="Add Testimonial"
                    onAction={() => setIsTestimonialModalOpen(true)}
                  />
                </div>
              ) : testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <Card className="p-10 space-y-8 group hover:border-brand-primary/30 transition-all duration-500 shadow-premium hover:shadow-premium-hover relative overflow-hidden">
                    {testimonial.featured && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                    )}
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-display font-medium text-2xl ">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-display font-medium text-xl text-foreground tracking-tight">{testimonial.name}</h4>
                          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">{testimonial.community} • {testimonial.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {testimonial.featured && (
                          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500  " title="Featured">
                            <Star className="w-5 h-5 fill-purple-500" />
                          </div>
                        )}
                        <AdminBadge variant={testimonial.status === 'Approved' ? 'success' : 'warning'}>
                          {testimonial.status}
                        </AdminBadge>
                      </div>
                    </div>

                    <div className="flex gap-1.5 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-5 h-5 transition-all duration-500", i < testimonial.rating ? "text-amber-400 fill-amber-400 scale-110" : "text-muted/20")} />
                      ))}
                    </div>

                    <p className="text-muted italic text-lg leading-relaxed relative z-10 font-medium">
                      "{testimonial.content}"
                    </p>

                    <div className="flex gap-4 pt-8 border-t border-border relative z-10">
                      {testimonial.status === 'Pending' ? (
                        <>
                          <Button 
                            variant="primary" 
                            size="lg" 
                            className="flex-grow gap-3  "
                            onClick={() => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[i].status = 'Approved';
                              setTestimonials(newTestimonials);
                            }}
                          >
                            <CheckCircle className="w-5 h-5" /> Approve Story
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="lg" 
                            className="flex-grow gap-3 text-rose-500 hover:bg-rose-500/10 border-rose-500/20"
                            onClick={() => {
                              const newTestimonials = testimonials.filter((_, idx) => idx !== i);
                              setTestimonials(newTestimonials);
                            }}
                          >
                            <XCircle className="w-5 h-5" /> Reject
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant={testimonial.featured ? "primary" : "secondary"} 
                            size="lg" 
                            className={cn("flex-grow gap-3 transition-all", testimonial.featured && " ")}
                            onClick={() => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[i].featured = !newTestimonials[i].featured;
                              setTestimonials(newTestimonials);
                            }}
                          >
                            <Star className={cn("w-5 h-5", testimonial.featured && "fill-white")} /> 
                            {testimonial.featured ? 'Unfeature' : 'Feature Story'}
                          </Button>
                          <Button variant="secondary" size="lg" className="px-5 hover:bg-muted/10">
                            <Edit2 className="w-5 h-5" />
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="lg" 
                            className="px-5 hover:bg-rose-500/10 text-rose-500 border-rose-500/20"
                            onClick={() => {
                              const newTestimonials = testimonials.filter((_, idx) => idx !== i);
                              setTestimonials(newTestimonials);
                            }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Add/Edit Testimonial Modal */}
            <AdminModal
              isOpen={isTestimonialModalOpen}
              onClose={() => setIsTestimonialModalOpen(false)}
              title="Add Community Testimonial"
            >
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Member Name</label>
                    <input type="text" placeholder="e.g. John Doe" className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted uppercase tracking-widest">Community</label>
                    <select className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium">
                      <option>Better Man</option>
                      <option>Innovation Lab</option>
                      <option>Budding CEOs</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-medium text-muted uppercase tracking-widest">Rating</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center hover:bg-brand-primary/5 hover:border-brand-primary/30 transition-all text-amber-400">
                        <Star className="w-8 h-8" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-medium text-muted uppercase tracking-widest">Testimonial Content</label>
                  <textarea rows={5} placeholder="What did the member say?" className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none font-medium leading-relaxed" />
                </div>

                <div className="flex items-center gap-5 p-6 rounded-3xl bg-brand-primary/5 border border-brand-primary/10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary ">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-muted leading-relaxed font-medium">
                    Testimonials added manually are automatically marked as <span className="font-medium text-foreground">Approved</span> and can be featured immediately.
                  </p>
                </div>

                <div className="pt-8 flex gap-6">
                  <Button variant="primary" size="lg" className="flex-grow  " onClick={() => setIsTestimonialModalOpen(false)}>Save Testimonial</Button>
                  <Button variant="secondary" size="lg" className="flex-grow" onClick={() => setIsTestimonialModalOpen(false)}>Cancel</Button>
                </div>
              </div>
            </AdminModal>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">Design System</h1>
                <p className="text-muted text-xl font-medium">Control the visual identity of your elite ecosystem.</p>
              </motion.div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => setThemeSettings({
                    primaryColor: '#166D9C',
                    deepColor: '#0F5C85',
                    borderRadius: 'xl',
                    buttonStyle: 'pill',
                    cardStyle: 'glass',
                    displayFont: 'Outfit',
                    bodyFont: 'Inter',
                    enableGlass: true,
                    enableMotion: true,
                    enableShadows: true,
                  })}
                >
                  Reset to Defaults
                </Button>
                <Button variant="primary" size="lg" className="">Publish Changes</Button>
              </div>
            </div>

            {/* Settings Tabs */}
            <div className="flex items-center gap-10 border-b border-border mb-12 overflow-x-auto no-scrollbar">
              {[
                { id: 'brand', label: 'Brand & Colors' },
                { id: 'identity', label: 'Site Identity' },
                { id: 'typography', label: 'Typography' },
                { id: 'components', label: 'Component Styles' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id)}
                  className={cn(
                    "pb-5 text-xs font-medium uppercase tracking-widest transition-all relative whitespace-nowrap",
                    settingsTab === tab.id ? "text-brand-primary" : "text-muted hover:text-foreground"
                  )}
                >
                  {tab.label}
                  {settingsTab === tab.id && (
                    <motion.div 
                      layoutId="settingsTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" 
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <AnimatePresence mode="wait">
                  {settingsTab === 'brand' && (
                    <motion.div
                      key="brand"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-12"
                    >
                      <Card className="p-10 space-y-10 shadow-premium">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Palette className="w-5 h-5" />
                          </div>
                          <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Brand Colors</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10">
                          <div className="space-y-5">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Primary Brand Color</label>
                            <div className="flex items-center gap-5">
                              <div className="relative group">
                                <input 
                                  type="color" 
                                  value={themeSettings.primaryColor}
                                  onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                                  className="w-16 h-16 rounded-2xl border border-border cursor-pointer bg-transparent overflow-hidden" 
                                />
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-primary/30 pointer-events-none transition-all" />
                              </div>
                              <input 
                                type="text" 
                                value={themeSettings.primaryColor}
                                onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                                className="flex-grow px-6 py-4 rounded-2xl border border-border bg-muted/5 font-mono text-sm focus:border-brand-primary/30 outline-none transition-all" 
                              />
                            </div>
                          </div>
                          <div className="space-y-5">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Deep Brand Color</label>
                            <div className="flex items-center gap-5">
                              <div className="relative group">
                                <input 
                                  type="color" 
                                  value={themeSettings.deepColor}
                                  onChange={(e) => setThemeSettings({...themeSettings, deepColor: e.target.value})}
                                  className="w-16 h-16 rounded-2xl border border-border cursor-pointer bg-transparent overflow-hidden" 
                                />
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-primary/30 pointer-events-none transition-all" />
                              </div>
                              <input 
                                type="text" 
                                value={themeSettings.deepColor}
                                onChange={(e) => setThemeSettings({...themeSettings, deepColor: e.target.value})}
                                className="flex-grow px-6 py-4 rounded-2xl border border-border bg-muted/5 font-mono text-sm focus:border-brand-primary/30 outline-none transition-all" 
                              />
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-10 space-y-10 shadow-premium">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Zap className="w-5 h-5" />
                          </div>
                          <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Theme Mode</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <button className="p-8 rounded-3xl border-2 border-brand-primary bg-brand-primary/5 flex flex-col items-center gap-6 transition-all group hover:bg-brand-primary/10">
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform">
                              <Sun className="w-8 h-8 text-brand-primary" />
                            </div>
                            <span className="text-sm font-medium text-foreground uppercase tracking-widest">Light Mode</span>
                          </button>
                          <button className="p-8 rounded-3xl border border-border bg-muted/5 flex flex-col items-center gap-6 hover:border-brand-primary/30 transition-all group hover:bg-muted/10">
                            <div className="w-16 h-16 rounded-2xl bg-[#0B1220] flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform">
                              <Moon className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm font-medium text-muted uppercase tracking-widest">Dark Mode</span>
                          </button>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {settingsTab === 'identity' && (
                    <motion.div
                      key="identity"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-12"
                    >
                      <Card className="p-10 space-y-10 shadow-premium">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Image className="w-5 h-5" />
                          </div>
                          <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Logos & Assets</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10">
                          <div className="space-y-5">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Main Logo (Light)</label>
                            <div className="h-48 rounded-3xl border-2 border-border flex flex-col items-center justify-center bg-white group hover:border-brand-primary/30 transition-all cursor-pointer relative overflow-hidden">
                              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-all" />
                              <img src="/logo1.jpeg" alt="Main Logo (Light)" className="w-24 h-24 object-contain mb-3 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-muted uppercase tracking-widest">Change Image</span>
                            </div>
                          </div>
                          <div className="space-y-5">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Main Logo (Dark)</label>
                            <div className="h-48 rounded-3xl border-2 border-border flex flex-col items-center justify-center bg-[#0B1220] group hover:border-brand-primary/30 transition-all cursor-pointer relative overflow-hidden">
                              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-all" />
                              <img src="/logo2.jpeg" alt="Main Logo (Dark)" className="w-24 h-24 object-contain mb-3 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-muted uppercase tracking-widest">Change Image</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-10 border-t border-border">
                          <div className="space-y-6">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Favicon (32x32)</label>
                            <div className="flex items-center gap-8">
                              <div className="w-20 h-20 rounded-2xl border border-border bg-muted/5 flex items-center justify-center ">
                                <span className="text-3xl">💎</span>
                              </div>
                              <div className="space-y-3">
                                <Button variant="secondary" size="lg">Replace Favicon</Button>
                                <p className="text-xs text-muted font-medium">Recommended: 32x32px .ico or .png format</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {settingsTab === 'typography' && (
                    <motion.div
                      key="typography"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-12"
                    >
                      <Card className="p-10 space-y-10 shadow-premium">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Type className="w-5 h-5" />
                          </div>
                          <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Typography System</h3>
                        </div>
                        <div className="space-y-10">
                          <div className="space-y-5">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Display Font (Headings)</label>
                            <select 
                              value={themeSettings.displayFont}
                              onChange={(e) => setThemeSettings({...themeSettings, displayFont: e.target.value})}
                              className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                            >
                              <option>Outfit</option>
                              <option>Space Grotesk</option>
                              <option>Playfair Display</option>
                              <option>Inter</option>
                            </select>
                          </div>
                          <div className="space-y-5">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Body Font (Text)</label>
                            <select 
                              value={themeSettings.bodyFont}
                              onChange={(e) => setThemeSettings({...themeSettings, bodyFont: e.target.value})}
                              className="w-full px-6 py-4 rounded-2xl border border-border bg-muted/5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                            >
                              <option>Inter</option>
                              <option>Outfit</option>
                              <option>Roboto</option>
                              <option>System Default</option>
                            </select>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {settingsTab === 'components' && (
                    <motion.div
                      key="components"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-12"
                    >
                      <Card className="p-10 space-y-10 shadow-premium">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Box className="w-5 h-5" />
                          </div>
                          <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Component Styles</h3>
                        </div>
                        <div className="space-y-12">
                          <div className="space-y-6">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Button Style</label>
                            <div className="grid grid-cols-3 gap-6">
                              {['sharp', 'rounded', 'pill'].map((style) => (
                                <button 
                                  key={style}
                                  onClick={() => setThemeSettings({...themeSettings, buttonStyle: style as any})}
                                  className={cn(
                                    "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group",
                                    themeSettings.buttonStyle === style ? "border-brand-primary bg-brand-primary/5" : "border-border bg-muted/5 hover:border-brand-primary/30"
                                  )}
                                >
                                  <div className={cn(
                                    "h-10 w-20 bg-brand-primary   transition-transform group-hover:scale-110",
                                    style === 'sharp' ? 'rounded-none' : style === 'rounded' ? 'rounded-xl' : 'rounded-full'
                                  )} />
                                  <span className="text-xs font-medium uppercase tracking-widest">{style}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <label className="text-xs font-medium text-muted uppercase tracking-widest">Card Style</label>
                            <div className="grid grid-cols-3 gap-6">
                              {['flat', 'shadow', 'glass'].map((style) => (
                                <button 
                                  key={style}
                                  onClick={() => setThemeSettings({...themeSettings, cardStyle: style as any})}
                                  className={cn(
                                    "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group",
                                    themeSettings.cardStyle === style ? "border-brand-primary bg-brand-primary/5" : "border-border bg-muted/5 hover:border-brand-primary/30"
                                  )}
                                >
                                  <div className={cn(
                                    "h-16 w-16 rounded-xl transition-transform group-hover:scale-110",
                                    style === 'flat' ? 'bg-muted/10 border border-border' : style === 'shadow' ? 'bg-surface shadow-premium' : 'bg-surface/50 backdrop-blur-md border border-white/20 shadow-premium'
                                  )} />
                                  <span className="text-xs font-medium uppercase tracking-widest">{style}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-12">
                <Card className="p-10 sticky top-12 shadow-premium border-brand-primary/10">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-display font-medium text-foreground tracking-tight">Live Preview</h3>
                    <AdminBadge variant="primary">Real-time</AdminBadge>
                  </div>

                  <div className="space-y-10 p-10 rounded-3xl border border-border bg-muted/5 relative overflow-hidden ">
                    {/* Simulated App Preview */}
                    <div className="space-y-8 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl  " style={{ backgroundColor: themeSettings.primaryColor }} />
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-muted/20" />
                          <div className="w-5 h-5 rounded-full bg-muted/20" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-3xl font-medium text-foreground leading-tight tracking-tight" style={{ fontFamily: themeSettings.displayFont }}>
                          Build Your Legacy
                        </h4>
                        <p className="text-xs text-muted leading-relaxed font-medium" style={{ fontFamily: themeSettings.bodyFont }}>
                          Join the most exclusive ecosystem for high-impact leaders and innovators.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          className={cn(
                            "px-8 py-3 text-xs font-medium text-white transition-all uppercase tracking-widest   ",
                            themeSettings.buttonStyle === 'sharp' ? 'rounded-none' : themeSettings.buttonStyle === 'rounded' ? 'rounded-2xl' : 'rounded-full'
                          )}
                          style={{ backgroundColor: themeSettings.primaryColor }}
                        >
                          Join Now
                        </button>
                        <button 
                          className={cn(
                            "px-8 py-3 text-xs font-medium text-foreground border border-border transition-all uppercase tracking-widest hover:bg-muted/5 ",
                            themeSettings.buttonStyle === 'sharp' ? 'rounded-none' : themeSettings.buttonStyle === 'rounded' ? 'rounded-2xl' : 'rounded-full'
                          )}
                        >
                          Learn More
                        </button>
                      </div>

                      <div className={cn(
                        "p-8 rounded-3xl transition-all",
                        themeSettings.cardStyle === 'flat' ? 'bg-muted/5 border border-border' : themeSettings.cardStyle === 'shadow' ? 'bg-surface shadow-premium' : 'bg-surface/40 backdrop-blur-2xl border border-white/10 shadow-premium'
                      )}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Star className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-medium uppercase tracking-widest text-foreground">Featured Story</span>
                        </div>
                        <p className="text-xs text-muted italic leading-relaxed">"The Inner Circle changed my life. The network is unparalleled."</p>
                      </div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full -mr-24 -mt-24 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/5 rounded-full -ml-24 -mb-24 blur-3xl" />
                  </div>

                  <div className="mt-10 p-6 rounded-3xl bg-brand-primary/5 border border-brand-primary/10 flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-brand-primary flex-shrink-0" />
                    <p className="text-xs text-muted leading-relaxed font-medium">
                      This preview is a high-fidelity simulation. Some visual nuances may vary slightly in the production environment.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      default:
        return <AdminEmptyState title="Coming Soon" description="This section is currently under development." icon={Clock} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileSidebarOpen(false);
        }} 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex-grow flex flex-col min-w-0">
        <AdminTopbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="p-4 md:p-12 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
