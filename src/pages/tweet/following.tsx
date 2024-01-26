import { Layout, TitleLogo } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';
import { END_POINTS } from '@/constants/api';

export default function Following() {
  return (
    <Layout isLoggedIn title={<TitleLogo />}>
      <TweetsFeed endpoint={END_POINTS.OPTION_TWEETS('following')} />
    </Layout>
  );
}
