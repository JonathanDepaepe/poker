import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import {useIntl} from "react-intl";
import {useRouter} from "next/router";
import { US, NL } from 'country-flag-icons/react/3x2'



export const NavTop = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { locale, locales, asPath } = useRouter();
    const intl = useIntl();
    useEffect(() => {
        setLoading(true)
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                setLoading(false)
            })
    }, [])

    return (
        <nav className="navTop navbar navbar-expand-lg navbar-light bg-dark">

        <div className="container">
            <Link className="navbar-brand me-2 d-flex" href="/">
                <Image src="/images/logo.png" width={40} height={40} alt="MDB Logo" loading="lazy" style={{marginTop: '-1px'}} className="pe-none me-2" />
                <span className="navbar-nav me-auto text-white ">Poker Manager</span>
            </Link>
            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="nav-content collapse navbar-collapse float-end" id="navbarSupportedContent">
                <div className="d-flex align-items-center ms-auto">

                    {user?.isLoggedIn === false && (
                        <>
                        <Link className="nav-link line-hover text-white me-3" href="/">Home</Link>
                        <Link className="nav-link line-hover text-white me-3" href="/club">Club</Link>
                        <Link className="nav-link line-hover text-white me-3" href="/leagues" >Leagues</Link>
                        <Link className="nav-link line-hover text-white me-3" href="/tournaments">Tournaments</Link>
                            <Link className="nav-link line-hover text-white me-3" href="/login">
                                {intl.formatMessage({ id: "page.login.login" })}
                            </Link>
                        </>
                    )}
                    {user?.isLoggedIn && (<>
                        <Link className="nav-link line-hover text-white me-3" href="/">Home</Link>
                        <Link className="nav-link line-hover text-white me-3" href="/club">Club</Link>
                        <Link className="nav-link line-hover text-white me-3" href="/leagues" >Leagues</Link>
                        <Link className="nav-link line-hover text-white me-3" href="/tournaments">Tournaments</Link>
                                <Link className="nav-link line-hover text-white me-3" href="/profile">
                                    {intl.formatMessage({ id: "page.navTop.profile" })}
                                </Link>
                        </>
                    )}
                    {/*Dropdown locales */}
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle d-flex" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            {locale === "en" && (<><US title="" className="flag-icon  rounded"/><p className={"height-fit-content ps-2 mt-auto text-white mb-auto"}>EN</p></>)}
                            {locale === "nl" && (<><NL title="" className="flag-icon rounded"/><p className={"height-fit-content ps-2 mt-auto text-white mb-auto"}>NL</p></>)}
                        </a>

                        <ul className="dropdown-menu bg-dark">
                            <li><Link className={"text-decoration-none text-white ps-2 d-flex"} locale={"en"} href={asPath}><US title="" className="flag-icon rounded"/><p className={"ps-2 mt-auto mb-auto"}>EN</p></Link></li>
                            <li><Link className={"text-decoration-none text-white ps-2 d-flex mt-2"} locale={"nl"} href={asPath}><NL title="" className="flag-icon rounded"/><p className={"ps-2 mt-auto mb-auto"}>NL</p></Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
                    crossOrigin="anonymous"></script>
        </nav>

    );
    }



