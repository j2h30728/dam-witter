import Button from '@/components/common/Button';
import ProfileImage from '@/components/images/ProfileImage';
import { ROUTE_PATH } from '@/constants';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import useRouteToPath from '@/hooks/common/useRouteToPath';
import { maskEmail } from '@/libs/client';
import { TweetResponse } from '@/types';
import { useRouter } from 'next/router';

import useTweetContext from './useTweetContext';

export const Author = ({ onFollowing }: { onFollowing: (selectedTweet: TweetResponse) => void }) => {
  const { loggedInUserId, tweet } = useTweetContext();
  const router = useRouter();
  const isAuthor = loggedInUserId === tweet?.userId;
  const handleFollowing = () => {
    if (tweet) onFollowing(tweet);
  };

  return (
    <div className="flex justify-between w-full">
      <div
        className="flex items-center gap-3 cursor-pointer w-fit"
        onClick={useRouteToPath(isAuthor ? `${ROUTE_PATH.MY_PROFILE}` : `${ROUTE_PATH.PROFILE(tweet?.userId)}`)}
      >
        <ProfileImage alt="author" avatarId={tweet?.user.profile?.avatar} size="md" />
        <h3 className="text-xl font-bold">{tweet?.user.name}</h3>
        <small>{maskEmail(tweet?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
      </div>
      {!isAuthor && !tweet?.isFollowing ? (
        <Button onClick={handleFollowing} size="sm">
          팔로우
        </Button>
      ) : null}
    </div>
  );
};
