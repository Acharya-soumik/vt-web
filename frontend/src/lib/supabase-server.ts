import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedSupabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (cachedSupabaseServerClient) return cachedSupabaseServerClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  cachedSupabaseServerClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  });

  return cachedSupabaseServerClient;
}