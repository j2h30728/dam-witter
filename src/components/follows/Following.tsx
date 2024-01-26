import { FollowResponse } from '@/types';

import { Follow } from './follow';

export default function Following({ follows }: { follows: FollowResponse }) {
  return (
    <Follow follows={follows}>
      <Follow.FollowingList />
    </Follow>
  );
}
