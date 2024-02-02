import { Loader } from '@/components';
import useMyProfile from '@/hooks/api/useMyProfile';

import { Profile } from './profile';

const MyProfile = () => {
  const { isLoading, profile } = useMyProfile();

  if (!profile || isLoading) {
    return <Loader loaderText="불러오는 중.." />;
  }

  return (
    <Profile profile={profile}>
      <Profile.DefaultProfileContent />
      <Profile.MyProfileFooter />
    </Profile>
  );
};

export default MyProfile;
