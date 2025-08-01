'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { AppContainer } from '@/components/layout';
import { store } from '@/store';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <AppContainer>
    <Provider store={store}>{children}</Provider>
  </AppContainer>
);

// TODO: Add a navigation header
// TODO: Add the redux provider here

export default RootLayout;
