import { useRef } from 'react';

const useDebounce = <F extends (...args: any[]) => void>(callbackFn: F, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = (...args: Parameters<F>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackFn(...args);
    }, delay);
  };

  return debouncedFunction;
};

export default useDebounce;
