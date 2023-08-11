import { Input } from '@/components';
import Layout from '@/components/common/Layout';
import Textarea from '@/components/common/Textarea';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm, useSelectImage } from '@/hooks';
import { makeImagePath, useMutation } from '@/libs/client';
import { parameterToString } from '@/libs/client/utils';
import { bioValidator, usernameValidator } from '@/libs/client/validators';
import { ProfileResponse, ResponseType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useSWR from 'swr';

type EditProfileInput = { bio: string; username: string };
export default function ProfileEdit() {
  const router = useRouter();
  const { data: profile } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, errors, form, isError, onChange } = useForm<EditProfileInput>(
    {
      bio: profile?.data?.profile?.bio || '',
      username: profile?.data?.name || '',
    },
    {
      bio: bioValidator,
      username: usernameValidator,
    }
  );
  const [editProfile, { data: editProfileData, error: editProfileError }] =
    useMutation<ResponseType<ProfileResponse>>();
  const { imageId, isImageLoading, previewImage, selectedImage } = useSelectImage();
  const handleEditProfile = async () => {
    if (isError) return alert(errorMessage.at(0));
    setIsLoading(true);
    if (imageId) {
      await editProfile('/api/users/profile', METHOD.PUT, {
        avatarId: imageId,
        bio: form.bio,
        name: form.username,
      });
    } else {
      await editProfile('/api/users/profile', METHOD.PUT, {
        avatarId: profile?.data?.profile?.avatar,
        bio: form.bio,
        name: form.username,
      });
    }
  };
  useEffect(() => {
    if (editProfileData?.isSuccess) {
      setIsLoading(false);
      router.push(ROUTE_PATH.PROFILE);
    } else if (editProfileError) {
      alert(editProfileData?.message);
      console.error(editProfileData);
    }
  }, [editProfileData, router, editProfileError]);

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
                src={previewImage}
              />
            </div>
          ) : profile?.data?.profile?.avatar ? (
            <div className="relative w-40 h-40">
              <Image
                alt="preview Image"
                className="object-cover w-full overflow-hidden rounded-full h-50 "
                fill
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
              disabled={isLoading}
              id="image"
              name="image"
              onChange={selectedImage}
              type="file"
            />
          </label>
          <Input
            disabled={isLoading}
            errorMassage={form.username && !errors.username.isValid && errors.username.message}
            isEditMode
            name="username"
            onChange={onChange}
            placeholder="이름"
            title=""
            type="text"
            value={form.username}
          />
          <small className="text-stone-500">{profile?.data?.email}</small>
        </div>
        <Textarea
          disabled={isLoading}
          errorMassage={form.bio && !errors.bio.isValid && errors.bio.message}
          name="bio"
          onChange={onChange}
          placeholder="자기소개"
          textareaStyle="h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          value={form.bio}
        />
        <button
          className="w-3/5 text-center button disabled:border-none disabled:bg-stone-400"
          disabled={isLoading || isImageLoading}
          onClick={handleEditProfile}
        >
          <span className={parameterToString('font-semibold ', isLoading || isImageLoading ? 'text-stone-100' : '')}>
            {isLoading ? '수정중...' : isImageLoading ? '프로플이미지 등록중..' : '수정완료'}
          </span>
        </button>
      </main>
    </Layout>
  );
}
