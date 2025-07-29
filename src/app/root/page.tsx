import { createClient } from '@/lib/supabase/server';

const ProtectedPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return JSON.stringify(data);
};

export default ProtectedPage;
