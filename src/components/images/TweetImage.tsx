import { makeImagePath } from '@/libs/client';
import Image from 'next/image';

export default function TweetImage({ imageId }: { imageId: string }) {
  return (
    <div className="relative w-full mt-2 mb-4 bg-white rounded-sm bg-opacity-70 h-80">
      <Image
        alt={imageId}
        className="object-contain"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={makeImagePath(imageId)}
      ></Image>
    </div>
  );
}
