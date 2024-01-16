import fetchers from '@/api/fetchers';
import { ROUTE_PATH } from '@/constants';
import { END_POINTS } from '@/constants/api';
import { toastMessage } from '@/libs/client/toastMessage';
import { UserInput } from '@/types';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

const useLogInMutation = () => {
  const router = useRouter();

  const { isMutating, trigger } = useSWRMutation(END_POINTS.CREATE_ACCOUNT, fetchers.post<UserInput>, {
    onSuccess: data => {
      toastMessage('success', data.message);
      router.replace(ROUTE_PATH.LOG_IN);
    },
  });

  return { isCreateAccountMutating: isMutating, mutateCreateAccount: trigger };
};

export default useLogInMutation;
