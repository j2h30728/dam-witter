import { postFetcher } from '@/api/fetchers';
import { ROUTE_PATH } from '@/constants';
import { parameterToString } from '@/libs/client';
import { useRouter } from 'next/router';
import { AiOutlineHome, AiOutlineLeft, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineUser } from 'react-icons/ai';
import { cache } from 'swr/_internal';
import useSWRMutation from 'swr/mutation';

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

  return (
    <div className="container relative w-full max-w-xl mx-auto border-solid bg-beige0 border-x-4 border-base">
      <header className="fixed top-0 z-10 flex items-center justify-between w-full max-w-xl px-10 border-b border-beige3 bg-base2 h-14">
        <div className="cursor-pointer" onClick={() => router.back()}>
          {hasBackButton ? (
            <AiOutlineLeft className={parameterToString(' stroke-beige1 fill-beige1')} size={25} strokeWidth={40} />
          ) : (
            <div className="w-[25px]"></div>
          )}
        </div>
        <div className="text-xl font-bold text-gray-800 cursor-default text-beige1 ">{title}</div>
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
              'flex flex-col items-center justify-between gap-1 text-xs font-medium text-white',
              isLoggedIn ? '' : 'hidden'
            )}
          >
            <AiOutlineLogout className=" stroke-beige1 fill-beige1" size={25} strokeWidth={40} />
            <span>로그아웃</span>
          </div>
        </div>
      </header>
      <div
        className={parameterToString(
          isLoggedIn ? 'h-[calc(100vh-7.5rem)]' : 'h-[calc(100vh-3.5rem)]',
          'pt-2 mt-14 first-letter:overflow-x-hidden overflow-y-auto'
        )}
      >
        {children}
      </div>
      {isLoggedIn ? (
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
            <span>트윗추가</span>
          </div>
          <div
            className="flex flex-col items-center justify-between gap-1 font-medium text-white cursor-pointer"
            onClick={() => router.push(ROUTE_PATH.MY_PROFILE)}
          >
            <AiOutlineUser className=" stroke-beige1 fill-beige1" size={25} strokeWidth={40} />
            <span>마이페이지</span>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
