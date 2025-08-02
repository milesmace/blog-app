'use client';

import { useEffect, useState } from 'react';

import { addPosts } from '@/features';
import { useAppDispatch } from '@/hooks';
import { fetchPosts } from '@/lib';
import { createClient } from '@/lib/supabase/client';
import { Post } from '@/types';

const ProtectedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const dispatch = useAppDispatch();

  // TODO: Extract this into a client component (like <PostsList />) & use the page as a server component.
  useEffect(() => {
    const supabase = createClient();

    (async () => {
      const posts = await fetchPosts(supabase, { page: 1, limit: 10 }, false);

      setPosts(posts);
      dispatch(addPosts(posts));
    })();
  }, [dispatch]);

  return (
    <div className="pt-12">
      <h1 className="text-4xl font-bold">My Posts</h1>

      <div className="mt-8">
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
};

export default ProtectedPage;
