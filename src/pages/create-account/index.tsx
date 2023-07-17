import type { UserInput } from '@/types/users';

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
  const [mutate, { data, error, isLoading }] = useMutation<ResponseType>();
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
        <div>
          <label>Name</label>
          <input name="username" onChange={onChange} placeholder="Your name" type="text" value={form.username} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" onChange={onChange} placeholder="Your email" type="email" value={form.email} />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            onChange={onChange}
            placeholder="Your password"
            type="password"
            value={form.password}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            onChange={onChange}
            placeholder="Your confirmPassword"
            type="password"
            value={form.confirmPassword}
          />
        </div>
        <button>{isLoading ? 'Loading...' : 'Create Account'}</button>
      </form>
    </div>
  );
}
