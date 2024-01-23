import UserInformationItem from '@/components/common/UserInformationItem';

import useFollowContext from './useFollowContext';

const FollowingList = () => {
  const follow = useFollowContext();

  return <>{follow.following?.map(follow => <UserInformationItem key={follow.id} user={follow.following} />)}</>;
};

export default FollowingList;
