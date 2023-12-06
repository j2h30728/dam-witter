import { METHOD_TYPE } from '@/constants/method';
import useSWRMutation from 'swr/mutation';

const useLikeTweet = () => {
  return useSWRMutation('/api/tweets', async (url, { arg }: { arg: { method: METHOD_TYPE; tweetId: string } }) => {
    await fetch(`${url}/${arg.tweetId}/like`, {
      method: arg.method,
    });
  });
};

export default useLikeTweet;
