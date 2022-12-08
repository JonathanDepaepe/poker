import {NavClub} from "../../components/navigation/navClub";
import {NavTop} from "../../components/navigation/navTop";
import React from 'react';

import Head from "next/head";
import Image from "next/image";


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
                <NavClub/>

                <main className="p-4 w-100">
                    <h2>Members</h2>
                    <article className={'d-flex flex-wrap'}>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>
                        <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                            <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                            <h4 className={"text-center"}>Username</h4>
                            <p className={"text-center"}>Member</p>
                        </section>



                    </article>

                    <p className={"total-members pe-3"}>Total Members: 10</p>
                </main>
            </div>
        </>
    )
}