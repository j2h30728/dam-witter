import useComment from '@/hooks/comments/useComment';

const UploadCommentFrom = () => {
  const {
    form: { onChange, value },
    upload: { isUploadingComment, onSubmit },
  } = useComment();

  return (
    <form className="flex items-center justify-around w-full gap-1" onSubmit={onSubmit}>
      <label className="font-semibold" htmlFor="comment">
        코멘트
      </label>
      <input
        className="w-4/6 h-8 px-2 border rounded-sm border-base1"
        disabled={isUploadingComment}
        id="comment"
        name="text"
        onChange={onChange}
        title="comment"
        type="text"
        value={value.text}
      />
      <button className="button" disabled={isUploadingComment}>
        {isUploadingComment ? <span>등록중...</span> : <span>등 록</span>}
      </button>
    </form>
  );
};

export default UploadCommentFrom;
