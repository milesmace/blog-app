'use client';

import { useRouter } from 'next/navigation';

import { LogOut } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { ROUTES } from '@/constants';
import { useIsLoggedIn } from '@/hooks';
import { logout } from '@/lib';
import { createClient } from '@/lib/supabase/client';

export const Logout = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return null;
  }

  const supabase = createClient();

  const handleLogout = async () => {
    const { success, error } = await logout(supabase);
    if (success) {
      router.push(ROUTES.LOGIN_ROUTE);
    } else {
      // TODO: Handle logout error with a toast notification
      console.error('Logout failed:', error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogOverlay className="bg-black/5 backdrop-blur-sm" />
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="outline">
              <LogOut />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Log Out</TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your current session. You can log back in
            at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
