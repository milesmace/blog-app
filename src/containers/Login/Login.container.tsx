'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Spinner } from '@/components/icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui';
import { ROUTES } from '@/constants';
import { cn, login } from '@/lib';
import { createClient } from '@/lib/supabase/client';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'), // No validation required, this is not signup
});

type LoginFormData = z.infer<typeof schema>;

export const Login = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    const supabase = createClient();

    if ((await login(supabase, data.email, data.password)) === true) {
      router.push(ROUTES.ROOT_ROUTE);
    } else {
      setError('root', { message: 'Invalid email or password' });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="py-8">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isSubmitting}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••"
                      disabled={isSubmitting}
                      required
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    className="absolute top-0 right-0 bottom-0 aspect-square cursor-pointer overflow-hidden rounded-full"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner /> Logging in
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
                {errors.root && (
                  <p className="text-center text-sm text-red-500">
                    {errors.root.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
