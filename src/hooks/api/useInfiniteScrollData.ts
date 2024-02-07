import { PAGE_SIZE } from '@/constants/api';
import { ResponseType } from '@/types';
import useSWRInfinite from 'swr/infinite';

import useIntersectionObserver from '../common/useIntersectionObserver';

type GetKey = (
  index: number,
  previousPageData: ResponseType<any>[] | null,
  url: string,
  query?: string
) => null | string;

const getKey: GetKey = (index, previousPageData, url, query) => {
  if (index === 0) return `${url}?pageIndex=${index}&limit=${PAGE_SIZE}&${query}`;
  if (
    !previousPageData ||
    previousPageData.length === 0 ||
    previousPageData[previousPageData.length - 1]?.data.length < PAGE_SIZE
  ) {
    return null;
  }
  return `${url}?pageIndex=${index}&limit=${PAGE_SIZE}&${query}`;
};

const useInfiniteScrollData = <T>({ query, url }: { query?: string; url: string }) => {
  const { data, isLoading, isValidating, mutate, setSize } = useSWRInfinite<ResponseType<T[]>[]>((...args) =>
    getKey(...args, url, query)
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
