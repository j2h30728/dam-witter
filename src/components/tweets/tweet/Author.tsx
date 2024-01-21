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
    <div className="w-full ">
      <div
        className="flex items-center gap-3 cursor-pointer w-fit"
        onClick={() => router.push(isAuthor ? `${ROUTE_PATH.PROFILE}` : `${ROUTE_PATH.PROFILE}/${tweet?.userId}`)}
      >
        <ProfileImage alt="author" avatarId={tweet?.user.profile?.avatar} size="md" />
        <h3 className="text-xl font-bold">{tweet?.user.name}</h3>
        <small>{maskEmail(tweet?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
      </div>
    </div>
  );
};
