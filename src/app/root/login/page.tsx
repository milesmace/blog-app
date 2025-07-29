'use client';

import { createClient } from '@/lib/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const supabaseRef = useRef<SupabaseClient>(null);

  useEffect(() => {
    (async () => {
      const supabase = await createClient();
      supabaseRef.current = supabase;
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supabase = supabaseRef.current;
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data, error);
    }
  };

  return (
    <div className="pt-12">
      <h1 className="text-center text-2xl font-bold">Login Page</h1>
      <form
        className="mx-auto mt-12 flex max-w-sm flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="rounded-md border border-gray-300 p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-md border border-gray-300 p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
