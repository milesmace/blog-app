import { FC, ReactNode } from 'react';

export const AppContainer: FC<{ children?: ReactNode }> = ({ children }) => (
  <main className="mx-auto min-h-screen w-[var(--app-width)]">{children}</main>
);
