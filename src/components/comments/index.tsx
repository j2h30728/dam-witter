import { useForm } from '@/hooks';
import { basicTextValidator, fetchers } from '@/libs/client';
import { DEFAULT_ERROR_MESSAGE } from '@/libs/client/constants';
import { toastMessage } from '@/libs/client/toastMessage';
import { CommentResponse, ResponseType, TweetResponse, UploadBasicInputText } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import CommentItem from './CommentItem';
import UploadCommentInput from './UploadCommentInput';

const Comments = ({
  loggedInUserId,
  tweetComments,
}: {
  loggedInUserId: string;
  tweetComments?: CommentResponse[] | null;
}) => {
  const commentForm = useForm<UploadBasicInputText>({ text: '' }, { text: basicTextValidator });

  const router = useRouter();

  const tweet = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);

  const upLoadComment = useSWRMutation(
    `/api/tweets/${router.query.id}/comments`,
    fetchers.post<UploadBasicInputText, CommentResponse>
  );
  const deleteComment = useSWRMutation(`/api/tweets/${router.query.id}/comments`, fetchers.delete, {
    revalidate: false,
    rollbackOnError: true,
  });

  const handleUploadComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentForm.form.text.trim()) return toastMessage('error', '코멘트를 입력해주세요.');
    if (commentForm.isError) return toastMessage('error', commentForm.errorMessage.at(0) ?? DEFAULT_ERROR_MESSAGE);
    await upLoadComment.trigger({ text: commentForm.form.text });
    commentForm.reset();
    await tweet.mutate();
  };

  const handleRemoveComment = (commentId: string) => {
    deleteComment.trigger(commentId);
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
      <UploadCommentInput
        controlForm={commentForm}
        handleUploadComment={handleUploadComment}
        isCommentMutating={upLoadComment.isMutating}
      />
      <div className="flex flex-col gap-3">
        {tweetComments?.map(comment => (
          <CommentItem
            comment={comment}
            handleRemoveComment={handleRemoveComment}
            key={comment.id}
            loggedInUserId={loggedInUserId}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
