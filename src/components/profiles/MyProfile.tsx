import useMyProfile from '@/hooks/api/useMyProfile';

import LoadingSpinner from '../common/LoadingSpinner';
import { Profile } from './profile';
import DefaultProfileContent from './profile/DefaultProfileContent';
import MyProfileFooter from './profile/MyProfileFooter';

const MyProfile = () => {
  const { isLoading, profile } = useMyProfile();

  if (!profile || isLoading) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }

  return (
    <Profile profile={profile}>
      <DefaultProfileContent />
      <MyProfileFooter />
    </Profile>
  );
};

export default MyProfile;
