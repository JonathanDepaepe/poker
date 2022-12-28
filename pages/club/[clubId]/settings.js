import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useState} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import Head from "next/head";
import Link from "next/link";
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
                    <Tabs
                        defaultActiveKey="club"
                        id="uncontrolled-tab-example"
                        className="mb-3 tab-layout"
                    >
                        <Tab eventKey="club" title="Club">
                            <div className="card-body">
                                <Image className={"img-thumbnail img-club-profile"} src={"/images/placeholder.png"}
                                       width={700} height={400} alt={"Club logo"}/>
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <button className="btn btn-primary bg-color-primary" type="button">Upload new image
                                </button>
                            </div>
                            <form>
                                <div className="form-group mt-3">
                                    <label htmlFor="clubName">Club Name:</label>
                                    <input type="text" className="form-control w-50 mb-2" id="clubName"
                                           aria-describedby="clubName" placeholder="Enter club name"/>
                                </div>
                                <button type="submit" className="btn btn-primary bg-color-primary">Submit</button>
                            </form>

                        </Tab>
                        <Tab eventKey="news" title="News">
                            <div className="d-flex">
                                <div className="w-50">
                                    <h3>Create News</h3>
                                    <form action="club">
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" className="form-control w-75  mb-2"
                                               placeholder={"enter title"}/>
                                        <label htmlFor="description">Description:</label>
                                        <textarea className="form-control mb-2 w-75" id="description"
                                                  rows="3"></textarea>
                                        <button type="submit" className="btn btn-primary bg-color-primary">create
                                        </button>
                                    </form>
                                </div>
                                <div className="w-50">
                                    <h3>Recent News</h3>
                                    <article>
                                        <section>
                                            <div className={"d-flex justify-content-between"}><h4>Lorum Ipsum</h4><Image
                                                className={"mt-auto mb-auto"} src="/images/icons/trah-icon.svg"
                                                alt="trash"
                                                width={15} height={15}/></div>

                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue
                                                odio
                                                elementum, tristique urna fermentum, rutrum metus.</p>
                                        </section>
                                        <section>
                                            <div className={"d-flex justify-content-between"}><h4>Lorum Ipsum</h4><Image
                                                className={"mt-auto mb-auto"} src="/images/icons/trah-icon.svg"
                                                alt="trash"
                                                width={15} height={15}/></div>

                                            <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue
                                                odio
                                                elementum, tristique urna fermentum, rutrum metus. Class aptent taciti
                                                sociosqu ad litora torquent per conubia nostra, per inceptos
                                                himenaeos.</p>
                                        </section>
                                        <section>
                                            <div className={"d-flex justify-content-between"}><h4>Lorum Ipsum</h4><Image
                                                className={"mt-auto mb-auto"} src="/images/icons/trah-icon.svg"
                                                alt="trash"
                                                width={15} height={15}/></div>

                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue
                                                odio
                                                elementum, tristique urna fermentum, rutrum metus.</p>
                                        </section>
                                        <section>
                                            <div className={"d-flex justify-content-between"}><h4>Lorum Ipsum</h4><Image
                                                className={"mt-auto mb-auto"} src="/images/icons/trah-icon.svg"
                                                alt="trash"
                                                width={15} height={15}/></div>

                                            <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue
                                                odio
                                                elementum, tristique urna fermentum, rutrum metus. Class aptent taciti
                                                sociosqu ad litora torquent per conubia nostra, per inceptos
                                                himenaeos.</p>
                                        </section>
                                    </article>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="subscription" title="Subscription">
                            <article className="d-flex justify-content-around mt-5">
                                <section className="card text-center">
                                    <h3 className="card-header">Free</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>1 Tournament/month</li>
                                        <li>27 Max Players</li>
                                    </ul>
                                    <button disabled="true" className="btn btn-primary bg-color-primary card-footer">Current
                                    </button>
                                </section>
                                <section className="card text-center">
                                    <h3 className="card-header">Tier 10</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>coming soon...</li>
                                    </ul>
                                    <button disabled="true" className="btn btn-primary bg-color-primary card-footer">soon..</button>
                                </section>
                                <section className="card text-center">
                                    <h3 className="card-header">Tier 50</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>coming soon...</li>
                                    </ul>
                                    <button disabled="true" className="btn btn-primary bg-color-primary card-footer">soon..</button>
                                </section>
                                <section className="card text-center">
                                    <h3 className="card-header">Tier 100</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>coming soon...</li>
                                    </ul>
                                    <button disabled="true" className="btn btn-primary bg-color-primary card-footer">soon..</button>
                                </section>
                            </article>
                        </Tab>

                    </Tabs>

                </main>

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
            </div>
        </>
    )
}