import { parameterToString } from '@/libs/client';
import { useRouter } from 'next/router';

const styles = {
  aside: 'flex-row  font-md gap-3',
  base: 'flex items-center text-white cursor-pointer',
  footer: 'flex-col font-sm gap-1',
};

const Navigation = ({
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
  const router = useRouter();

  return (
    <div
      className={parameterToString(type === 'aside' ? styles.aside : styles.footer, styles.base)}
      onClick={() => router.push(navigate)}
    >
      {symbol}
      <span>{title}</span>
    </div>
  );
};

export default Navigation;
