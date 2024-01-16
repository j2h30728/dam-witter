import fetchers from '@/api/fetchers';
import { ROUTE_PATH } from '@/constants';
import { END_POINTS } from '@/constants/api';
import { toastMessage } from '@/libs/client/toastMessage';
import { UserInput } from '@/types';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

const useLogInMutation = () => {
  const router = useRouter();

  const { isMutating, trigger } = useSWRMutation(
    END_POINTS.LOGIN,
    fetchers.post<Pick<UserInput, 'email' | 'password'>>,
    {
      onSuccess: data => {
        toastMessage('success', data.message);
        router.replace(ROUTE_PATH.HOME);
        mutate(END_POINTS.MY_PROFILE, fetchers.get(END_POINTS.MY_PROFILE));
      },
    }
  );

  return { isLoginMutating: isMutating, mutateLogIn: trigger };
};

export default useLogInMutation;
