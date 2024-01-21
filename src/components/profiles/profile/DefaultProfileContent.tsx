import ProfileImage from '@/components/images/ProfileImage';

import useProfileContext from './useProfileContext';

const DefaultProfileContent = ({ children }: { children?: React.ReactNode }) => {
  const { profile } = useProfileContext();
  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center w-full gap-1 px-2">
        <ProfileImage alt="avatar" avatarId={profile.profile?.avatar} size="lg" />
        <h2 className="text-3xl font-bold">{profile.name}</h2>
        <small className="text-stone-500">{profile.email}</small>
      </div>
      <div className="flex flex-col items-start self-start justify-center w-full gap-10 mt-14">
        <div className="flex justify-center w-full gap-10 text-lg ">
          <div className="flex flex-col items-center gap-3">
            <p>게시물</p>
            <p>{profile.tweets.length}</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>팔로워</p>
            <p>{profile.followers.length}</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>팔로잉</p>
            <p>{profile.following.length}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DefaultProfileContent;
