import getImageId from '@/libs/client/getImageId';
import { useState } from 'react';

export default function useSelectImage() {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageId, setImageId] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const selectedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsImageLoading(true);

      const file = event.target.files[0];
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewImage(previewImageUrl);

      const id = await getImageId(file, file.name);
      setImageId(id);

      setIsImageLoading(false);
      event.target.value = '';
    }
  };

  const cancelImage = () => {
    URL.revokeObjectURL(previewImage);
    setImageId('');
    setPreviewImage('');
  };

  return { cancelImage, imageId, isImageLoading, previewImage, selectedImage };
}
