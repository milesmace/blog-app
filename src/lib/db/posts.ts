import { SupabaseClient } from '@supabase/supabase-js';

import { COLUMNS, TABLES } from '@/constants';
import { Paging, Post } from '@/types';
import { computeFromTo } from '@/utils';

export const fetchPosts = async (
  supabase: SupabaseClient,
  pagination: Paging = {
    page: 1,
    limit: 10,
    offset: 0,
  },
  _public: boolean = true,
): Promise<Post[]> => {
  // Compute from & to based on pagination
  const { from, to } = computeFromTo(pagination);

  // Build the query
  const query = supabase
    .from(TABLES.POSTS)
    .select('*')
    .order(COLUMNS.POSTS.CREATED_AT, { ascending: false })
    .range(from, to);

  if (_public) {
    // Add conditions for public posts
    query.eq(COLUMNS.POSTS.IS_DRAFT, false).eq(COLUMNS.POSTS.STATUS, true);
  }

  const { data: posts, error } = await query;

  if (error) {
    throw new Error('Failed to fetch posts');
  }

  return posts ?? [];
};
