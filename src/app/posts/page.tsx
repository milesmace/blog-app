import { AppContainer } from '@/components/layout';
import { fetchPosts } from '@/lib';
import { createClient } from '@/lib/supabase/server';

const PostsPage = async () => {
  const supabase = await createClient();

  // Fetch only the posts that are published
  const posts = await fetchPosts(supabase);
  console.log(posts);

  return (
    <AppContainer>
      <h1 className="text-4xl font-bold">Posts</h1>
    </AppContainer>
  );
};

export default PostsPage;
