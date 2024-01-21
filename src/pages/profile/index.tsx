import { Layout } from '@/components';
import MyProfile from '@/components/profiles/MyProfile';

export default function Profile() {
  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      <MyProfile />
    </Layout>
  );
}
