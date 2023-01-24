import Link from "next/link";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket, faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {useIntl} from "react-intl";

export const NavClub = () => {
    const router = useRouter()
    const {clubId} = router.query;
    const [isUser, setUser] = useState();
    const [isClub, setClub] = useState();
    const intl = useIntl();
    useEffect(() => {
        const href = window.location.href.split('/');
        let clubHref;
        if (isNaN(parseInt(href[href.length - 1]))) {
            clubHref = href[href.length - 2]
        } else {
            clubHref = href[href.length - 1]
        }
        console.log(clubHref)
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                if (!fetchUser.isLoggedIn) {
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

                        setClub(data[0]);
                    })
            })

    }, [])

    const onClubConnect = async (e) => {
        e.preventDefault();
        try {
            const clubInfo = e.target.id.split(" ")
            const clubId = clubInfo[0];
            const type = clubInfo[1];
            let url = '';
            if (type === "join") {
                url = `/api/club/${clubId}/join`;
            } else if (type === "leave") {
                url = `/api/club/${clubId}/leave`;
            }
            await fetch(url, {
                body: JSON.stringify(isUser)
                ,
                method: 'POST',
            }).then(function (response) {
                if (response.status === 201) {
                    router.reload()
                }
            })

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div>
                <div className="align-items-center align-items-sm-start px-3 pt-2 text-white">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                        <li data-bs-toggle="collapse" className="nav-item px-0 align-middle">
                            <Link href={`/club/${clubId}`} id="home" className="nav-link text-white" aria-current="page">
                                <i><Image className="bi pe-none me-2" width={16} height={16}
                                          src="/images/icons/club-icon.svg" alt="club icon"/></i>
                                <span className="ms-1 d-none d-sm-inline">Club</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/club/${clubId}/members`} id="club" className="nav-link text-white">
                                <Image src="/images/icons/members-icon.svg" className="bi pe-none me-2" width={16}
                                       height={16} alt="member icon"/>
                                <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.club.members" })}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/club/${clubId}/leagues`} id="leagues" className="nav-link text-white">
                                <Image src="/images/icons/leagues-icon.svg" alt="leagues icon"
                                       className="bi pe-none me-2" width={16} height={16}/>
                                <span className="ms-1 d-none d-sm-inline">Leagues</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/club/${clubId}/tournaments`} id="" className="nav-link text-white">
                                <Image src="/images/icons/tournaments-icon.svg" alt="leagues icon"
                                       className="bi pe-none me-2" width={16} height={16}/>
                                <span className="ms-1 d-none d-sm-inline">Tournaments</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                        <li>
                            {isClub?.ownerId === isUser?.user?.memberId && isClub?.ownerId !== undefined &&(
                                <Link href={`/club/${clubId}/settings`} id="settings" className="nav-link text-white">
                                    <Image className="bi pe-none me-2" width={16} height={16}
                                           src="/images/icons/setting-icon.svg" alt="setting icon"/>
                                    <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.club.settings" })}</span>
                                </Link>
                            )}

                        </li>
                        <li>
                            {isClub?.joined && (<button onClick={onClubConnect} id={isClub?.clubId + " leave"} className="nav-link color-red">

                                <FontAwesomeIcon className="color-red me-2" icon={faArrowRightFromBracket} />
                                <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.club.leave" })}</span>
                            </button>)}
                            {isClub?.joined === false && (<button onClick={onClubConnect} id={isClub?.clubId + " join"} className="nav-link color-green">

                                <FontAwesomeIcon className="color-green me-2" icon={faArrowRightToBracket} />
                                <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.club.join" })}</span>
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