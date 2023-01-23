import {NavProfile} from "../../components/navigation/navProfile";
import {NavTop} from "../../components/navigation/navTop";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Popup from "reactjs-popup";
import Link from "next/link";
import Image from "next/image";
import {useIntl} from "react-intl";

export default function Home() {
    const intl = useIntl();
    const [tournament, setTournament] = useState();
    const [tournaments, setTournaments] = useState();
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(false);
    const [leaveButton, setLeaveButton] = useState(false);
    const [tournamentEnded, setTournamentEnded] = useState(false);
    const [hasCurrentTour, setHasCurrentTour] = useState();
    const [hasEndedTour, setHasEndedTour] = useState();
    let position = 0;
    const closeModal = () => setOpen(false);
    useEffect(() => {
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                loadProfileTournaments(fetchUser)
            })
    }, [])

    const loadProfileTournaments = (user) =>{
        fetch(`/api/profile/tournaments?memberId=${user.user.memberId}`, {
            headers:{ 'Authorization': "Bearer " + user.user.token}
        })
            .then((res) => res.json())
            .then((fetchTournaments) => {
                setHasCurrentTour(false)
                setHasEndedTour(false)
                for (let tournament of fetchTournaments){
                    if (tournament.status !== 10){
                        setHasCurrentTour(true)
                    }else if(tournament.status === 10){
                        setHasEndedTour(true)
                    }
                }
                setTournaments(fetchTournaments)
            })
    }

    const leaveTournament = async (e) => {
        await fetch(`/api/tournament/${e.target.id}/leave`,{
            headers:{'Authorization': "Bearer " + user.user.token},
            method: "delete",
            body: JSON.stringify({
                memberId: user.user.memberId,
                user
            })
        }).then((res)=>{
            if (res.status === 200){
                setLeaveButton(false)
                loadProfileTournaments(user)
                loadTournament(e.target.id);
            }
        })
    }

    const joinTournament = async (e) =>{
        await fetch(`/api/tournament/${e.target.id}/join`,{
            headers:{'Authorization': "Bearer " + user.user.token},
            method: "post",
            body: JSON.stringify({
                memberId: user.user.memberId,
                user
            })
        }).then((res)=>{
            if (res.status === 201){
                loadProfileTournaments(user)
                loadTournament(e.target.id);
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
                                {tournaments?.map((tournament)=>(
                                    tournament.status !== 10 && (
                                        <tr>
                                            <td className="w-10r">
                                                <button id={tournament.tournamentId} onClick={openTournament} className={"btn btn-primary bg-color-primary me-2"}>{intl.formatMessage({ id: "table.view" })}</button>
                                                <button id={tournament.tournamentId} onClick={leaveTournament} className={"btn btn-primary bg-color-red"}>Leave</button>
                                            </td>
                                            <td  className={""}>{tournament.name}</td>
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
                                {tournaments?.map((tournament)=>(
                                    tournament.status === 10 && (
                                        <tr>
                                            <td>
                                                <button id={tournament.tournamentId} onClick={openTournament} className={"btn btn-primary bg-color-primary"}>{intl.formatMessage({ id: "table.view" })}</button>
                                            </td>
                                            <td  className={""}>{tournament.name}</td>
                                            <td className={"mt-auto mb-auto align-middle"}>{new Date(tournament.startDateTime).toLocaleString("be", {
                                                dateStyle: "short",
                                                timeStyle: "short"
                                            })}</td>
                                            <td className={"mt-auto mb-auto align-middle"}>{tournament.location}</td>
                                            <td className={"mt-auto mb-auto text-center align-middle"}>{tournament.tournamentEntrys.length}</td>
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
                                        <p>League: <Link href={`/league/${tournament?.leagueId}`}>{tournament?.league.name}</Link></p>
                                        <p>{intl.formatMessage({ id: "table.place" })}: {tournament?.location}</p>
                                        <p>{intl.formatMessage({ id: "table.date" })}: {new Date(tournament?.startDateTime).toLocaleString("be", {
                                            dateStyle: "short",
                                            timeStyle: "short"
                                        })}</p>
                                    </header>
                                    {tournamentEnded === false && (
                                        <>
                                            <p className="mb-2">{intl.formatMessage({ id: "table.attendees" })}:</p>
                                            <div className="d-flex flex-wrap ">
                                                {tournament?.tournamentEntrys.map((member) => (
                                                    <>
                                                        {member.info[0].memberId === user?.user.memberId &&(
                                                            <div className="w-50">
                                                                <div className="w-75">
                                                                    <p className="ms-auto mt-2 fit-content h6 text-decoration-underline me-auto">{member.info[0].nickname} </p>
                                                                    <hr className="m-0 mt-2" />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {member.info[0].memberId !== user?.user.memberId &&(
                                                            <div className="w-50">
                                                                <div className="w-75">
                                                                    <p className="ms-auto mt-2 fit-content me-auto">{member.info[0].nickname} </p>
                                                                    <hr className="m-0 mt-2" />
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
                                                { error !== null && (<p className="text-danger h6">{error}</p>)}
                                                { leaveButton && (<button onClick={leaveTournament} id={tournament?.tournamentId} className="btn btn-primary bg-color-red mt-2 ms-auto">Leave</button>)}
                                                { !leaveButton && (<button onClick={joinTournament} id={tournament?.tournamentId}  className="btn btn-primary bg-color-green mt-2 ms-auto">Join</button>)}
                                            </div>
                                        </>
                                    )}

                                    {tournamentEnded === true && (<>
                                        <div className="mt-3 d-flex ms-auto me-auto fit-content">
                                            <div className="mt-5 me-3 d-flex flex-column"><Image className="ms-auto me-auto" src={"/images/icons/2ndPlace.png"} width={68}
                                                                                                 height={80} alt={"secondPlace"}/> <p
                                                className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[1].info[0].nickname}</p>
                                                <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[1].points} points</p>
                                            </div>
                                            <div className="me-3 d-flex flex-column"><Image className="ms-auto me-auto" src={"/images/icons/1stPlace.png"} width={68}
                                                                                            height={80} alt={"firstPlace"}/><p
                                                className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[0].info[0].nickname}</p>
                                                <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[0].points} points</p>
                                            </div>
                                            <div className="mt-5 d-flex flex-column"><Image className="ms-auto me-auto" src={"/images/icons/3thPlace.png"} width={68}
                                                                                            height={80} alt={"thirdPlace"}/><p
                                                className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[2].info[0].nickname}</p>
                                                <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[2].points} points</p>
                                            </div>
                                        </div>
                                        {tournament?.tournamentEntrys.map((member) => (
                                            <>
                                                {position++ >= 3 && (
                                                    <>
                                                        {member.info[0].memberId === user?.user.memberId &&(
                                                            <>
                                                                <hr className="m-0 mt-2"/>
                                                                <div className="d-flex justify-content-between mt-2 ms-3 me-3">
                                                                    <p className="h6 text-decoration-underline"> {position}. {member.info[0].nickname} </p> <p
                                                                    className="text-gray">{member.points} points</p></div>
                                                            </>
                                                        )}
                                                        {member.info[0].memberId !== user?.user.memberId &&(
                                                            <>
                                                                <hr className="m-0 mt-2"/>
                                                                <div className="d-flex justify-content-between mt-2 ms-3 me-3">
                                                                    <p> {position}. {member.info[0].nickname} </p> <p
                                                                    className="text-gray">{member.points} points</p></div>
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
                </main>
            </div>
        </>
    )
}