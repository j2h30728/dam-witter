import { END_POINTS } from '@/constants/api';
import { ProfileResponse, ResponseType } from '@/types';
import useSWR, { SWRConfiguration } from 'swr';

const useMyProfile = (profileParams?: { option?: SWRConfiguration }) => {
  const { data, isLoading } = useSWR<ResponseType<ProfileResponse>>(END_POINTS.MY_PROFILE, profileParams?.option);

  return { isLoading, profile: data?.data };
};

export default useMyProfile;
