import { Layout, Symbol } from '@/components';
import TweetDetailWithComments from '@/components/tweets/TweetDetailWithComments';

export default function DetailTweet() {
  return (
    <Layout hasBackButton isLoggedIn title={<Symbol height={33} width={33} />}>
      <TweetDetailWithComments />
    </Layout>
  );
}
