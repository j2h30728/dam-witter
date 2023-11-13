import { Input, Layout, Symbol } from '@/components';
import { ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import { emailValidator, fetchers, passwordValidator } from '@/libs/client';
import { UserInput } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

export default function LogIn() {
  const router = useRouter();
  const { isMutating, trigger } = useSWRMutation(
    '/api/users/log-in',
    fetchers.post<Pick<UserInput, 'email' | 'password'>>,
    {
      onSuccess: () => router.replace(ROUTE_PATH.HOME),
    }
  );

  const { errorMessage, errors, form, isError, onChange } = useForm<Pick<UserInput, 'email' | 'password'>>(
    { email: '', password: '' },
    { email: emailValidator, password: passwordValidator }
  );

  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));
    trigger({ email: form.email, password: form.password });
  };

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
