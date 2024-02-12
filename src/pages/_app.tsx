import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { getFetcher } from '@/api/fetchers';
import DefaultErrorBoundary from '@/components/common/DefaultErrorBoundary';
import { toastMessage } from '@/libs/client/toastMessage';
import '@/styles/globals.css';
import { Hanalei_Fill } from 'next/font/google';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const hanaleiFill = Hanalei_Fill({ subsets: ['latin'], variable: '--font-hanalei-fill', weight: '400' });

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <SWRConfig
      value={{
        fetcher: getFetcher,
        onError: (error: Error) => toastMessage('error', error.message),
        refreshInterval: 1000 * 60,
        shouldRetryOnError: false,
      }}
    >
      <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
        <main className={`${hanaleiFill.variable} font-sans`}>{getLayout(<Component {...pageProps} />)}</main>
        <ToastContainer />
      </ErrorBoundary>
    </SWRConfig>
  );
}
