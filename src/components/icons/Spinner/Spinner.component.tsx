import { Loader } from 'lucide-react';

export const Spinner = ({ ...props }: React.ComponentProps<'svg'>) => {
  return <Loader {...props} className="animate-spin" />;
};
