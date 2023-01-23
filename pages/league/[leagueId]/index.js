import {NavLeague} from "../../../components/navigation/navLeague";
import {NavTop} from "../../../components/navigation/navTop";

import Head from "next/head";
import React, {useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from "next/image";
import Popup from "reactjs-popup";


export default function Index() {
    const [user, setUser] = useState();
    const [league, setLeague] = useState();
    const [open, setOpen] = useState(false);
    const [tournament, setTournament] = useState();
    const [tournamentEnded, setTournamentEnded] = useState(false);
    const [error, setError] = useState(null);
    const [leaveButton, setLeaveButton] = useState(false);
    let position = 0;
    const closeModal = () => setOpen(false);
    useEffect(() => {
        const href = window.location.href.split('/');
        const leagueID = href[href.length - 1]
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                fetch('/api/league/' + leagueID, {headers: {'Authorization': "Bearer " + fetchUser.user.token}})
                    .then((res) => res.json())
                    .then((league) => {
                        console.log(league)
                        setLeague(league[0])
                    })
            })
    }, [])


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
                loadTournament(e.target.id);
                setLeaveButton(false)
            }
        })
    }

    const openTournament = async (e) => {
        setLeaveButton(false)
        setError(null)
        const tournamentID = parseInt(e.target.id)
        await loadTournament(tournamentID)
        setOpen(true)
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
                }else{
                    for (let member of tournament[0].tournamentEntrys) {
                        if (member.memberId === user.user.memberId) {
                            setLeaveButton(true)
                        }
                    }
                }
                position = 0;
                setTournament(tournament[0])
                console.log(tournament[0])
                setOpen(true)
            })

    }

    return (
        <>
            <Head>
                <title>Poker Manager | league</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <NavTop/>

            <div className={"d-flex bg-white"}>
                <main className="ms-auto w-50 me-auto">
                    <header className="d-flex justify-content-between mt-4">
                        <div className="d-flex ">
                            {league?.club.pictureUrl[0] === "/" ? (
                                    <Image className="img-thumbnail img-club-profile" alt="Club Image" width={700}
                                           height={400}
                                           src={league?.club.pictureUrl}/>)
                                : (<Image className="img-thumbnail img-club-profile" alt="Club Image" width={700}
                                          height={400}
                                          src="/images/placeholder.png"/>)
                            }

                            <div className=" ms-3">
                                <h3>{league?.name}</h3>
                                <p className="m-0 ms-1 w-50">{league?.description}</p>
                                <div className="d-flex  mt-2"><p className="">Club: </p> <p
                                    className=" ms-1">{league?.club.name}</p></div>
                            </div>
                        </div>
                        <h5 className=" mt-auto mb-auto border border-success p-2 rounded text-success">Active</h5>
                    </header>

                    <h4 className="mt-4">Tournaments:</h4>
                    <hr/>
                    <div className="w-90 ms-auto me-auto">
                        <Tabs
                            defaultActiveKey="now"
                            id="uncontrolled-tab-example"
                            className="mb-3 w tab-layout"
                        >
                            <Tab eventKey="now" title="Now">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th>Name</th>
                                        <th className="text-center">Date</th>
                                        <th>Place</th>
                                        <th className={"text-center"} scope="col">Attendees</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {league?.tournaments.map((tournament) => (
                                        <>
                                            {tournament.status !== 10 && (
                                                <tr>
                                                    <td>
                                                        <button id={tournament.tournamentId} onClick={openTournament}
                                                                className={"btn btn-primary bg-color-primary"}>View
                                                        </button>
                                                    </td>
                                                    <td className={"align-middle"}>{tournament.name}</td>
                                                    <td className={"text-center align-middle"}>{new Date(tournament.startDateTime).toLocaleString("be", {
                                                        dateStyle: "short",
                                                        timeStyle: "short"
                                                    })}</td>
                                                    <td className={"align-middle"}>{tournament.location}</td>
                                                    <td className={"text-center align-middle"}>{tournament.tournamentEntrys.length}</td>
                                                </tr>
                                            )}
                                        </>
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
                                    {league?.tournaments.map((tournament) => (
                                        <>
                                            {tournament.status === 10 && (
                                                <tr>
                                                    <td>
                                                        <button id={tournament.tournamentId} onClick={openTournament}
                                                                className={"btn btn-primary bg-color-primary"}>View
                                                        </button>
                                                    </td>
                                                    <td className={"align-middle"}>{tournament.name}</td>
                                                    <td className={"text-center align-middle"}>{new Date(tournament.startDateTime).toLocaleString("be", {
                                                        dateStyle: "short",
                                                        timeStyle: "short"
                                                    })}</td>
                                                    <td className={"align-middle"}>{tournament.location}</td>
                                                    <td className={"text-center align-middle"}>{tournament.tournamentEntrys.length}</td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                    </tbody>
                                </table>
                            </Tab>
                        </Tabs>
                    </div>
                </main>
            </div>
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
                                <p>Host: {tournament?.club.name}</p>
                                <p>Place: {tournament?.location}</p>
                                <p>Date: {new Date(tournament?.startDateTime).toLocaleString("be", {
                                    dateStyle: "short",
                                    timeStyle: "short"
                                })}</p>
                            </header>
                            {tournamentEnded === false && (
                                <>
                                    <p className="mb-2">Attendees:</p>
                                    <div className="d-flex flex-wrap ">
                                    {tournament?.tournamentEntrys.map((member) => (
                                        <>
                                                <div className="w-50">
                                                    <div className="w-75">
                                                        <p className="ms-auto mt-2 fit-content me-auto">{member.info[0].nickname} </p>
                                                        <hr className="m-0 mt-2" />
                                                    </div>
                                                </div>

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
                                    <div className="mt-5 me-3"><Image src={"/images/icons/2ndPlace.png"} width={68}
                                                                      height={80} alt={"secondPlace"}/> <p
                                        className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[1].info[0].nickname}</p>
                                        <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[1].points} points</p>
                                    </div>
                                    <div className="me-3"><Image src={"/images/icons/1stPlace.png"} width={68}
                                                                 height={80} alt={"firstPlace"}/><p
                                        className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[0].info[0].nickname}</p>
                                        <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[0].points} points</p>
                                    </div>
                                    <div className="mt-5"><Image src={"/images/icons/3thPlace.png"} width={68}
                                                                 height={80} alt={"thirdPlace"}/><p
                                        className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[2].info[0].nickname}</p>
                                        <p className="m-0 fit-content ms-auto me-auto">{tournament?.tournamentEntrys[2].points} points</p>
                                    </div>
                                </div>
                                {tournament?.tournamentEntrys.map((member) => (
                                    <>
                                        {position++ >= 3 && (
                                            <>
                                                <hr className="m-0 mt-2"/>
                                                <div className="d-flex justify-content-between mt-2 ms-3 me-3">
                                                    <p> {position + 1}. {member.info[0].nickname} </p> <p
                                                    className="text-gray">{member.points} points</p></div>
                                            </>
                                        )}
                                    </>
                                ))}
                            </>)}
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}