import { ROUTE_PATH } from '@/constants';
import useLogOut from '@/hooks/users/useLogOut';
import { useRouter } from 'next/router';
import { IoLogOut } from 'react-icons/io5';
import { TiChevronLeft, TiHome, TiPlus, TiUser } from 'react-icons/ti';

export default function Layout({
  children,
  hasBackButton,
  isLoggedIn,
  title,
}: {
  children: React.ReactNode;
  hasBackButton?: boolean;
  isLoggedIn?: boolean;
  title: string;
}) {
  const router = useRouter();
  const handleLogOut = useLogOut();

  return (
    <div className="container mx-auto">
      <div className="fixed z-10 flex items-center justify-between w-full max-w-xl px-10 bg-blue-300 border-b h-14">
        <div className="cursor-pointer" onClick={() => router.back()}>
          {hasBackButton ? <TiChevronLeft size={25} /> : <div></div>}
        </div>
        <div className="cursor-pointer" onClick={() => router.push(ROUTE_PATH.HOME)}>
          <div className="text-lg font-medium text-gray-800">{title}</div>
        </div>
        <div className="cursor-pointer" onClick={handleLogOut}>
          {isLoggedIn ? <IoLogOut size={25} /> : <div></div>}
        </div>
      </div>
      <div className="w-full h-screen px-5 pt-16 pb-32 overflow-auto bg-white border-solid overscroll-contain border-x-4 border-base">
        {children}
      </div>
      {isLoggedIn && (
        <nav className="fixed bottom-0 z-10 flex items-center justify-between w-full max-w-xl px-10 text-xs text-gray-700 bg-blue-300 border-t h-14">
          <div className="cursor-pointer" onClick={() => router.push(ROUTE_PATH.HOME)}>
            {isLoggedIn ? <TiHome size={25} /> : <div></div>}
          </div>
          <div className="cursor-pointer" onClick={() => router.push(ROUTE_PATH.TWEETS + ROUTE_PATH.UPLOAD)}>
            {isLoggedIn ? <TiPlus size={25} /> : <div></div>}
          </div>
          <div className="cursor-pointer" onClick={() => router.push(ROUTE_PATH.PROFILE)}>
            {isLoggedIn ? <TiUser size={25} /> : <div></div>}
          </div>
        </nav>
      )}
    </div>
  );
}
