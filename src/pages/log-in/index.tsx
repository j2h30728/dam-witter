import { Layout, Symbol } from '@/components';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTE_PATH } from '@/constants';
import useLogIn from '@/hooks/auth/useLogIn';
import Link from 'next/link';

import { NextPageWithLayout } from '../_app';

const LogInPage: NextPageWithLayout = () => {
  const {
    form: { errorMessage, onChange, values: form },
    login: { isLoginMutating, onSubmit },
  } = useLogIn();

  return (
    <div className="flex flex-col items-center px-3 mx-auto md:max-w-3xl">
      <Symbol className="m-16" height={130} width={130} />
      <form className="flex flex-col w-full gap-1 px-10" onSubmit={onSubmit}>
        <Input
          disabled={isLoginMutating}
          errorMassage={errorMessage.email}
          isValidated
          label="Email"
          name="email"
          onChange={onChange}
          placeholder="Your email"
          type="email"
          value={form.email}
        />
        <Input
          disabled={isLoginMutating}
          errorMassage={errorMessage.password}
          isValidated
          label="Password"
          name="password"
          onChange={onChange}
          placeholder="Your password"
          type="password"
          value={form.password}
        />
        <Button disabled={isLoginMutating} size="lg" type="submit" width="w-full">
          {isLoginMutating ? 'Loading...' : 'Log-In'}
        </Button>
      </form>
      <nav className="flex gap-3 mt-5 ">
        <span>계정이 없으신가요?</span>
        <Link className="font-bold text-blue-400" href={ROUTE_PATH.CREATE_ACCOUNT}>
          Create account
        </Link>
      </nav>
    </div>
  );
};
LogInPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout title="LOG IN">{page}</Layout>;
};
export default LogInPage;
