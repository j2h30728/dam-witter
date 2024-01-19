import LikeButton from '@/components/common/LikeButton';
import { formatDate } from '@/libs/client';
import { TweetResponse } from '@/types';
import { useContext } from 'react';

import { tweetContext } from '.';

export const Description = ({ onToggleLike }: { onToggleLike: (selectedTweet?: TweetResponse) => void }) => {
  const tweet = useContext(tweetContext);
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center gap-3 w-fit">
        <LikeButton isLiked={tweet?.isLiked} toggleLike={onToggleLike} />
        <span>
          좋아요 <strong>{tweet?._count.likes}</strong> 개
        </span>
        <span>
          코멘트 <strong>{tweet?._count.comments}</strong> 개
        </span>
      </div>
      <small className="ml-auto text-stone-500">{formatDate(tweet?.createdAt)}</small>
    </div>
  );
};
