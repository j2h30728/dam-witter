import { ROUTE_PATH } from '@/constants';
import useProfile from '@/hooks/api/useProfile';
import { makeImagePath } from '@/libs/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileImage from '../images/ProfileImage';

const ProfileContent = () => {
  const { isLoading, profile } = useProfile();

  if (isLoading) {
    <LoadingSpinner text={'불러오는 중..'} />;
  }
  return (
    <main className="flex flex-col justify-center gap-5 mt-10">
      <div className="flex flex-col items-center gap-2 px-2">
        <ProfileImage alt="avatar" avatarId={profile?.profile?.avatar} size="lg" />
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
