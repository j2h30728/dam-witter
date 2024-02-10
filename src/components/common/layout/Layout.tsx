import { postFetcher } from '@/api/fetchers';
import { TitleLogo } from '@/components';
import useMyProfile from '@/hooks/api/useMyProfile';
import { parameterToString } from '@/libs/client';
import { useRouter } from 'next/router';
import { AiOutlineLeft, AiOutlineLogout } from 'react-icons/ai';
import { cache } from 'swr/_internal';
import useSWRMutation from 'swr/mutation';

import DesktopSidebar from './DesktopSidebar';
import MobileNavigation from './MobileNavigation';

export default function Layout({
  children,
  hasBackButton,
  isLoggedIn,
  title,
}: {
  children: React.ReactNode;
  hasBackButton?: boolean;
  isLoggedIn?: boolean;
  title: React.ReactNode;
}) {
  const router = useRouter();
  const { trigger: logOut } = useSWRMutation('/api/users/log-out', postFetcher, {
    onSuccess: () => {
      router.replace('/log-in');
      cache.delete('/api/users/profile');
    },
  });
  const { profile } = useMyProfile();

  return (
    <div className="relative w-full mx-auto border-solid md:flex">
      <header className="fixed top-0 z-10 flex items-center justify-between w-full px-10 mx-auto border-b-2 border-beige2 bg-base2 h-14 ">
        <div className="cursor-pointer md:hidden" onClick={() => router.back()}>
          {hasBackButton ? (
            <AiOutlineLeft className=" stroke-beige2 fill-beige2" size={25} strokeWidth={40} />
          ) : (
            <div className="w-[25px]"></div>
          )}
        </div>
        <div className="items-baseline hidden gap-5 md:flex">
          <TitleLogo />
          <h1 className="text-4xl outline-text font-hanalei-fill text-symbol1">Dam-witter</h1>
        </div>
        <div className="text-xl font-bold cursor-default text-beige1 ">{title}</div>
        <div
          onClick={() => {
            if (confirm('로그아웃 하시겠습니까?')) {
              logOut();
            }
          }}
          className="cursor-pointer"
        >
          <div
            className={parameterToString(
              'flex flex-col items-center justify-between gap-1 text-md font-medium text-white',
              isLoggedIn ? '' : 'hidden'
            )}
          >
            <AiOutlineLogout className=" stroke-beige2 fill-beige2" size={25} strokeWidth={40} />
            <span className="text-xs">로그아웃</span>
          </div>
        </div>
      </header>
      {isLoggedIn && profile ? (
        <>
          <DesktopSidebar loggedInUser={profile} />
          <MobileNavigation />
        </>
      ) : null}
      <div
        className={parameterToString(
          isLoggedIn ? 'h-[calc(100vh-7.5rem)]' : 'h-[calc(100vh-3.5rem)]',
          'mx-auto pt-2 mt-14 first-letter:overflow-x-hidden overflow-y-auto md:ml-72 md:right-0 md:h-[calc(100vh-3.5rem)] w-full bg-beige0 border-x-4 border-base w-xl '
        )}
      >
        {children}
      </div>
    </div>
  );
}
