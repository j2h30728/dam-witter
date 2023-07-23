import { useState } from 'react';

export default function useSelectImage() {
  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();

  const selectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const cancelImage = () => {
    setPreviewImage('');
  };

  return { cancelImage, imageFile, previewImage, selectedImage };
}
