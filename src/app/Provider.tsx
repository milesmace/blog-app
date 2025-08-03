'use client';

import { ThemeProvider } from 'next-themes';

import { TooltipProvider } from '@/components/ui';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
};
