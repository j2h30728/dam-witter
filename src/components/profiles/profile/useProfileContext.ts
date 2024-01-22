import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { ProfileResponse } from '@/types';
import { createContext, useContext } from 'react';

interface ProfileContext {
  profile: ProfileResponse;
  refreshProfile?: () => void;
}

export const profileContext = createContext<ProfileContext | null>(null);

export default function useProfileContext() {
  const context = useContext(profileContext);
  if (!context) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
  return context;
}
