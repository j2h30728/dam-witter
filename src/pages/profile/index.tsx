import Layout from '@/components/common/Layout';
import { ROUTE_PATH } from '@/constants';
import { makeImagePath } from '@/libs/client';
import { ProfileResponse, ResponseType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import useSWR from 'swr';

export default function Profile() {
  const { data: profile } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      <main className="flex flex-col gap-5 mt-10">
        <div className="flex flex-col items-center gap-2 px-2">
          {profile?.data?.profile?.avatar ? (
            <div className="relative w-40 h-40">
              <Image
                alt="preview Image"
                className="object-cover w-full overflow-hidden rounded-full h-50 "
                fill
                src={makeImagePath(profile?.data?.profile?.avatar)}
              />
            </div>
          ) : (
            <FaUserCircle className="fill-stone-500" size={150} />
          )}
          <h2 className="text-3xl font-bold">{profile?.data?.name}</h2>
          <small className="text-stone-500">{profile?.data?.email}</small>
        </div>
        <p className="mx-5 mt-10 text-lg">{profile?.data?.profile?.bio}</p>
        <Link className="button" href={ROUTE_PATH.PROFILE + ROUTE_PATH.EDIT}>
          수정하기
        </Link>
      </main>
    </Layout>
  );
}
