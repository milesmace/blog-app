import { FC, ReactNode } from 'react';

export const AppContainer: FC<{ children?: ReactNode }> = ({ children }) => (
  <main className="mx-auto w-[var(--app-width)]">{children}</main>
);
