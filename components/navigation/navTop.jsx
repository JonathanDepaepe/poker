import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import {useIntl} from "react-intl";
import {useRouter} from "next/router";
import Script from "next/script";
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
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">

        <div className="container">
            <Link className="navbar-brand me-2 d-flex" href="/">
                <Image src="/images/logo.png" width={40} height={40} alt="MDB Logo" loading="lazy" style={{marginTop: '-1px'}} className="pe-none me-2" />
                <span className="navbar-nav me-auto text-white ">Poker Manager</span>
            </Link>
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarButtonsExample">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <div className="d-flex align-items-center">

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

                    <div className="dropdown">
                        <button className="btn dropdown-toggle d-flex " type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            {locale === "en" && (<><US title="" className="flag-icon  rounded"/><p className={"height-fit-content ps-2 mt-auto text-white mb-auto"}>EN</p></>)}
                            {locale === "nl" && (<><NL title="" className="flag-icon rounded"/><p className={"height-fit-content ps-2 mt-auto text-white mb-auto"}>NL</p></>)}
                        </button>

                        <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
                            <li><Link className={"text-decoration-none text-white ps-2 d-flex"} locale={"en"} href={asPath}><US title="" className="flag-icon rounded"/><p className={"ps-2 mt-auto mb-auto"}>EN</p></Link></li>
                            <li><Link className={"text-decoration-none text-white ps-2 d-flex mt-2"} locale={"nl"} href={asPath}><NL title="" className="flag-icon rounded"/><p className={"ps-2 mt-auto mb-auto"}>NL</p></Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
        />
        </nav>

    );
    }



