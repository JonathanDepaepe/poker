import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useState} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import Head from "next/head";
import Link from "next/link";


export default function Home() {
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
                                    <th scope="col">Date</th>
                                    <th scope="col">Place</th>
                                    <th className={"text-center"} scope="col">Attendees</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><Link className={"nav-link color-primary text-decoration-underline"} href={"#"}>Register</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                <tr>
                                    <td><Link className={"nav-link color-red text-decoration-underline"} href={"#"}>Leave</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                <tr>
                                    <td><Link className={"nav-link color-primary text-decoration-underline"} href={"#"}>Register</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                <tr>
                                    <td><Link className={"nav-link color-red text-decoration-underline"} href={"#"}>Leave</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>


                                </tbody>
                            </table>
                        </Tab>
                        <Tab eventKey="ended" title="Ended">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Place</th>
                                    <th className={"text-center"} scope="col">Attendees</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><Link className={"nav-link color-primary text-decoration-underline"} href={"#"}>Info</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                <tr>
                                    <td><Link className={"nav-link color-primary text-decoration-underline"} href={"#"}>Info</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                <tr>
                                    <td><Link className={"nav-link color-primary text-decoration-underline"} href={"#"}>Info</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                <tr>
                                    <td><Link className={"nav-link color-primary text-decoration-underline"} href={"#"}>Info</Link></td>
                                    <td>Lorum Ipsum</td>
                                    <td>12/12/2022</td>
                                    <td>RANDOM PLACE</td>
                                    <td className={"text-center"}>15</td>
                                </tr>
                                </tbody>
                            </table>
                        </Tab>

                    </Tabs>

                </main>

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
            </div>
        </>
    )
}