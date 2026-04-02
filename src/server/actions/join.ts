import { z } from 'zod';
import { createClient } from '@/lib/supabase-server';
import { JoinRequestSchema } from '@/server/validation/join';
import { getWhatsAppUrlForCommunity } from '@/server/services/whatsapp';
import { ratelimit } from '@/lib/ratelimit';
import { AppError } from '@/lib/errors';

export async function submitJoinRequest(data: z.infer<typeof JoinRequestSchema>) {
  const validated = JoinRequestSchema.parse(data);
  
  if (ratelimit) {
    const { success } = await ratelimit.limit(validated.email);
    if (!success) throw new AppError(429, 'Too many requests');
  }

  const supabase = await createClient();
  
  const { data: request, error } = await supabase
    .from('join_requests')
    .insert(validated)
    .select()
    .single();

  if (error) throw new AppError(500, 'Failed to submit request');
  
  const whatsappUrl = await getWhatsAppUrlForCommunity(validated.communityId);
  
  return { success: true, whatsappUrl };
}
