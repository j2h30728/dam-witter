import useInfiniteTweetsViewModel, { TweetsFeedEndpoint } from '@/hooks/viewModel/useInfiniteTweetsViewModel';
import { TweetResponse } from '@/types';

import LoadingSpinner from '../common/LoadingSpinner';
import { Tweet } from './tweet';

const TweetFeed = ({ endpoint }: TweetsFeedEndpoint) => {
  const {
    following: { onFollowing },
    like: { onToggleLike },
    loggedInUser,
    tweets: { bottomItemRef, isLoading, isValidating, refreshTweets, responseTweets },
  } = useInfiniteTweetsViewModel({ endpoint });

  if (isLoading || !responseTweets || !loggedInUser) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }

  return (
    <>
      {responseTweets.map((tweet: TweetResponse) => (
        <Tweet key={tweet?.id} loggedInUserId={loggedInUser?.id} tweet={tweet}>
          <Tweet.Author onFollowing={onFollowing} />
          <Tweet.ContentWithLink />
          <Tweet.Description modalOpenCallbackFn={refreshTweets} onToggleLike={() => onToggleLike(tweet)} />
        </Tweet>
      ))}
      <div className="h-52">
        {isValidating ? <LoadingSpinner text={'불러오는 중..'} /> : <div ref={bottomItemRef}></div>}
      </div>
    </>
  );
};

export default TweetFeed;
