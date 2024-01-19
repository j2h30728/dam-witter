import { ROUTE_PATH } from '@/constants';
import useProfile from '@/hooks/api/useProfile';
import { makeImagePath } from '@/libs/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileContent = () => {
  const { isLoading, profile } = useProfile();

  if (isLoading) {
    <LoadingSpinner text={'불러오는 중..'} />;
  }
  return (
    <main className="flex flex-col justify-center gap-5 mt-10">
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
      <Link href={ROUTE_PATH.PROFILE + ROUTE_PATH.EDIT}>
        <Button width="w-full">수정하기</Button>
      </Link>
    </main>
  );
};

export default ProfileContent;
