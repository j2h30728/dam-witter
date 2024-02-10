import { FollowResponse } from '@/types';

import UserInformationItem from '../common/UserInformationItem';

export default function FollowingList({ follows }: { follows: FollowResponse }) {
  return (
    <div className="flex flex-col gap-3">
      {follows.following?.map(follow => <UserInformationItem isAnimation key={follow.id} user={follow.following} />)}
    </div>
  );
}
