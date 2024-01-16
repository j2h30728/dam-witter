import { END_POINTS } from '@/constants/api';
import useGetInfiniteData from '@/hooks/common/useInfiniteScrollData';
import { TweetResponse } from '@/types';

const useInfiniteTweets = () => {
  const { bottomItemRef, data, isLoading, isValidating, mutate } = useGetInfiniteData<TweetResponse>(END_POINTS.TWEETS);
  const responseTweets = data.flatMap(tweet => tweet.data) as TweetResponse[];

  return {
    bottomItemRef,
    isLoading,
    isValidating,
    mutate,
    originTweets: data,
    responseTweets,
  };
};

export default useInfiniteTweets;
