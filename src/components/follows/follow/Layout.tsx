import { ROUTE_PATH } from '@/constants';
import { parameterToString } from '@/libs/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useFollowContext from './useFollowContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const follow = useFollowContext();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-around w-full py-3 text-lg text-center">
        <Link
          className={parameterToString(
            pathname.includes('followers') ? 'font-bold text-orange-800' : 'text-stone-400',
            'border-b-2 w-full'
          )}
          href={ROUTE_PATH.FOLLOWERS(follow.profile?.userId || '')}
        >
          {`팔로워 ${follow.followers.length}`}
        </Link>
        <Link
          className={parameterToString(
            pathname.includes('following') ? 'font-bold text-orange-800' : 'text-stone-400',
            'border-b-2 w-full'
          )}
          href={ROUTE_PATH.FOLLOWING(follow.profile?.userId || '')}
        >
          {`팔로잉 ${follow.following.length}`}
        </Link>
      </div>
      <div className="flex flex-col w-full gap-3">{children}</div>
    </div>
  );
};

export default Layout;
