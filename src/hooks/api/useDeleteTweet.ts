import fetchers from '@/api/fetchers';
import { ROUTE_PATH } from '@/constants';
import { END_POINTS } from '@/constants/api';
import { toastMessage } from '@/libs/client/toastMessage';
import { useRouter } from 'next/router';
import { cache } from 'swr/_internal';
import useSWRMutation from 'swr/mutation';

const useDeleteTweet = () => {
  const router = useRouter();

  const { data, isMutating, trigger } = useSWRMutation(END_POINTS.TWEET(router.query.id as string), fetchers.delete, {
    onError: (error: string) => toastMessage('error', error),
    onSuccess: data => {
      if (data.isSuccess) {
        cache.delete('$inf$/api/tweets');
        cache.delete(END_POINTS.TWEETS);
        router.replace(ROUTE_PATH.HOME);
      }
      toastMessage('info', data.message);
    },
    revalidate: false,
  });

  return { deleteTweet: trigger, isDeleting: isMutating || data?.isSuccess };
};

export default useDeleteTweet;
