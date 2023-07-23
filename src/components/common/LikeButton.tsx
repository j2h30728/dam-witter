import { TiHeart, TiHeartOutline } from 'react-icons/ti';

export default function LikeButton({ isLiked, toggleLike }: { isLiked: boolean; toggleLike: () => void }) {
  return (
    <button className="rounded-full hover:bg-gray-100 hover:scale-110 active:scale-90" onClick={toggleLike}>
      {isLiked ? (
        <TiHeart className="text-red-500 hover:text-red-600" size={30} />
      ) : (
        <TiHeartOutline className='"text-gray-400  hover:text-gray-500"' size={30} />
      )}
    </button>
  );
}
