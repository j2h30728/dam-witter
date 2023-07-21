import { METHOD } from '@/constants';
import { ResponseType } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useMutation from '../../libs/client/useMutation';

export default function useLogOut() {
  const [logOut, { data: logOutResponse }] = useMutation<ResponseType<null>>();
  const router = useRouter();

  const handleLogOut = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logOut('/api/users/log-out', METHOD.POST);
    }
  };
  useEffect(() => {
    if (logOutResponse?.isSuccess) {
      router.replace('/log-in');
    }
  }, [logOutResponse, router]);

  return handleLogOut;
}
