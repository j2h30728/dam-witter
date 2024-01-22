import { END_POINTS } from '@/constants/api';
import { ProfileResponse, ResponseType } from '@/types';
import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';

const useProfile = (profileParams?: { option?: SWRConfiguration }) => {
  const { query } = useRouter();
  const { data, isLoading, mutate } = useSWR<ResponseType<ProfileResponse>>(
    query?.id ? END_POINTS.PROFILE(query?.id as string) : END_POINTS.MY_PROFILE,
    profileParams?.option
  );

  return { isLoading, isMyProfile: !query?.id, profile: data?.data, refreshProfile: mutate };
};

export default useProfile;
