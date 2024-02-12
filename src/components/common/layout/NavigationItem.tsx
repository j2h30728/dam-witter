import useRouteToPath from '@/hooks/common/useRouteToPath';
import { parameterToString } from '@/libs/client';

const styles = {
  aside: 'flex-row  font-md gap-3',
  base: 'flex items-center text-white cursor-pointer',
  footer: 'flex-col font-sm gap-1',
};

const NavigationItem = ({
  navigate,
  symbol,
  title,
  type,
}: {
  navigate: string;
  symbol: React.ReactNode;
  title: string;
  type: 'aside' | 'footer';
}) => {
  return (
    <div
      className={parameterToString(type === 'aside' ? styles.aside : styles.footer, styles.base)}
      onClick={useRouteToPath(navigate)}
    >
      {symbol}
      <span>{title}</span>
    </div>
  );
};

export default NavigationItem;
