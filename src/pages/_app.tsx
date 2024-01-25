import type { AppProps } from 'next/app';

import { getFetcher } from '@/api/fetchers';
import DefaultErrorBoundary from '@/components/common/DefaultErrorBoundary';
import { toastMessage } from '@/libs/client/toastMessage';
import '@/styles/globals.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
        <ToastContainer />
      </ErrorBoundary>
    </SWRConfig>
  );
}
