import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { isSupabaseConfigured } from "./client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Creates a server-side Supabase client for Server Actions & API Routes
 */
export function getSupabaseServerClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Creates an administrative Supabase client using the Service Role Key
 * (Bypasses RLS - use strictly in server environments for order management/webhooks)
 */
export function getSupabaseAdminClient(): SupabaseClient<Database> | null {
  const serviceKey = supabaseServiceRoleKey || supabaseAnonKey;
  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return createClient<Database>(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
