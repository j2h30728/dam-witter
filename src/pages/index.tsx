import { METHOD } from '@/constants';
import { useMutation } from '@/libs/client';
import { ResponseType } from '@/types';
import { useRouter } from 'next/router';

export default function Home() {
  const [logOut, { data }] = useMutation<ResponseType>();
  const router = useRouter();
  const handleLogOut = () => {
    if (confirm('로그아웃 하시겠습니까?')) logOut('/api/users/log-out', METHOD.POST);
    router.push('/');
  };
  return (
    <div>
      <main>HOME</main>
      <button onClick={handleLogOut}>Log-Out</button>
    </div>
  );
}
