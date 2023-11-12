import { Layout, LikeButton, LoadingSpinner, ProfileImage, Symbol, TweetImage } from '@/components';
import { ROUTE_PATH } from '@/constants';
import useLikeTweet from '@/hooks/tweets/useLikeTweet';
import { formatDate, maskEmail } from '@/libs/client';
import { db, withSsrSession } from '@/libs/server';
import { ResponseType, TweetResponse } from '@/types';
import { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import useSWR, { SWRConfig } from 'swr';

const Home: NextPage = () => {
  const {
    data: responseTweets,
    isLoading,
    isValidating,
    mutate: tweetsMutate,
  } = useSWR<ResponseType<TweetResponse[]>>('/api/tweets');

  const { trigger: toggleLike } = useLikeTweet();

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
    await toggleLike({ tweetId: tweet.id }, { rollbackOnError: true });
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
                <small>{maskEmail(tweet.user.email)}</small>
                <small className="ml-auto text-stone-500">{formatDate(tweet.createdAt)}</small>
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
                <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`}>| 코멘트 {tweet?._count.comments} 개</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

const Page: NextPage<{ fallback: { tweetsResponseWithSSR: ResponseType<TweetResponse[]> } }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(async function ({ req }: GetServerSidePropsContext) {
  const { user } = req.session;
  const tweets = await db.tweet.findMany({
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
      likes: {
        where: {
          userId: user?.id,
        },
      },
      user: {
        select: {
          email: true,
          id: true,
          name: true,
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const transformedTweets = tweets.map(tweet => ({
    ...tweet,
    isLiked: tweet.likes.some(like => like.userId === user?.id),
  }));
  return {
    props: {
      fallback: {
        tweetsResponseWithSSR: JSON.parse(JSON.stringify(transformedTweets)),
      },
    },
  };
});
export default Page;
