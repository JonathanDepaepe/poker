import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useEffect, useState} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import Head from "next/head";
import Link from "next/link";
import Popup from "reactjs-popup";
import {useRouter} from "next/router";


export default function Home() {
    const router = useRouter();
    const {clubId} =  router.query;
    const [leagues, setLeagues] = useState();
    const [user, setUser] = useState();
    const [club, setClub] = useState();
    const [open, setOpen] = useState(false);
    const [isCreating, setCreating] = useState(false);
    const [isCreated, setCreated] = useState(false);
    const closeModal = () => setOpen(false);
    useEffect(() => {
        const href = window.location.href.split('/');
        const clubHref = href[href.length - 2];
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                console.log(fetchUser)
                fetch('/api/club/' + clubHref, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: fetchUser
                    })
                }).then((res) => res.json()).then((fetchClub) => {
                        console.log(fetchClub[0])
                        setClub(fetchClub[0])
                    })
                loadLeagues(clubHref, fetchUser)
            })
    }, [])

    const loadLeagues = async (clubId, user) => {
        fetch(`/api/club/${clubId}/leagues`, {headers: {'Authorization': "Bearer " + user.user.token}})
            .then((res) => res.json())
            .then((fetchLeagues) => {
                console.log(fetchLeagues)
                setLeagues(fetchLeagues)
            })
    }

    const createLeague = async (e) => {
        setCreating(true)
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const isPrivate = e.target.private.checked;
        const res = await fetch(`/api/club/${clubId}/leagues`, {
            headers: {'Authorization': "Bearer " + user.user.token},
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                isPrivate
            })
        })
        if (res.status === 201){
            setCreating(false)
            setCreated(true)
            setTimeout(function () {
                setCreated(false)
                loadLeagues(clubId, user)
                setOpen(false)
            }, 2000)
        }
    }

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
                    <div className="mb-4">
                        {user?.isLoggedIn && user?.user.memberId === club?.ownerId && (
                            <button className="btn btn-primary bg-color-primary" onClick={() => setOpen(o => !o)}>+
                                Create League
                            </button>)}
                    </div>

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
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {leagues?.map((league) => (
                                    <>
                                        {league.finished === false && (
                                            <tr>
                                                <td><Link href={'/league/' + league.leagueId}>
                                                    <button className={"btn btn-primary bg-color-primary"}>View</button>
                                                </Link></td>
                                                <td className={"mt-auto mb-auto align-middle"}>{league.name}</td>
                                                <td className={"mt-auto mb-auto align-middle"}></td>
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
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {leagues?.map((league) => (
                                    <>
                                        {league.finished === true && (
                                            <tr>
                                                <td><Link href={'/league/' + league.leagueId}>
                                                    <button className={"btn btn-primary bg-color-primary"}>View</button>
                                                </Link></td>
                                                <td className={"mt-auto mb-auto align-middle"}>{league.name}</td>
                                                <td className={"mt-auto mb-auto align-middle"}></td>
                                            </tr>
                                        )}
                                    </>))}
                                </tbody>
                            </table>
                        </Tab>

                    </Tabs>

                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className="bg-white border rounded-3" role="document">
                            <div className="modal-content p-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create League</h5>
                                    <button onClick={() => setOpen(o => !o)} type="button" className="btn-close"
                                            data-dismiss="modal" aria-label="Close"/>
                                </div>
                                <div className="modal-body">
                                    <form className="d-flex flex-column" onSubmit={createLeague}>
                                        <label className="form-label"  htmlFor="name">League Name:</label>
                                        <input className="form-control" type="text" id="name"/>
                                        <label className="form-label" htmlFor="description">Description:</label>
                                        <textarea className="form-control" id="description" name="description" rows="2" cols="50"></textarea>
                                        <div className="d-flex mt-2 form-switch ps-0">
                                            <label className="form-check-label" htmlFor="club-private">Private</label>
                                            <input  type="checkbox" className="ms-2 form-check-input" name="private"
                                                   id="club-private"/>
                                        </div>
                                        <div className="modal-footer">
                                            {!isCreating && !isCreated && (<button type="submit"
                                                                                   className="btn btn-primary bg-color-primary">Create</button>)}
                                            {isCreating && !isCreated && (<button disabled={"true"} type="submit"
                                                                                  className="btn btn-primary bg-color-primary">Creating...</button>)}
                                            {!isCreating && isCreated && (<button disabled={"true"} type="submit"
                                                                                  className="btn btn-primary bg-color-green">Created</button>)}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </Popup>
                </main>
            </div>
        </>
    )
}