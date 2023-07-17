import type { UserInput } from '@/types/users';

import Input from '@/components/Input';
import { METHOD } from '@/constants/method';
import useInputs from '@/hooks/useInput';
import useMutation from '@/libs/client/useMutation';
import { ResponseType } from '@/libs/server/withHandler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CreateAccount() {
  interface CreateAccount extends UserInput {
    confirmPassword: string;
  }
  const [mutate, { data, isLoading }] = useMutation<ResponseType>();
  const router = useRouter();
  const [form, onChange] = useInputs<CreateAccount>({
    confirmPassword: '',
    email: '',
    password: '',
    username: '',
  });
  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (form.password !== form.confirmPassword) {
        throw new Error('동일한 비밀번호를 입력해주세요', { cause: '비밀번호 오류' });
      }
      mutate(
        '/api/users/create-account',
        { email: form.email, name: form.username, password: form.password },
        METHOD.POST
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (data) {
      if (data.isSuccess) router.replace('/log-in');
    }
  }, [data, router]);

  return (
    <div>
      <h1>create account</h1>
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
        <Input
          name="password"
          onChange={onChange}
          placeholder="Your password"
          title="Password"
          type="password"
          value={form.password}
        />
        <Input
          name="confirmPassword"
          onChange={onChange}
          placeholder="Your confirmPassword"
          title="confirmPassword"
          type="password"
          value={form.confirmPassword}
        />
        <button>{isLoading ? 'Loading...' : 'Create Account'}</button>
      </form>
    </div>
  );
}
