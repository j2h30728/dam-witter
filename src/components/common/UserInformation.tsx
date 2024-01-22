import { ROUTE_PATH } from '@/constants';
import { maskEmail } from '@/libs/client';
import { UserInformation } from '@/types';
import Link from 'next/link';

import ProfileImage from '../images/ProfileImage';

const UserInformation = ({ follow }: { follow: UserInformation }) => {
  return (
    <Link
      className="flex items-center w-full gap-3"
      href={`${ROUTE_PATH.PROFILE(follow.profile?.userId || '')}`}
      key={follow.id}
    >
      <ProfileImage alt={`${follow.name}_avatar`} avatarId={follow.profile?.avatar} size="md" />
      <span className="font-bold">{follow.name}</span>
      <small>{maskEmail(follow.email)}</small>
    </Link>
  );
};
export default UserInformation;
