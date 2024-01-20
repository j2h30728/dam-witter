import { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai';

import { tweetContext } from '.';

export const DeleteButton = ({ loggedInUserId, onDelete }: { loggedInUserId?: string; onDelete: () => void }) => {
  const data = useContext(tweetContext);
  if (loggedInUserId === data?.userId)
    return (
      <AiFillDelete className="absolute cursor-pointer text-stone-400 right-6 top-5" onClick={onDelete} size={25} />
    );
};
