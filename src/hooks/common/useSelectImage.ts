import getImageId from '@/libs/client/getImageId';
import { useRef, useState } from 'react';

export default function useSelectImage() {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageId, setImageId] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const uploadControllerRef = useRef<AbortController | null>(null);

  const selectedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadControllerRef.current) {
      uploadControllerRef.current.abort();
    }
    if (event.target.files && event.target.files.length > 0) {
      uploadControllerRef.current = new AbortController();

      setIsImageLoading(true);

      const file = event.target.files[0];
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewImage(previewImageUrl);

      const id = await getImageId(file, file.name, uploadControllerRef.current);
      setImageId(id);

      setIsImageLoading(false);
      event.target.value = '';
    }
  };

  const cancelImage = () => {
    URL.revokeObjectURL(previewImage);
    setImageId('');
    setPreviewImage('');
    if (uploadControllerRef.current) {
      uploadControllerRef.current.abort();
      uploadControllerRef.current = null;
    }
  };

  return { cancelImage, imageId, isImageLoading, previewImage, selectedImage };
}
