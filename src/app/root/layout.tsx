import { FC, ReactNode } from 'react';

import { AppContainer } from '@/components/layout';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <AppContainer>{children}</AppContainer>
);

// TODO: Add a navigation header
// TODO: Add the redux provider here

export default RootLayout;
