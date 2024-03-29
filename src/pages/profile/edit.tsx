import { Input, Layout, ProfileImage, Textarea } from '@/components';
import Button from '@/components/common/Button';
import useEditProfile from '@/hooks/users/useEditProfile';

import { NextPageWithLayout } from '../_app';

const ProfileEdit: NextPageWithLayout = () => {
  const {
    edit: { isEditProfile, onSubmit },
    form: { onChange, values },
    image: { cancelImage, previewImage, selectedImage },
    profile: { avatar, email },
  } = useEditProfile();

  return (
    <main className="flex flex-col justify-start px-2 mx-auto mt-2 md:max-w-3xl h-fit">
      <div className="flex flex-col items-center gap-2 px-2">
        <div className="relative w-50 h-50">
          {previewImage ? (
            <ProfileImage alt="preview Image" previewImage={previewImage} size="lg" />
          ) : (
            <ProfileImage alt="avatar Image" avatarId={avatar} size="lg" />
          )}
        </div>
        <label className="button" htmlFor="image">
          프로필 사진 수정하기
        </label>
        {previewImage && (
          <Button
            className="absolute top-40 opacity-80 bg-beige1 hover:bg-beige2 active:bg-beige3"
            disabled={isEditProfile}
            onClick={cancelImage}
            size="sm"
          >
            사진등록취소
          </Button>
        )}
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
      <Button className="mt-auto mb-[20%]" disabled={isEditProfile} onClick={onSubmit} width="w-full">
        {isEditProfile ? '수정중...' : '수정완료'}
      </Button>
    </main>
  );
};
ProfileEdit.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout hasBackButton isLoggedIn title="MY PROFILE EDIT">
      {page}
    </Layout>
  );
};
export default ProfileEdit;
