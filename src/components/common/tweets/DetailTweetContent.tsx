import ProfileImage from '@/components/images/ProfileImage';
import TweetImage from '@/components/images/TweetImage';
import { ROUTE_PATH } from '@/constants';
import useLikeTweet from '@/hooks/tweets/useLikeTweet';
import { fetchers, formatDate, maskEmail } from '@/libs/client';
import { ProfileResponse, ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const DetailTweetContent = () => {
  const router = useRouter();

  const { data: loggedInUser } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  const tweet = useSWR<ResponseType<TweetResponse>>(router.query.id ? `/api/tweets/${router.query.id}` : null);

  const tweetDelete = useSWRMutation(`/api/tweets/${router.query.id}`, fetchers.delete, {
    onSuccess: () => router.replace(ROUTE_PATH.HOME),
  });

  return (
    <>
      <div className="relative flex items-center w-full gap-3 px-3">
        <ProfileImage avatarId={tweet.data?.data?.user.profile?.avatar} />
        <h3 className="text-xl font-bold">{tweet.data?.data?.user.name}</h3>
        <small>{maskEmail(tweet.data?.data?.user.email ?? '')}</small>
        <small className="ml-auto text-stone-500">{formatDate(tweet.data?.data?.createdAt)}</small>
        {loggedInUser?.id === tweet.data?.data?.userId && (
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
    </>
  );
};

export default DetailTweetContent;
