import { TitleLogo } from '@/components';
import { ROUTE_PATH } from '@/constants';
import useRouteToPath from '@/hooks/common/useRouteToPath';

const DesktopMainLogo = () => {
  return (
    <div className="items-center hidden gap-5 cursor-pointer md:flex" onClick={useRouteToPath(ROUTE_PATH.HOME)}>
      <TitleLogo />
      <h1 className="text-4xl outline-text font-hanalei-fill text-symbol1">Dam-witter</h1>
    </div>
  );
};
export default DesktopMainLogo;
