import type { ResponseType } from '@/types';

import { Input, Symbol } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import { emailValidator, passwordValidator, useMutation } from '@/libs/client';
import { UserInput } from '@/types';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LogIn() {
  type LogIn = Pick<UserInput, 'email' | 'password'>;

  const [mutate, { data, error, isLoading }] = useMutation<ResponseType<User>>();
  const router = useRouter();
  const { errorMessage, errors, form, isError, onChange } = useForm<LogIn>(
    { email: '', password: '' },
    { email: emailValidator, password: passwordValidator }
  );
  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));
    await mutate('/api/users/log-in', METHOD.POST, { email: form.email, password: form.password });
  };
  useEffect(() => {
    if (data?.isSuccess) {
      router.replace(ROUTE_PATH.HOME);
    } else if (error) {
      alert(data?.message);
      console.error(error);
    }
  }, [data, router, error]);

  return (
    <Layout title="LOG IN">
      <div className="flex flex-col items-center px-3 sub-layout">
        <Symbol className="m-16" height={130} width={130} />
        <form className="flex flex-col w-full gap-1 px-10" onSubmit={handleLogIn}>
          <Input
            disabled={isLoading}
            errorMassage={form.email && !errors.email.isValid && errors.email.message}
            name="email"
            onChange={onChange}
            placeholder="Your email"
            title="Email"
            type="email"
            value={form.email}
          />
          <Input
            disabled={isLoading}
            errorMassage={form.password && !errors.password.isValid && errors.password.message}
            name="password"
            onChange={onChange}
            placeholder="Your password"
            title="Password"
            type="password"
            value={form.password}
          />
          <button className="w-full mt-8 button " disabled={isLoading}>
            <span className="text-lg font-semibold ">{isLoading && !data ? 'Loading...' : 'Log-In'}</span>
          </button>
        </form>
        <nav className="flex gap-3 mt-5 ">
          <span>계정이 없으신가요?</span>
          <Link className="font-bold text-blue-400" href={ROUTE_PATH.CREATE_ACCOUNT}>
            Create account
          </Link>
        </nav>
      </div>
    </Layout>
  );
}
