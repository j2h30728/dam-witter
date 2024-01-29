import { Layout } from '@/components';
import MyProfile from '@/components/profiles/MyProfile';

import { NextPageWithLayout } from '../_app';

const MyPage: NextPageWithLayout = () => {
  return <MyProfile />;
};
MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      {page}
    </Layout>
  );
};
export default MyPage;
