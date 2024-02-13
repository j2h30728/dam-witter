import useLayoutViewModel from '@/hooks/viewModel/useLayoutViewModel';
import { parameterToString } from '@/libs/client';
import { AiOutlineLogout } from 'react-icons/ai';

import DesktopSidebar from './DesktopSidebar';
import HeaderNavigation from './HeaderNavigation';
import MobileNavigation from './MobileNavigation';
import NavigationItem from './NavigationItem';

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
        <div className="w-[25%]">
          <div className="cursor-pointer md:hidden">
            <NavigationItem
              navigate={handleLogOut}
              symbol={<AiOutlineLogout className=" stroke-beige2 fill-beige2 text-[30px] " strokeWidth={40} />}
              title="로그아웃"
              type="footer"
            />
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
