import { ROUTE_PATH } from '@/constants';
import useInfiniteTweetsViewModel from '@/hooks/viewModel/useInfiniteTweetsViewModel';
import { formatDate, maskEmail } from '@/libs/client';
import { TweetResponse } from '@/types';
import Link from 'next/link';

import LikeButton from '../common/LikeButton';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileImage from '../images/ProfileImage';
import TweetImage from '../images/TweetImage';

const TweetFeed = () => {
  const {
    like: { onToggleLike },
    tweets: { bottomItemRef, isLoading, isValidating, responseTweets },
  } = useInfiniteTweetsViewModel();

  if (isLoading) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }
  return (
    <div className="gap-5 sub-layout">
      {responseTweets.map((tweet: TweetResponse) => (
        <div className="flex flex-col gap-4 pb-2 border-b-2 border-base1" key={tweet.id}>
          <div className="flex items-center gap-3 px-3">
            <ProfileImage avatarId={tweet.user.profile?.avatar} />
            <h3 className="text-xl font-bold">{tweet.user.name}</h3>
            <small>{maskEmail(tweet.user.email)}</small>
            <small className="ml-auto text-stone-500">{formatDate(tweet.createdAt)}</small>
          </div>
          <Link className="px-5 mx-3" href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>
            {tweet.image && <TweetImage imageId={tweet.image} />}
            <p className="whitespace-pre-line">
              {tweet.text.length > 300 ? (
                <span>
                  {tweet.text.slice(0, 200)}
                  <small className="font-bold text-neutral-500">... 더보기</small>
                </span>
              ) : (
                tweet.text
              )}
            </p>
          </Link>
          <div className="flex items-center w-full gap-2 px-4 py-1 text-stone-500">
            <div className="flex items-center gap-1 w-fit">
              <LikeButton isLiked={!!tweet.isLiked} toggleLike={() => onToggleLike(tweet)} />
              <span>좋아요 {tweet?._count.likes} 개</span>
            </div>
            <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>| 코멘트 {tweet?._count.comments} 개</Link>
          </div>
        </div>
      ))}
      {isValidating ? <LoadingSpinner text={'불러오는 중..'} /> : <div ref={bottomItemRef}></div>}
    </div>
  );
};

export default TweetFeed;
