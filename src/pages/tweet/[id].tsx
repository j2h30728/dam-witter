import { Layout, LoadingSpinner, Symbol } from '@/components';
import CommentFeed from '@/components/comments/CommentFeed';
import UploadCommentFrom from '@/components/comments/UploadCommentFrom';
import { Tweet } from '@/components/tweets/tweet';
import useTweetViewModel from '@/hooks/viewModel/useTweetViewModel';

export default function DetailTweet() {
  const {
    like: { onToggleLike },
    loggedInUser,
    tweet: { data, isDeleting, isLoading, onDelete },
  } = useTweetViewModel();

  if (isLoading || !data || !loggedInUser) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }
  if (isDeleting) {
    return <LoadingSpinner text="트윗 삭제 중 입니다." />;
  }

  return (
    <Layout hasBackButton isLoggedIn title={<Symbol height={33} width={33} />}>
      <Tweet tweet={data}>
        <Tweet.Author />
        <Tweet.DeleteButton loggedInUserId={loggedInUser?.id} onDelete={onDelete} />
        <Tweet.Content />
        <Tweet.Description onToggleLike={onToggleLike} />
      </Tweet>
      <UploadCommentFrom />
      <CommentFeed loggedInUserId={loggedInUser.id} tweetComments={data.comments} />
    </Layout>
  );
}
