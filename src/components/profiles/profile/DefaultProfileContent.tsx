import ProfileImage from '@/components/images/ProfileImage';
import { ROUTE_PATH } from '@/constants';
import Link from 'next/link';

import useProfileContext from './useProfileContext';

const DefaultProfileContent = ({ children }: { children?: React.ReactNode }) => {
  const { profile } = useProfileContext();
  const styles = {
    count: 'w-full p-2 text-center text-brown2',
    hover:
      'hover:text-yellow3 hover:font-extrabold text-brown2 hover:scale-150 hover:text-yellow3 hover:ease-in-out hover:transition hover:duration-300',
    link: 'flex flex-col items-center sm:gap-3 rounded-sm aspect-square border-b border-base3',
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center w-full gap-1 px-2">
        <ProfileImage alt="avatar" avatarId={profile.profile?.avatar} size="lg" />
        <h2 className="text-3xl font-bold">{profile.name}</h2>
        <small className="text-stone-500">{profile.email}</small>
      </div>
      <div className="flex flex-col items-center self-start justify-center w-full sm:gap-10 sm:mt-14">
        <div className="flex flex-col justify-center gap-2 mb-1 text-lg w-fit sm:w-full sm:gap-10 sm:flex-row">
          <div className={styles.link}>
            <p>게시물</p>
            <p className={styles.count}>{profile.tweets.length}</p>
          </div>
          <Link className={styles.link} href={ROUTE_PATH.FOLLOWERS(profile.profile?.userId || '')}>
            <p>팔로워</p>
            <p className={styles.count + styles.hover}>{profile.followers.length}</p>
          </Link>
          <Link className={styles.link} href={ROUTE_PATH.FOLLOWING(profile.profile?.userId || '')}>
            <p>팔로잉</p>
            <p className={styles.count + styles.hover}>{profile.following.length}</p>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DefaultProfileContent;
