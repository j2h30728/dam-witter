import { makeImagePath } from '@/libs/client';
import Image from 'next/image';

export default function TweetImage({ imageId }: { imageId: string }) {
  return (
    <div className="relative w-full my-3 h-60 ">
      <Image alt={imageId} className="object-contain" fill src={makeImagePath(imageId)}></Image>
    </div>
  );
}
