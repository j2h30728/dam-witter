import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { TweetResponse } from '@/types';
import { createContext, useContext } from 'react';

export interface TweetContext {
  loggedInUserId: string;
  tweet: TweetResponse;
}

export const tweetContext = createContext<TweetContext | null>(null);

export default function useTweetContext() {
  const context = useContext(tweetContext);
  if (!context) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
  return context;
}
