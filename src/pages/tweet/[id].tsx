import { Layout, LikeButton, LoadingSpinner, ProfileImage, Symbol, TweetImage } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai';
import useSWR from 'swr';

export default function DetailTweet() {
  const router = useRouter();
  const {
    data: responseTweet,
    isLoading,
    mutate: tweetMutate,
  } = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const [mutate, x] = useMutation<ResponseType<TweetResponse>>();

  const handleDeleteTweet = (tweetId: string | undefined) => {
    if (tweetId) {
      mutate(`/api/tweets/${router.query.id}`, METHOD.DELETE);
      router.replace(ROUTE_PATH.HOME);
    }
  };

  const handleLikeButton = () => {
    if (responseTweet && responseTweet.data) {
      mutate(`/api/tweets/${router.query.id}/like`, METHOD.POST);
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
    <Layout hasBackButton isLoggedIn title={<Symbol height={33} width={33} />}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <main className="flex flex-col gap-3 px-3 mt-5 ">
          <div className="relative flex items-center w-full gap-3 px-3">
            <ProfileImage avatarId={responseTweet?.data?.user.profile?.avatar} />
            <h3 className="text-xl font-bold">{responseTweet?.data?.user.name}</h3>
            <small>{responseTweet?.data?.user.email}</small>
            <AiOutlineDelete
              className="absolute cursor-pointer right-3"
              onClick={() => handleDeleteTweet(String(router.query.id) || responseTweet?.data?.id)}
              size={30}
            />
          </div>
          {responseTweet?.data?.image && <TweetImage imageId={responseTweet.data.image} />}
          <div className="flex flex-col items-start gap-2 px-3">
            <LikeButton isLiked={responseTweet?.isLiked} toggleLike={handleLikeButton} />
            <span>좋아요 {responseTweet?.data?._count.likes} 개</span>
          </div>
          <p className="font-semibold text-md">{responseTweet?.data?.user.name}</p>

          <p className="whitespace-pre-line">{responseTweet?.data?.text}</p>
        </main>
      )}
    </Layout>
  );
}
