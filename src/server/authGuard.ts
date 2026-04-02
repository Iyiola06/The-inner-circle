import { createClient } from '@/lib/supabase-server';
import { AppError } from '@/lib/errors';

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new AppError(401, 'Unauthorized');
  if (!user.email_confirmed_at) throw new AppError(403, 'Email not verified');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new AppError(403, 'Forbidden');
  return user;
}
