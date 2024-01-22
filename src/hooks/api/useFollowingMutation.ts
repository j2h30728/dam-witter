import { END_POINTS } from '@/constants/api';
import METHOD, { METHOD_TYPE } from '@/constants/method';
import useSWRMutation from 'swr/mutation';

const useFollowingMutation = () => {
  const { data, isMutating, trigger } = useSWRMutation(
    END_POINTS.FOLLOWING,
    async (_, { arg }: { arg: { method: METHOD_TYPE; userId: string } }) => {
      await fetch(END_POINTS.FOLLOWING + `/${arg.userId}`, {
        method: arg.method,
      });
    }
  );
  const postFollowing = (userId: string) => trigger({ method: METHOD.POST, userId });

  return { following: data, isFollowingMutating: isMutating, mutateFollowing: trigger, postFollowing };
};

export default useFollowingMutation;
