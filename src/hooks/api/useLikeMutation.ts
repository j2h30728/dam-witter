import { END_POINTS } from '@/constants/api';
import { METHOD_TYPE } from '@/constants/method';
import useSWRMutation from 'swr/mutation';

const useLikeMutation = () => {
  const { data, trigger } = useSWRMutation(
    END_POINTS.LIKE,
    async (_, { arg }: { arg: { method: METHOD_TYPE; tweetId: string } }) => {
      await fetch(END_POINTS.LIKE(arg.tweetId), {
        method: arg.method,
      });
    }
  );

  return { like: data, mutateLike: trigger };
};

export default useLikeMutation;
