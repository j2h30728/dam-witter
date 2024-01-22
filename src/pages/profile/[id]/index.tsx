import { Layout } from '@/components';
import DefaultUserProfile from '@/components/profiles/DefaultUserProfile';

export default function Profile() {
  return (
    <Layout hasBackButton isLoggedIn title="PROFILE">
      <DefaultUserProfile />
    </Layout>
  );
}
