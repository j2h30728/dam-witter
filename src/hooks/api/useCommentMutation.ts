import fetchers from '@/api/fetchers';
import { END_POINTS } from '@/constants/api';
import { CommentResponse, UploadBasicInputText } from '@/types';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

const useCommentMutation = () => {
  const router = useRouter();

  const { isMutating, trigger } = useSWRMutation(
    END_POINTS.COMMENTS(router.query.id as string),
    fetchers.post<UploadBasicInputText, CommentResponse>
  );

  return { isUploadingComment: isMutating, mutationComment: trigger };
};

export default useCommentMutation;
