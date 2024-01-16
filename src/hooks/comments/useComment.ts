import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { basicTextValidator } from '@/libs/client';
import { toastMessage } from '@/libs/client/toastMessage';
import { UploadBasicInputText } from '@/types';

import useCommentMutation from '../api/useCommentMutation';
import useDeleteComment from '../api/useDeleteComment';
import useTweet from '../api/useTweet';
import useForm from '../common/useForm';

const useComment = () => {
  const { errorMessage, form, isError, onChange, reset } = useForm<UploadBasicInputText>(
    { text: '' },
    { text: basicTextValidator }
  );

  const tweet = useTweet();

  const { isUploadingComment, mutationComment } = useCommentMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.text.trim()) return toastMessage('error', '코멘트를 입력해주세요.');
    if (isError) return toastMessage('error', errorMessage.at(0) ?? DEFAULT_ERROR_MESSAGE);
    await mutationComment({ text: form.text });
    reset();
    await tweet.mutate();
  };

  const { deleteComment } = useDeleteComment();

  return {
    form: { onChange, value: form },
    onDelete: deleteComment,
    upload: { isUploadingComment, mutationComment, onSubmit },
  };
};

export default useComment;
