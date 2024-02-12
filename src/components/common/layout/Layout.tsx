import useLayoutViewModel from '@/hooks/viewModel/useLayoutViewModel';
import { parameterToString } from '@/libs/client';
import { AiOutlineLogout } from 'react-icons/ai';

import DesktopSidebar from './DesktopSidebar';
import HeaderNavigation from './HeaderNavigation';
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
  const { handleBack, handleLogOut, profile } = useLayoutViewModel({ isLoggedIn });
  return (
    <div className="relative w-full mx-auto border-solid md:flex bg-beige0">
      <header className="fixed top-0 z-10 flex items-center justify-between w-full px-10 mx-auto border-b-2 border-beige2 bg-base2 h-14 ">
        <HeaderNavigation handleBack={handleBack} hasBackButton={!!hasBackButton} />
        <div className="text-xl font-bold cursor-default text-beige1 ">{title}</div>
        <div className="cursor-pointer" onClick={handleLogOut}>
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
          isLoggedIn ? 'h-[calc(100vh-7.5rem)]  md:ml-72' : 'h-[calc(100vh-3.5rem)]',
          'mx-auto pt-2 mt-14 overflow-x-hidden overflow-y-auto md:h-[calc(100vh-3.5rem)] w-full'
        )}
      >
        {children}
      </div>
    </div>
  );
}
