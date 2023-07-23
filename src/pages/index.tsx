import { LikeButton } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { makeImagePath, useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { Like } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
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
      <div className="flex flex-col mt-5 gap-7">
        {responseTweets?.data?.map((tweet: TweetResponse) => (
          <div className="flex flex-col gap-2 pb-2 border-b-2 border-base" key={tweet.id}>
            <div className="flex items-center gap-3 px-3">
              {tweet.user.profile?.avatar ? (
                <div className="relative w-14 h-14">
                  <Image
                    alt="preview Image"
                    className="object-cover w-full h-32 overflow-hidden rounded-full"
                    fill
                    src={makeImagePath(tweet.user.profile?.avatar)}
                  />
                </div>
              ) : (
                <FaUserCircle className="fill-stone-500" size={50} />
              )}
              <h3 className="text-xl font-bold">{tweet.user.name}</h3>
              <small>{tweet.user.email}</small>
            </div>
            <Link className="mx-3" href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>
              {tweet.image && (
                <div className="relative w-full my-3 h-60 ">
                  <Image alt={tweet.image} className="object-contain" fill src={makeImagePath(tweet.image)}></Image>
                </div>
              )}
              <p className="whitespace-pre-line">{tweet.text}</p>
            </Link>
            <div className="flex items-center gap-2 px-3">
              <LikeButton isLiked={!!tweet.isLiked} toggleLike={() => handleLikeToggle(tweet)} />
              <small>마음에 들어요 {tweet._count.likes}</small>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
