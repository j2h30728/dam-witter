import { useState } from 'react';

export default function useUploadImage() {
  const [previewImage, setPreviewImage] = useState('');

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setPreviewImage(URL?.createObjectURL(file));
    }
  };
  const cancelImage = () => {
    setPreviewImage('');
  };

  return { cancelImage, previewImage, uploadImage };
}
