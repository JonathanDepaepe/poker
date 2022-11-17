import {NavProfile} from "../../components/navigation/navProfile";
import {NavTop} from "../../components/navigation/navTop";
import Head from "next/head";
import React from "react";

export default function Home() {
    return (
        <>
            <Head>
                <title>Poker Manager | Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavProfile/>

                <main className="p-4 w-100">

                </main>
            </div>
        </>
    )
}