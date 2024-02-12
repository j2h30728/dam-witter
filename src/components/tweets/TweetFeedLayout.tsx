import { useRef } from 'react';

import ScrollTopButton from '../common/ScrollTopButton';
import NestedLayout, { Navigation, NestedLayoutHandle } from '../common/layout/NestedLayout';

const TweetFeedLayout = ({ children, navigation }: { children: React.ReactNode; navigation?: Navigation[] }) => {
  const nestedLayoutRef = useRef<NestedLayoutHandle>(null);

  const handleScrollToTop = () => {
    nestedLayoutRef.current?.scrollToTop();
  };

  return (
    <div className="relative mx-auto md:max-w-3xl">
      <NestedLayout navigation={navigation} ref={nestedLayoutRef}>
        {children}
      </NestedLayout>
      <ScrollTopButton onClick={handleScrollToTop} />
    </div>
  );
};

export default TweetFeedLayout;
