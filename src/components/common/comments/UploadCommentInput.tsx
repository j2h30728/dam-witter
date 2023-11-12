import { useForm } from '@/hooks';
import { fetchers } from '@/libs/client';
import { CommentResponse, UploadBasicInputText } from '@/types';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

const UploadCommentInput = ({
  controlForm,
  handleUploadComment,
}: {
  controlForm: ReturnType<typeof useForm>;
  handleUploadComment: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  const router = useRouter();

  const upLoadComment = useSWRMutation(
    `/api/tweets/${router.query.id}/comments`,
    fetchers.post<UploadBasicInputText, CommentResponse>
  );

  return (
    <form className="flex items-center justify-around w-full gap-1" onSubmit={handleUploadComment}>
      <label className="font-semibold" htmlFor="comment">
        코멘트
      </label>
      <input
        className="w-4/6 h-8 px-2 border rounded-sm border-base1"
        disabled={upLoadComment.isMutating}
        id="comment"
        name="text"
        onChange={controlForm.onChange}
        title="comment"
        type="text"
        value={controlForm.form.text}
      />
      <button className="button" disabled={upLoadComment.isMutating}>
        {upLoadComment.isMutating ? <span>등록중...</span> : <span>등 록</span>}
      </button>
    </form>
  );
};

export default UploadCommentInput;
