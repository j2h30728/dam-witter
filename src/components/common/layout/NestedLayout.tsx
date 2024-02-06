import { parameterToString } from '@/libs/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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

    useIsomorphicLayoutEffect(() => {
      const currentRef = containerRef.current;
      return () => {
        if (currentRef) currentRef.scrollTop = 0;
      };
    }, [router.query]);

    return (
      <>
        <nav className="fixed z-10 flex justify-around w-full max-w-xl pt-3 text-lg text-center top-14 bg-beige0 ">
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
            'h-[calc(100vh-8rem)] px-2 overflow-y-auto overflow-x-hidden',
            navigation?.length ? '  pt-10' : ''
          )}
          ref={containerRef}
        >
          {children}
        </div>
      </>
    );
  }
);
NestedLayout.displayName = 'NestedLayout';

export default NestedLayout;
