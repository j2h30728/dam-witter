import { Layout, LikeButton, LoadingSpinner, Symbol, TweetImage } from '@/components';
import Comments from '@/components/comments';
import DetailTweetContent from '@/components/tweets/DetailTweetContent';
import { METHOD, ROUTE_PATH } from '@/constants';
import useLikeTweet from '@/hooks/tweets/useLikeTweet';
import useDebounce from '@/hooks/useDebounce';
import { fetchers } from '@/libs/client';
import { toastMessage } from '@/libs/client/toastMessage';
import { ProfileResponse, ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { mutate } from 'swr/_internal';
import useSWRMutation from 'swr/mutation';

function TweetAndComments() {
  const router = useRouter();

  const tweet = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const { data: loggedInUser } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  const toggleLike = useLikeTweet();

  const tweetDelete = useSWRMutation(`/api/tweets/${router.query.id}`, fetchers.delete, {
    onError: (error: string) => toastMessage('error', error),
    onSuccess: data => {
      if (data.isSuccess) {
        router.replace(ROUTE_PATH.HOME);
        mutate('/api/tweets', () => fetch('/api/tweets'));
      }
      toastMessage('info', data.message);
    },
    revalidate: false,
  });

  const debouncedToggleLike = useDebounce((tweetIsLiked: boolean) => {
    toggleLike.trigger(
      { method: tweetIsLiked ? METHOD.DELETE : METHOD.POST, tweetId: `${router.query.id}` },
      { revalidate: false, rollbackOnError: true }
    );
  }, 400);

  const handleLikeButton = () => {
    if (tweet.data && tweet.data.data) {
      debouncedToggleLike(tweet.data.isLiked);
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

  const handleDeleteTweet = () => {
    if (confirm('삭제하시겠습니까?')) {
      tweetDelete.trigger();
    }
  };
  if (tweet.isLoading || !tweet.data || !loggedInUser?.data) {
    return <LoadingSpinner text={'불러오는 중..'} />;
  }
  if (tweetDelete.isMutating || tweetDelete.data) {
    return <LoadingSpinner text="트윗 삭제 중 입니다." />;
  }

  return (
    <main className="flex flex-col gap-3 px-3 mt-5 ">
      <DetailTweetContent
        detailTweet={tweet.data.data}
        loggedInUserId={loggedInUser.data?.id}
        onDeleteTweet={handleDeleteTweet}
      />
      <div className="flex items-center justify-around gap-2 px-3 py-4 border-b border-stone-500">
        <div className="flex items-center w-fit">
          <LikeButton isLiked={tweet.data.isLiked} toggleLike={handleLikeButton} />
          <span>좋아요 {tweet.data.data?._count.likes} 개</span>
        </div>
        <span>코멘트 {tweet.data.data?._count.comments} 개</span>
      </div>
      <Comments loggedInUserId={loggedInUser.data?.id} tweetComments={tweet.data.data?.comments} />
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
