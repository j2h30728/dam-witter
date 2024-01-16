import { Layout, LoadingSpinner } from '@/components';
import { ROUTE_PATH } from '@/constants';
import useProfile from '@/hooks/api/useProfile';
import { makeImagePath } from '@/libs/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

function ProfileContent() {
  const { isLoading, profile } = useProfile();

  if (isLoading) {
    <LoadingSpinner text={'불러오는 중..'} />;
  }
  return (
    <>
      <div className="flex flex-col items-center gap-2 px-2">
        {profile?.profile?.avatar ? (
          <div className="relative w-40 h-40">
            <Image
              alt="preview Image"
              className="object-cover w-full overflow-hidden rounded-full h-50 "
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={makeImagePath(profile?.profile.avatar)}
            />
          </div>
        ) : (
          <FaUserCircle className="fill-stone-500" size={150} />
        )}
        <h2 className="text-3xl font-bold">{profile?.name}</h2>
        <small className="text-stone-500">{profile?.email}</small>
      </div>
      <p className="h-40 mx-5 mt-10 text-lg">
        {profile?.profile?.bio ? (
          profile?.profile?.bio
        ) : (
          <small className="text-stone-300">자기소개가 추가해주세요.</small>
        )}
      </p>
      <Link className="w-3/5 text-center button" href={ROUTE_PATH.PROFILE + ROUTE_PATH.EDIT}>
        <span className="font-semibold">수정하기</span>
      </Link>
    </>
  );
}

export default function Profile() {
  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      <main className="flex flex-col gap-5 mt-10">
        <ProfileContent />
      </main>
    </Layout>
  );
}
