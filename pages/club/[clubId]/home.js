import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useEffect, useState} from 'react';
import Icon from '../../../public/images/icons/leagues-icon.svg';
import {useRouter} from 'next/router'

import Head from "next/head";
import Image from "next/image";

export default function Home() {
    const router = useRouter()
    const {clubId} = router.query;
    const [isClub, setClub] = useState();
    useEffect(() => {
        const href = window.location.href.split('/');
        const clubHref = href[href.length - 2]
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                fetch('/api/club/' + clubHref, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: fetchUser
                    })

                })
                    .then((res) => res.json())
                    .then((data) => {
                            if (data[0].pictureUrl[0] !== "/") {
                                data[0].pictureUrl = "/static/placeholder.png"
                            }

                        setClub(data[0]);
                    })
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
                    <div className={"d-flex"}>
                        <Image className={"img-thumbnail img-club-profile"} src={isClub?.pictureUrl} width={700}
                               height={400} alt={"Club logo"}/>
                        <div className={"ms-4"}>
                            <h2>{isClub?.name}</h2>
                            <p className={"text-gray"}>Owner: {isClub?.owner.nickname}</p>
                        </div>
                    </div>
                    <div className={"d-flex"}>
                        <div className={"w-50 m-2"}>
                            <h3>Planning</h3>
                            <hr/>
                            {isClub?.leagues.length === 0 && (
                                <p>The club does not have any planning.</p>
                            )}

                            {isClub?.leagues.length !== 0 && (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th className={"text-center"} scope="col">Type</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {isClub?.leagues.map((league) => (
                                        <tr>
                                            <td>league.name</td>
                                            <td>-</td>
                                            <td className={"text-center"}><Image src={"/images/icons/dark-leagues-icon.svg"}
                                                                                 width={20} height={20} alt={"tournament"}/>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            )}


                        </div>

                        <div className={"w-50 m-2"}>
                            <h3>News</h3>
                            <hr/>

                            {isClub?.announcements.length === 0 && (
                                <p>The club does not have any news.</p>

                            )}
                            {isClub?.announcements.length !== 0 && (
                                <>
                                    <article>
                                        <h5 className={""}>Lorum Ipsum</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue odio
                                            elementum, tristique urna fermentum, rutrum metus.</p>
                                    </article>
                                    <hr/>
                                </>
                            )}

                            {/*
                        */}

                        </div>


                    </div>

                </main>
            </div>
        </>
    )
}