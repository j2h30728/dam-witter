import { followingFetcher } from '@/api/followingFetcher';
import { END_POINTS } from '@/constants/api';
import METHOD from '@/constants/method';
import { toastMessage } from '@/libs/client/toastMessage';
import useSWRMutation from 'swr/mutation';

const useFollowingMutation = () => {
  const { data, isMutating, trigger } = useSWRMutation(END_POINTS.FOLLOW, followingFetcher, {
    onSuccess: data => {
      toastMessage('success', data.message);
    },
  });
  const postFollowing = (userId: string) => trigger({ method: METHOD.POST, userId });

  return { following: data, isFollowingMutating: isMutating, mutateFollowing: trigger, postFollowing };
};

export default useFollowingMutation;
