import useTweetViewModel from '@/hooks/viewModel/useTweetViewModel';

import CommentFeed from '../comments/CommentFeed';
import UploadCommentFrom from '../comments/UploadCommentFrom';
import LoadingSpinner from '../common/LoadingSpinner';
import { Tweet } from './tweet';

const TweetDetailWithComments = () => {
  const {
    following: { onFollowing },
    like: { onToggleLike },
    loggedInUser,
    tweet: { data, isDeleting, isLoading, onDelete, refreshTweet },
  } = useTweetViewModel();

  if (isLoading || !data || !loggedInUser) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }
  if (isDeleting) {
    return <LoadingSpinner text="트윗 삭제 중 입니다." />;
  }

  return (
    <>
      <Tweet loggedInUserId={loggedInUser.id} tweet={data}>
        <Tweet.Author onFollowing={onFollowing} />
        <Tweet.DeleteButton loggedInUserId={loggedInUser?.id} onDelete={onDelete} />
        <Tweet.Content />
        <Tweet.Description modalOpenCallbackFn={refreshTweet} onToggleLike={onToggleLike} />
      </Tweet>
      <UploadCommentFrom />
      <CommentFeed loggedInUserId={loggedInUser.id} tweetComments={data.comments} />
    </>
  );
};
export default TweetDetailWithComments;
