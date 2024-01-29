import { ROUTE_PATH } from '@/constants';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import NestedLayout, { Navigation, NestedLayoutHandle } from '../common/NestedLayout';
import ScrollTopButton from '../common/ScrollTopButton';

const TweetFeedLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const nestedLayoutRef = useRef<NestedLayoutHandle>(null);

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

  const handleScrollToTop = () => {
    nestedLayoutRef.current?.scrollToTop();
  };

  return (
    <>
      <NestedLayout navigation={tweetHeader} ref={nestedLayoutRef}>
        {children}
      </NestedLayout>
      <ScrollTopButton onClick={handleScrollToTop} />
    </>
  );
};

export default TweetFeedLayout;
