import useDeleteComment from '@/hooks/api/useDeleteComment';
import useTweet from '@/hooks/api/useTweet';
import { CommentResponse } from '@/types';

import CommentItem from './CommentItem';
import UploadCommentFrom from './UploadCommentFrom';

const Comments = ({
  loggedInUserId,
  tweetComments,
}: {
  loggedInUserId: string;
  tweetComments?: CommentResponse[] | null;
}) => {
  const { onDelete } = useDeleteComment();

  const tweet = useTweet();

  const handleRemoveComment = (commentId: string) => {
    onDelete(commentId);
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
  return (
    <>
      <UploadCommentFrom />
      <div className="flex flex-col gap-3">
        {tweetComments?.map(comment => (
          <CommentItem
            comment={comment}
            key={comment.id}
            loggedInUserId={loggedInUserId}
            onRemove={handleRemoveComment}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
