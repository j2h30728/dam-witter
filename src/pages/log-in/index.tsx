import Input from '@/components/Input';
import { METHOD } from '@/constants/method';
import ROUTE_PATH from '@/constants/route';
import useInputs from '@/hooks/useInput';
import useMutation from '@/libs/client/useMutation';
import { ResponseType } from '@/libs/server/withHandler';
import { UserInput } from '@/types/users';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LogIn() {
  type LogIN = Pick<UserInput, 'email' | 'password'>;

  const [mutate, { data, isLoading }] = useMutation<ResponseType>();
  const router = useRouter();
  const [form, onChange] = useInputs<LogIN>({
    email: '',
    password: '',
  });
  const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      mutate('/api/users/log-in', { email: form.email, password: form.password }, METHOD.POST);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (data) {
      if (data.isSuccess) router.replace(ROUTE_PATH.HOME);
    }
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
        <Input
          name="password"
          onChange={onChange}
          placeholder="Your password"
          title="Password"
          type="password"
          value={form.password}
        />

        <button>{isLoading ? 'Loading...' : 'Log-In'}</button>
      </form>
    </div>
  );
}
