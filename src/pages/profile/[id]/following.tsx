import { LoadingSpinner } from '@/components';
import FollowLayout from '@/components/follows/FollowLayout';
import Following from '@/components/follows/Following';
import useFollow from '@/hooks/api/useFollow';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';

const FollowingPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { follows, isLoading } = useFollow({ userId: query.id as string });

  return <> {!follows || isLoading ? <LoadingSpinner /> : <Following follows={follows} />}</>;
};
FollowingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FollowLayout>{page}</FollowLayout>;
};
export default FollowingPage;
