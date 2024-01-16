import { PAGE_SIZE } from '@/constants/api';
import { ResponseType } from '@/types';
import useSWRInfinite from 'swr/infinite';

import useIntersectionObserver from './useIntersectionObserver';

const getKey = <T>(index: number, previousPageData: T[] | null, url: string) => {
  if (previousPageData && previousPageData.length === 0) return null;
  if (index === 0) return url;
  return `${url}?pageIndex=${index}&limit=${PAGE_SIZE}`;
};

const useInfiniteScrollData = <T>(url: string) => {
  const { data, isLoading, isValidating, mutate, setSize } = useSWRInfinite<ResponseType<T[]>[]>((...args) =>
    getKey(...args, url)
  );
  const flattedData = data?.flat() ?? [];

  const isEmpty = flattedData.at(0)?.data?.length === 0;
  const isLastPage = (flattedData.at(-1)?.data?.length ?? 0) < PAGE_SIZE;

  const { bottomItemRef } = useIntersectionObserver(() => {
    if (!isEmpty && !isLastPage) setSize(size => size + 1);
  });

  return { bottomItemRef, data: flattedData, isLoading, isValidating, mutate, setSize };
};

export default useInfiniteScrollData;
