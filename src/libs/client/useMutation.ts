import { useState } from 'react';

interface UseMutationState<T> {
  data?: T;
  error?: unknown;
  isLoading: boolean;
}

type MutationMethod = 'DELETE' | 'PATCH' | 'POST' | 'PUT';

type UseMutationResult<T> = [
  (url: string, method: MutationMethod, data?: any) => Promise<T | void>,
  UseMutationState<T>,
];

export default function useMutation<T = any>(): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    data: undefined,
    error: undefined,
    isLoading: false,
  });
  async function mutate(url: string, method: MutationMethod, data?: any): Promise<T | void> {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: method,
      });
      const json = await response.json();
      setState(prev => ({ ...prev, data: json }));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return json;
    } catch (error) {
      setState(prev => ({ ...prev, error: error }));
      console.error(error);
      return;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }

  return [mutate, { ...state }];
}
