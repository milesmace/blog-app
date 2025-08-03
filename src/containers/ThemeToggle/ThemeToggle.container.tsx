'use client';

import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';

import { ThemeConfig } from './ThemeToggle.config';

export const ThemeContainer = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun
                data-testid="lucide-sun"
                className="inline-block h-[1.2rem] w-[1.2rem] dark:hidden"
              />
              <Moon
                data-testid="lucide-moon"
                className="hidden h-[1.2rem] w-[1.2rem] dark:inline-block"
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Toggle theme</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end">
        {ThemeConfig.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            className="text-neutral-700 dark:text-neutral-300"
            onClick={() => setTheme(theme.value)}
          >
            <theme.icon className="mr-2 h-4 w-4" />
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
