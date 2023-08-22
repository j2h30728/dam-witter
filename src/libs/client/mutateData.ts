type MutationMethod = 'DELETE' | 'PATCH' | 'POST' | 'PUT';

export default function mutateData<T>(method: MutationMethod) {
  return async (url: string, { arg }: { arg: T }) => {
    return fetch(url, {
      body: JSON.stringify(arg),
      method,
    }).then(res => res.json());
  };
}
