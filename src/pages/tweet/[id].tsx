import { LikeButton } from '@/components';
import Layout from '@/components/common/Layout';
import { METHOD } from '@/constants';
import { makeImagePath, useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function DetailTweet() {
  const router = useRouter();
  const { data: responseTweet, mutate: tweetMutate } = useSWR<ResponseType<TweetResponse>>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [likeMutate] = useMutation<ResponseType<TweetResponse>>();

  const handleLikeButton = () => {
    if (responseTweet && responseTweet.data) {
      likeMutate(`/api/tweets/${router.query.id}/like`, METHOD.POST);
      tweetMutate(
        {
          ...responseTweet,
          data: {
            ...responseTweet.data,
            _count: {
              ...responseTweet.data._count,
              likes: responseTweet.data._count
                ? responseTweet.isLiked
                  ? responseTweet.data._count.likes - 1
                  : responseTweet.data._count.likes + 1
                : 1,
            },
          },
          isLiked: !responseTweet.isLiked,
        },
        false
      );
    }
  };

  return (
    <Layout hasBackButton isLoggedIn title="DAM">
      <small>{responseTweet?.data?.user.name}</small>

      {responseTweet?.data?.image && (
        <div className="relative w-full h-60 bg-slate-500">
          <Image
            alt={responseTweet.data.image}
            className="object-contain"
            fill
            src={makeImagePath(responseTweet.data.image)}
          />
        </div>
      )}
      <div className="flex items-center justify-start py-4">
        <LikeButton isLiked={responseTweet?.isLiked} toggleLike={handleLikeButton} />
        <span>좋아요 수 {responseTweet?.data?._count.likes}</span>
      </div>
      <pre>{responseTweet?.data?.text}</pre>
    </Layout>
  );
}
