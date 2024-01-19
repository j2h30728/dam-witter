import useComment from '@/hooks/comments/useComment';

import Button from '../common/Button';
import Input from '../common/Input';

const UploadCommentFrom = () => {
  const {
    form: { onChange, value },
    upload: { isUploadingComment, onSubmit },
  } = useComment();

  return (
    <form className="flex items-center w-full gap-1" onSubmit={onSubmit}>
      <Input
        disabled={isUploadingComment}
        id="comment"
        label="코멘트"
        name="text"
        onChange={onChange}
        type="text"
        value={value.text}
      />
      <Button disabled={isUploadingComment} size="sm" type="submit">
        {isUploadingComment ? '등록중...' : '등 록'}
      </Button>
    </form>
  );
};

export default UploadCommentFrom;
