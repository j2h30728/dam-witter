import type { AppProps } from 'next/app';

import { toastMessage } from '@/libs/client/toastMessage';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(response => response.json()),
        onError: (error: string) => toastMessage('error', error),

        refreshInterval: 1000 * 60,
      }}
    >
      <div className="w-full max-w-xl mx-auto bg-beige0">
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </SWRConfig>
  );
}
