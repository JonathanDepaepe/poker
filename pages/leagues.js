import {NavTop} from "../components/navigation/navTop";
import Head from "next/head"
import React, {useEffect, useState} from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";
import {useIntl} from "react-intl";

export default function Home() {
    const intl = useIntl();
    const [leagues, setLeagues] = useState();
    const [hasCurrentLeagues, setHasCurrentLeagues] = useState();
    const [hasEndedLeagues, setHasEndedLeagues] = useState();

    useEffect( () => {
        fetch('/api/league')
            .then((res) => res.json())
            .then((fetchLeagues) => {
                setHasEndedLeagues(false)
                setHasCurrentLeagues(false)
                for (let league of fetchLeagues){
                    if (league.finished){
                        setHasEndedLeagues(true)
                    }else if (!league.finished){
                        setHasCurrentLeagues(true)
                    }
                }

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
                    <Tab eventKey="now" title={intl.formatMessage({ id: "table.now" })}>
                        {hasCurrentLeagues === true && (
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">{intl.formatMessage({ id: "table.name" })}</th>
                                <th scope="col">{intl.formatMessage({ id: "table.club" })}</th>
                            </tr>
                            </thead>
                            <tbody>{leagues?.map((league)=>(
                                <>
                                    {league.finished === false && (
                                <tr>
                                    <td><Link href={'/league/' + league.leagueId}> <button className={"btn btn-primary bg-color-primary"}>{intl.formatMessage({ id: "table.view" })}</button></Link></td>
                                    <td className={"mt-auto mb-auto align-middle"}>{league.name}</td>
                                    <td className={"mt-auto mb-auto align-middle"}><Link className={"text-black"} href={`/club/${league?.clubId}`}>{league.club.name}</Link></td>
                                </tr>
                                    )}
                                </>))}
                            </tbody>
                        </table> )}
                        {hasCurrentLeagues === false && (<h4>{intl.formatMessage({ id: "error.league.noCurrent" })}</h4>)}
                    </Tab>
                    <Tab eventKey="ended" title={intl.formatMessage({ id: "table.ended" })}>
                        {hasEndedLeagues === true && (
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">{intl.formatMessage({ id: "table.name" })}</th>
                                    <th scope="col">{intl.formatMessage({ id: "table.club" })}</th>
                                </tr>
                                </thead>
                                <tbody>{leagues?.map((league)=>(
                                    <>
                                        {league.finished === true && (
                                            <tr>
                                                <td><Link href={'/league/' + league.leagueId}> <button className={"btn btn-primary bg-color-primary"}> {intl.formatMessage({ id: "table.view" })}</button></Link></td>
                                                <td className={"mt-auto mb-auto align-middle"}>{league.name}</td>
                                                <td className={"mt-auto mb-auto align-middle"}><Link className={"text-black"} href={`/club/${league?.clubId}`}>{league.club.name}</Link></td>
                                            </tr>
                                        )}
                                    </>))}
                                </tbody>
                            </table>
                        )}
                        {hasEndedLeagues === false && (<h4>{intl.formatMessage({ id: "error.league.noEnded" })}</h4>)}

                    </Tab>

                </Tabs>

            </main>
        </>
    )
}
