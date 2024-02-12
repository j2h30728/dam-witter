import { parameterToString } from '@/libs/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export type Navigation = { href: string; isCurrentPath: boolean; title: string };

export interface NestedLayoutHandle {
  scrollToTop: () => void;
}

const NestedLayout = forwardRef<NestedLayoutHandle, React.PropsWithChildren<{ navigation?: Navigation[] }>>(
  ({ children, navigation }, ref) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        scrollToTop: () => {
          containerRef.current?.scrollTo({ behavior: 'smooth', top: 0 });
        },
      }),
      []
    );

    return (
      <div className="relative max-w-3xl mx-auto">
        <nav className="fixed z-20 flex justify-around w-full pt-3 text-lg text-center md:w-[calc(100vw-18rem)] md:max-w-3xl top-14 bg-beige0 ">
          {navigation?.map(nav => (
            <Link
              className={parameterToString(
                nav.isCurrentPath ? 'font-bold text-orange-800' : 'text-stone-400',
                'border-b-2 w-full',
                'cursor-pointer'
              )}
              href={nav.href}
              key={nav.title}
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        <div
          className={parameterToString(
            'h-[calc(100vh-8rem)] md:h-[calc(100vh-4em)]  px-2 overflow-y-auto overflow-x-hidden',
            navigation?.length ? '  pt-10' : ''
          )}
          key={router.pathname}
          ref={containerRef}
        >
          {children}
        </div>
      </div>
    );
  }
);
NestedLayout.displayName = 'NestedLayout';

export default NestedLayout;
