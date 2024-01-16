import { END_POINTS } from '@/constants/api';
import { ProfileResponse, ResponseType } from '@/types';
import useSWR, { SWRConfiguration } from 'swr';

interface ProfileParams {
  option?: SWRConfiguration;
  userId?: string;
}

const useProfile = (profileParams?: ProfileParams) => {
  const { data, isLoading } = useSWR<ResponseType<ProfileResponse>>(
    profileParams?.userId ? END_POINTS.PROFILE(profileParams.userId) : END_POINTS.MY_PROFILE,
    profileParams?.option
  );

  return { isLoading, profile: data?.data };
};

export default useProfile;
