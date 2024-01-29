import { LoadingSpinner } from '@/components';
import FollowLayout from '@/components/follows/FollowLayout';
import FollowersList from '@/components/follows/FollowersList';
import useFollow from '@/hooks/api/useFollow';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';

const FollowerPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { follows, isLoading } = useFollow({ userId: query.id as string });

  return <>{!follows || isLoading ? <LoadingSpinner text="불러오는 중..." /> : <FollowersList follows={follows} />}</>;
};

FollowerPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FollowLayout>{page}</FollowLayout>;
};
export default FollowerPage;
