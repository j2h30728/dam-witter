import useProfile from '@/hooks/api/useProfile';

import LoadingSpinner from '../common/LoadingSpinner';
import { Profile } from './profile';
import DefaultProfileContent from './profile/DefaultProfileContent';
import DefaultUserFooter from './profile/DefaultUserFooter';
import FollowingButton from './profile/FollowingButton';

const DefaultUserProfile = () => {
  const { isLoading, profile, refreshProfile } = useProfile();

  if (!profile || isLoading) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }

  return (
    <Profile profile={profile} refreshProfile={refreshProfile}>
      <DefaultProfileContent>
        <FollowingButton />
      </DefaultProfileContent>
      <DefaultUserFooter />
    </Profile>
  );
};

export default DefaultUserProfile;
