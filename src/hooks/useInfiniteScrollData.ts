import useSWRInfinite from 'swr/infinite';

import useIntersectionObserver from './useIntersectionObserver';

export const PAGE_SIZE = 10;

const getKey = <T>(index: number, previousPageData: T[] | null, url: string) => {
  if (previousPageData && previousPageData.length === 0) return null;
  return `${url}?pageIndex=${index}&limit=${PAGE_SIZE}`;
};

const useInfiniteScrollData = <T>(url: string) => {
  const { data, isLoading, isValidating, mutate, setSize, size } = useSWRInfinite<T[]>((...args) =>
    getKey(...args, url)
  );
  const { bottomItemRef } = useIntersectionObserver(() => setSize(size => size + 1));

  const flattedData = data?.flat() ?? [];

  return { bottomItemRef, data: flattedData, isLoading, isValidating, mutate, setSize };
};

export default useInfiniteScrollData;
