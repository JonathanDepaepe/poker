import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect} from "react";
import {useIntl} from "react-intl";

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
        <nav>
                <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
                     id="sidebar-wrapper" style={{width: '280px'}}>
                    <div>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link href="/profile/home" id="profile" className="nav-link text-white" aria-current="page">
                                    <Image className="bi pe-none me-2" width={16} height={16}
                                         src="/images/icons/profile-icon.svg" alt="profile icon"/>
                                    {intl.formatMessage({ id: "page.navTop.profile" })}
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile/club" id="club" className="nav-link text-white">
                                    <Image src="/images/icons/club-icon.svg" className="bi pe-none me-2" width={16}
                                         height={16} alt="club icon"/>
                                    {intl.formatMessage({ id: "page.profile.my"})} Clubs
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile/tournaments" id="tournaments" className="nav-link text-white">
                                    <Image src="/images/icons/tournaments-icon.svg" alt="tournament icon"
                                         className="bi pe-none me-2" width={16} height={16}/>
                                    {intl.formatMessage({ id: "page.profile.my"})} tournaments
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <hr/>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <Link href="/profile/settings" id="settings" className="nav-link text-white">
                                    <Image className="bi pe-none me-2" width={16} height={16}
                                         src="/images/icons/setting-icon.svg" alt="setting icon"/>
                                    {intl.formatMessage({ id: "page.profile.settings"})}
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
                                    <i className="color-primary fa-solid me-2 fa-arrow-right-from-bracket"/>
                                    {intl.formatMessage({ id: "page.profile.logout"})}

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