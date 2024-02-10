import { ROUTE_PATH } from '@/constants';
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineUser } from 'react-icons/ai';

import Navigation from './Navigation';

const MobileNavigation = () => {
  return (
    <nav className="fixed bottom-0 z-10 flex items-center justify-between w-full h-16 px-10 text-xs text-gray-700 border-t md:hidden border-beige3 bg-base2">
      <Navigation
        navigate={ROUTE_PATH.HOME}
        symbol={<AiOutlineHome className=" stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
        title="홈"
        type="footer"
      />
      <Navigation
        navigate={ROUTE_PATH.TWEETS + ROUTE_PATH.UPLOAD}
        symbol={<AiOutlinePlusCircle className=" stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
        title="트윗추가"
        type="footer"
      />
      <Navigation
        navigate={ROUTE_PATH.MY_PROFILE}
        symbol={<AiOutlineUser className=" stroke-beige2 fill-beige2 text-[30px]" strokeWidth={40} />}
        title="마이페이지"
        type="footer"
      />
    </nav>
  );
};

export default MobileNavigation;
