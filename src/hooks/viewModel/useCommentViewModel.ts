import useDeleteComment from '../api/useDeleteComment';
import useTweet from '../api/useTweet';

const useCommentViewModel = () => {
  const { deleteComment } = useDeleteComment();

  const tweet = useTweet();

  const onDelete = (commentId: string) => {
    deleteComment(commentId);
    if (tweet.data && tweet.data.data) {
      tweet.mutate(
        {
          ...tweet.data,
          data: {
            ...tweet.data.data,
            _count: {
              ...tweet.data.data._count,
              comments: tweet.data.data._count.comments - 1,
            },
            comments: tweet.data.data.comments?.filter(prev => prev.id !== commentId),
          },
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
