import { useCallback, useRef } from 'react';

function useIntersectionObserver<T extends HTMLElement>(callback: () => void) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomItemRef = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            callback();
          }
        },
        { threshold: 0.1 }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [callback]
  );

  return {
    bottomItemRef,
  };
}

export default useIntersectionObserver;
