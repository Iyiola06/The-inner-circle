import { supabaseAdmin } from '@/lib/supabase-admin';
import { AppError } from '@/lib/errors';

export const communityService = {
  listActive: async () => {
    const { data, error } = await supabaseAdmin
      .from('communities')
      .select('*')
      .eq('is_active', true);
    if (error) throw new AppError(500, 'Failed to fetch communities');
    return data;
  },
};
