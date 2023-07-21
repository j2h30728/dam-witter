import type { ResponseType } from '@/types';

import { Input } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm, useMutation } from '@/libs/client';
import { UserInput } from '@/types';
import { emailValidator, passwordValidator } from '@/utils/validators';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LogIn() {
  type LogIn = Pick<UserInput, 'email' | 'password'>;

  const [mutate, { data, isLoading }] = useMutation<ResponseType<User>>();
  const router = useRouter();
  const { errors, form, onChange } = useForm<LogIn>(
    { email: '', password: '' },
    { email: emailValidator, password: passwordValidator }
  );

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
        <p>{!errors.email.isValid && errors.email.message}</p>
        <Input
          name="password"
          onChange={onChange}
          placeholder="Your password"
          title="Password"
          type="password"
          value={form.password}
        />
        <p>{!errors.password.isValid && errors.password.message}</p>
        <button>{isLoading ? 'Loading...' : 'Log-In'}</button>
      </form>
      <Link href={ROUTE_PATH.CREATE_ACCOUNT}>Create account</Link>
    </div>
  );
}
