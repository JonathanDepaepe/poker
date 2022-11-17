import Link from "next/link";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";

export const NavProfile = () => {
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
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile/club" id="club" className="nav-link text-white">
                                    <Image src="/images/icons/club-icon.svg" className="bi pe-none me-2" width={16}
                                         height={16} alt="club icon"/>
                                    My Clubs
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile/tournaments" id="tournaments" className="nav-link text-white">
                                    <Image src="/images/icons/tournaments-icon.svg" alt="tournament icon"
                                         className="bi pe-none me-2" width={16} height={16}/>
                                    My tournaments
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
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <Link href="/" id="logout" className="nav-link color-red">
                                    <i className="color-primary fa-solid me-2 fa-arrow-right-from-bracket"/>
                                    Logout
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