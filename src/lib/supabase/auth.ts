"use client";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "./client";
import type { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Sign up user with Email & Password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  metadata?: { full_name?: string; phone?: string },
) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  return { data, error };
}

/**
 * Sign in existing user with Email & Password
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

/**
 * Dispatches Phone SMS OTP via Supabase Auth
 */
export async function signInWithPhoneOtp(phone10Digit: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  const formattedPhone = `+91${phone10Digit.replace(/\D/g, "").slice(-10)}`;
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: formattedPhone,
  });

  return { data, error };
}

/**
 * Verifies user-entered 6-digit SMS OTP via Supabase Auth
 */
export async function verifyPhoneOtp(phone10Digit: string, token: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  const formattedPhone = `+91${phone10Digit.replace(/\D/g, "").slice(-10)}`;
  const { data, error } = await supabase.auth.verifyOtp({
    phone: formattedPhone,
    token,
    type: "sms",
  });

  return { data, error };
}

/**
 * Signs out current user
 */
export async function signOut() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}

/**
 * Fetches user profile from profiles table
 */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data as Profile;
}

/**
 * Updates user profile details
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Database["public"]["Tables"]["profiles"]["Update"]>,
) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { error: new Error("Supabase is not configured") };

  const { error } = await (supabase as any)
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId);

  return { error };
}
