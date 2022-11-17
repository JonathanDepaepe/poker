import {NavClub} from "../../components/navigation/navClub";
import {NavTop} from "../../components/navigation/navTop";
import React from 'react';
import Icon from '../../public/images/icons/leagues-icon.svg';

import Head from "next/head";
import Image from "next/image";

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
                    <div className={"d-flex"}>
                    <Image className={"img-thumbnail img-club-profile"} src={"/images/placeholder.png"} width={700} height={400} alt={"Club logo"} />
                        <div className={"ms-4"}>
                            <h2>CLUB NAME</h2>
                            <p className={"text-gray"}>Owner: OWNER NAME</p>
                        </div>
                    </div>
                <div className={"d-flex"}>
                    <div className={"w-50 m-2"}>
                        <h3>Planning</h3>
                        <hr/>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th className={"text-center"} scope="col">Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Lorum Ipsum</td>
                                <td>12/12/2022</td>
                                <td className={"text-center"}><Image src={"/images/icons/dark-tournaments-icon.svg"} className={""} width={20} height={20} alt={"tournament"}/></td>
                            </tr>
                            <tr>
                                <td>Lorum Ipsum</td>
                                <td>12/10-15/12</td>
                                <td className={"text-center"}><Image src={"/images/icons/dark-leagues-icon.svg"} width={20} height={20} alt={"tournament"}/></td>
                            </tr>
                            <tr>
                                <td>Lorum Ipsum</td>
                                <td>16/12/2022</td>
                                <td  className={"text-center"}><Image src={"/images/icons/dark-tournaments-icon.svg"} width={20} height={20} alt={"tournament"}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={"w-50 m-2"}>
                        <h3>News</h3>
                        <hr/>

                        <article>
                            <h5 className={""}>Lorum Ipsum</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue odio elementum, tristique urna fermentum, rutrum metus.</p>
                        </article>
                        <hr/>
                        <article>
                            <h5 className={""}>Lorum Ipsum</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue odio elementum, tristique urna fermentum, rutrum metus.</p>
                        </article>


                    </div>


                </div>

                </main>
            </div>
        </>
    )
}