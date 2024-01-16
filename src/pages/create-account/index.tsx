import { Input, Layout, Symbol } from '@/components';
import { ROUTE_PATH } from '@/constants';
import useCreateAccount from '@/hooks/auth/useCreateAccount';
import Link from 'next/link';

export default function CreateAccount() {
  const {
    form: { isError, onChange, values },
    register: { isCreateAccountMutating, onSubmit },
  } = useCreateAccount();

  return (
    <Layout title="CREATE ACCOUNT">
      <div className="flex flex-col items-center px-3 sub-layout">
        <Symbol className="m-16" height={130} width={130} />
        <form className="flex flex-col w-full gap-1 px-10" onSubmit={onSubmit}>
          <Input
            disabled={isCreateAccountMutating}
            errorMassage={isError.name}
            name="name"
            onChange={onChange}
            placeholder="Your Name"
            title="Name"
            type="text"
            value={values.name}
          />
          <Input
            disabled={isCreateAccountMutating}
            errorMassage={isError.email}
            name="email"
            onChange={onChange}
            placeholder="Your email"
            title="Email"
            type="email"
            value={values.email}
          />
          <Input
            disabled={isCreateAccountMutating}
            errorMassage={isError.password}
            name="password"
            onChange={onChange}
            placeholder="Your password"
            title="Password"
            type="password"
            value={values.password}
          />
          <Input
            disabled={isCreateAccountMutating}
            errorMassage={isError.confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            placeholder="Your confirmPassword"
            title="ConfirmPassword"
            type="password"
            value={values.confirmPassword}
          />
          <button className="w-full mt-8 button" disabled={isCreateAccountMutating}>
            <span className="text-lg font-semibold ">{isCreateAccountMutating ? 'Loading...' : 'Create Account'}</span>
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
