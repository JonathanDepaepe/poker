import {NavLeague} from "../../../components/navigation/navLeague";
import {NavTop} from "../../../components/navigation/navTop";

import Head from "next/head";


export default function Home() {
    return (
        <>
            <Head>
                <title>Poker Manager | Club</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavLeague/>
                <main>

                </main>
            </div>
        </>
    )
}