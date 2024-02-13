import { ROUTE_PATH } from '@/constants';
import useRouteToPath from '@/hooks/common/useRouteToPath';
import { ProfileResponse } from '@/types';
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineUser } from 'react-icons/ai';
import { GiShadowFollower } from 'react-icons/gi';

import UserInformationItem from '../UserInformationItem';
import NavigationItem from './NavigationItem';

const DesktopSidebar = ({ loggedInUser }: { loggedInUser: ProfileResponse }) => {
  return (
    <nav className="fixed flex-col items-start justify-start hidden h-screen gap-5 pt-24 text-gray-700 md:flex w-72 text-md border-beige3 bg-base2">
      <div className="flex flex-col ml-8 gap-7">
        <NavigationItem
          navigate={ROUTE_PATH.HOME}
          symbol={<AiOutlineHome className=" stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
          title="홈"
          type="aside"
        />
        <NavigationItem
          navigate={ROUTE_PATH.MY_PROFILE}
          symbol={<AiOutlineUser className=" stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
          title="마이페이지"
          type="aside"
        />
        <NavigationItem
          navigate={ROUTE_PATH.FOLLOWERS(loggedInUser.id)}
          symbol={<GiShadowFollower className="-scale-100 stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
          title="팔로워 리스트"
          type="aside"
        />
        <NavigationItem
          navigate={ROUTE_PATH.FOLLOWING(loggedInUser.id)}
          symbol={<GiShadowFollower className=" stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
          title="팔로잉 리스트"
          type="aside"
        />
      </div>
      <div
        className="flex flex-row items-center self-center justify-center gap-3 py-2 mt-auto mb-2 cursor-pointer first-line: rounded-3xl w-60 text-act bg-active"
        onClick={useRouteToPath(ROUTE_PATH.TWEETS + ROUTE_PATH.UPLOAD)}
      >
        <AiOutlinePlusCircle className=" stroke-beige2 fill-beige2" size={25} strokeWidth={40} />
        <span className="text-white text-md">트윗추가</span>
      </div>
      <div
        className="flex-row items-center self-center justify-between mb-3 text-white cursor-pointer"
        onClick={useRouteToPath(ROUTE_PATH.MY_PROFILE)}
      >
        <UserInformationItem isLoggedInUser user={loggedInUser} />
      </div>
    </nav>
  );
};

export default DesktopSidebar;
