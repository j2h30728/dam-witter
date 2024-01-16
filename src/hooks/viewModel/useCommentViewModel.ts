import useDeleteComment from '../api/useDeleteComment';
import useTweet from '../api/useTweet';

const useCommentViewModel = () => {
  const { deleteComment } = useDeleteComment();

  const { data, mutate } = useTweet();

  const onDelete = (commentId: string) => {
    deleteComment(commentId);
    if (data && data.data) {
      const { data: tweetData } = data;
      const target = { ...tweetData, _count: { ...tweetData._count } };
      target._count.comments = tweetData._count.comments - 1;
      target.comments = tweetData.comments?.filter(prev => prev.id !== commentId);
      mutate(
        {
          ...data,
          data: target,
        },
        false
      );
    }
  };

  return {
    onDelete,
  };
};

export default useCommentViewModel;
