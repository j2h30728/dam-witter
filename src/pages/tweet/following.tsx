import { Layout, TitleLogo } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';
import TweetFeedLayout from '@/components/tweets/TweetFeedLayout';
import { ROUTE_PATH } from '@/constants';
import { END_POINTS } from '@/constants/api';

import { NextPageWithLayout } from '../_app';

const FollowingTweetFeed: NextPageWithLayout = () => {
  return <TweetsFeed endpoint={END_POINTS.OPTION_TWEETS('following')} />;
};

FollowingTweetFeed.getLayout = function getLayout(page: React.ReactElement) {
  const navigationConfig = [
    {
      href: ROUTE_PATH.HOME,
      isCurrentPath: false,
      title: '전체 보기',
    },
    {
      href: ROUTE_PATH.FOLLOWING_TWEETS,
      isCurrentPath: true,
      title: '팔로잉',
    },
  ];
  return (
    <Layout isLoggedIn title={<TitleLogo />}>
      <TweetFeedLayout navigation={navigationConfig}>{page}</TweetFeedLayout>
    </Layout>
  );
};
export default FollowingTweetFeed;
