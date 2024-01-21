import Button from '@/components/common/Button';
import { ROUTE_PATH } from '@/constants';
import Link from 'next/link';

import useProfileContext from './useProfileContext';

const MyProfileFooter = () => {
  const { profile } = useProfileContext();

  return (
    <>
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
    </>
  );
};

export default MyProfileFooter;
