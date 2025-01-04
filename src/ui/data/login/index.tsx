'use client';

import { Button } from '@components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/card';
import { Input } from '@components/input';
import { LoginRequest } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { login } from '@services/auth/01-auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from '@services/auth/definitions';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export function LoginForm() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [stateFormData, setStateFormData] = useState<LoginRequest>({
    email: '',
    password: '',
    errors: undefined,
    message: '',
    status: false
  });
  const [showPassword, setShowPassword] = useState(false); 

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const formState = await login(stateFormData, formData);
      if(!formState?.status){
        if (formState?.errors) {
          setStateFormData((prevState) => ({
            ...prevState,
            errors: formState.errors, 
          }));
        } else if (formState?.message) {
          setStateFormData((prevState) => ({
            ...prevState,
            message: formState.message || '',
          }));
          toast({
              variant: 'failed',
              title: 'Login',
              description: formState.message,
          });
        }
      }else{
        toast({
          variant: 'success',
          title: 'Login',
          description: formState.message,
        });
        setTimeout(() => {
          redirect('/');
        }, 100);
      }
      
    } catch (error) {
      console.error(error);
      setStateFormData((prevState) => ({
        ...prevState,
        message: 'An error occurred during login.',
      }));
    } finally {
      setPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome to Login Page Asrama Kutai Karta Negara - Admin
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {stateFormData?.errors?.email && (
                    <p className="text-sm text-red-500">{stateFormData.errors.email.join(', ')}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                        placeholder='Enter Password'
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size={null}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {stateFormData?.errors?.password && (
                    <p className="text-sm text-red-500">{stateFormData.errors.password.join(', ')}</p>
                  )}
                </FormItem>
              )}
            />
            <LoginButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      variant='outline'
      size={null}
      className='mt-4 w-full bg-slate-100 hover:bg-gold hover:text-blonde dark:bg-slate-500 dark:text-white dark:hover:text-white border-0 p-2'
    >
      <LogIn className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
      <span className='ml-1 '>{pending ? 'Submitting...' : 'Login'}</span>
    </Button>
  );
}