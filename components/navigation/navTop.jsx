import Link from "next/link";
import Image from "next/image";
import React from 'react'


import useUser from '../../lib/useUser'
import { useRouter } from 'next/router'

import "bootstrap/dist/css/bootstrap.min.css";


export const NavTop = () => {
    const { user, mutateUser } = useUser()
    const router = useRouter()
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
                    <Link className="nav-link line-hover text-white me-3" href="/">Home</Link>
                    <Link className="nav-link line-hover text-white me-3" href="/club">Club</Link>
                    <Link className="nav-link line-hover text-white me-3" href="/" >Leagues</Link>
                    <Link className="nav-link line-hover text-white me-3" href="/">Tournaments</Link>
                    {!user?.isLoggedIn && (
                            <Link className="nav-link line-hover text-white me-3" href="/login">
                                Login
                            </Link>
                    )}
                    {user?.isLoggedIn && (
                                <Link className="nav-link line-hover text-white me-3" href="/profile/home">
                                    Profile
                                </Link>
                    )}
                </div>
            </div>
        </div>
        </nav>
    );
    }
