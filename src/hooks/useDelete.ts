import { METHOD } from '@/constants';
import { useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { useEffect } from 'react';

export default function useDelete(successCallbackFn?: () => void) {
  const [mutate, { data, error, isLoading }] = useMutation<ResponseType<TweetResponse>>();

  const handleDelete = (id: string | undefined, url: string) => {
    if (id && confirm('삭제하시겠습니까?')) {
      mutate(url, METHOD.DELETE, id);
    }
  };
  useEffect(() => {
    if (data?.isSuccess) {
      successCallbackFn && successCallbackFn();
    } else if (error) {
      alert(data?.message);
      console.error(error);
    }
  }, [data?.isSuccess, data?.message, successCallbackFn, error]);

  return { handleDelete, isLoading };
}
