import type { ResponseType } from '@/types';
import type { UserInput } from '@/types';

import { Input } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import { emailValidator, passwordValidator, useMutation } from '@/libs/client';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface CreateAccount extends UserInput {
  confirmPassword: string;
}
export default function CreateAccount() {
  const [mutate, { data, error, isLoading }] = useMutation<ResponseType<User>>();
  const router = useRouter();
  const { errors, form, isErrors, onChange } = useForm<CreateAccount>(
    {
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
    { confirmPassword: passwordValidator, email: emailValidator, password: passwordValidator }
  );

  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isErrors) {
      mutate('/api/users/create-account', METHOD.POST, {
        email: form.email,
        name: form.username,
        password: form.password,
      });
    }
  };
  useEffect(() => {
    if (data?.isSuccess) {
      router.replace('/log-in');
    } else if (error) {
      alert(data?.message);
      console.error(error);
    }
  }, [data, router, error]);

  return (
    <Layout title="CREATE ACCOUNT">
      <form onSubmit={handleCreateAccount}>
        <Input
          name="username"
          onChange={onChange}
          placeholder="Your Name"
          title="Name"
          type="text"
          value={form.username}
        />
        <Input
          name="email"
          onChange={onChange}
          placeholder="Your email"
          title="email"
          type="email"
          value={form.email}
        />
        <p>{form.email && !errors.email.isValid && errors.email.message}</p>
        <Input
          name="password"
          onChange={onChange}
          placeholder="Your password"
          title="Password"
          type="password"
          value={form.password}
        />
        <p>{form.password && !errors.password.isValid && errors.password.message}</p>

        <Input
          name="confirmPassword"
          onChange={onChange}
          placeholder="Your confirmPassword"
          title="confirmPassword"
          type="password"
          value={form.confirmPassword}
        />
        <p>{form.confirmPassword && !errors.confirmPassword.isValid && errors.confirmPassword.message}</p>

        <button>{isLoading ? 'Loading...' : 'Create Account'}</button>
      </form>
      <Link href={ROUTE_PATH.LOG_IN}>Log-in</Link>
    </Layout>
  );
}
