import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useEffect, useState} from 'react';

import Head from "next/head";
import Image from "next/image";
import {useIntl} from "react-intl";


export default function Home() {
    const intl = useIntl();
    const [isMembers, setMembers] = useState();
    useEffect(() => {
        const href = window.location.href.split('/');
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
                        for(let member of data){
                            if (member.profilePictureUrl[0] !== "/" && member.profilePictureUrl[0] !== "h"){
                                member.image = "/images/logo.png"
                            }else{
                                member.image = member.profilePictureUrl
                            }
                        }
                        setMembers(data);
                    })
    }, [])

    return (
        <>
            <Head>
                <title>Poker Manager | Club Members</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavClub/>

                <main className="p-4 w-100">
                    <h2>{intl.formatMessage({ id: "page.club.members" })}</h2>
                    <article className={'d-flex flex-wrap'}>
                        {isMembers?.map((members)=>(
                            <section className={'d-flex flex-column shadow rounded p-4 me-3 mb-3'}>
                                <img className={"img-club-member m-auto"} src={members.image} width={100} height={100} alt={"profile"}/>
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