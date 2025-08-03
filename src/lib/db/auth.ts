import { AuthError, SupabaseClient } from '@supabase/supabase-js';

export const login = async (
  supabase: SupabaseClient,
  email: string,
  password: string,
): Promise<AuthError | boolean> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ?? true;
};

export const logout = async (supabase: SupabaseClient): Promise<boolean> => {
  const { error } = await supabase.auth.signOut();

  return !error;
};
