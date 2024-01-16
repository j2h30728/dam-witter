import { END_POINTS } from '@/constants/api';
import { ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface UserTweetParams {
  tweetId: string;
}

const useTweet = (params?: UserTweetParams) => {
  const router = useRouter();

  const { data, isLoading, isValidating, mutate } = useSWR<ResponseType<TweetResponse>>(
    params?.tweetId ? END_POINTS.TWEET(params.tweetId) : END_POINTS.TWEET(router.query.id as string)
  );

  return { data, isLoading, isValidating, mutate };
};

export default useTweet;
