import { Input, Layout, Textarea } from '@/components';
import Button from '@/components/common/Button';
import useEditProfile from '@/hooks/users/useEditProfile';
import { makeImagePath } from '@/libs/client';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfileEdit() {
  const {
    edit: { isEditProfile, onSubmit },
    form: { onChange, values },
    image: { previewImage, selectedImage },
    profile: { avatar, email },
  } = useEditProfile();

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
          ) : avatar ? (
            <div className="relative w-40 h-40">
              <Image
                alt="preview Image"
                className="object-cover w-full overflow-hidden rounded-full h-50 "
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={makeImagePath(avatar)}
              />
            </div>
          ) : (
            <FaUserCircle className="fill-stone-500" size={150} />
          )}
          <label className="absolute top-56 button" htmlFor="image">
            프로필 사진 수정하기
          </label>
          <input
            accept="image/*"
            className="hidden"
            disabled={isEditProfile}
            id="image"
            name="image"
            onChange={selectedImage}
            type="file"
          />

          <div className="flex flex-col items-center w-2/5 mt-6">
            <Input
              disabled={isEditProfile}
              name="name"
              onChange={onChange}
              placeholder="이름"
              type="text"
              value={values.name}
            />
            <small className="text-stone-500">{email}</small>
          </div>
        </div>
        <Textarea
          disabled={isEditProfile}
          name="bio"
          onChange={onChange}
          placeholder="자기소개를 입력해주세요."
          value={values.bio}
        />
        <Button disabled={isEditProfile} onClick={onSubmit} width="w-full">
          {isEditProfile ? '수정중...' : '수정완료'}
        </Button>
      </main>
    </Layout>
  );
}
