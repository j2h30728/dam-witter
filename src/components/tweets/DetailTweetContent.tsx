import ProfileImage from '@/components/images/ProfileImage';
import TweetImage from '@/components/images/TweetImage';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { formatDate, maskEmail } from '@/libs/client';
import { TweetResponse } from '@/types';
import { AiOutlineDelete } from 'react-icons/ai';

const DetailTweetContent = ({
  detailTweet,
  loggedInUserId,
  onDeleteTweet,
}: {
  detailTweet: TweetResponse | null;
  loggedInUserId: string;
  onDeleteTweet: () => void;
}) => {
  return (
    <>
      <div className="relative flex items-center w-full gap-3 px-3">
        <ProfileImage avatarId={detailTweet?.user.profile?.avatar} />
        <h3 className="text-xl font-bold">{detailTweet?.user.name}</h3>
        <small>{maskEmail(detailTweet?.user.email ?? DEFAULT_ERROR_MESSAGE)}</small>
        <small className="ml-auto text-stone-500">{formatDate(detailTweet?.createdAt)}</small>
        {loggedInUserId === detailTweet?.userId && (
          <AiOutlineDelete className="cursor-pointer " onClick={onDeleteTweet} size={30} />
        )}
      </div>
      <p className="px-5 whitespace-pre-line">{detailTweet?.text}</p>
      {detailTweet?.image && <TweetImage imageId={detailTweet.image} />}
    </>
  );
};

export default DetailTweetContent;
