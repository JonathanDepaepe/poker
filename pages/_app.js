import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import '../styles/style.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SWRConfig } from 'swr'

config.autoAddCss = false
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SWRConfig
          value={{
              fetcher: fetch,
              onError: (err) => {
                  console.error(err)
              },
          }}
      >
     {/*// <SessionProvider session={session}>*/}
        <Component {...pageProps} />
     {/*</SessionProvider>*/}
      </SWRConfig>
  );
}

export default MyApp;
