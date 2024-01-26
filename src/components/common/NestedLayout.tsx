import { parameterToString } from '@/libs/client';
import Link from 'next/link';

export type Navigation = { href: string; isCurrentPath: boolean; title: string };

const NestedLayout = ({ children, navigation }: React.PropsWithChildren<{ navigation: Navigation[] }>) => {
  return (
    <>
      <div className="absolute left-0 z-10 flex justify-around w-full pt-3 text-lg text-center top-14 bg-beige0 ">
        {navigation.map(nav => (
          <Link
            className={parameterToString(
              nav.isCurrentPath ? 'font-bold text-orange-800' : 'text-stone-400',
              'border-b-2 w-full'
            )}
            href={nav.href}
            key={nav.title}
          >
            {nav.title}
          </Link>
        ))}
      </div>
      {children}
    </>
  );
};

NestedLayout.displayName = 'NestedLayout';

export default NestedLayout;
