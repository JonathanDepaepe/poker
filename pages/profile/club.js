import {NavProfile} from "../../components/navigation/navProfile";
import {NavTop} from "../../components/navigation/navTop";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useIntl} from "react-intl";

export default function Home() {
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [clubs, setClubs] = useState();
    const intl = useIntl();

    useEffect(() => {
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                setLoading(false)

                fetch('/api/profile/club', {
                    method: "POST",
                    body: JSON.stringify({
                        User: fetchUser
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        for (const element of data) {
                            if (element.pictureUrl[0] !== "/" && element.pictureUrl[0] !== "h"){
                                element.image = "/static/placeholder.png"
                            }else{
                                element.image = element.pictureUrl
                            }
                        }
                        data.length === 0?
                            setClubs(null):setClubs(data)
                        setLoading(false)
                    })
            })
    }, [])

    return (
        <>
            <Head>
                <title>Poker Manager | Profile Clubs</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavProfile/>
                <main className="p-4 w-100">
                    {isLoading && (<h5>Clubs Are loading ...</h5>)}
                    <article className="d-flex mt-4 flex-wrap">
                        {clubs?.map((club) => (
                            <section className="card m-2 shadow">
                                <img className="card-img-top" width={300} height={150} src={club.image}
                                     alt="placeholder"/>
                                <div className="card-body text-center d-flex flex-column justify-content-between">
                                    <div>
                                    <h3 className="card-title">{club.name}</h3>
                                    <p className="text-gray">{club.totalMembers} Members</p>
                                    </div>
                                    <Link
                                        className={"text-decoration-none text-white ms-auto me-auto btn btn-primary w-75 mt-2 bg-color-primary"}
                                        href={"/club/" + club.clubId} >info</Link>
                                </div>
                            </section>
                        ))}

                    </article>
                    {isLoading === false && clubs === null && (<h5>You didn't joined any clubs, You can join clubs! <Link className={"text-decoration-none text-decoration-underline text-black"} href={"/club"}>here</Link></h5>)}
                </main>
            </div>
        </>
    )
}