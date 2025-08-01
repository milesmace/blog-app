import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { STORAGE } from '@/constants';
import { Post, PostsStore } from '@/types';
import { isBrowser, loadFromStorage } from '@/utils';

import { PostsSliceState } from './postsSlice.types';

let initialState: PostsSliceState = {
  allIds: [1],
  posts: {
    1: {
      id: 1,
      title: 'hello',
    },
  },
};

// The posts are saved in the localStorage, for only the root app.
if (isBrowser()) {
  // Load from the localStorage only if in client component, i.e., Browser
  const allIds = loadFromStorage<number[]>(STORAGE.POSTS_ALL_IDS, []);
  const posts = loadFromStorage<PostsStore>(STORAGE.POSTS_STORE, {});
  initialState = { allIds, posts };
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add a new post
    addPost: (state, action: PayloadAction<Post>) => {
      const { id } = action.payload;
      state.allIds.push(id);
      state.posts[id] = action.payload;
    },

    // Remove a post
    removePost: (state, action: PayloadAction<number>) => {
      state.allIds.filter((id) => id !== action.payload);
      delete state.posts[action.payload];
    },
  },
});

// selectors
export const selectPosts = (state: { posts: PostsSliceState }) => state.posts;

export const { addPost, removePost } = postsSlice.actions;
export const { reducer: postsReducer } = postsSlice;
export { postsSlice };
