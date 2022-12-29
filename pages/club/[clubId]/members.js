import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useEffect, useState} from 'react';

import Head from "next/head";
import Image from "next/image";


export default function Home() {


    const [isMembers, setMembers] = useState();
    useEffect(() => {
        const href = window.location.href.split('/');
        console.log(href)
        const clubHref = href[href.length - 2]
                fetch('/api/club/' + clubHref + "/members", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setMembers(data);
                    })
    }, [])
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
                        {isMembers?.map((members)=>(
                            <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                                <Image className={"img-club-member m-auto"} src={"/images/logo.png"} width={100} height={100} alt={"profile"}/>
                                <h4 className={"text-center"}>{members.nickname}</h4>
                                <p className={"text-center"}>-</p>
                            </section>
                        ))}

                    </article>

                    <p className={"total-members pe-3"}>Total Members: {isMembers?.length}</p>
                </main>
            </div>
        </>
    )
}