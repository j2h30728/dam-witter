import useCommentViewModel from '@/hooks/viewModel/useCommentViewModel';
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
  const { onDelete } = useCommentViewModel();

  return (
    <>
      <UploadCommentFrom />
      <div className="flex flex-col gap-3">
        {tweetComments?.map(comment => (
          <CommentItem comment={comment} key={comment.id} loggedInUserId={loggedInUserId} onRemove={onDelete} />
        ))}
      </div>
    </>
  );
};

export default Comments;
