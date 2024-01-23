import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { FollowResponse } from '@/types';
import { createContext, useContext } from 'react';

export const followContext = createContext<FollowResponse | null>(null);

export default function useFollowContext() {
  const context = useContext(followContext);
  if (!context) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
  return context;
}
