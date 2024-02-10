import { FollowResponse } from '@/types';

import UserInformationItem from '../common/UserInformationItem';

export default function FollowersList({ follows }: { follows: FollowResponse }) {
  return (
    <div className="flex flex-col gap-3">
      {follows.followers?.map(follow => <UserInformationItem isAnimation key={follow.id} user={follow.follower} />)}
    </div>
  );
}
