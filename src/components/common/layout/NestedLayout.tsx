import { parameterToString } from '@/libs/client';
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

    const handleNavigation = async (href: string) => {
      await router.push(href);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    };

    return (
      <>
        <nav className="fixed z-10 flex justify-around w-full max-w-xl pt-3 text-lg text-center top-14 bg-beige0 ">
          {navigation?.map(nav => (
            <div
              className={parameterToString(
                nav.isCurrentPath ? 'font-bold text-orange-800' : 'text-stone-400',
                'border-b-2 w-full',
                'cursor-pointer'
              )}
              key={nav.title}
              onClick={() => handleNavigation(nav.href)}
            >
              {nav.title}
            </div>
          ))}
        </nav>
        <div className=" h-[calc(100vh-8rem)] pt-10 px-2 overflow-y-auto overflow-x-hidden" ref={containerRef}>
          {children}
        </div>
      </>
    );
  }
);
NestedLayout.displayName = 'NestedLayout';

export default NestedLayout;
