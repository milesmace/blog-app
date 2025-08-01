import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from '@/features';

export const makeStore = () =>
  configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
