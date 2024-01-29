import Button from '@/components/common/Button';
import { ROUTE_PATH } from '@/constants';
import Link from 'next/link';

import useProfileContext from './useProfileContext';

const MyProfileFooter = () => {
  const { profile } = useProfileContext();

  return (
    <div className="flex flex-col justify-between h-full">
      <p className="h-40 mx-5 mt-10 text-lg">
        {profile?.profile?.bio ? (
          profile?.profile?.bio
        ) : (
          <small className="text-stone-300">자기소개가 추가해주세요.</small>
        )}
      </p>
      <Link href={ROUTE_PATH.MY_PROFILE + ROUTE_PATH.EDIT}>
        <Button width="w-full mt-auto mb-[20%]">수정하기</Button>
      </Link>
    </div>
  );
};

export default MyProfileFooter;
