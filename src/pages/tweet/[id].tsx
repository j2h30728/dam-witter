import { Layout, TitleLogo } from '@/components';
import TweetDetailWithComments from '@/components/tweets/TweetDetailWithComments';

import { NextPageWithLayout } from '../_app';

const DetailTweet: NextPageWithLayout = () => {
  return <TweetDetailWithComments />;
};
DetailTweet.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout hasBackButton isLoggedIn title={<TitleLogo />}>
      {page}
    </Layout>
  );
};
