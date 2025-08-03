import { Loader } from 'lucide-react';

import { cn } from '@/lib';

export const Spinner = ({ ...props }: React.ComponentProps<'svg'>) => {
  return <Loader {...props} className={cn('animate-spin')} />;
};
