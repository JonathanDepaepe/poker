import Link from "next/link";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from 'next/router'
import {useEffect, useState} from "react";

export const NavClub = () => {
    const router = useRouter()
    const {clubId} = router.query;
    const [isUser, setUser] = useState();
    const [isClub, setClub] = useState();
    useEffect(() => {
        const href = window.location.href.split('/');
        const clubHref = href[href.length - 2]
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                if (!fetchUser.isLoggedIn){
                    router.push("/login")
                }
                fetch('/api/club/' + clubHref, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: fetchUser
                    })

                })
                    .then((res) => res.json())
                    .then((data) => {
                        let joinedClubs = [];
                            for (const element of fetchUser.user.clubs) {
                                joinedClubs.push(element.clubId);
                            }
                        data[0].joined = joinedClubs.includes(data[0].clubId)
                        console.log(data[0])
                        setClub(data[0]);
                    })
            })

    }, [])

    const onClubConnect = async (e) => {
        e.preventDefault();
        try {
            const clubInfo  = e.target.id.split(" ")
            const clubId = clubInfo[0];
            const type = clubInfo[1];
            let url = '';
            if (type === "join") {
                url = `/api/club/${clubId}/join`;
            } else if (type === "leave"){
                url = `/api/club/${clubId}/leave`;
            }
            await fetch(url, {
                body: JSON.stringify(isUser)
                ,
                method: 'POST',
            }).then(function (response) {
                if(response.status === 201){
                    router.reload()
                }
            })

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav>

            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
                 id="sidebar-wrapper" style={{width: '280px'}}>
                <div>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link href={`/club/${clubId}/home`} id="home" className="nav-link text-white" aria-current="page">
                                <Image className="bi pe-none me-2" width={16} height={16}
                                       src="/images/icons/club-icon.svg" alt="club icon"/>
                                Club
                            </Link>
                        </li>
                        <li>
                            <Link href={`/club/${clubId}/members`} id="club" className="nav-link text-white">
                                <Image src="/images/icons/members-icon.svg" className="bi pe-none me-2" width={16}
                                       height={16} alt="member icon"/>
                                Members
                            </Link>
                        </li>
                        <li>
                            <Link href={`/club/${clubId}/leagues`} id="leagues" className="nav-link text-white">
                                <Image src="/images/icons/leagues-icon.svg" alt="leagues icon"
                                       className="bi pe-none me-2" width={16} height={16}/>
                               Leagues
                            </Link>
                        </li>
                        <li>
                            <Link href={`/club/${clubId}/tournaments`} id="" className="nav-link text-white">
                                <Image src="/images/icons/tournaments-icon.svg" alt="leagues icon"
                                       className="bi pe-none me-2" width={16} height={16}/>
                                Tournaments
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li>
                            {isClub?.ownerId === isUser?.user?.memberId &&(
                                <Link href={`/club/${clubId}/settings`} id="settings" className="nav-link text-white">
                                    <Image className="bi pe-none me-2" width={16} height={16}
                                           src="/images/icons/setting-icon.svg" alt="setting icon"/>
                                    Settings
                                </Link>
                            )}

                        </li>
                        <li>
                            {isClub?.joined && (<button onClick={onClubConnect} id={isClub?.clubId + " leave"} className="nav-link color-red">

                                <FontAwesomeIcon className="color-red me-2" icon={faArrowRightFromBracket} />
                                Leave
                            </button>)}
                            {!isClub?.joined && (<button onClick={onClubConnect} id={isClub?.clubId + " join"} className="nav-link color-green">

                                <FontAwesomeIcon className="color-green me-2" icon={faArrowRightToBracket} />
                                Join
                            </button>)}
                        </li>
                    </ul>
                </div>
            </div>
            <a id="ham-icon" href="#">
                <Image src="/images/icons/hamburger.svg" width={16} height={16} alt="Hamburger icon"/>
            </a>
        </nav>

    )
}