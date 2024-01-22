import METHOD from '@/constants/method';

import useFollowingMutation from '../api/useFollowingMutation';

const useToggleFollowing = () => {
  const { mutateFollowing } = useFollowingMutation();

  const toggleFollowing = ({
    isFollowing,
    onSuccess,
    userId,
  }: {
    isFollowing: boolean;
    onSuccess: () => void;
    userId: string;
  }) => {
    mutateFollowing(
      { method: isFollowing ? METHOD.DELETE : METHOD.POST, userId: userId },
      { onSuccess: () => onSuccess() }
    );
  };

  return { toggleFollowing };
};

export default useToggleFollowing;
