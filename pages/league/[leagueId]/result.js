import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";


export default function Index() {
    const [league, setLeague] = useState();
    useEffect(() => {
        const href = window.location.href.split('/');
        const leagueID = href[href.length - 2]
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                fetch(`/api/league/${leagueID}/result`, {headers: {'Authorization': "Bearer " + fetchUser.user.token}})
                    .then((res) => res.json())
                    .then((league) => {
                        console.log(league[0])
                        setLeague(league[0])
                    })
            })
    }, [])
    return (
        <>
            <Head>
                <title>Poker Manager | League Result</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <div className={"d-flex bg-dark"}>
                <main className="result-table ms-auto w-75 me-auto">
                    <header className="d-flex border justify-content-between mt-3 p-1 rounded">
                        <Link className="text-decoration-none ms-2 me-2 d-flex " href="/">
                            <Image src="/images/logo.png" width={50} height={50} alt="logo"/>
                            <h3 className="text-white ms-2 height-fit-content mt-auto mb-auto">Poker Manager</h3>
                        </Link>
                        <h3 className="text-white mt-auto me-2 mb-auto">{league?.name}</h3>
                    </header>
                    <table className="table text-white">
                        <thead className="text-center">
                        <tr>
                            <th>Player</th>
                            {league?.tournaments.map((tournament) => (<th>{new Date(tournament.startDateTime).toLocaleString("be", {
                                day: 'numeric', month: 'numeric'
                            })}</th>))}
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {league?.totalsPlayers.map((player)=> (
                            <tr>
                                <td>{player.nickname}</td>
                                {player.tournaments.map((tournament)=> (
                                    <td>{tournament}</td>
                                ))}
                                <td>{player.total}</td>
                            </tr>
                                ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary bg-color-primary"  onClick={()=> {window.print();} }>Print</button>
                </main>
            </div>
        </>
    )
}