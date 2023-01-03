import 'bootstrap/dist/css/bootstrap.css';

import '../styles/globals.css';
import '../styles/style.css';
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {SWRConfig} from 'swr'

import {useRouter} from "next/router";
import {IntlProvider} from "react-intl";
import en from "../lang/en.json";
import nl from "../lang/nl.json";

config.autoAddCss = false
import { createTheme, NextUIProvider } from "@nextui-org/react"

const messages = {
    en,
    nl
};

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    let {locale} = useRouter();
    console.log(locale)
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
                <NextUIProvider>
                    <Component {...pageProps} />
                </NextUIProvider>
            </IntlProvider>
        </SWRConfig>
    );
}

export default MyApp;
