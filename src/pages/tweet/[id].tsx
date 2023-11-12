import { Layout, LikeButton, LoadingSpinner, Symbol, TweetImage } from '@/components';
import Comments from '@/components/common/comments';
import useLikeTweet from '@/hooks/tweets/useLikeTweet';
import { ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import DetailTweetContent from '../../components/common/tweets/DetailTweetContent';

function TweetAndComments() {
  const router = useRouter();

  const tweet = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);

  const toggleLike = useLikeTweet();

  const handleLikeButton = () => {
    if (tweet.data && tweet.data.data) {
      toggleLike.trigger({ tweetId: `${router.query.id}` }, { rollbackOnError: true });
      tweet.mutate(
        {
          ...tweet.data,
          data: {
            ...tweet.data.data,
            _count: {
              ...tweet.data.data._count,
              likes: tweet.data.data._count
                ? tweet.data.isLiked
                  ? tweet.data.data._count.likes - 1
                  : tweet.data.data._count.likes + 1
                : 1,
            },
          },
          isLiked: !tweet.data.isLiked,
        },
        false
      );
    }
  };

  if (tweet.isLoading || !tweet.data) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }

  return (
    <main className="flex flex-col gap-3 px-3 mt-5 ">
      <DetailTweetContent />
      <div className="flex items-center justify-around gap-2 px-3 py-4 border-b border-stone-500">
        <div className="flex items-center w-fit">
          <LikeButton isLiked={tweet.data.isLiked} toggleLike={handleLikeButton} />
          <span>좋아요 {tweet.data.data?._count.likes} 개</span>
        </div>
        <span>코멘트 {tweet.data.data?._count.comments} 개</span>
      </div>
      <Comments tweetComments={tweet.data.data?.comments} />
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
