import {NavTop} from "../components/navigation/navTop";
import Head from "next/head"
import React, {useEffect, useState} from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";

export default function Home() {
    const [leagues, setLeagues] = useState();

    useEffect( () => {
        fetch('/api/league')
            .then((res) => res.json())
            .then((fetchLeagues) => {
                setLeagues(fetchLeagues)
            })
    }, [])
    return (
        <>
            <Head>
                <title>Poker Manager | Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>
            <main className="p-4 container">
                <Tabs
                    defaultActiveKey="now"
                    id="uncontrolled-tab-example"
                    className="mb-3 tab-layout"
                >
                    <Tab eventKey="now" title="Now">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Club</th>
                            </tr>
                            </thead>
                            <tbody>{leagues?.map((league)=>(
                                <>
                                    {league.finished !== 1 && (
                                <tr>
                                    <td><Link href={'/league/' + league.leagueId}> <button className={"btn btn-primary bg-color-primary"}>View</button></Link></td>
                                    <td className={"mt-auto mb-auto align-middle"}>{league.name}</td>
                                    <td className={"mt-auto mb-auto align-middle"}><Link className={"text-black"} href={`/club/${league?.clubId}`}>{league.club.name}</Link></td>
                                </tr>
                                    )}
                                </>))}
                            </tbody>
                        </table>
                    </Tab>
                    <Tab eventKey="ended" title="Ended">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Club</th>
                            </tr>
                            </thead>
                            <tbody>{leagues?.map((league)=>(
                                <>
                                    {league.finished === 1 && (
                                        <tr>
                                            <td><Link href={'/league/' + league.leagueId}> <button className={"btn btn-primary bg-color-primary"}> View</button></Link></td>
                                            <td className={"mt-auto mb-auto align-middle"}>{league.name}</td>
                                            <td className={"mt-auto mb-auto align-middle"}><Link className={"text-black"} href={`/club/${league?.clubId}`}>{league.club.name}</Link></td>
                                        </tr>
                                    )}
                                </>))}
                            </tbody>
                        </table>
                    </Tab>

                </Tabs>

            </main>
        </>
    )
}
