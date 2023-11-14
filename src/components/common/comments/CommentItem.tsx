import ProfileImage from '@/components/images/ProfileImage';
import { formatDate } from '@/libs/client';
import { CommentResponse, ProfileResponse, ResponseType, TweetResponse } from '@/types';
import { AiOutlineDelete } from 'react-icons/ai';

const CommentItem = ({
  comment,
  handleRemoveComment,
  loggedInUserId,
}: {
  comment: CommentResponse;
  handleRemoveComment: (commentId: string) => void;
  loggedInUserId: string;
}) => {
  return (
    <div className="flex items-center gap-2 " key={comment.id}>
      <ProfileImage avatarId={comment.user.profile?.avatar} />
      <span className="w-1/6 font-semibold">{comment.user.name}</span>
      <span className="w-1/2">{comment.text}</span>
      <small className="ml-auto w-fit text-stone-500">{formatDate(comment.createdAt)}</small>
      {loggedInUserId === comment.user.id && (
        <AiOutlineDelete
          className="cursor-pointer fill-stone-400"
          onClick={() => handleRemoveComment(comment.id)}
          size={20}
        />
      )}
    </div>
  );
};

export default CommentItem;
