import { Layout, TitleLogo } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';
import TweetFeedLayout from '@/components/tweets/TweetFeedLayout';
import { END_POINTS } from '@/constants/api';

import { NextPageWithLayout } from '../_app';

const FollowingTweetFeed: NextPageWithLayout = () => {
  return <TweetsFeed endpoint={END_POINTS.OPTION_TWEETS('following')} />;
};

FollowingTweetFeed.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout isLoggedIn title={<TitleLogo />}>
      <TweetFeedLayout>{page}</TweetFeedLayout>
    </Layout>
  );
};
export default FollowingTweetFeed;
