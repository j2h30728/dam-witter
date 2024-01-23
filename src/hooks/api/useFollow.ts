import { END_POINTS } from '@/constants/api';
import { FollowResponse, ResponseType } from '@/types';
import useSWR, { SWRConfiguration } from 'swr';

interface FollowParams {
  option?: SWRConfiguration;
  userId: string;
}

const useFollow = ({ option, userId }: FollowParams) => {
  const { data, isLoading } = useSWR<ResponseType<FollowResponse>>(END_POINTS.FOLLOWS(userId), option);

  return { follows: data?.data, isLoading };
};

export default useFollow;
