import { AuthError, SupabaseClient } from '@supabase/supabase-js';

export const login = async (
  supabase: SupabaseClient,
  email: string,
  password: string,
): Promise<{ success: boolean; error: AuthError | null }> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { success: !error, error };
};

export const logout = async (
  supabase: SupabaseClient,
): Promise<{ success: boolean; error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();

  return { success: !error, error };
};
