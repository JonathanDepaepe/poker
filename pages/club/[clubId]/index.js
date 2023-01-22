import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useEffect, useState} from 'react';
import Icon from '../../../public/images/icons/leagues-icon.svg';
import {useRouter} from 'next/router'

import {useIntl} from "react-intl";

import Head from "next/head";
import Image from "next/image";

export default function Index() {
    const intl = useIntl();
    const router = useRouter()
    const {clubId} = router.query;
    const [isClub, setClub] = useState();
    const [news, setNews] = useState([]);
    useEffect(() => {
        const href = window.location.href.split('/');
        const clubHref = href[href.length - 1]
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
                fetch(`/api/club/${clubHref}/news`,{headers:{ 'Authorization': "Bearer " + fetchUser.user.token}})
                    .then((res) => res.json())
                    .then((data) => {
                        setNews(data)
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
                            <p className={"text-gray"}>{intl.formatMessage({ id: "page.club.owner" })}: {isClub?.owner.nickname}</p>
                        </div>
                    </div>
                    <div className={"d-flex"}>
                        <div className={"w-50 m-2"}>
                            <h3>{intl.formatMessage({ id: "page.club.planning" })}</h3>
                            <hr/>
                            {isClub?.leagues.length === 0 && (
                                <p>{intl.formatMessage({ id: "error.club.noPlanning" })}</p>
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
                            <h3>{intl.formatMessage({ id: "page.club.news" })}</h3>
                            <hr/>

                            {news?.length === 0 && (
                                <p>{intl.formatMessage({ id: "error.club.noNews" })}</p>

                            )}
                            {news?.length !== 0 && (
                                news.map((newsArticle)=> (
                                    <>
                                        <article>
                                            <h5 className={""}>{newsArticle.title}</h5>
                                            <p>{newsArticle.description}</p>
                                        </article>
                                        <hr/>
                                    </>
                                ))

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