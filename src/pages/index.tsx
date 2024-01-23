import { Layout, TitleLogo } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';

export default function Home() {
  return (
    <Layout isLoggedIn title={<TitleLogo />}>
      <TweetsFeed />
    </Layout>
  );
}
