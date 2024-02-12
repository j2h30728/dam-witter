import { ProfileResponse } from '@/types';

import DefaultProfileContent from './DefaultProfileContent';
import DefaultUserFooter from './DefaultUserFooter';
import FollowingButton from './FollowingButton';
import MyProfileFooter from './MyProfileFooter';
import { profileContext } from './useProfileContext';

export const ProfileRoot = ({
  children,
  profile,
  refreshProfile,
}: {
  children: React.ReactNode;
  profile: ProfileResponse;
  refreshProfile?: () => void;
}) => {
  return (
    <profileContext.Provider value={{ profile, refreshProfile }}>
      <div className="flex flex-col justify-around gap-5 px-2 mx-auto md:max-w-3xl h-fit">{children}</div>
    </profileContext.Provider>
  );
};

export const Profile = Object.assign(ProfileRoot, {
  DefaultProfileContent,
  DefaultUserFooter,
  FollowingButton,
  MyProfileFooter,
});
