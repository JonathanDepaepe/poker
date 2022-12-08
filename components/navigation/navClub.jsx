import Link from "next/link";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const NavClub = () => {
    return (
        <nav>

            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
                 id="sidebar-wrapper" style={{width: '280px'}}>
                <div>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link href="/club/home" id="home" className="nav-link text-white" aria-current="page">
                                <Image className="bi pe-none me-2" width={16} height={16}
                                       src="/images/icons/club-icon.svg" alt="club icon"/>
                                Club
                            </Link>
                        </li>
                        <li>
                            <Link href="/club/members" id="club" className="nav-link text-white">
                                <Image src="/images/icons/members-icon.svg" className="bi pe-none me-2" width={16}
                                       height={16} alt="member icon"/>
                                Members
                            </Link>
                        </li>
                        <li>
                            <Link href="/club/leagues" id="leagues" className="nav-link text-white">
                                <Image src="/images/icons/leagues-icon.svg" alt="leagues icon"
                                       className="bi pe-none me-2" width={16} height={16}/>
                               Leagues
                            </Link>
                        </li>
                        <li>
                            <Link href="/club/tournaments" id="" className="nav-link text-white">
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
                            <Link href="/club/settings" id="settings" className="nav-link text-white">
                                <Image className="bi pe-none me-2" width={16} height={16}
                                       src="/images/icons/setting-icon.svg" alt="setting icon"/>
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link href="/" id="logout" className="nav-link color-red">

                                <FontAwesomeIcon className="color-red me-2" icon={faArrowRightToBracket} />
                                Leave
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