import ProfileImage from '@/components/images/ProfileImage';
import { ROUTE_PATH } from '@/constants';
import { formatDate } from '@/libs/client';
import { CommentResponse } from '@/types';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const isAuthor = loggedInUserId === comment.user.id;

  return (
    <div className="flex items-center gap-2 mt-1" key={comment.id}>
      <div
        className="flex items-center w-1/4 gap-2 cursor-pointer"
        onClick={() => router.push(isAuthor ? `${ROUTE_PATH.PROFILE}` : `${ROUTE_PATH.PROFILE}/${comment?.userId}`)}
      >
        <ProfileImage alt="avatar" avatarId={comment.user.profile?.avatar} size="sm" />
        <span className="font-semibold">{comment.user.name}</span>
      </div>
      <span className="w-1/2">{comment.text}</span>
      <small className="ml-auto w-fit text-stone-500">{formatDate(comment.createdAt)}</small>
      {isAuthor && (
        <AiFillDelete className="cursor-pointer fill-stone-400" onClick={() => onRemove(comment.id)} size={20} />
      )}
    </div>
  );
};

export default CommentItem;
