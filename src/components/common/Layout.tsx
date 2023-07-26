import { ROUTE_PATH } from '@/constants';
import useLogOut from '@/hooks/users/useLogOut';
import { parameterToString } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { AiOutlineHome, AiOutlineLeft, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineUser } from 'react-icons/ai';

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
  const handleLogOut = useLogOut();

  return (
    <div className="container mx-auto">
      <header className="fixed z-10 flex items-center justify-between w-full max-w-xl px-10 border-b border-beige3 bg-base2 h-14">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <AiOutlineLeft
            className={parameterToString(' stroke-beige1 fill-beige1', hasBackButton ? '' : 'hidden')}
            size={25}
            strokeWidth={40}
          />
        </div>
        <div className="cursor-pointer" onClick={() => router.push(ROUTE_PATH.HOME)}>
          <div className="text-xl font-bold text-gray-800 text-beige1 ">{title}</div>
        </div>
        <div className="cursor-pointer" onClick={handleLogOut}>
          <div
            className={parameterToString(
              'flex flex-col items-center justify-between gap-1 text-xs font-medium text-white',
              isLoggedIn ? '' : 'hidden'
            )}
          >
            <AiOutlineLogout className=" stroke-beige1 fill-beige1" size={25} strokeWidth={40} />
            <span>로그아웃</span>
          </div>
        </div>
      </header>
      <div className="w-full h-screen pt-16 pb-32 overflow-auto border-solid overscroll-contain border-x-4 border-base">
        {children}
      </div>
      <footer>
        {isLoggedIn && (
          <nav className="fixed bottom-0 z-10 flex items-center justify-between w-full h-16 max-w-xl px-10 text-xs text-gray-700 border-t border-beige3 bg-base2">
            <div
              className="flex flex-col items-center justify-between gap-1 font-medium text-white cursor-pointer"
              onClick={() => router.push(ROUTE_PATH.HOME)}
            >
              <AiOutlineHome className=" stroke-beige1 fill-beige1" size={25} strokeWidth={40} />
              <span>홈</span>
            </div>
            <div
              className="flex flex-col items-center justify-between gap-1 font-medium text-white cursor-pointer"
              onClick={() => router.push(ROUTE_PATH.TWEETS + ROUTE_PATH.UPLOAD)}
            >
              <AiOutlinePlusCircle className=" stroke-beige1 fill-beige1" size={25} strokeWidth={40} />
              <span>트윗추기</span>
            </div>
            <div
              className="flex flex-col items-center justify-between gap-1 font-medium text-white cursor-pointer"
              onClick={() => router.push(ROUTE_PATH.PROFILE)}
            >
              <AiOutlineUser className=" stroke-beige1 fill-beige1" size={25} strokeWidth={40} />
              <span>마이페이지</span>
            </div>
          </nav>
        )}
      </footer>
    </div>
  );
}
