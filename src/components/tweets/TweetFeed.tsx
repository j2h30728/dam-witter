import useInfiniteTweetsViewModel from '@/hooks/viewModel/useInfiniteTweetsViewModel';
import { TweetResponse } from '@/types';

import LoadingSpinner from '../common/LoadingSpinner';
import { Tweet } from './tweet';

const TweetFeed = () => {
  const {
    following: { onFollowing },
    like: { onToggleLike },
    tweets: { bottomItemRef, isLoading, isValidating, responseTweets },
  } = useInfiniteTweetsViewModel();

  if (isLoading) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }
  return (
    <>
      {responseTweets.map((tweet: TweetResponse) => (
        <Tweet key={tweet.id} tweet={tweet}>
          <Tweet.Author onFollowing={onFollowing} />
          <Tweet.ContentWithLink />
          <Tweet.Description onToggleLike={() => onToggleLike(tweet)} />
        </Tweet>
      ))}
      {isValidating ? <LoadingSpinner text={'불러오는 중..'} /> : <div ref={bottomItemRef}></div>}
    </>
  );
};

export default TweetFeed;
