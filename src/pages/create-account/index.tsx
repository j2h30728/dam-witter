import type { UserInput } from '@/types';
import type { ResponseType } from '@/types';

import { Input, Symbol } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import { emailValidator, passwordValidator, useMutation } from '@/libs/client';
import { usernameValidator } from '@/libs/client/validators';
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
  const { errorMessage, errors, form, isError, onChange } = useForm<CreateAccount>(
    {
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
    {
      confirmPassword: passwordValidator,
      email: emailValidator,
      password: passwordValidator,
      username: usernameValidator,
    }
  );

  const handleCreateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));

    await mutate('/api/users/create-account', METHOD.POST, {
      email: form.email,
      name: form.username,
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
            errorMassage={form.username && !errors.username.isValid && errors.username.message}
            name="username"
            onChange={onChange}
            placeholder="Your Name"
            title="Name"
            type="text"
            value={form.username}
          />
          <Input
            errorMassage={form.email && !errors.email.isValid && errors.email.message}
            name="email"
            onChange={onChange}
            placeholder="Your email"
            title="email"
            type="email"
            value={form.email}
          />
          <Input
            errorMassage={form.password && !errors.password.isValid && errors.password.message}
            name="password"
            onChange={onChange}
            placeholder="Your password"
            title="Password"
            type="password"
            value={form.password}
          />
          <Input
            errorMassage={form.confirmPassword && !errors.confirmPassword.isValid && errors.confirmPassword.message}
            name="confirmPassword"
            onChange={onChange}
            placeholder="Your confirmPassword"
            title="confirmPassword"
            type="password"
            value={form.confirmPassword}
          />
          <button className="w-full mt-8 button">
            <span className="text-lg font-semibold ">{isLoading && !data ? 'Loading...' : 'Create Account'}</span>
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
