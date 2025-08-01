'use client';

import { useEffect } from 'react';

import { STORAGE } from '@/constants';
import { selectPosts } from '@/features';
import { useAppSelector } from '@/hooks';
import { saveToStorage } from '@/utils';

const ProtectedPage = () => {
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    saveToStorage(STORAGE.POSTS_ALL_IDS, posts.allIds);
    saveToStorage(STORAGE.POSTS_STORE, posts.posts);
  }, [posts.allIds, posts.posts]);

  return JSON.stringify(posts);
};

export default ProtectedPage;
