import { FollowResponse } from '@/types';

import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import Layout from './Layout';
import { followContext } from './useFollowContext';

export const FollowRoot = ({ children, follows }: { children: React.ReactNode; follows: FollowResponse }) => {
  return <followContext.Provider value={follows}>{children}</followContext.Provider>;
};

export const Follow = Object.assign(FollowRoot, { FollowersList, FollowingList, Layout });
