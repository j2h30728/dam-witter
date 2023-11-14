import { useForm } from '@/hooks';

const UploadCommentInput = ({
  controlForm,
  handleUploadComment,
  isCommentMutating,
}: {
  controlForm: ReturnType<typeof useForm>;
  handleUploadComment: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isCommentMutating: boolean;
}) => {
  console.log(isCommentMutating);
  return (
    <form className="flex items-center justify-around w-full gap-1" onSubmit={handleUploadComment}>
      <label className="font-semibold" htmlFor="comment">
        코멘트
      </label>
      <input
        className="w-4/6 h-8 px-2 border rounded-sm border-base1"
        disabled={isCommentMutating}
        id="comment"
        name="text"
        onChange={controlForm.onChange}
        title="comment"
        type="text"
        value={controlForm.form.text}
      />
      <button className="button" disabled={isCommentMutating}>
        {isCommentMutating ? <span>등록중...</span> : <span>등 록</span>}
      </button>
    </form>
  );
};

export default UploadCommentInput;
