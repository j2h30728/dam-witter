import { Layout, LikeButton, LoadingSpinner, ProfileImage, Symbol, TweetImage } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import useDelete from '@/hooks/useDelete';
import { useMutation } from '@/libs/client';
import { tweetValidator } from '@/libs/client/validators';
import { db, withSsrSession } from '@/libs/server';
import { CommentResponse, ResponseType, TweetResponse, UploadTweetInput } from '@/types';
import { Profile } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import useSWR from 'swr';

type LoggedInUsr = { loggedInUser: { email: string; id: string; name: string; profile: Profile } };

export default function DetailTweet({ loggedInUser }: LoggedInUsr) {
  const router = useRouter();
  const {
    data: responseTweet,
    isLoading,
    mutate: tweetMutate,
  } = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const {
    data: responseComments,
    error: commentsError,
    mutate: commentMutate,
  } = useSWR<ResponseType<CommentResponse[] | undefined>>(
    router.query.id ? `/api/tweets/${router.query.id}/comments` : null
  );
  const [toggleLike] = useMutation<ResponseType<TweetResponse>>();
  const [upLoadComment, { isLoading: isUploadCommentLoading }] = useMutation<ResponseType<CommentResponse>>();

  const { handleDelete: tweetDelete, isLoading: isTweetDeleteLoading } = useDelete(() =>
    router.replace(ROUTE_PATH.HOME)
  );
  const [mutate] = useMutation<ResponseType<TweetResponse>>();

  const handleLikeButton = () => {
    if (responseTweet && responseTweet.data) {
      toggleLike(`/api/tweets/${router.query.id}/like`, METHOD.POST);
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
  const { errorMessage, form, isError, onChange, reset } = useForm<UploadTweetInput>(
    { text: '' },
    { text: tweetValidator }
  );
  const handleUploadComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.text.trim()) return alert('코멘트를 입력해주세요.');
    if (isError) return alert(errorMessage.at(0));
    reset();
    await upLoadComment(`/api/tweets/${router.query.id}/comments`, METHOD.POST, { text: form.text });
    await commentMutate();
  };
  const handleRemoveComment = (commentId: string) => {
    if (responseComments) {
      mutate(`/api/tweets/${router.query.id}/comments/${commentId}`, METHOD.DELETE);
      commentMutate(
        {
          ...responseComments,
          data: responseComments?.data?.filter(prev => prev.id !== commentId),
        },
        false
      );
    }
  };
  return (
    <Layout hasBackButton isLoggedIn title={<Symbol height={33} width={33} />}>
      {isLoading ? (
        <LoadingSpinner text={'불러오는 중..'} />
      ) : isTweetDeleteLoading ? (
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
                onClick={() =>
                  tweetDelete(String(router.query.id) || responseTweet?.data?.id, `/api/tweets/${router.query.id}`)
                }
                className="absolute cursor-pointer right-3"
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
          <form className="flex items-center justify-around w-full gap-1" onSubmit={handleUploadComment}>
            <label className="font-semibold" htmlFor="comment">
              코멘트
            </label>
            <input
              className="w-4/6 h-8 px-2 border rounded-sm border-base1"
              disabled={isUploadCommentLoading}
              id="comment"
              name="text"
              onChange={onChange}
              title="comment"
              type="text"
              value={form.text}
            />
            <button className="button" disabled={isUploadCommentLoading}>
              {isUploadCommentLoading ? <span>등록중...</span> : <span>등 록</span>}
            </button>
          </form>
          <div className="flex flex-col gap-3">
            {responseComments?.data?.map(comment => (
              <div className="flex items-center gap-2" key={comment.id}>
                <ProfileImage avatarId={comment.user.profile?.avatar} />
                <div className="flex flex-col w-1/5">
                  <span className="font-semibold">{comment.user.name}</span>
                  <small className="text-sm">{comment.user.email}</small>
                </div>
                <span className="w-3/5">{comment.text}</span>
                {loggedInUser.id === comment.user.id && (
                  <AiOutlineDelete
                    className="cursor-pointer fill-stone-400"
                    onClick={() => handleRemoveComment(comment.id)}
                    size={20}
                  />
                )}
              </div>
            ))}
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
      name: true,
      profile: true,
    },
    where: { id: context.req?.session.user?.id },
  });
  return {
    props: {
      loggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
    },
  };
});
