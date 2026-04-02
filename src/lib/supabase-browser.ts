import { createClient } from '@supabase/supabase-js';

let browserClient: ReturnType<typeof createClient> | null = null;

const getSupabaseConfig = () => {
  const url =
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
    '';
  const anonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';

  return { url, anonKey };
};

export const hasSupabaseBrowserConfig = () => {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
};

export const getSupabaseBrowserClient = () => {
  if (browserClient) {
    return browserClient;
  }

  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error('Missing Supabase browser configuration.');
  }

  browserClient = createClient(url, anonKey);
  return browserClient;
};
