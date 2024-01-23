import UserInformation from '@/components/common/UserInformationItem';

import useFollowContext from './useFollowContext';

const FollowersList = () => {
  const follow = useFollowContext();

  return <>{follow.followers?.map(follow => <UserInformation key={follow.id} user={follow.follower} />)}</>;
};

export default FollowersList;
