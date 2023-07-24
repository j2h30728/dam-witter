import { Layout, LikeButton, LoadingSpinner, ProfileImage, Symbol, TweetImage } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useMutation } from '@/libs/client';
import { db, withSsrSession } from '@/libs/server';
import { ResponseType, TweetResponse } from '@/types';
import { User } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import useSWR from 'swr';

type LoggedInUsr = { loggedInUser: { email: string; id: string } };

export default function DetailTweet({ loggedInUser }: LoggedInUsr) {
  const router = useRouter();
  const {
    data: responseTweet,
    isLoading,
    mutate: tweetMutate,
  } = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const [mutate, { data: deletedTweet, error: deletedTweetError, isLoading: isDeletedTweetLoading }] =
    useMutation<ResponseType<TweetResponse>>();

  const handleDeleteTweet = async (tweetId: string | undefined) => {
    if (tweetId && confirm('트윗을 삭제하시겠습니까?')) {
      mutate(`/api/tweets/${router.query.id}`, METHOD.DELETE);
    }
  };
  useEffect(() => {
    if (deletedTweet?.isSuccess) {
      router.replace(ROUTE_PATH.HOME);
    } else if (deletedTweetError) {
      alert(deletedTweet?.message);
      console.error(deletedTweetError);
    }
  });

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
        <LoadingSpinner text={'불러오는 중..'} />
      ) : isDeletedTweetLoading ? (
        <>
          <LoadingSpinner text={'삭제 중..'} />
        </>
      ) : (
        <main className="flex flex-col gap-3 px-3 mt-5 ">
          <div className="relative flex items-center w-full gap-3 px-3">
            <ProfileImage avatarId={responseTweet?.data?.user.profile?.avatar} />
            <h3 className="text-xl font-bold">{responseTweet?.data?.user.name}</h3>
            <small>{responseTweet?.data?.user.email}</small>
            {loggedInUser.id === responseTweet?.data?.userId && (
              <AiOutlineDelete
                className="absolute cursor-pointer right-3"
                onClick={() => handleDeleteTweet(String(router.query.id) || responseTweet?.data?.id)}
                size={30}
              />
            )}
          </div>
          <p className="px-5 whitespace-pre-line">{responseTweet?.data?.text}</p>
          {responseTweet?.data?.image && <TweetImage imageId={responseTweet.data.image} />}
          <div className="flex items-center gap-2 px-3 py-4 border-b border-stone-500">
            <LikeButton isLiked={responseTweet?.isLiked} toggleLike={handleLikeButton} />
            <span>좋아요 {responseTweet?.data?._count.likes} 개</span>
          </div>
        </main>
      )}
    </Layout>
  );
}

export const getServerSideProps = withSsrSession(async function (context: GetServerSidePropsContext) {
  const loggedInUser = await db.user.findUnique({
    select: {
      email: true,
      id: true,
    },
    where: { id: context.req?.session.user?.id },
  });
  return {
    props: {
      loggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
    },
  };
});
