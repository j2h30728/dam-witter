import useRouteToPath from '@/hooks/common/useRouteToPath';
import { parameterToString } from '@/libs/client';
import { useRouter } from 'next/router';

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
  navigate: (() => void) | string;
  symbol: React.ReactNode;
  title: string;
  type: 'aside' | 'footer';
}) => {
  const router = useRouter();
  const handleNavigate = () => {
    if (typeof navigate === 'string') {
      router.push(navigate);
    } else {
      navigate();
    }
  };
  return (
    <div
      className={parameterToString(type === 'aside' ? styles.aside : styles.footer, styles.base)}
      onClick={handleNavigate}
    >
      {symbol}
      <span>{title}</span>
    </div>
  );
};

export default NavigationItem;
