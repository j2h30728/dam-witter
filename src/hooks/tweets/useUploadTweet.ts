import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { basicTextValidator } from '@/libs/client';
import { toastMessage } from '@/libs/client/toastMessage';
import { UploadBasicInputText } from '@/types';
import { useEffect, useState } from 'react';

import useTweetMutation from '../api/useTweetMutation';
import useForm from '../common/useForm';
import useSelectImage from '../common/useSelectImage';

const useUploadTweet = () => {
  const [isTweetSubmissionInProgress, setIsTweetSubmissionInProgress] = useState(false);

  const { createdTweet, isUploadTweetMutating, uploadTweetMutate } = useTweetMutation();

  const { errorMessage, errors, form, isError, onChange } = useForm<UploadBasicInputText>(
    { text: '' },
    { text: basicTextValidator }
  );
  const { cancelImage, imageId, isImageLoading, previewImage, selectedImage } = useSelectImage();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return toastMessage('error', errorMessage.at(0) ?? DEFAULT_ERROR_MESSAGE);
    setIsTweetSubmissionInProgress(true);

    if (!previewImage) {
      uploadTweetMutate({ text: form.text });
      setIsTweetSubmissionInProgress(false);
    }
  };

  useEffect(() => {
    if (!isImageLoading && imageId && isTweetSubmissionInProgress) {
      uploadTweetMutate({ imageId, text: form.text });
      setIsTweetSubmissionInProgress(false);
    }
  }, [imageId, form.text, uploadTweetMutate, isImageLoading, isTweetSubmissionInProgress]);

  const isCreatingTweet = isTweetSubmissionInProgress || createdTweet?.isSuccess || isUploadTweetMutating;

  return {
    form: {
      errors,
      isError: { text: form.text && !errors.text.isValid && errors.text.message },
      onChange,
      value: form,
    },
    image: { cancelImage, previewImage, selectedImage },
    upload: { isCreatingTweet, onSubmit },
  };
};

export default useUploadTweet;
