import fetchers from '@/api/fetchers';
import { END_POINTS } from '@/constants/api';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

const useDeleteComment = () => {
  const router = useRouter();

  const deleteComment = useSWRMutation(END_POINTS.COMMENTS(router.query.id as string), fetchers.delete, {
    revalidate: false,
  });

  return {
    onDelete: deleteComment.trigger,
  };
};

export default useDeleteComment;
