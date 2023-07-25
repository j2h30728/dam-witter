import { Layout, LikeButton, LoadingSpinner, ProfileImage, Symbol, TweetImage } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { Like } from '@prisma/client';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const {
    data: responseTweets,
    isLoading,
    isValidating,
    mutate: tweetsMutate,
  } = useSWR<ResponseType<TweetResponse[]>>('/api/tweets');
  const [toggleLike] = useMutation<ResponseType<Like>>();

  const handleLikeToggle = async (tweet: TweetResponse) => {
    if (responseTweets)
      await tweetsMutate(
        {
          ...responseTweets,
          data:
            responseTweets.data?.map(t => {
              if (t.id === tweet.id) {
                let newLikeStatus = !t.isLiked;
                let newLikeCount = newLikeStatus ? t._count.likes + 1 : t._count.likes - 1;
                return { ...t, _count: { ...t._count, likes: newLikeCount }, isLiked: newLikeStatus };
              } else {
                return t;
              }
            }) || [],
        },
        false
      );
    await toggleLike(`/api/tweets/${tweet.id}/like`, METHOD.POST);
  };
  return (
    <Layout isLoggedIn title={<Symbol height={33} width={33} />}>
      {isLoading && isValidating ? (
        <LoadingSpinner text={'불러오는 중..'} />
      ) : (
        <div className="gap-5 sub-layout">
          {responseTweets?.data?.map((tweet: TweetResponse) => (
            <div className="flex flex-col gap-4 pb-2 border-b-2 border-base1" key={tweet.id}>
              <div className="flex items-center gap-3 px-3">
                <ProfileImage avatarId={tweet.user.profile?.avatar} />
                <h3 className="text-xl font-bold">{tweet.user.name}</h3>
                <small>{tweet.user.email}</small>
              </div>
              <Link className="px-5 mx-3" href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>
                {tweet.image && <TweetImage imageId={tweet.image} />}
                <p className="whitespace-pre-line">
                  {tweet.text.length > 300 ? (
                    <span>
                      {tweet.text.slice(0, 200)}
                      <small className="font-bold text-neutral-500">... 더보기</small>
                    </span>
                  ) : (
                    tweet.text
                  )}
                </p>
              </Link>
              <div className="flex items-center w-full gap-2 px-4 py-1 text-stone-500">
                <div className="flex items-center gap-1 w-fit">
                  <LikeButton isLiked={!!tweet.isLiked} toggleLike={() => handleLikeToggle(tweet)} />
                  <span>좋아요 {tweet?._count.likes} 개</span>
                </div>
                <span>| 코멘트 {tweet?._count.comments} 개</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
