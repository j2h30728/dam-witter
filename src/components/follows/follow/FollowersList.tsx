import UserInformation from '@/components/common/UserInformation';

import useFollowContext from './useFollowContext';

const FollowersList = () => {
  const follow = useFollowContext();

  return <>{follow.followers?.map(follow => <UserInformation follow={follow.follower} key={follow.id} />)}</>;
};

export default FollowersList;
