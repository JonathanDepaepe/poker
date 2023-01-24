import 'bootstrap/dist/css/bootstrap.css';

import '../styles/globals.css';
import '../styles/style.css';
import '../styles/mobile.css';
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {SWRConfig} from 'swr'

import {useRouter} from "next/router";
import {IntlProvider} from "react-intl";
import en from "../lang/en.json";
import nl from "../lang/nl.json";

config.autoAddCss = false

const messages = {
    en,
    nl
};

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    let {locale} = useRouter();
    if (locale === undefined) {
        locale = "en"
    }

    return (
        <SWRConfig
            value={{
                fetcher: fetch,
                onError: (err) => {
                    console.error(err)
                },
            }}
        >
            <IntlProvider locale={locale} messages={messages[locale]}>
                    <Component {...pageProps} />
            </IntlProvider>
        </SWRConfig>
    );
}

export default MyApp;
