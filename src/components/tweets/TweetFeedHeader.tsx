import { ROUTE_PATH } from '@/constants';
import { parameterToString } from '@/libs/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import ScrollTopButton from '../common/ScrollTopButton';

const TweetFeedHeader = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const containerRef = useRef(null);

  return (
    <>
      <>
        <div className="absolute left-0 z-10 flex justify-around w-full pt-3 text-lg text-center top-14 bg-beige0 ">
          <Link
            className={parameterToString(
              pathname === '/' ? 'font-bold text-orange-800' : 'text-stone-400',
              'border-b-2 w-full'
            )}
            href={ROUTE_PATH.HOME}
          >
            전체 보기
          </Link>
          <Link
            className={parameterToString(
              pathname.includes('following') ? 'font-bold text-orange-800' : 'text-stone-400',
              'border-b-2 w-full'
            )}
            href={ROUTE_PATH.FOLLOWING_TWEETS}
          >
            팔로잉
          </Link>
        </div>
        <div
          className="w-full h-screen px-2 pt-16 pb-32 overflow-auto border-solid overscroll-contain border-x-4 border-base "
          ref={containerRef}
        >
          {children}
        </div>
      </>
      <ScrollTopButton targetRef={containerRef} />
    </>
  );
};

export default TweetFeedHeader;
