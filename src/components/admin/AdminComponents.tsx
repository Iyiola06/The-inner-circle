import React from 'react';
import { Layout } from '../Layout';
import { Card } from '../Card';
import { Button } from '../Button';
import { 
  Users, 
  Settings, 
  LayoutDashboard, 
  CreditCard, 
  Bell, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight,
  Sun,
  Moon,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  LogOut,
  Megaphone,
  MessageSquare,
  Palette,
  X,
  Menu,
  ChevronLeft,
  Download,
  Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/ThemeContext';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar = ({ activeTab, onTabChange, isOpen, onClose }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'members', icon: Users, label: 'Members' },
    { id: 'communities', icon: Users, label: 'Communities' },
    { id: 'content', icon: Megaphone, label: 'Announcements' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'settings', icon: Palette, label: 'Appearance' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "fixed lg:sticky top-0 left-0 z-[70] lg:z-50 w-80 h-screen bg-surface border-r border-border flex flex-col p-8 transition-all duration-500 lg:translate-x-0 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-16 px-2">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-medium text-xl shadow-xl  group-hover:scale-110 transition-transform">
              IC
            </div>
            <div>
              <span className="font-display font-medium text-xl text-foreground block leading-none tracking-tight">Inner Circle</span>
              <span className="text-xs font-medium text-brand-primary uppercase tracking-widest mt-1 block">Admin Portal</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2.5 hover:bg-muted/10 rounded-2xl transition-all"
          >
            <X className="w-6 h-6 text-muted" />
          </button>
        </div>

      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-500 group relative overflow-hidden',
              activeTab === item.id 
                ? 'bg-brand-primary text-white ' 
                : 'text-muted hover:bg-muted/5 hover:text-foreground'
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-500 group-hover:scale-110 relative z-10",
              activeTab === item.id ? "text-white" : "text-muted group-hover:text-brand-primary"
            )} />
            <span className="relative z-10 tracking-tight">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-pill-admin"
                className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white "
              />
            )}
          </button>
        ))}
      </nav>

      <div className="pt-8 border-t border-border space-y-6">
        <div className="flex items-center gap-4 p-4 rounded-[2rem] bg-muted/5 border border-border group hover:border-brand-primary/30 transition-all cursor-pointer">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/admin/100/100" 
              alt="Admin" 
              className="w-12 h-12 rounded-2xl object-cover border border-border group- transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-surface" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-foreground truncate tracking-tight">Admin User</p>
            <p className="text-xs text-muted font-medium uppercase tracking-widest truncate">Super Admin</p>
          </div>
          <button className="ml-auto p-2.5 text-muted hover:text-rose-500 transition-colors rounded-xl hover:bg-rose-500/10">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export const AdminTopbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-24 bg-surface/60 backdrop-blur-2xl border-b border-border px-6 md:px-10 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-grow">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-3 hover:bg-muted/10 rounded-2xl transition-all border border-border"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>
        
        <div className="relative w-full max-w-lg hidden md:block group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search the ecosystem..." 
            className="w-full pl-14 pr-6 py-3.5 rounded-[1.5rem] border border-border bg-muted/5 focus:border-brand-primary focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all text-sm font-medium tracking-tight"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button 
          className="md:hidden p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary"
        >
          <Search className="w-6 h-6" />
        </button>
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        
        <button className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary relative group">
          <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-surface animate-pulse" />
        </button>
        
        <div className="h-10 w-px bg-border mx-2" />
        
        <Button variant="primary" size="md" className="gap-3 ">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Quick Action</span>
        </Button>
      </div>
    </header>
  );
};

export const AdminBadge = ({ children, variant = 'neutral' }: { children: React.ReactNode, variant?: 'success' | 'warning' | 'error' | 'primary' | 'neutral' }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    primary: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
    neutral: 'bg-muted/10 text-muted border-border',
  };

  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider border', styles[variant])}>
      {children}
    </span>
  );
};

export const AdminEmptyState = ({ title, description, icon: Icon, actionLabel, onAction }: { title: string, description: string, icon?: any, actionLabel?: string, onAction?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-surface border border-dashed border-border rounded-3xl">
    <div className="w-16 h-16 rounded-2xl bg-muted/5 flex items-center justify-center mb-6">
      {Icon ? <Icon className="w-8 h-8 text-muted" /> : <Search className="w-8 h-8 text-muted" />}
    </div>
    <h3 className="text-xl font-display font-medium text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted max-w-sm mb-8">{description}</p>
    {actionLabel && onAction && (
      <Button variant="primary" onClick={onAction} className="gap-2">
        <Plus className="w-4 h-4" /> {actionLabel}
      </Button>
    )}
  </div>
);

export const AdminLoadingState = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
  </div>
);

export const AdminRichTextEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
  <div className="border border-border rounded-2xl overflow-hidden bg-surface">
    <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/5">
      {['Bold', 'Italic', 'Underline', 'Link', 'H1', 'H2', 'Quote', 'List'].map((tool) => (
        <button key={tool} className="px-3 py-1.5 rounded-lg hover:bg-muted/10 text-xs font-medium uppercase tracking-widest text-muted transition-all">
          {tool}
        </button>
      ))}
    </div>
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-6 min-h-[300px] bg-transparent outline-none resize-none text-foreground font-sans leading-relaxed"
      placeholder="Start writing your announcement..."
    />
  </div>
);

export const AdminMediaUpload = () => (
  <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all cursor-pointer">
    <div className="w-12 h-12 rounded-xl bg-muted/5 flex items-center justify-center mb-4 group-hover:bg-brand-primary/10 transition-all">
      <Plus className="w-6 h-6 text-muted group-hover:text-brand-primary transition-all" />
    </div>
    <p className="text-sm font-medium text-foreground mb-1">Upload Media</p>
    <p className="text-xs text-muted">Drag and drop or click to upload (Max 10MB)</p>
  </div>
);

export const AdminPagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => (
  <div className="flex items-center justify-between px-6 py-4 bg-surface border-t border-border">
    <p className="text-xs font-medium text-muted uppercase tracking-widest">
      Showing <span className="text-foreground">1-10</span> of <span className="text-foreground">124</span> members
    </p>
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg border border-border hover:bg-muted/5 disabled:opacity-50 transition-all" disabled>
        <ChevronLeft className="w-4 h-4" />
      </button>
      {[1, 2, 3].map((page) => (
        <button 
          key={page} 
          className={cn(
            "w-8 h-8 rounded-lg text-xs font-medium transition-all",
            page === 1 ? "bg-brand-primary text-white shadow-lg " : "text-muted hover:bg-muted/5"
          )}
        >
          {page}
        </button>
      ))}
      <button className="p-2 rounded-lg border border-border hover:bg-muted/5 transition-all">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const AdminDrawer = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-surface border-l border-border z-[70] shadow-2xl overflow-y-auto"
        >
          <div className="p-6 md:p-8 border-b border-border flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-md z-10">
            <h3 className="text-xl md:text-2xl font-display font-medium text-foreground">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-muted/10 rounded-full transition-colors">
              <X className="w-6 h-6 text-muted" />
            </button>
          </div>
          <div className="p-6 md:p-8">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export const AdminModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-[100] p-0 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xl hidden sm:block"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-surface border-border sm:border sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="p-8 md:p-10 border-b border-border flex items-center justify-between bg-muted/5">
            <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight">{title}</h3>
            <button onClick={onClose} className="p-2.5 hover:bg-muted/10 rounded-full transition-colors">
              <X className="w-7 h-7 text-muted" />
            </button>
          </div>
          <div className="p-8 md:p-10 flex-grow overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export const AdminTable = ({ title, columns, data, actions, selectable }: { title: string, columns: string[], data: any[], actions?: boolean, selectable?: boolean }) => {
  return (
    <div className="space-y-6">
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {data.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-8 space-y-6 relative group border-border shadow-premium">
              <div className="flex justify-between items-start">
                <div className="space-y-6 flex-grow">
                  {columns.map((col, j) => (
                    <div key={j} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted uppercase tracking-widest">{col}</span>
                      <div className="text-base font-medium text-foreground tracking-tight">
                        {Object.values(row)[j] as any}
                      </div>
                    </div>
                  ))}
                </div>
                {actions && (
                  <div className="flex flex-col gap-3">
                    <button className="p-3 hover:bg-brand-primary/10 hover:text-brand-primary rounded-2xl transition-all border border-border bg-muted/5">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 hover:bg-rose-500/10 hover:text-rose-500 rounded-2xl transition-all border border-border bg-muted/5">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-surface rounded-3xl border border-border overflow-hidden shadow-premium">
        <div className="p-8 md:p-10 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-muted/5">
          <h3 className="font-display font-medium text-2xl tracking-tight">{title}</h3>
          <div className="flex items-center gap-4">
            {selectable && (
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-brand-primary/10 border border-brand-primary/20">
                <span className="text-xs font-medium text-brand-primary uppercase tracking-widest whitespace-nowrap">2 Selected</span>
                <div className="w-px h-4 bg-brand-primary/20 mx-1" />
                <button className="p-1.5 hover:text-rose-500 transition-colors"><Trash className="w-4 h-4" /></button>
                <button className="p-1.5 hover:text-brand-primary transition-colors"><Download className="w-4 h-4" /></button>
              </div>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-2xl border border-border bg-surface hover:bg-muted/5 transition-all text-muted hover:text-brand-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-0">
            <thead>
              <tr className="text-muted text-xs uppercase tracking-widest font-medium border-b border-border">
                {selectable && (
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-border text-brand-primary focus:ring-brand-primary bg-muted/5" />
                  </th>
                )}
                {columns.map((col) => (
                  <th key={col} className="px-6 py-4">{col}</th>
                ))}
                {actions && <th className="px-6 py-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-muted/[0.02] transition-colors group">
                  {selectable && (
                    <td className="px-6 py-5">
                      <input type="checkbox" className="w-5 h-5 rounded-lg border-border text-brand-primary focus:ring-brand-primary bg-muted/5" />
                    </td>
                  )}
                  {Object.values(row).map((val: any, j) => (
                    <td key={j} className="px-6 py-5 text-base font-medium text-foreground tracking-tight">
                      {val}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <button className="p-3 hover:bg-brand-primary/10 hover:text-brand-primary rounded-2xl transition-all border border-transparent hover:border-brand-primary/20">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 hover:bg-rose-500/10 hover:text-rose-500 rounded-2xl transition-all border border-transparent hover:border-rose-500/20">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 hover:bg-muted/10 rounded-2xl transition-all border border-transparent hover:border-border">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
