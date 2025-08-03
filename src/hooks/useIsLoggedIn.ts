import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

export const useIsLoggedIn = () => {
  const supabase = createClient();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      },
    );

    // Cleanup listener
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return isLoggedIn;
};
