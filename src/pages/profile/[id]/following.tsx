import { Layout, LoadingSpinner } from '@/components';
import Following from '@/components/follows/Following';
import { ROUTE_PATH } from '@/constants';
import useFollow from '@/hooks/api/useFollow';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FollowingPage() {
  const { query } = useRouter();
  const { follows, isLoading } = useFollow({ userId: query.id as string });

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
      {!follows || isLoading ? <LoadingSpinner /> : <Following follows={follows} />}
    </Layout>
  );
}
