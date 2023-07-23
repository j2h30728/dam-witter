import { LikeButton } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { makeImagePath, useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { Like } from '@prisma/client';
import Image from 'next/image';
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
    <Layout isLoggedIn title="DAM">
      {responseTweets?.data?.map((tweet: TweetResponse) => (
        <div key={tweet.id}>
          <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>
            <h3>{tweet.user.name}</h3>
            <small>{tweet.user.email}</small>
            {tweet.image && (
              <div className="relative w-full h-60 bg-slate-500">
                <Image alt={tweet.image} className="object-contain" fill src={makeImagePath(tweet.image)}></Image>
              </div>
            )}

            <pre>{tweet.text}</pre>
          </Link>
          <LikeButton isLiked={!!tweet.isLiked} toggleLike={() => handleLikeToggle(tweet)} />
          <small>마음에 들어요 {tweet._count.likes}</small>
        </div>
      ))}
    </Layout>
  );
}
