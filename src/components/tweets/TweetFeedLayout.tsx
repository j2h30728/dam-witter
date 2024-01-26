import { ROUTE_PATH } from '@/constants';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import NestedLayout, { Navigation } from '../common/NestedLayout';
import ScrollTopButton from '../common/ScrollTopButton';

const TweetFeedLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const containerRef = useRef(null);

  const tweetHeader: Navigation[] = [
    {
      href: ROUTE_PATH.HOME,
      isCurrentPath: pathname === ROUTE_PATH.HOME,
      title: '전체 보기',
    },
    {
      href: ROUTE_PATH.FOLLOWING_TWEETS,
      isCurrentPath: pathname.includes('following'),
      title: '팔로잉',
    },
  ];

  return (
    <>
      <NestedLayout navigation={tweetHeader}>
        <div className="h-screen pt-10 overflow-auto" ref={containerRef}>
          {children}
        </div>
      </NestedLayout>
      <ScrollTopButton targetRef={containerRef} />
    </>
  );
};

export default TweetFeedLayout;
