import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect} from "react";
import {useIntl} from "react-intl";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NavProfile = () => {
    const intl = useIntl();
    const router = useRouter();
    useEffect(() => {
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                if (!fetchUser.isLoggedIn){
                    router.push("/login")
                }})
    })
    return (
        <nav className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="" id="sidebar-wrapper">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                            <li className="nav-item">
                                <Link href="/profile" id="profile" className="nav-link text-white" aria-current="page">
                                    <Image className="bi pe-none me-2" width={16} height={16}
                                         src="/images/icons/profile-icon.svg" alt="profile icon"/>
                                    <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.navTop.profile" })}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile/club" id="club" className="nav-link text-white">
                                    <Image src="/images/icons/club-icon.svg" className="bi pe-none me-2" width={16}
                                         height={16} alt="club icon"/>
                                    <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.profile.my"})} Clubs</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile/tournaments" id="tournaments" className="nav-link text-white">
                                    <Image src="/images/icons/tournaments-icon.svg" alt="tournament icon"
                                         className="bi pe-none me-2" width={16} height={16}/>
                                    <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.profile.my"})} tournaments</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
                        <hr/>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                            <li>
                                <Link href="/profile/settings" id="settings" className="nav-link text-white">
                                    <Image className="bi pe-none me-2" width={16} height={16}
                                         src="/images/icons/setting-icon.svg" alt="setting icon"/>
                                    <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.profile.settings"})}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/api/auth/logout" id="logout" className="nav-link color-red"
                                      onClick={async (e) => {
                                          e.preventDefault()
                                          await fetch('/api/auth/logout', { method: 'POST' })
                                          router.push('/login')
                                      }}
                                >
                                    <FontAwesomeIcon className="color-red me-2" icon={faArrowRightFromBracket} />
                                    <span className="ms-1 d-none d-sm-inline">{intl.formatMessage({ id: "page.profile.logout"})}</span>

                                </Link>
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