import { putFetcher } from '@/api/fetchers';
import { ROUTE_PATH } from '@/constants';
import { toastMessage } from '@/libs/client/toastMessage';
import { EditProfileInput, ProfileResponse } from '@/types';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

interface useProfileMutationParams {
  endEditingProfileSubmission: () => void;
}

const useProfileMutation = (params: useProfileMutationParams) => {
  const router = useRouter();
  const { isMutating, trigger } = useSWRMutation('/api/users/profile', putFetcher<EditProfileInput, ProfileResponse>, {
    onSuccess: data => {
      if (data.isSuccess) {
        params.endEditingProfileSubmission();
        if (data.message) toastMessage('success', data.message);
        router.push(ROUTE_PATH.PROFILE);
      } else {
        if (data.message) toastMessage('error', data.message);
      }
    },
  });
  return { isEditProfileMutating: isMutating, mutateProfile: trigger };
};

export default useProfileMutation;
