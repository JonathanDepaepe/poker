import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import {useIntl} from "react-intl";
import Head from "next/head";
import Image from "next/image";

export default function Index() {
    const intl = useIntl();
    const [isClub, setClub] = useState();
    const [news, setNews] = useState([]);
    const [planning, setPlanning] = useState();
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

                }).then((res) => res.json()).then((data) => {
                    if (data[0].pictureUrl[0] !== "/" && data[0].pictureUrl[0] !== "h"){
                        data[0].image = "/static/placeholder.png"
                    }else{
                        data[0].image = data[0].pictureUrl;
                    }
                        console.log(data)
                        setClub(data[0]);
                    })

                fetch(`/api/club/${clubHref}/news`,{headers:{ 'Authorization': "Bearer " + fetchUser.user.token}})
                    .then((res) => res.json())
                    .then((data) => {
                        setNews(data)
                    })
                fetch(`/api/club/${clubHref}/planning`,{headers:{ 'Authorization': "Bearer " + fetchUser.user.token}})
                    .then((res) => res.json())
                    .then((data) => {
                        setPlanning(data)
                        console.log(data)
                    })
            })

    }, [])
    return (
        <>
            <Head>
                <title>Poker Manager | Club </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavClub/>

                <main className="p-4 w-100">
                    <div className={"d-flex flex-wrap"}>
                        <img className={"img-thumbnail img-club-profile"} src={isClub?.image} width={700}
                               height={400} alt={"Club logo"}/>
                        <div className={"ms-4"}>
                            <h2>{isClub?.name}</h2>
                            <p className={"text-gray"}>{intl.formatMessage({ id: "page.club.owner" })}: {isClub?.owner.nickname}</p>
                        </div>
                    </div>
                    <div className={"d-flex flex-wrap w-100"}>
                        <div className={"w-40 min-fit-content m-2"}>
                            <h3>{intl.formatMessage({ id: "page.club.planning" })}</h3>
                            <hr/>
                            {planning?.length === 0 && (
                                <p>{intl.formatMessage({ id: "error.club.noPlanning" })}</p>
                            )}

                            {planning?.length !== 0 && (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">{intl.formatMessage({ id: "table.name" })}</th>
                                        <th scope="col">{intl.formatMessage({ id: "table.date" })}</th>
                                        <th className={"text-center"} scope="col">{intl.formatMessage({ id: "table.type" })}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {planning?.map((plan) => (
                                        <tr>
                                            <td className="w-4r"></td>
                                            <td>{plan.name}</td>
                                            <td>{plan.date}</td>
                                            <td className={"text-center"}><Image src={"/images/icons/dark-"+plan.type+"-icon.svg"}
                                                                                 width={20} height={20} alt={plan.type}/>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            )}


                        </div>

                        <div className={"w-40 min-fit-content m-2 "}>
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