'use client';

import { Logout, ThemeContainer } from '@/containers';

export const Footer = () => {
  return (
    <footer className="border-t-border border-t py-8">
      <div className="mx-auto flex max-w-[var(--app-width)] items-center justify-end">
        {/* Theme Switcher */}

        <div className="flex gap-4">
          <ThemeContainer />
          <Logout />
        </div>
      </div>
    </footer>
  );
};
