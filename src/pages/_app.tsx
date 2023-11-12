import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(response => response.json()),
        onError: (error: Error) => alert(error),
        refreshInterval: 1000 * 60,
      }}
    >
      <div className="w-full max-w-xl mx-auto bg-beige0">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
