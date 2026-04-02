import { createClient } from '@/lib/supabase-server';

export async function getWhatsAppUrlForCommunity(communityId: string) {
  const supabase = await createClient();
  
  const { data: community } = await supabase
    .from('communities')
    .select('name, price')
    .eq('id', communityId)
    .single();

  if (!community) return "https://wa.me/YOUR_PHONE_NUMBER_HERE?text=Hello,%20I%20want%20to%20become%20a%20Circler.%20Please%20share%20the%20available%20communities%20and%20payment%20steps.";

  const message = `Hello, I want to join the ${community.name} Community at ₦${community.price.toLocaleString()}. Please share the payment steps.`;
  return `https://wa.me/YOUR_PHONE_NUMBER_HERE?text=${encodeURIComponent(message)}`;
}
