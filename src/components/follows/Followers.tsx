import { FollowResponse } from '@/types';

import { Follow } from './follow';

export default function Followers({ follows }: { follows: FollowResponse }) {
  return (
    <Follow follows={follows}>
      <Follow.FollowersList />
    </Follow>
  );
}
