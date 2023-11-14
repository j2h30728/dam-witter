import ProfileImage from '@/components/images/ProfileImage';
import TweetImage from '@/components/images/TweetImage';
import { ROUTE_PATH } from '@/constants';
import { fetchers, formatDate, maskEmail } from '@/libs/client';
import { DEFAULT_ERROR_MESSAGE } from '@/libs/client/constants';
import { toastMessage } from '@/libs/client/toastMessage';
import { ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

const DetailTweetContent = ({ loggedInUserId }: { loggedInUserId: string }) => {
  const router = useRouter();

  const tweet = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);

  const tweetDelete = useSWRMutation(`/api/tweets/${router.query.id}`, fetchers.delete, {
    onError: (error: string) => toastMessage('error', error),
    onSuccess: data => {
      mutate('/api/tweets');
      toastMessage('info', data.message);
    },
  });

  return (
    <>
      <div className="relative flex items-center w-full gap-3 px-3">
        <ProfileImage avatarId={tweet.data?.data?.user.profile?.avatar} />
        <h3 className="text-xl font-bold">{tweet.data?.data?.user.name}</h3>
        <small>{maskEmail(tweet.data?.data?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
        <small className="ml-auto text-stone-500">{formatDate(tweet.data?.data?.createdAt)}</small>
        {loggedInUserId === tweet.data?.data?.userId && (
          <AiOutlineDelete
            onClick={() => {
              if (confirm('삭제하시겠습니까?')) {
                tweetDelete.trigger();
                router.replace(ROUTE_PATH.HOME);
              }
            }}
            className="cursor-pointer "
            size={30}
          />
        )}
      </div>
      <p className="px-5 whitespace-pre-line">{tweet.data?.data?.text}</p>
      {tweet.data?.data?.image && <TweetImage imageId={tweet.data.data.image} />}
    </>
  );
};

export default DetailTweetContent;
