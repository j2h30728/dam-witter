import Button from '@/components/common/Button';
import { METHOD } from '@/constants';
import useFollowingMutation from '@/hooks/api/useFollowingMutation';

import useProfileContext from './useProfileContext';

const FollowingButton = () => {
  const { profile, refreshProfile } = useProfileContext();
  const { mutateFollowing } = useFollowingMutation();

  const handleFollowing = async () => {
    if (profile.isFollowing) {
      await mutateFollowing({ method: METHOD.DELETE, userId: profile.id });
    } else {
      await mutateFollowing({ method: METHOD.POST, userId: profile.id });
    }
    if (refreshProfile) {
      refreshProfile();
    }
  };

  return <Button onClick={handleFollowing}>{profile.isFollowing ? '팔로잉 취소' : '팔로잉'}</Button>;
};

export default FollowingButton;
