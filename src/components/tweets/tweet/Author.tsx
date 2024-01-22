import Button from '@/components/common/Button';
import ProfileImage from '@/components/images/ProfileImage';
import { ROUTE_PATH } from '@/constants';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import useMyProfile from '@/hooks/api/useMyProfile';
import { maskEmail } from '@/libs/client';
import { TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { tweetContext } from '.';

export const Author = ({ onFollowing }: { onFollowing: (selectedTweet: TweetResponse) => void }) => {
  const tweet = useContext(tweetContext);
  const router = useRouter();
  const { profile } = useMyProfile();
  const isAuthor = profile?.id === tweet?.userId;

  const handleFollowing = () => {
    if (tweet) onFollowing(tweet);
  };

  return (
    <div className="flex justify-between w-full">
      <div
        onClick={() =>
          router.push(isAuthor ? `${ROUTE_PATH.MY_PROFILE}` : `${ROUTE_PATH.PROFILE(tweet?.userId || '')}`)
        }
        className="flex items-center gap-3 cursor-pointer w-fit"
      >
        <ProfileImage alt="author" avatarId={tweet?.user.profile?.avatar} size="md" />
        <h3 className="text-xl font-bold">{tweet?.user.name}</h3>
        <small>{maskEmail(tweet?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
      </div>
      {!isAuthor && !tweet?.isFollowing && (
        <Button onClick={handleFollowing} size="sm">
          팔로잉
        </Button>
      )}
    </div>
  );
};
