import { FollowResponse } from '@/types';

import UserInformationItem from '../common/UserInformationItem';

export default function FollowersList({ follows }: { follows: FollowResponse }) {
  return (
    <div className="flex flex-col max-w-3xl gap-3 mx-auto">
      {follows.followers?.map(follow => <UserInformationItem isAnimation key={follow.id} user={follow.follower} />)}
    </div>
  );
}
