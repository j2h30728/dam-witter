import ProfileImage from '@/components/images/ProfileImage';
import { formatDate } from '@/libs/client';
import { CommentResponse } from '@/types';
import { AiFillDelete } from 'react-icons/ai';

const CommentItem = ({
  comment,
  loggedInUserId,
  onRemove,
}: {
  comment: CommentResponse;
  loggedInUserId: string;
  onRemove: (commentId: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 mt-1" key={comment.id}>
      <ProfileImage alt="avatar" avatarId={comment.user.profile?.avatar} size="sm" />
      <span className="w-1/6 font-semibold">{comment.user.name}</span>
      <span className="w-1/2">{comment.text}</span>
      <small className="ml-auto w-fit text-stone-500">{formatDate(comment.createdAt)}</small>
      {loggedInUserId === comment.user.id && (
        <AiFillDelete className="cursor-pointer fill-stone-400" onClick={() => onRemove(comment.id)} size={20} />
      )}
    </div>
  );
};

export default CommentItem;
