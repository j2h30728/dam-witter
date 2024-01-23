import UserInformation from '@/components/common/UserInformation';

import useFollowContext from './useFollowContext';

const FollowingList = () => {
  const follow = useFollowContext();

  return <>{follow.following?.map(follow => <UserInformation follow={follow.following} key={follow.id} />)}</>;
};

export default FollowingList;
