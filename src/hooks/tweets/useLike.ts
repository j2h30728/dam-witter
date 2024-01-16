import METHOD from '@/constants/method';
import { TweetResponse } from '@/types';

import useLikeMutation from '../api/useLikeMutation';
import useDebounce from '../common/useDebounce';

const useLike = () => {
  const { mutateLike } = useLikeMutation();

  const debouncedToggleLike = useDebounce((tweet: TweetResponse) => {
    mutateLike({ method: tweet.isLiked ? METHOD.DELETE : METHOD.POST, tweetId: tweet.id }, { revalidate: false });
  }, 400);

  return { toggleLike: debouncedToggleLike };
};

export default useLike;
