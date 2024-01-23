import LikeButton from '@/components/common/LikeButton';
import { formatDate } from '@/libs/client';
import { TweetResponse } from '@/types';
import { useState } from 'react';

import LikedUsersModal from './LikedUsersModal';
import useTweetContext from './useTweetContext';

export const Description = ({ onToggleLike }: { onToggleLike: (selectedTweet?: TweetResponse) => void }) => {
  const { tweet } = useTweetContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center gap-3 w-fit">
          <LikeButton isLiked={tweet?.isLiked} toggleLike={onToggleLike} />
          <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            좋아요 <strong>{tweet?._count.likes}</strong> 개
          </div>
          <div>
            코멘트 <strong>{tweet?._count.comments}</strong> 개
          </div>
        </div>
        <small className="ml-auto text-stone-500">{formatDate(tweet?.createdAt)}</small>
      </div>
      <LikedUsersModal
        isOpen={isModalOpen}
        likedUser={tweet.likes?.map(user => user.user) || []}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
