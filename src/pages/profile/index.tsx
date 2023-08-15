import { LoadingSpinner } from '@/components';
import Layout from '@/components/common/Layout';
import { ROUTE_PATH } from '@/constants';
import { makeImagePath } from '@/libs/client';
import { ProfileResponse, ResponseType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import useSWR from 'swr';

export default function Profile() {
  const { data: profile, isLoading } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      <main className="flex flex-col gap-5 mt-10">
        {isLoading ? (
          <LoadingSpinner text={'불러오는 중..'} />
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 px-2">
              {profile?.data?.profile?.avatar ? (
                <div className="relative w-40 h-40">
                  <Image
                    alt="preview Image"
                    className="object-cover w-full overflow-hidden rounded-full h-50 "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={makeImagePath(profile?.data?.profile?.avatar)}
                  />
                </div>
              ) : (
                <FaUserCircle className="fill-stone-500" size={150} />
              )}
              <h2 className="text-3xl font-bold">{profile?.data?.name}</h2>
              <small className="text-stone-500">{profile?.data?.email}</small>
            </div>
            <p className="h-40 mx-5 mt-10 text-lg">
              {profile?.data?.profile?.bio ? (
                profile?.data?.profile?.bio
              ) : (
                <small className="text-stone-300">자기소개가 추가해주세요.</small>
              )}
            </p>
            <Link className="w-3/5 text-center button" href={ROUTE_PATH.PROFILE + ROUTE_PATH.EDIT}>
              <span className="font-semibold">수정하기</span>
            </Link>
          </>
        )}
      </main>
    </Layout>
  );
}
