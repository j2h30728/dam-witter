import { ROUTE_PATH } from '@/constants';
import { maskEmail, parameterToString } from '@/libs/client';
import { UserInformation } from '@/types';
import Link from 'next/link';

import ProfileImage from '../images/ProfileImage';

const UserInformationItem = ({
  isAnimation = false,
  isLoggedInUser,
  user,
}: {
  isAnimation?: boolean;
  isLoggedInUser?: boolean;
  user: UserInformation;
}) => {
  return (
    <Link
      className={parameterToString(
        'flex items-center w-full gap-3 ',
        isAnimation ? 'hover:scale-105 hover:translate-x-3 hover:ease-in-out hover:transition hover:duration-300' : ''
      )}
      href={isLoggedInUser ? ROUTE_PATH.MY_PROFILE : `${ROUTE_PATH.PROFILE(user.profile?.userId || '')}`}
      key={user.id}
    >
      <ProfileImage alt={`${user.name}_avatar`} avatarId={user.profile?.avatar} size="md" />
      <span className="font-bold">{user.name}</span>
      <small>{maskEmail(user.email)}</small>
    </Link>
  );
};
export default UserInformationItem;
