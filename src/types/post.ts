export type PostData = {
  title: string;
  content?: string;
};

export type PostMeta = {
  id: number;
  slug?: string;
  cover_image?: string;
  author_id?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
};

export type Post = PostData & PostMeta;
export type PostPreview = Pick<
  Post,
  'id' | 'title' | 'slug' | 'cover_image' | 'published_at'
>;
export type PostCreatePayload = PostData & Pick<PostMeta, 'cover_image'>;

export type PostsStore = Record<number, Post>;
