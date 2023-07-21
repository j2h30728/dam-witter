import { useState } from 'react';

interface UseMutationState<T> {
  data?: T;
  error?: unknown;
  isLoading: boolean;
}

type MutationMethod = 'PATCH' | 'POST' | 'PUT';

type UseMutationResult<T> = [(url: string, method: MutationMethod, data?: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    data: undefined,
    error: undefined,
    isLoading: false,
  });
  async function mutate(url: string, method: MutationMethod, data?: any) {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
          'content-Type': 'application/json',
        },
        method,
      });
      const json = await response.json();
      setState(prev => ({ ...prev, data: json }));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: error }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }

  return [mutate, { ...state }];
}
