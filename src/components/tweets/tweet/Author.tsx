import ProfileImage from '@/components/images/ProfileImage';
import { ROUTE_PATH } from '@/constants';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import useMyProfile from '@/hooks/api/useMyProfile';
import { maskEmail } from '@/libs/client';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { tweetContext } from '.';

export const Author = () => {
  const tweet = useContext(tweetContext);
  const router = useRouter();
  const { profile } = useMyProfile();
  const isAuthor = profile?.id === tweet?.userId;

  return (
    <div className="flex items-center w-full gap-3 cursor-pointer">
      <ProfileImage
        alt="author"
        avatarId={tweet?.user.profile?.avatar}
        onClick={() => router.push(isAuthor ? `${ROUTE_PATH.PROFILE}` : `${ROUTE_PATH.PROFILE}/${tweet?.userId}`)}
        size="md"
      />
      <h3 className="text-xl font-bold">{tweet?.user.name}</h3>
      <small>{maskEmail(tweet?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
    </div>
  );
};
