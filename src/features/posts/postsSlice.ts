import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '@/types';

import { PostsSliceState } from './postsSlice.types';

const initialState: PostsSliceState = {
  allIds: [],
  posts: {},
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add new posts
    addPosts: (state, action: PayloadAction<Post[]>) => {
      const posts = action.payload;
      state.allIds = state.allIds.concat(posts.map((post) => post.id));
      state.posts = {
        ...state.posts,
        ...posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
      };
    },

    // Remove a post
    removePost: (state, action: PayloadAction<number>) => {
      state.allIds.filter((id) => id !== action.payload);
      delete state.posts[action.payload];
    },

    // TODO: Add reducers as required
  },
});

// selectors
export const selectPosts = (state: { posts: PostsSliceState }) => state.posts;

export const { addPosts, removePost } = postsSlice.actions;
export const { reducer: postsReducer } = postsSlice;
export { postsSlice };
