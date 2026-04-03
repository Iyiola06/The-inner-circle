import React, { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Button } from '../Button';

interface AdminLoginPageProps {
  onSubmit: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
  authStatus?: 'idle' | 'authenticated' | 'forbidden';
  userEmail?: string | null;
  onLogout?: () => Promise<void>;
}

export const AdminLoginPage = ({
  onSubmit,
  isLoading = false,
  authStatus = 'idle',
  userEmail,
  onLogout,
}: AdminLoginPageProps) => {
  const [email, setEmail] = useState('admin@theinnercirclecommunity.org');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const statusMessage = useMemo(() => {
    if (authStatus === 'forbidden') {
      return 'This account signed in successfully, but it does not have admin access yet.';
    }

    if (authStatus === 'authenticated') {
      return `Signed in as ${userEmail || 'an admin user'}. You can continue to the admin dashboard.`;
    }

    return null;
  }, [authStatus, userEmail]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = await onSubmit(email, password);
    if (!result.success) {
      setError(result.error || 'Unable to sign in right now.');
    }
  };

  return (
    <section className="min-h-screen pt-36 pb-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10 items-stretch">
        <div className="rounded-[2rem] border border-border/50 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-deep/10 p-10 md:p-14 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border/50 text-xs uppercase tracking-widest font-medium text-brand-primary mb-8">
              <ShieldCheck className="w-4 h-4" />
              Admin Access
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-foreground leading-[0.98] tracking-tight mb-6">
              Sign in to manage
              <br />
              <span className="text-brand-primary">The Inner Circle.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-xl">
              This login is for approved administrators only. Use your authorized admin email and password to access the dashboard.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {[
                'Review live members and communities',
                'Track announcements and testimonials',
                'Access protected admin screens',
                'Restricted to approved administrators',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border/50 bg-surface/80 px-5 py-5 text-sm text-foreground font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/50 bg-surface p-8 md:p-10 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-8">
            <LockKeyhole className="w-6 h-6" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-medium text-foreground mb-2">Admin Login</h2>
            <p className="text-sm text-muted leading-relaxed">
              Sign in with your administrator email and password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-foreground outline-none focus:border-brand-primary"
                placeholder="admin@theinnercirclecommunity.org"
                autoComplete="email"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted font-medium">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-foreground outline-none focus:border-brand-primary"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            {(error || statusMessage) && (
              <div className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${error || authStatus === 'forbidden' ? 'border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-300' : 'border-brand-primary/20 bg-brand-primary/5 text-foreground'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error || statusMessage}</span>
                </div>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Access Admin Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {authStatus !== 'idle' && onLogout && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full mt-4"
              onClick={() => {
                void onLogout();
              }}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
