import { PAGE_SIZE } from '@/constants/api';
import useGetInfiniteData from '@/hooks/api/useInfiniteScrollData';
import { TweetResponse } from '@/types';

import useFollowingMutation from '../api/useFollowingMutation';
import useMyProfile from '../api/useMyProfile';
import useLike from '../tweets/useLike';
export interface TweetsFeedEndpoint {
  endpoint: string;
}
const useInfiniteTweetsViewModel = ({ endpoint }: TweetsFeedEndpoint) => {
  const {
    bottomItemRef,
    data: originTweets,
    isLoading,
    isValidating,
    mutate,
  } = useGetInfiniteData<TweetResponse>(endpoint);
  const responseTweets = originTweets.flatMap(tweet => tweet.data) as TweetResponse[];

  const { profile: loggedInUser } = useMyProfile();

  const { toggleLike } = useLike();
  const { postFollowing } = useFollowingMutation();

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

  const optimisticFollowing = (selectedTweet: TweetResponse) => {
    postFollowing(selectedTweet.userId);
    const currentTweetList = [...originTweets];
    const selectedTweetIndex = responseTweets.indexOf(selectedTweet);
    const selectedDataIndex = Math.floor(selectedTweetIndex / PAGE_SIZE);
    const tweetInList = currentTweetList[selectedDataIndex];
    if (tweetInList.data) {
      const modifiedTweetList = tweetInList.data?.map(tweet => {
        if (tweet.id === selectedTweet.id) {
          return {
            ...selectedTweet,
            isFollowing: true,
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
    following: { onFollowing: optimisticFollowing },
    like: { onToggleLike: optimisticToggleLike },
    loggedInUser,
    tweets: { bottomItemRef, isLoading, isValidating, refreshTweets: mutate, responseTweets },
  };
};

export default useInfiniteTweetsViewModel;
