import Button from '@/components/common/Button';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import useToggleFollowing from '@/hooks/users/useToggleFollowing';
import { toastMessage } from '@/libs/client/toastMessage';

import useProfileContext from './useProfileContext';

const FollowingButton = () => {
  const { toggleFollowing } = useToggleFollowing();
  const { profile, refreshProfile } = useProfileContext()!;

  const handleFollowing = async () => {
    if (!profile.profile) return toastMessage('error', DEFAULT_ERROR_MESSAGE);
    toggleFollowing({ isFollowing: !!profile.isFollowing, userId: profile.profile.userId });
    if (refreshProfile) refreshProfile();
  };

  return <Button onClick={handleFollowing}>{profile.isFollowing ? '팔로잉 취소' : '팔로잉'}</Button>;
};

export default FollowingButton;
