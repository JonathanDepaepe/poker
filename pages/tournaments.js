import {NavTop} from "../components/navigation/navTop";
import Head from "next/head"
import React, {useEffect, useState} from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";

export default function Home() {
    const [tournaments, setTournaments] = useState();
    useEffect( () => {
        fetch('/api/tournament')
            .then((res) => res.json())
            .then((fetchTournaments) => {
                for (let tour of fetchTournaments){
                    tour.date = new Date(tour.startDateTime).toLocaleString()
                }
                setTournaments(fetchTournaments)
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
                                <th scope="text-center">Name</th>
                                <th scope="text-center">Date</th>
                                <th scope="text-center ">Place</th>
                                <th className={"text-center"} scope="col">Attendees</th>
                            </tr>
                            </thead>
                            <tbody>{tournaments?.map((tournament)=>(
                                    tournament.ended === false && (
                                    <tr>
                                        <td><button className={"btn btn-primary bg-color-primary"}>View</button></td>
                                        <td className={"mt-auto mb-auto align-middle"}>{tournament.name}</td>
                                        <td className={"mt-auto mb-auto align-middle"}>{tournament.date}</td>
                                        <td className={"mt-auto mb-auto align-middle"}>{tournament.location}</td>
                                        <td className={"mt-auto mb-auto text-center align-middle"}>-/{tournament.maxPlayerCount}</td>
                                    </tr>)

                            ))}
                            </tbody>
                        </table>
                    </Tab>
                    <Tab eventKey="ended" title="Ended">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="text-center">Name</th>
                                <th scope="text-center">Date</th>
                                <th scope="text-center ">Place</th>
                                <th className={"text-center"} scope="col">Attendees</th>
                            </tr>
                            </thead>
                        <tbody>
                        {tournaments?.map((tournament)=>(
                            tournament.ended === true && (
                                <tr>
                                    <td><button className={"btn btn-primary bg-color-primary"}>View</button></td>
                                    <td className={"mt-auto mb-auto align-middle"}>{tournament.name}</td>
                                    <td className={"mt-auto mb-auto align-middle"}>{tournament.date}</td>
                                    <td className={"mt-auto mb-auto align-middle"}>{tournament.location}</td>
                                    <td className={"mt-auto mb-auto text-center align-middle"}>-</td>
                                </tr>)
                        ))}
                        </tbody>
                        </table>
                    </Tab>

                </Tabs>

            </main>
        </>
    )
}
