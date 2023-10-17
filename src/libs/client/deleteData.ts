import { METHOD } from '@/constants';

export default function deleteData() {
  return async (url: string, { arg }: { arg: string }) => {
    return fetch(url + arg, {
      method: METHOD.DELETE,
    }).then(res => res.json());
  };
}
