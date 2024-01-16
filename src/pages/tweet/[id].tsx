import { Layout, LikeButton, LoadingSpinner, Symbol } from '@/components';
import Comments from '@/components/comments/Comments';
import DetailTweetContent from '@/components/tweets/DetailTweetContent';
import useTweetViewModel from '@/hooks/viewModel/useTweetViewModel';

function TweetAndComments() {
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
    <main className="flex flex-col gap-3 px-3 mt-5 ">
      <DetailTweetContent detailTweet={data} loggedInUserId={loggedInUser.id} onDeleteTweet={onDelete} />
      <div className="flex items-center justify-around gap-2 px-3 py-4 border-b border-stone-500">
        <div className="flex items-center w-fit">
          <LikeButton isLiked={data?.isLiked} toggleLike={onToggleLike} />
          <span>좋아요 {data?._count.likes} 개</span>
        </div>
        <span>코멘트 {data?._count.comments} 개</span>
      </div>
      <Comments loggedInUserId={loggedInUser.id} tweetComments={data?.comments} />
    </main>
  );
}

export default function DetailTweet() {
  return (
    <Layout hasBackButton isLoggedIn title={<Symbol height={33} width={33} />}>
      <TweetAndComments />
    </Layout>
  );
}
