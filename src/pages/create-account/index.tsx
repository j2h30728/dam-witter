import type { ResponseType } from '@/types';
import type { UserInput } from '@/types';

import { Input, Layout, Symbol } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import { emailValidator, mutateData, passwordValidator, usernameValidator } from '@/libs/client';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

interface CreateAccount extends UserInput {
  confirmPassword: string;
}
export default function CreateAccount() {
  const router = useRouter();
  const { errorMessage, errors, form, isError, onChange } = useForm<CreateAccount>(
    {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
    {
      confirmPassword: passwordValidator,
      email: emailValidator,
      name: usernameValidator,
      password: passwordValidator,
    }
  );
  const { data, error, isMutating, trigger } = useSWRMutation<ResponseType<User>, any, string, UserInput>(
    '/api/users/create-account',
    mutateData<UserInput>(METHOD.POST)
  );

  const handleCreateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));

    trigger({
      email: form.email,
      name: form.name,
      password: form.password,
    });
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
      <div className="flex flex-col items-center px-3 sub-layout">
        <Symbol className="m-16" height={130} width={130} />
        <form className="flex flex-col w-full gap-1 px-10" onSubmit={handleCreateAccount}>
          <Input
            disabled={isMutating}
            errorMassage={form.name && !errors.name.isValid && errors.name.message}
            name="name"
            onChange={onChange}
            placeholder="Your Name"
            title="Name"
            type="text"
            value={form.name}
          />
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
          <Input
            disabled={isMutating}
            errorMassage={form.confirmPassword && !errors.confirmPassword.isValid && errors.confirmPassword.message}
            name="confirmPassword"
            onChange={onChange}
            placeholder="Your confirmPassword"
            title="ConfirmPassword"
            type="password"
            value={form.confirmPassword}
          />
          <button className="w-full mt-8 button" disabled={isMutating}>
            <span className="text-lg font-semibold ">{isMutating ? 'Loading...' : 'Create Account'}</span>
          </button>
        </form>
        <nav className="flex gap-3 mt-5 ">
          <span>계정이 있으신가요?</span>
          <Link className="font-bold text-blue-400" href={ROUTE_PATH.LOG_IN}>
            LOG-IN
          </Link>
        </nav>
      </div>
    </Layout>
  );
}
