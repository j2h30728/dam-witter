import { ROUTE_PATH } from '@/constants';
import useRouteToPath from '@/hooks/common/useRouteToPath';

import Symbol from './Symbol';

const TitleLogo = () => {
  return <Symbol className="cursor-pointer" height={33} onClick={useRouteToPath(ROUTE_PATH.HOME)} width={33} />;
};

export default TitleLogo;
