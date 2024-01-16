import { PAGE_SIZE } from '@/constants/api';
import { TweetResponse } from '@/types';

import useInfiniteTweets from '../tweets/useInfiniteTweets';
import useLike from '../tweets/useLike';

const useInfiniteTweetsViewModel = () => {
  const { bottomItemRef, isLoading, isValidating, mutate, originTweets, responseTweets } = useInfiniteTweets();

  const { toggleLike } = useLike();
  const optimisticToggleLike = (selectedTweet: TweetResponse) => {
    toggleLike(selectedTweet);
    const currentTweetList = [...originTweets];
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
    like: { onToggleLike: optimisticToggleLike },
    tweets: { bottomItemRef, isLoading, isValidating, responseTweets },
  };
};

export default useInfiniteTweetsViewModel;
