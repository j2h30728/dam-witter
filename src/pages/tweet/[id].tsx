import { Layout, TitleLogo } from '@/components';
import TweetDetailWithComments from '@/components/tweets/TweetDetailWithComments';

export default function DetailTweet() {
  return (
    <Layout hasBackButton isLoggedIn title={<TitleLogo />}>
      <TweetDetailWithComments />
    </Layout>
  );
}
