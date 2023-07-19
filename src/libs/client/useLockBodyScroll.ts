import { useEffect } from 'react';

const useLockBodyScroll = () => {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = `0px`;
    };
  }, []);
};

export default useLockBodyScroll;
