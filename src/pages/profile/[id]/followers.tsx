import { Layout, LoadingSpinner } from '@/components';
import Followers from '@/components/follows/Followers';
import useFollow from '@/hooks/api/useFollow';
import { useRouter } from 'next/router';

export default function FollowersPage() {
  const { query } = useRouter();
  const { follows, isLoading } = useFollow({ userId: query.id as string });

  return (
    <Layout hasBackButton isLoggedIn title={follows?.profile?.user.name}>
      {!follows || isLoading ? <LoadingSpinner /> : <Followers follows={follows} />}
    </Layout>
  );
}
