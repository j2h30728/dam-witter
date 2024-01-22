import METHOD from '@/constants/method';

import useFollowingMutation from '../api/useFollowingMutation';

const useToggleFollowing = () => {
  const { mutateFollowing } = useFollowingMutation();

  const toggleFollowing = ({ isFollowing, userId }: { isFollowing: boolean; userId: string }) => {
    mutateFollowing({ method: isFollowing ? METHOD.DELETE : METHOD.POST, userId: userId });
  };

  return { toggleFollowing };
};

export default useToggleFollowing;
