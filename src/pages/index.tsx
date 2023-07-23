import { Layout, LikeButton, ProfileImage, Symbol, TweetImage } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { Like } from '@prisma/client';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const { data: responseTweets, mutate: tweetsMutate } = useSWR<ResponseType<TweetResponse[]>>('/api/tweets', {
    revalidateOnFocus: true,
  });
  const [toggleLike] = useMutation<ResponseType<Like>>();

  const handleLikeToggle = (tweet: TweetResponse) => {
    if (responseTweets)
      tweetsMutate(
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
    toggleLike(`/api/tweets/${tweet.id}/like`, METHOD.POST);
  };
  return (
    <Layout isLoggedIn title={<Symbol height={33} width={33} />}>
      <div className="gap-5 sub-layout">
        {responseTweets?.data?.map((tweet: TweetResponse) => (
          <div className="flex flex-col gap-1 pb-2 border-b-2 border-base1" key={tweet.id}>
            <div className="flex items-center gap-3 px-3">
              <ProfileImage avatarId={tweet.user.profile?.avatar} />
              <h3 className="text-xl font-bold">{tweet.user.name}</h3>
              <small>{tweet.user.email}</small>
            </div>
            <Link className="mx-3" href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>
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
            <div className="flex items-center gap-2 px-3">
              <LikeButton isLiked={!!tweet.isLiked} toggleLike={() => handleLikeToggle(tweet)} />
              <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>좋아요 {tweet._count.likes} 개</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
