import { Layout } from '@/components';
import ProfileContent from '@/components/profile/ProfileContent';

export default function Profile() {
  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      <ProfileContent />
    </Layout>
  );
}
