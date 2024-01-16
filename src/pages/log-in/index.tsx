import { Input, Layout, Symbol } from '@/components';
import { ROUTE_PATH } from '@/constants';
import useLogIn from '@/hooks/auth/useLogIn';
import Link from 'next/link';

export default function LogIn() {
  const {
    form: { isError, onChange, values: form },
    login: { isLoginMutating, onSubmit },
  } = useLogIn();

  return (
    <Layout title="LOG IN">
      <div className="flex flex-col items-center px-3 sub-layout">
        <Symbol className="m-16" height={130} width={130} />
        <form className="flex flex-col w-full gap-1 px-10" onSubmit={onSubmit}>
          <Input
            disabled={isLoginMutating}
            errorMassage={isError.email}
            name="email"
            onChange={onChange}
            placeholder="Your email"
            title="Email"
            type="email"
            value={form.email}
          />
          <Input
            disabled={isLoginMutating}
            errorMassage={isError.password}
            name="password"
            onChange={onChange}
            placeholder="Your password"
            title="Password"
            type="password"
            value={form.password}
          />
          <button className="w-full mt-8 button " disabled={isLoginMutating}>
            <span className="text-lg font-semibold ">{isLoginMutating ? 'Loading...' : 'Log-In'}</span>
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
