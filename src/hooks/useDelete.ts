import { METHOD } from '@/constants';
import { mutateData } from '@/libs/client';
import { MutationMethod } from '@/libs/client/mutateData';
import { ResponseType } from '@/types';
import useSWRMutation from 'swr/mutation';

export default function useDelete<T, Input>(url: string, method: MutationMethod, successCallbackFn?: () => void) {
  const mutate = useSWRMutation<ResponseType<T>, any, string, any>(url, mutateData<Input>(method), {
    onError: error => console.error(error),
    onSuccess: data => (data.isSuccess && successCallbackFn ? successCallbackFn() : alert(data.message)),
  });
  const handleTrigger = async (data?: any) => {
    if (method === METHOD.DELETE) {
      confirm('삭제하시겠습니까?') && (await mutate.trigger(data));
    } else {
      mutate.trigger(data);
    }
  };

  return { handleTrigger, mutate };
}
