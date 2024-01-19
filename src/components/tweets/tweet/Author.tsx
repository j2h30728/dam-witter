import ProfileImage from '@/components/images/ProfileImage';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { maskEmail } from '@/libs/client';
import { useContext } from 'react';

import { tweetContext } from '.';

export const Author = () => {
  const tweet = useContext(tweetContext);
  return (
    <div className="flex items-center w-full gap-3">
      <ProfileImage alt="author" avatarId={tweet?.user.profile?.avatar} size="md" />
      <h3 className="text-xl font-bold">{tweet?.user.name}</h3>
      <small>{maskEmail(tweet?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
    </div>
  );
};
