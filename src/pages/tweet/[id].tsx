import { Layout, LikeButton, LoadingSpinner, Symbol } from '@/components';
import Comments from '@/components/comments/Comments';
import DetailTweetContent from '@/components/tweets/DetailTweetContent';
import useDeleteTweet from '@/hooks/api/useDeleteTweet';
import useProfile from '@/hooks/api/useProfile';
import useTweet from '@/hooks/api/useTweet';
import useLike from '@/hooks/tweets/useLike';

function TweetAndComments() {
  const tweet = useTweet();
  const { profile: loggedInUser } = useProfile({ option: { revalidateOnFocus: false } });

  const { toggleLike } = useLike();
  const { isDeleting, onDelete } = useDeleteTweet();

  const handleLikeButton = () => {
    if (tweet.data && tweet.data.data) {
      toggleLike(tweet.data.data);
      tweet.mutate(
        {
          ...tweet.data,
          data: {
            ...tweet.data.data,
            _count: {
              ...tweet.data.data._count,
              likes: tweet.data.data._count
                ? tweet.data.data.isLiked
                  ? tweet.data.data._count.likes - 1
                  : tweet.data.data._count.likes + 1
                : 1,
            },
            isLiked: !tweet.data.data.isLiked,
          },
        },
        false
      );
    }
  };

  const handleDeleteTweet = () => {
    if (confirm('삭제하시겠습니까?')) {
      onDelete();
    }
  };
  if (tweet.isLoading || !tweet.data || !loggedInUser) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }
  if (isDeleting) {
    return <LoadingSpinner text="트윗 삭제 중 입니다." />;
  }

  return (
    <main className="flex flex-col gap-3 px-3 mt-5 ">
      <DetailTweetContent
        detailTweet={tweet.data.data}
        loggedInUserId={loggedInUser.id}
        onDeleteTweet={handleDeleteTweet}
      />
      <div className="flex items-center justify-around gap-2 px-3 py-4 border-b border-stone-500">
        <div className="flex items-center w-fit">
          <LikeButton isLiked={tweet.data.data?.isLiked} toggleLike={handleLikeButton} />
          <span>좋아요 {tweet.data.data?._count.likes} 개</span>
        </div>
        <span>코멘트 {tweet.data.data?._count.comments} 개</span>
      </div>
      <Comments loggedInUserId={loggedInUser.id} tweetComments={tweet.data.data?.comments} />
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
