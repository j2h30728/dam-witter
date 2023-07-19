import type { ResponseType } from '@/types';

import { Input } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useInputs, useMutation } from '@/libs/client';
import { UserInput } from '@/types';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LogIn() {
  type LogIN = Pick<UserInput, 'email' | 'password'>;

  const [mutate, { data, isLoading }] = useMutation<ResponseType<User>>();
  const router = useRouter();
  const [form, onChange] = useInputs<LogIN>({
    email: '',
    password: '',
  });
  const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      mutate('/api/users/log-in', METHOD.POST, { email: form.email, password: form.password });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (data?.isSuccess) router.replace(ROUTE_PATH.HOME);
  }, [data, router]);

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogIn}>
        <Input
          name="email"
          onChange={onChange}
          placeholder="Your email"
          title="email"
          type="email"
          value={form.email}
        />
        <Input
          name="password"
          onChange={onChange}
          placeholder="Your password"
          title="Password"
          type="password"
          value={form.password}
        />

        <button>{isLoading ? 'Loading...' : 'Log-In'}</button>
      </form>
    </div>
  );
}
