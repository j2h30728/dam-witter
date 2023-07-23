import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useInput, useSelectImage } from '@/hooks';
import { makeImagePath, useMutation } from '@/libs/client';
import getImageId from '@/libs/client/getImageId';
import { ProfileResponse, ResponseType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useSWR from 'swr';

export default function ProfileEdit() {
  const router = useRouter();
  const { data: profile } = useSWR<ResponseType<ProfileResponse>>('/api/users/profile');
  const [isLoading, setIsLoading] = useState(false);
  const [editName, handleNameChange] = useInput(profile?.data?.name || '');
  const [editBio, handleBioChange] = useInput(profile?.data?.profile?.bio || '');
  const [editProfile, { data: editProfileData, error: editProfileError }] =
    useMutation<ResponseType<ProfileResponse>>();
  const { imageFile, previewImage, selectedImage } = useSelectImage();

  const handleEditProfile = async () => {
    setIsLoading(true);
    if (imageFile) {
      const id = await getImageId(imageFile, editName);
      editProfile('/api/users/profile', METHOD.PUT, { avatarId: id, bio: editBio, name: editName });
    } else {
      editProfile('/api/users/profile', METHOD.PUT, { avatarId: '', name: editName, text: editBio });
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
      <main className="flex flex-col gap-5 mt-10">
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
            <input accept="image/*" className="hidden" id="image" name="image" onChange={selectedImage} type="file" />
          </label>
          <input className="text-3xl font-bold" onChange={handleNameChange} placeholder={profile?.data?.name} />
          <small className="text-stone-500">{profile?.data?.email}</small>
        </div>
        <textarea
          className="h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          name="bio"
          onChange={handleBioChange}
          title="자기소개"
          value={editBio}
        />
        <button className="w-3/5 text-center button" onClick={handleEditProfile}>
          <span className="font-semibold "> {isLoading ? '수정중...' : '수정완료'}</span>
        </button>
      </main>
    </Layout>
  );
}
