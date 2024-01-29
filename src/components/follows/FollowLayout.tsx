import { ROUTE_PATH } from '@/constants';
import useFollow from '@/hooks/api/useFollow';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../common/Layout';
import NestedLayout, { Navigation } from '../common/NestedLayout';

const FollowLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const { pathname, query } = useRouter();
  const { follows } = useFollow({ userId: query.id as string });

  const followHeader: Navigation[] = [
    {
      href: ROUTE_PATH.FOLLOWERS(String(query.id)),
      isCurrentPath: pathname.includes('followers'),
      title: `팔로워 ${follows?.followers.length ?? ''}`,
    },
    {
      href: ROUTE_PATH.FOLLOWING(String(query.id)),
      isCurrentPath: pathname.includes('following'),
      title: `팔로잉 ${follows?.following.length ?? ''}`,
    },
  ];
  return (
    <Layout
      title={
        <Link href={follows?.profile?.user.id ? ROUTE_PATH.PROFILE(follows?.profile?.user?.id) : ROUTE_PATH.HOME}>
          {follows?.profile?.user.name}
        </Link>
      }
      hasBackButton
      isLoggedIn
    >
      <NestedLayout navigation={followHeader}>{children}</NestedLayout>
    </Layout>
  );
};
export default FollowLayout;
