import { Layout, LoadingSpinner } from '@/components';
import Following from '@/components/follows/Following';
import useFollow from '@/hooks/api/useFollow';
import { useRouter } from 'next/router';

export default function FollowingPage() {
  const { query } = useRouter();
  const { follows, isLoading } = useFollow({ userId: query.id as string });

  return (
    <Layout hasBackButton isLoggedIn title={follows?.profile?.user.name}>
      {!follows || isLoading ? <LoadingSpinner /> : <Following follows={follows} />}
    </Layout>
  );
}
