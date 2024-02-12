import { postFetcher } from '@/api/fetchers';
import { END_POINTS } from '@/constants/api';
import { ProfileResponse, ResponseType } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { cache } from 'swr/_internal';
import useSWRMutation from 'swr/mutation';

const useLayoutViewModel = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const router = useRouter();

  const { trigger: logOut } = useSWRMutation('/api/users/log-out', postFetcher);
  const handleLogOut = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await logOut();
      router.replace('/log-in');
      cache.delete('/api/users/profile');
    }
  };

  const { data: profile } = useSWR<ResponseType<ProfileResponse>>(isLoggedIn ? END_POINTS.MY_PROFILE : null);

  const handleBack = () => router.back();
  return {
    handleBack,
    handleLogOut,
    profile: profile?.data,
  };
};
export default useLayoutViewModel;
