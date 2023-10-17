import { Layout, LikeButton, LoadingSpinner, ProfileImage, Symbol, TweetImage } from '@/components';
import { ROUTE_PATH } from '@/constants';
import { useForm } from '@/hooks';
import useLikeTweet from '@/hooks/tweets/useLikeTweet';
import { basicTextValidator, fetchers, formatDate, maskEmail } from '@/libs/client';
import { CommentResponse, ProfileResponse, ResponseType, TweetResponse, UploadBasicInputText } from '@/types';
import { useRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function DetailTweet() {
  const { data: loggedInUser } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  const router = useRouter();
  const tweet = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const { data: responseComments, mutate: commentMutate } = useSWR<ResponseType<CommentResponse[] | undefined>>(
    router.query.id ? `/api/tweets/${router.query.id}/comments` : null
  );
  const toggleLike = useLikeTweet();

  const upLoadComment = useSWRMutation(
    `/api/tweets/${router.query.id}/comments`,
    fetchers.post<UploadBasicInputText, CommentResponse>
  );

  const deleteComment = useSWRMutation(`/api/tweets/${router.query.id}/comments`, fetchers.delete);
  const tweetDelete = useSWRMutation(`/api/tweets/${router.query.id}`, fetchers.delete, {
    onSuccess: () => router.replace(ROUTE_PATH.HOME),
  });

  const handleLikeButton = () => {
    if (tweet.data && tweet.data.data) {
      toggleLike.trigger({ tweetId: `${router.query.id}` }, { rollbackOnError: true });
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

  const { errorMessage, form, isError, onChange, reset } = useForm<UploadBasicInputText>(
    { text: '' },
    { text: basicTextValidator }
  );
  const handleUploadComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.text.trim()) return alert('코멘트를 입력해주세요.');
    if (isError) return alert(errorMessage.at(0));
    await upLoadComment.trigger({ text: form.text });
    if (tweet.data && tweet.data.data) {
      tweet.mutate(
        {
          ...tweet.data,
          data: {
            ...tweet.data.data,
            _count: {
              ...tweet.data.data._count,
              comments: tweet.data.data._count.comments + 1,
            },
          },
        },
        false
      );
      await commentMutate();
    }
    reset();
  };
  const handleRemoveComment = (commentId: string) => {
    deleteComment.trigger(commentId);
    if (responseComments) {
      commentMutate(
        {
          ...responseComments,
          data: responseComments?.data?.filter(prev => prev.id !== commentId),
        },
        false
      );
      if (tweet.data && tweet.data.data) {
        tweet.mutate(
          {
            ...tweet.data,
            data: {
              ...tweet.data.data,
              _count: {
                ...tweet.data.data._count,
                comments: tweet.data.data._count.comments - 1,
              },
            },
          },
          false
        );
      }
    }
  };
  return (
    <Layout hasBackButton isLoggedIn title={<Symbol height={33} width={33} />}>
      {tweet.isLoading ? (
        <LoadingSpinner text={'불러오는 중..'} />
      ) : tweetDelete.isMutating && !tweetDelete.data?.isSuccess ? (
        <>
          <LoadingSpinner text={'삭제 중..'} />
        </>
      ) : (
        <main className="flex flex-col gap-3 px-3 mt-5 ">
          <div className="relative flex items-center w-full gap-3 px-3">
            <ProfileImage avatarId={tweet.data?.data?.user.profile?.avatar} />
            <h3 className="text-xl font-bold">{tweet.data?.data?.user.name}</h3>
            <small>{maskEmail(tweet.data?.data?.user.email ?? '')}</small>
            <small className="ml-auto text-stone-500">{formatDate(tweet.data?.data?.createdAt)}</small>
            {loggedInUser?.data?.id === tweet.data?.data?.userId && (
              <AiOutlineDelete
                onClick={() => {
                  if (confirm('삭제하시겠습니까?')) tweetDelete.trigger(`/${tweet.data?.data?.id}`);
                }}
                className="cursor-pointer "
                size={30}
              />
            )}
          </div>
          <p className="px-5 whitespace-pre-line">{tweet.data?.data?.text}</p>
          {tweet.data?.data?.image && <TweetImage imageId={tweet.data.data.image} />}
          <div className="flex items-center justify-around gap-2 px-3 py-4 border-b border-stone-500">
            <div className="flex items-center w-fit">
              <LikeButton isLiked={tweet.data?.isLiked} toggleLike={handleLikeButton} />
              <span>좋아요 {tweet.data?.data?._count.likes} 개</span>
            </div>
            <span>코멘트 {tweet.data?.data?._count.comments} 개</span>
          </div>
          <form className="flex items-center justify-around w-full gap-1" onSubmit={handleUploadComment}>
            <label className="font-semibold" htmlFor="comment">
              코멘트
            </label>
            <input
              className="w-4/6 h-8 px-2 border rounded-sm border-base1"
              disabled={upLoadComment.isMutating}
              id="comment"
              name="text"
              onChange={onChange}
              title="comment"
              type="text"
              value={form.text}
            />
            <button className="button" disabled={upLoadComment.isMutating}>
              {upLoadComment.isMutating ? <span>등록중...</span> : <span>등 록</span>}
            </button>
          </form>
          <div className="flex flex-col gap-3">
            {responseComments?.data?.map(comment => (
              <div className="flex items-center gap-2 " key={comment.id}>
                <ProfileImage avatarId={comment.user.profile?.avatar} />
                <span className="w-1/6 font-semibold">{comment.user.name}</span>
                <span className="w-1/2">{comment.text}</span>
                <small className="ml-auto w-fit text-stone-500">{formatDate(comment.createdAt)}</small>
                {loggedInUser?.data?.id === comment.user.id && (
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
