import { Layout, TitleLogo } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';
import { END_POINTS } from '@/constants/api';

export default function Home() {
  return (
    <Layout isLoggedIn title={<TitleLogo />}>
      <TweetsFeed endpoint={END_POINTS.TWEETS} />
    </Layout>
  );
}
