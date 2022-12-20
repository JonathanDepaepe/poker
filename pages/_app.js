import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import '../styles/style.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
  );
}

export default MyApp;
