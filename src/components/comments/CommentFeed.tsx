import useCommentViewModel from '@/hooks/viewModel/useCommentViewModel';
import { CommentResponse } from '@/types';

import CommentItem from './CommentItem';

const CommentFeed = ({
  loggedInUserId,
  tweetComments,
}: {
  loggedInUserId: string;
  tweetComments?: CommentResponse[] | null;
}) => {
  const { onDelete } = useCommentViewModel();

  return (
    <div className="flex flex-col gap-3">
      {tweetComments?.map(comment => (
        <CommentItem comment={comment} key={comment.id} loggedInUserId={loggedInUserId} onRemove={onDelete} />
      ))}
    </div>
  );
};

export default CommentFeed;
