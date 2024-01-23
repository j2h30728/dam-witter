import { AiFillDelete } from 'react-icons/ai';

import useTweetContext from './useTweetContext';

export const DeleteButton = ({ loggedInUserId, onDelete }: { loggedInUserId?: string; onDelete: () => void }) => {
  const { tweet } = useTweetContext();

  if (loggedInUserId === tweet?.userId)
    return (
      <AiFillDelete className="absolute cursor-pointer text-stone-400 right-6 top-5" onClick={onDelete} size={25} />
    );
};
