export const TABLES = {
  POSTS: 'posts',
  TAGS: 'tags',
  POST_TAG: 'post_tag',
  POST_VERSION: 'post_version',
  USER_PROFILES: 'user_profiles',
  SEO_META: 'seo_meta',
};

export const COLUMNS = {
  POSTS: {
    ID: 'id',
    POST_UUID: 'post_uuid',
    SLUG: 'slug',
    TITLE: 'title',
    CONTENT: 'content',
    COVER_IMAGE: 'cover_image',
    STATUS: 'status',
    IS_DRAFT: 'is_draft',
    AUTHOR_ID: 'author_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    PUBLISHED_AT: 'published_at',
    VERSION_ID: 'version_id',
  },
  TAGS: {
    ID: 'id',
    NAME: 'name',
  },
  POST_TAG: {
    ID: 'id',
    POST_ID: 'post_id',
    TAG_ID: 'tag_id',
  },
  POST_VERSION: {
    ID: 'id',
    POST_ID: 'post_id',
    CONTENT: 'content',
    VERSION: 'version',
    CREATED_AT: 'created_at',
  },
  USER_PROFILES: {
    ID: 'id',
    DISPLAY_NAME: 'display_name',
    AVATAR_URL: 'avatar_url',
  },
  SEO_META: {
    POST_ID: 'post_id',
    META_TITLE: 'meta_title',
    META_DESCRIPTION: 'meta_description',
    OG_IMAGE: 'og_image',
    CANONICAL_URL: 'canonical_url',
    KEYWORDS: 'keywords',
  },
};
