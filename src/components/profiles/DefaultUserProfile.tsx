import useProfile from '@/hooks/api/useProfile';

import LoadingSpinner from '../common/LoadingSpinner';
import { Profile } from './profile';

const DefaultUserProfile = () => {
  const { isLoading, profile, refreshProfile } = useProfile();

  if (!profile || isLoading) {
    return <LoadingSpinner text={'불러오는 중..'} />;
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
