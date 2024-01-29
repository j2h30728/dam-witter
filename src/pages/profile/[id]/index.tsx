import { Layout } from '@/components';
import DefaultUserProfile from '@/components/profiles/DefaultUserProfile';
import { NextPageWithLayout } from '@/pages/_app';

const Profile: NextPageWithLayout = () => {
  return <DefaultUserProfile />;
};
Profile.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout hasBackButton isLoggedIn title="PROFILE">
      {page}
    </Layout>
  );
};
export default Profile;
