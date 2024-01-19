import { Layout, Symbol } from '@/components';
import TweetsFeed from '@/components/tweets/TweetFeed';

export default function Home() {
  return (
    <Layout isLoggedIn title={<Symbol height={33} width={33} />}>
      <TweetsFeed />
    </Layout>
  );
}
