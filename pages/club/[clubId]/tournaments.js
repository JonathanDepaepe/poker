import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";

import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import Popup from "reactjs-popup";
import Image from "next/image";
import {useIntl} from "react-intl";


export default function Home() {
    const intl = useIntl();
    const router = useRouter();
    const {clubId} = router.query;
    const [user, setUser] = useState(false);
    const [tournaments, setTournaments] = useState();
    const [tournament, setTournament] = useState();
    const [club, setClub] = useState();
    const [error, setError] = useState(null);
    const [leaveButton, setLeaveButton] = useState(false);
    const [clubLeagues, setClubLeagues] = useState([]);
    const [tournamentEnded, setTournamentEnded] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [hasCurrentTour, setHasCurrentTour] = useState();
    const [hasEndedTour, setHasEndedTour] = useState();
    const [maxPlayers, setMaxPlayers] = useState(5);


    let position = 0;
    const closeModal = () => {setOpen(false); setOpenCreate() };
    const changeValue = (e) => {setMaxPlayers(e.target.value) }
    useEffect(() => {
        const href = window.location.href.split('/');
        const clubId = href[href.length - 2];
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                loadClubTournaments(fetchUser, clubId);
                loadLeagues(fetchUser, clubId);
                fetch('/api/club/' + clubId, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: fetchUser
                    })
                }).then((res) => res.json())
                    .then((data) => {
                        let joinedClubs = [];
                        for (const element of fetchUser.user.clubs) {
                            joinedClubs.push(element.clubId);
                        }
                        data[0].joined = joinedClubs.includes(data[0].clubId)
                        setClub(data[0]);
                    })
            })
    }, [])

    const loadLeagues = (user, clubId) => {
        fetch(`/api/club/${clubId}/leagues`, {headers: {'Authorization': "Bearer " + user.user.token}})
            .then((res) => res.json())
            .then((fetchLeagues) => {
                console.log(fetchLeagues)
                setClubLeagues(fetchLeagues.sort(function (a,b){return a.name.localeCompare(b.name)}))
                if (fetchLeagues.length === 0){

                }
            })
    }

    const loadClubTournaments = (user, clubId) => {
        fetch(`/api/club/${clubId}/tournaments`, {headers: {'Authorization': "Bearer " + user.user.token}})
            .then((res) => res.json())
            .then((fetchTournaments) => {
                setHasCurrentTour(false)
                setHasEndedTour(false)
                for (let tournament of fetchTournaments)
                    if (tournament.status !== 10) {
                        setHasCurrentTour(true)
                        for (let member of tournament.tournamentEntrys) {
                            if (member.memberId === user.user.memberId) {
                                tournament.leave = true
                            }
                        }
                    } else if(tournament.status === 10){
                        setHasEndedTour(true)
                    }
                setTournaments(fetchTournaments)
                console.log(fetchTournaments)
            })
    }

    const leaveTournament = async (e) => {
        await fetch(`/api/tournament/${e.target.id}/leave`, {
            headers: {'Authorization': "Bearer " + user.user.token},
            method: "delete",
            body: JSON.stringify({
                memberId: user.user.memberId,
                user
            })
        }).then((res) => {
            if (res.status === 200) {
                loadClubTournaments(user, clubId)
                loadTournament(e.target.id);
            }
        })
    }

    const joinTournament = async (e) => {
        await fetch(`/api/tournament/${e.target.id}/join`, {
            headers: {'Authorization': "Bearer " + user.user.token},
            method: "post",
            body: JSON.stringify({
                memberId: user.user.memberId,
                user
            })
        }).then((res) => {
            if (res.status === 201) {
                loadClubTournaments(user, clubId)
                loadTournament(e.target.id);
            }else if (res.status === 400){
                setError("You need to be in the club before you can join")
            }else{
                setError("Something went wrong, refresh page might help")
            }
        })
    }

    const loadTournament = async (tournamentID) => {
        await fetch('/api/tournament/' + tournamentID, {headers: {'Authorization': "Bearer " + user.user.token}})
            .then((res) => res.json())
            .then((tournament) => {
                setTournamentEnded(tournament[0].status === 10)
                if (tournament[0].status === 10) {
                    tournament[0].tournamentEntrys.sort(function (a, b) {
                        return b.points - a.points
                    });
                } else {
                    for (let member of tournament[0].tournamentEntrys) {
                        if (member.memberId === user.user.memberId) {
                            setLeaveButton(true)
                        }
                    }
                }
                position = 0;
                setTournament(tournament[0])
            })
    }

    const openTournament = async (e) => {
        setLeaveButton(false)
        setError(null)
        const tournamentID = parseInt(e.target.id)
        await loadTournament(tournamentID)
        setOpen(true)
    }

    const createTournament= async (e) => {
        //setIsCreating(true);
        e.preventDefault();
        const res = await fetch(`/api/club/${clubId}/tournaments`, {
            headers: {'Authorization': "Bearer " + user.user.token},
            method: "POST",
            body: JSON.stringify({
                memberId: user.user.memberId,
                name: e.target.name.value,
                leagueId: e.target.league.value,
                maxPlayers: e.target.players.value,
                date: e.target.date.value,
                place: e.target.place.value,
                isPrivate: e.target.isPrivate.checked
            })
        })
        if (res.status === 201){
            setIsCreating(false)
            setIsCreated(true)
            setTimeout(function () {
                setIsCreated(false)
                loadClubTournaments(user, clubId)
                setOpenCreate(false)
            }, 2000)
        }
    }

    return (
        <>
            <Head>
                <title>Poker Manager | Club Tournaments</title>
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
                            <button className="btn btn-primary bg-color-primary" onClick={() => setOpenCreate(o => !o)}>+
                                {intl.formatMessage({ id: "page.club.tournament.createTournament" })}
                            </button>)}
                    </div>

                    <Tabs
                        defaultActiveKey="now"
                        id="uncontrolled-tab-example"
                        className="mb-3 tab-layout"
                    >
                        <Tab eventKey="now" title={intl.formatMessage({ id: "table.now" })}>
                            {hasCurrentTour === true &&(
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">{intl.formatMessage({ id: "table.name" })}</th>
                                    <th scope="col">{intl.formatMessage({ id: "table.date" })}</th>
                                    <th scope="col">{intl.formatMessage({ id: "table.place" })}</th>
                                    <th className={"text-center"} scope="col">{intl.formatMessage({ id: "table.attendees" })}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tournaments?.map((tournament) => (
                                    tournament.status !== 10 && (
                                        <tr>
                                            <td className="w-10r">
                                                <button id={tournament.tournamentId} onClick={openTournament}
                                                        className={"btn btn-primary bg-color-primary me-2"}>{intl.formatMessage({ id: "table.view" })}
                                                </button>
                                                {club?.joined && (<>
                                                        {tournament.leave && (
                                                            <button id={tournament.tournamentId}
                                                                    onClick={leaveTournament}
                                                                    className={"btn btn-primary bg-color-red"}>Leave</button>)}
                                                        {!tournament.leave && (
                                                            <button id={tournament.tournamentId}
                                                                    onClick={joinTournament}
                                                                    className={"btn btn-primary bg-color-green"}>Join</button>)}
                                                    </>
                                                )}

                                            </td>
                                            <td className={""}>{tournament.name}</td>
                                            <td className={"mt-auto mb-auto align-middle"}>{new Date(tournament.startDateTime).toLocaleString("be", {
                                                dateStyle: "short",
                                                timeStyle: "short"
                                            })}</td>
                                            <td className={"mt-auto mb-auto align-middle"}>{tournament.location}</td>
                                            <td className={"mt-auto mb-auto text-center align-middle"}>{tournament.tournamentEntrys.length}/{tournament.maxPlayerCount}</td>
                                        </tr>)

                                ))}
                                </tbody>
                            </table>)}
                            {hasCurrentTour === false &&(<h6>{intl.formatMessage({ id: "error.tournament.noCurrent" })}</h6>)}
                        </Tab>
                        <Tab eventKey="ended" title={intl.formatMessage({ id: "table.ended" })}>
                            {hasEndedTour === true &&(
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">{intl.formatMessage({ id: "table.name" })}</th>
                                    <th scope="col">{intl.formatMessage({ id: "table.date" })}</th>
                                    <th scope="col">{intl.formatMessage({ id: "table.place" })}</th>
                                    <th className={"text-center"} scope="col">{intl.formatMessage({ id: "table.attendees" })}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tournaments?.map((tournament) => (
                                    tournament.status === 10 && (
                                        <tr>
                                            <td>
                                                <button id={tournament.tournamentId} onClick={openTournament}
                                                        className={"btn btn-primary bg-color-primary"}>{intl.formatMessage({ id: "table.view" })}
                                                </button>
                                            </td>
                                            <td className={""}>{tournament.name}</td>
                                            <td className={"mt-auto mb-auto align-middle"}>{new Date(tournament.startDateTime).toLocaleString("be", {
                                                dateStyle: "short",
                                                timeStyle: "short"
                                            })}</td>
                                            <td className={"mt-auto mb-auto align-middle"}>{tournament.location}</td>
                                            <td className={"mt-auto mb-auto text-center align-middle"}>{tournament.tournamentEntrys.length}/{tournament.maxPlayerCount}</td>
                                        </tr>)
                                ))}
                                </tbody>
                            </table>)}
                            {hasEndedTour === false &&(<h6>{intl.formatMessage({ id: "error.tournament.noEnded" })}</h6>)}
                        </Tab>

                    </Tabs>

                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className="tournament-popup bg-white border rounded-3">
                            <div className="modal-content p-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">{tournament?.name}</h5>
                                    <button onClick={() => setOpen(false)} type="button" className="btn-close"
                                            data-dismiss="modal" aria-label="Close"/>
                                </div>
                                <div className="modal-body">

                                    <header>
                                        <p>Club: {tournament?.club.name}</p>
                                        <p>League: <Link
                                            href={`/league/${tournament?.leagueId}`}>{tournament?.league.name}</Link>
                                        </p>
                                        <p>{intl.formatMessage({ id: "table.place" })}: {tournament?.location}</p>
                                        <p>{intl.formatMessage({ id: "table.date" })}: {new Date(tournament?.startDateTime).toLocaleString("be", {
                                            dateStyle: "short",
                                            timeStyle: "short"
                                        })}</p>
                                    </header>
                                    {tournamentEnded === false && (
                                        <>
                                            <p className="mb-2">{intl.formatMessage({ id: "page.club.members" })}:</p>
                                            <div className="d-flex flex-wrap ">
                                                {tournament?.tournamentEntrys.map((member) => (
                                                    <>
                                                        {member.info[0].memberId === user?.user.memberId && (
                                                            <div className="w-50">
                                                                <div className="w-75">
                                                                    <p className="ms-auto mt-2 fit-content h6 text-decoration-underline me-auto">{member.info[0].nickname} </p>
                                                                    <hr className="m-0 mt-2"/>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {member.info[0].memberId !== user?.user.memberId && (
                                                            <div className="w-50">
                                                                <div className="w-75">
                                                                    <p className="ms-auto mt-2 fit-content me-auto">{member.info[0].nickname} </p>
                                                                    <hr className="m-0 mt-2"/>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                ))}
                                            </div>
                                            {tournament?.tournamentEntrys.length === 0 && (
                                                <>
                                                    <p>There are no Attendees</p>
                                                </>
                                            )}
                                            <div className={"d-flex"}>
                                                {error !== null && (<p className="text-danger h6">{error}</p>)}

                                                {leaveButton && (<button onClick={leaveTournament}
                                                                         id={tournament?.tournamentId}
                                                                         className="btn btn-primary bg-color-red mt-2 ms-auto">Leave</button>)}
                                                {!leaveButton && (<button onClick={joinTournament}
                                                                          id={tournament?.tournamentId}
                                                                          className="btn btn-primary bg-color-green mt-2 ms-auto">Join</button>)}
                                            </div>
                                        </>
                                    )}

                                    {tournamentEnded === true && (<>
                                        <div className="mt-3 d-flex ms-auto me-auto fit-content">
                                            <div className="mt-5 me-3 d-flex flex-column"><Image
                                                className="ms-auto me-auto" src={"/images/icons/2ndPlace.png"}
                                                width={68}
                                                height={80} alt={"secondPlace"}/> <p
                                                className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[1].info[0].nickname}</p>
                                                <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[1].points} points</p>
                                            </div>
                                            <div className="me-3 d-flex flex-column"><Image className="ms-auto me-auto"
                                                                                            src={"/images/icons/1stPlace.png"}
                                                                                            width={68}
                                                                                            height={80}
                                                                                            alt={"firstPlace"}/><p
                                                className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[0].info[0].nickname}</p>
                                                <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[0].points} points</p>
                                            </div>
                                            <div className="mt-5 d-flex flex-column"><Image className="ms-auto me-auto"
                                                                                            src={"/images/icons/3thPlace.png"}
                                                                                            width={68}
                                                                                            height={80}
                                                                                            alt={"thirdPlace"}/><p
                                                className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[2].info[0].nickname}</p>
                                                <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[2].points} points</p>
                                            </div>
                                        </div>
                                        {tournament?.tournamentEntrys.map((member) => (
                                            <>
                                                {position++ >= 3 && (
                                                    <>
                                                        {member.info[0].memberId === user?.user.memberId && (
                                                            <>
                                                                <hr className="m-0 mt-2"/>
                                                                <div
                                                                    className="d-flex justify-content-between mt-2 ms-3 me-3">
                                                                    <p className="h6 text-decoration-underline"> {position}. {member.info[0].nickname} </p>
                                                                    <p
                                                                        className="text-gray">{member.points} points</p>
                                                                </div>
                                                            </>
                                                        )}
                                                        {member.info[0].memberId !== user?.user.memberId && (
                                                            <>
                                                                <hr className="m-0 mt-2"/>
                                                                <div
                                                                    className="d-flex justify-content-between mt-2 ms-3 me-3">
                                                                    <p> {position}. {member.info[0].nickname} </p> <p
                                                                    className="text-gray">{member.points} points</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ))}
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </Popup>

                    <Popup open={openCreate} closeOnDocumentClick onClose={closeModal}>
                        <div className="tournament-popup bg-white border rounded-3">
                            <div className="modal-content p-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create Tournament</h5>
                                    <button onClick={() => setOpenCreate(false)} type="button" className="btn-close"
                                            data-dismiss="modal" aria-label="Close"/>
                                </div>
                                <div className="modal-body">
                                    <form className="d-flex flex-column" onSubmit={createTournament}>
                                        <label className="form-label"  htmlFor="name">{intl.formatMessage({ id: "page.club.tournament.leagueName" })}:</label>
                                        <input className="form-control mb-1" required name="name" type="text" id="name"/>
                                        <label className="form-label"  htmlFor="players">{intl.formatMessage({ id: "page.club.tournament.maxPlayers" })}:</label>
                                        <div className="d-flex mb-1">
                                            <input required onChange={changeValue} type="range" className="w-100" step="1" value={maxPlayers} min="0" max="50" id="players"/>
                                            <p className="ms-2 bg-color-primary text-white ps-2 pe-2 rounded">{maxPlayers}</p>
                                        </div>
                                        <label className="form-label" htmlFor="date">{intl.formatMessage({ id: "page.club.tournament.date" })}:</label>
                                        <input required type="datetime-local" className="form-control mb-1" id="date"/>
                                        <label className="form-label" htmlFor="place">{intl.formatMessage({ id: "page.club.tournament.place" })}:</label>
                                        <input required type="text" className="form-control mb-1" id="place"/>
                                        <label className="form-label"  htmlFor="league">{intl.formatMessage({ id: "page.club.tournament.league" })}:</label>
                                        <select className="form-select" size="3" required name="league" id="league">
                                            {clubLeagues?.map((league)=> (<option value={league.leagueId}>{league.name}</option>))}
                                        </select>
                                        <div className="d-flex mt-2 form-switch ps-0">
                                            <label className="form-check-label" htmlFor="club-private">{intl.formatMessage({ id: "page.club.tournament.private" })}</label>
                                            <input  type="checkbox" className="ms-2 form-check-input" name="isPrivate"
                                                    id="club-private"/>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-between flex-nowrap">

                                            {!isCreating && !isCreated && clubLeagues?.length !== 0 &&(<button type="submit"
                                                                                   className="btn btn-primary bg-color-primary">{intl.formatMessage({ id: "page.club.tournament.create" })}</button>)}
                                            {!isCreating && !isCreated && clubLeagues?.length === 0 && (<> <p className="text-danger">{intl.formatMessage({ id: "error.tournament.noLeagues" })}</p> <button type="submit"
                                                                                   className={"btn btn-primary bg-color-primary disabled"}>{intl.formatMessage({ id: "page.club.tournament.create" })}</button></>)}
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

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
            </div>
        </>
    )
}