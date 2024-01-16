import { Input, Layout, Textarea } from '@/components';
import useEditProfile from '@/hooks/users/useEditProfile';
import { makeImagePath, parameterToString } from '@/libs/client';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfileEdit() {
  const {
    edit: { isEditProfile, onSubmit },
    form: { isError, onChange, values: form },
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
            errorMassage={isError.name}
            isEditMode
            name="name"
            onChange={onChange}
            placeholder="이름"
            title=""
            type="text"
            value={form.name}
          />
          <small className="text-stone-500">{email}</small>
        </div>
        <Textarea
          disabled={isEditProfile}
          errorMassage={isError.bio}
          name="bio"
          onChange={onChange}
          placeholder="자기소개"
          textareaStyle="h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          value={form.bio}
        />
        <button
          className="w-3/5 text-center button disabled:border-none disabled:bg-stone-400"
          disabled={isEditProfile}
          onClick={onSubmit}
        >
          <span className={parameterToString('font-semibold ', isEditProfile ? 'text-stone-100' : '')}>
            {isEditProfile ? '수정중...' : '수정완료'}
          </span>
        </button>
      </main>
    </Layout>
  );
}
