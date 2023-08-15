import { makeImagePath } from '@/libs/client';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfileImage({ avatarId }: { avatarId: string | undefined }) {
  return (
    <>
      {avatarId ? (
        <div className="relative w-12 h-12 border rounded-full border-stone-100">
          <Image
            alt="preview Image"
            className="object-cover overflow-hidden rounded-full"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={makeImagePath(avatarId)}
          />
        </div>
      ) : (
        <FaUserCircle className="fill-stone-500" size={46} />
      )}
    </>
  );
}
