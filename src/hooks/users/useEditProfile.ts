import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { bioValidator, usernameValidator } from '@/libs/client';
import { toastMessage } from '@/libs/client/toastMessage';
import { EditProfileInput } from '@/types';
import { useEffect, useState } from 'react';

import useProfile from '../api/useProfile';
import useProfileMutation from '../api/useProfileMutation';
import useForm from '../common/useForm';
import useSelectImage from '../common/useSelectImage';

const useEditProfile = () => {
  const { profile } = useProfile();

  const [isEditedProfileSubmissionInProgress, setIsEditedProfileSubmissionInProgress] = useState(false);
  const startEditingProfileSubmission = () => {
    setIsEditedProfileSubmissionInProgress(true);
  };
  const endEditingProfileSubmission = () => {
    setIsEditedProfileSubmissionInProgress(false);
  };

  const { errorMessage, errors, form, isError, onChange } = useForm<EditProfileInput>(
    {
      bio: profile?.profile?.bio || '',
      name: profile?.name || '',
    },
    {
      bio: bioValidator,
      name: usernameValidator,
    }
  );

  const { isEditProfileMutating, mutateProfile } = useProfileMutation({ endEditingProfileSubmission });

  const { imageId, isImageLoading, previewImage, selectedImage } = useSelectImage();

  const onSubmit = async () => {
    if (isError) return toastMessage('error', errorMessage.at(0) ?? DEFAULT_ERROR_MESSAGE);
    startEditingProfileSubmission();
    if (!previewImage) {
      mutateProfile({
        avatarId: profile?.profile?.avatar,
        bio: form.bio,
        name: form.name,
      });
      endEditingProfileSubmission();
    }
  };
  if (imageId) {
  }

  useEffect(() => {
    if (!isImageLoading && imageId && isEditedProfileSubmissionInProgress) {
      mutateProfile({
        avatarId: imageId,
        bio: form.bio,
        name: form.name,
      });
      endEditingProfileSubmission();
    }
  }, [imageId, form.bio, form.name, isImageLoading, isEditedProfileSubmissionInProgress, mutateProfile]);

  const isEditProfile = isEditProfileMutating || isEditedProfileSubmissionInProgress;

  return {
    edit: { isEditProfile, onSubmit },
    form: {
      isError: {
        bio: form.bio && !errors.bio.isValid && errors.bio.message,
        name: form.name && !errors.name.isValid && errors.name.message,
      },
      onChange,
      values: form,
    },
    image: { previewImage, selectedImage },
    profile: { avatar: profile?.profile?.avatar, email: profile?.email },
  };
};

export default useEditProfile;
