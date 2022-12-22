import {NavProfile} from "../../components/navigation/navProfile";
import {NavTop} from "../../components/navigation/navTop";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import  {useState, useEffect} from 'react'

export default function Home() {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                console.log(data)
                setLoading(false)
            })
    }, [])

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
                    <div className="d-flex flex-wrap">
                        <div className="rounded-0 border-1 rounded-start">
                            <div className="card-body text-center">
                                <Image className="img-profile rounded-circle mb-2" width={100} height={100} src="/images/logo.png" alt="Profile picture" />
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <button className="btn btn-primary bg-color-primary" type="button">Upload new image</button>
                            </div>
                        </div>
                        <div className="rounded-0 w-75 ms-5 border-1 rounded-end">
                            <div className="card-body">
                                <form className="h-100">
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="form-username">Username</label>
                                        <input className="form-control" id="form-username" disabled={true} type="text" placeholder="Enter your username" defaultValue={user?.user.data.nickname} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="form-email">Email address</label>
                                        <input className="form-control" id="form-email" disabled={true} type="email" placeholder="Enter your email address" defaultValue={user?.user.data.email} />
                                    </div>
                                    <div className="d-flex justify-content-end ">
                                        <button className="btn btn-primary bg-color-primary" type="button">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <article className="d-flex flex-wrap justify-content-around">
                            <section className="bg-white border-1 shadow rounded achievement">
                                <p>Total</p>
                                <h3>0</h3>
                                <p>Wins</p>
                            </section>
                            <section className="bg-white border-1 shadow  rounded achievement">
                                <p>This month</p>
                                <h3>0</h3>
                                <p>Wins</p>
                            </section>
                            <section className="bg-white border-1 shadow  rounded achievement">
                                <p>Joined</p>
                                <h3>0</h3>
                                <p>Tournaments</p>
                            </section>
                        </article>
                    </div>
                </main>
            </div>
        </>
    )
}
