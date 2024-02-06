import { Loader } from '@/components';
import useProfile from '@/hooks/api/useProfile';

import { Profile } from './profile';

const DefaultUserProfile = () => {
  const { isLoading, profile, refreshProfile } = useProfile();

  if (!profile || isLoading) {
    return <Loader loaderText="불러오는 중.." />;
  }

  return (
    <Profile profile={profile} refreshProfile={refreshProfile}>
      <Profile.DefaultProfileContent>
        <Profile.FollowingButton />
      </Profile.DefaultProfileContent>
      <Profile.DefaultUserFooter />
    </Profile>
  );
};

export default DefaultUserProfile;
