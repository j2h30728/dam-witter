import { END_POINTS, PAGE_SIZE } from '@/constants/api';
import useGetInfiniteData from '@/hooks/common/useInfiniteScrollData';
import { TweetResponse } from '@/types';

import useLike from './useLike';

const useInfiniteTweets = () => {
  const { bottomItemRef, data, isLoading, isValidating, mutate } = useGetInfiniteData<TweetResponse>(END_POINTS.TWEETS);
  const responseTweets = data.flatMap(tweet => tweet.data) as TweetResponse[];

  const { toggleLike } = useLike();
  const optimisticToggleLike = (selectedTweet: TweetResponse) => {
    toggleLike(selectedTweet);
    const currentTweetList = [...data];
    const selectedTweetIndex = responseTweets.indexOf(selectedTweet);
    const selectedDataIndex = Math.floor(selectedTweetIndex / PAGE_SIZE);
    const tweetInList = currentTweetList[selectedDataIndex];
    if (tweetInList.data) {
      const modifiedTweetList = tweetInList.data?.map(tweet => {
        if (tweet.id === selectedTweet.id) {
          return {
            ...selectedTweet,
            _count: {
              ...selectedTweet._count,
              likes: selectedTweet.isLiked ? selectedTweet._count.likes - 1 : selectedTweet._count.likes + 1,
            },
            isLiked: !selectedTweet.isLiked,
          };
        } else {
          return tweet;
        }
      });
      currentTweetList[selectedDataIndex] = { ...tweetInList, data: modifiedTweetList ?? [] };
    }
    mutate([currentTweetList], false);
  };

  return {
    like: optimisticToggleLike,
    tweets: {
      bottomItemRef,
      data: responseTweets,
      isLoading,
      isValidating,
      mutate,
    },
  };
};

export default useInfiniteTweets;
