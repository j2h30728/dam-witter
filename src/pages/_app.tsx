import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { getFetcher } from '@/api/fetchers';
import DefaultErrorBoundary from '@/components/common/DefaultErrorBoundary';
import { toastMessage } from '@/libs/client/toastMessage';
import '@/styles/globals.css';
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

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <SWRConfig
      value={{
        fetcher: getFetcher,
        onError: (error: string) => toastMessage('error', error),
        refreshInterval: 1000 * 60,
        shouldRetryOnError: false,
      }}
    >
      <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </ErrorBoundary>
    </SWRConfig>
  );
}
