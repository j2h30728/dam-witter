import { makeImagePath, parameterToString } from '@/libs/client';
import Image from 'next/image';

import defaultProfileImage from '../../../public/default_profile.png';

const styles = {
  size: {
    lg: 'w-40 h-40 ',
    md: 'w-12 h-12',
    sm: 'w-8 h-8',
  },
};

export default function ProfileImage({
  alt = '',
  avatarId,
  previewImage,
  size,
}: {
  alt: string;
  avatarId?: string | undefined;
  previewImage?: string;
  size: keyof typeof styles.size;
}) {
  return (
    <div className={parameterToString('relative border rounded-full border-stone-100', styles.size[size])}>
      <Image
        alt={alt}
        className="object-cover overflow-hidden rounded-full"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={previewImage ? previewImage : avatarId ? makeImagePath(avatarId) : defaultProfileImage}
      />
    </div>
  );
}
