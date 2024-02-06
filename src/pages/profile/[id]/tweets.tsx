import { Layout, TitleLogo } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';
import TweetFeedLayout from '@/components/tweets/TweetFeedLayout';
import { END_POINTS } from '@/constants/api';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';

const UserTweetFeedPage: NextPageWithLayout = () => {
  const router = useRouter();
  const params = new URLSearchParams();
  params.set('userId', router.query.id as string);

  return <TweetsFeed endpoint={END_POINTS.TWEETS} query={params.toString()} />;
};
UserTweetFeedPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout hasBackButton isLoggedIn title={<TitleLogo />}>
      <TweetFeedLayout>{page}</TweetFeedLayout>
    </Layout>
  );
};
export default UserTweetFeedPage;
