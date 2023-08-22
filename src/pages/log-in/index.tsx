import type { ResponseType } from '@/types';

import { Input, Symbol } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import { emailValidator, passwordValidator } from '@/libs/client';
import mutateData from '@/libs/client/mutateData';
import { UserInput } from '@/types';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

type LogIn = Pick<UserInput, 'email' | 'password'>;

export default function LogIn() {
  const router = useRouter();
  const { errorMessage, errors, form, isError, onChange } = useForm<LogIn>(
    { email: '', password: '' },
    { email: emailValidator, password: passwordValidator }
  );
  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));
    trigger({ email: form.email, password: form.password });
  };

  const { data, error, isMutating, trigger } = useSWRMutation<ResponseType<User>, any, string, LogIn>(
    '/api/users/log-in',
    mutateData<LogIn>(METHOD.POST)
  );

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
            disabled={isMutating}
            errorMassage={form.email && !errors.email.isValid && errors.email.message}
            name="email"
            onChange={onChange}
            placeholder="Your email"
            title="Email"
            type="email"
            value={form.email}
          />
          <Input
            disabled={isMutating}
            errorMassage={form.password && !errors.password.isValid && errors.password.message}
            name="password"
            onChange={onChange}
            placeholder="Your password"
            title="Password"
            type="password"
            value={form.password}
          />
          <button className="w-full mt-8 button " disabled={isMutating}>
            <span className="text-lg font-semibold ">{isMutating ? 'Loading...' : 'Log-In'}</span>
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
function async<T>(url: any, string: any, arg: any, T: any) {
  throw new Error('Function not implemented.');
}
