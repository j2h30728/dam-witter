import { Input, Layout, Textarea } from '@/components';
import { ROUTE_PATH } from '@/constants';
import { useForm, useSelectImage } from '@/hooks';
import { bioValidator, fetchers, makeImagePath, parameterToString, usernameValidator } from '@/libs/client';
import { ProfileResponse, ResponseType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

type EditProfileInput = { avatarId?: string; bio: string; name: string };
export default function ProfileEdit() {
  const router = useRouter();
  const { data: profile } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  const [isEditedProfileSubmissionInProgress, setIsEditedProfileSubmissionInProgress] = useState(false);

  const { errorMessage, errors, form, isError, onChange } = useForm<EditProfileInput>(
    {
      bio: profile?.data?.profile?.bio || '',
      name: profile?.data?.name || '',
    },
    {
      bio: bioValidator,
      name: usernameValidator,
    }
  );
  const { isMutating: isEditProfileMutating, trigger } = useSWRMutation(
    '/api/users/profile',
    fetchers.put<EditProfileInput, ProfileResponse>,
    {
      onError: error => console.error(error),
      onSuccess: data => {
        if (data.isSuccess) {
          setIsEditedProfileSubmissionInProgress(false);
          router.push(ROUTE_PATH.PROFILE);
        } else {
          alert(data.message);
        }
      },
    }
  );

  const { imageId, isImageLoading, previewImage, selectedImage } = useSelectImage();

  const handleEditProfile = async () => {
    if (isError) return alert(errorMessage.at(0));
    setIsEditedProfileSubmissionInProgress(true);
    if (!previewImage) {
      trigger({
        avatarId: profile?.data?.profile?.avatar,
        bio: form.bio,
        name: form.name,
      });
      setIsEditedProfileSubmissionInProgress(false);
    }
  };
  if (imageId) {
  }

  useEffect(() => {
    if (!isImageLoading && imageId && isEditedProfileSubmissionInProgress) {
      trigger({
        avatarId: imageId,
        bio: form.bio,
        name: form.name,
      });
      setIsEditedProfileSubmissionInProgress(false);
    }
  }, [imageId, form.bio, form.name, isImageLoading, isEditedProfileSubmissionInProgress, trigger]);

  const isEditProfile = isEditProfileMutating || isEditedProfileSubmissionInProgress;

  return (
    <Layout hasBackButton isLoggedIn title="MY PAGE">
      <main className="flex flex-col mt-10">
        <div className="flex flex-col items-center gap-2 px-2">
          {previewImage ? (
            <div className="relative w-40 h-40">
              <Image
                alt="preview Image"
                className="object-cover w-full overflow-hidden rounded-full h-50 "
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={previewImage}
              />
            </div>
          ) : profile?.data?.profile?.avatar ? (
            <div className="relative w-40 h-40">
              <Image
                alt="preview Image"
                className="object-cover w-full overflow-hidden rounded-full h-50 "
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={makeImagePath(profile?.data?.profile?.avatar)}
              />
            </div>
          ) : (
            <FaUserCircle className="fill-stone-500" size={150} />
          )}
          <label className="absolute top-56 button" htmlFor="image">
            프로필 사진 수정하기
            <input
              accept="image/*"
              className="hidden"
              disabled={isEditProfile}
              id="image"
              name="image"
              onChange={selectedImage}
              type="file"
            />
          </label>
          <Input
            disabled={isEditProfile}
            errorMassage={form.name && !errors.name.isValid && errors.name.message}
            isEditMode
            name="name"
            onChange={onChange}
            placeholder="이름"
            title=""
            type="text"
            value={form.name}
          />
          <small className="text-stone-500">{profile?.data?.email}</small>
        </div>
        <Textarea
          disabled={isEditProfile}
          errorMassage={form.bio && !errors.bio.isValid && errors.bio.message}
          name="bio"
          onChange={onChange}
          placeholder="자기소개"
          textareaStyle="h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          value={form.bio}
        />
        <button
          className="w-3/5 text-center button disabled:border-none disabled:bg-stone-400"
          disabled={isEditProfile}
          onClick={handleEditProfile}
        >
          <span className={parameterToString('font-semibold ', isEditProfile ? 'text-stone-100' : '')}>
            {isEditProfile ? '수정중...' : '수정완료'}
          </span>
        </button>
      </main>
    </Layout>
  );
}
