import { createClient, type SupabaseClient, type AuthChangeEvent, type Session } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Supabase client initialisation
// ---------------------------------------------------------------------------

const SUPABASE_URL = 'https://acuehlltnkbpatsbkhqc.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdWVobGx0bmticGF0c2JraHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzg4NDUsImV4cCI6MjA4NTY1NDg0NX0.I8e97aF4qkXM0tHoO726VZP96mXXvXjpUrGkKsYsG54';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

/**
 * Remove all Supabase auth tokens from local + session storage.
 * This is the "nuclear" cleanup used by both signOut and forceLocalSignOut.
 */
function clearAuthTokens(): void {
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
        window.localStorage.removeItem(key);
      }
    }
  } catch { /* ignore */ }

  try {
    for (const key of Object.keys(window.sessionStorage)) {
      if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
        window.sessionStorage.removeItem(key);
      }
    }
  } catch { /* ignore */ }
}

/**
 * Sign the user out via the Supabase SDK (scope: local) and then scrub any
 * remaining auth tokens from storage as a safety net.
 */
export const signOut = async (): Promise<{ error: unknown }> => {
  let error: unknown = null;
  try {
    error = (await supabase.auth.signOut({ scope: 'local' })).error;
  } catch (err) {
    error = err;
  } finally {
    clearAuthTokens();
  }
  return { error };
};

/**
 * Immediately wipe local auth state without talking to the Supabase backend.
 * Useful when you need a guaranteed-synchronous logout (e.g. after detecting
 * a blocked account).
 */
export const forceLocalSignOut = (): void => {
  clearAuthTokens();
};

// ---------------------------------------------------------------------------
// Auth state listener
// ---------------------------------------------------------------------------

/**
 * Thin wrapper around `supabase.auth.onAuthStateChange` so consumers do not
 * need a direct dependency on the Supabase client instance.
 */
export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) => {
  return supabase.auth.onAuthStateChange(callback);
};

// ---------------------------------------------------------------------------
// Profile / subscription helpers
// ---------------------------------------------------------------------------

export interface SubscriptionStatus {
  is_subscribed: boolean;
  subscription_plan: string | null;
  subscription_end_date: string | null;
  role: string;
}

/**
 * Fetch the current user's subscription status from the `profiles` table.
 * If no profile row exists yet (PGRST116), one is automatically created with
 * sensible defaults.
 */
export const getSubscriptionStatus = async (
  userId: string,
): Promise<{ data: SubscriptionStatus | null; error: unknown }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('is_subscribed, subscription_plan, subscription_end_date, role')
    .eq('id', userId)
    .single();

  if (error && (error as any).code === 'PGRST116') {
    // No profile row found – create a default one
    console.log('No profile found, creating one for user:', userId);
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId, is_subscribed: false });

    if (insertError) {
      console.error('Failed to create profile:', insertError);
      return { data: null, error: insertError };
    }

    return {
      data: {
        is_subscribed: false,
        subscription_plan: null,
        subscription_end_date: null,
        role: 'user',
      },
      error: null,
    };
  }

  return { data, error };
};

/**
 * Check whether the given user has the `admin` role.
 */
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data) return false;
  return data.role === 'admin';
};

/**
 * Record the user's requested subscription plan on their profile row.
 * This is called when the user selects a plan from the SubscriptionPlans UI;
 * an admin subsequently verifies payment and activates the account.
 */
export const requestUserSubscriptionPlan = async (
  userId: string,
  plan: string,
): Promise<{ error: unknown }> => {
  const { error } = await supabase
    .from('profiles')
    .update({ subscription_plan: plan })
    .eq('id', userId);

  return { error };
};

// ---------------------------------------------------------------------------
// Admin functions
// ---------------------------------------------------------------------------

/**
 * Fetch paginated user profiles for admin dashboard
 */
export const fetchPaginatedProfiles = async (
  page: number,
  pageSize: number,
) => {
  const start = page * pageSize;
  const end = start + pageSize - 1;

  const { data, error, count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .range(start, end)
    .order('created_at', { ascending: false });

  return { data, error, count };
};

/**
 * Update a user's profile (admin only)
 */
export const updateUserProfile = async (
  userId: string,
  updates: Record<string, any>,
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
};

/**
 * Delete a user (admin only)
 */
export const deleteUser = async (userId: string) => {
  // First delete from profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (profileError) {
    return { error: profileError };
  }

  // Then delete from auth (requires admin privileges)
  // Note: This requires service role key which we don't have in the client
  // In production, this should be done via an Edge Function or backend API
  return { error: null };
};
