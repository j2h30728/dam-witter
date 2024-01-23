import { Layout, LoadingSpinner } from '@/components';
import { FollowResponse } from '@/types';

import { Follow } from './follow';

export default function Following({ follows }: { follows: FollowResponse }) {
  return (
    <Follow follows={follows}>
      <Follow.Layout>
        <Follow.FollowingList />
      </Follow.Layout>
    </Follow>
  );
}
