import { END_POINTS } from '@/constants/api';
import { METHOD_TYPE } from '@/constants/method';
import { ResponseType } from '@/types';
import { Profile } from '@prisma/client';

export const followingFetcher = async (
  url: string,
  { arg }: { arg: { method: METHOD_TYPE; userId: string } }
): Promise<ResponseType<Profile>> => {
  const response = await fetch(END_POINTS.FOLLOWING + `/${arg.userId}`, {
    method: arg.method,
  });
  if (!response.ok) {
    throw (await response.json()).message;
  }
  return response.json();
};
