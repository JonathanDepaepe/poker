import {NavTop} from "../components/navigation/navTop";
import Head from "next/head"
import React, { useState } from 'react';
import Image from "next/image";


export default function Home() {
    return (
        <>
            <Head>
                <title>Poker Manager | Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>
            <main className="p-4" >
                <div>
                <div className="w-75 flex-wrap d-flex mw-100 ms-auto me-auto">
                <div className="w-50 mw-100">
                <h1 className="text-gray">Home Poker Tournament Manager</h1>
                <p className="text-gray">Use this tool to host poker tournaments at home. </p>
                    <p className="text-gray">

                    Myself and some friends always used the pokerroom home game organizer,  but that software is out-dated, made in Flash and only supports a 800x600 screen resolution.

                    However I've never found any other tool that was this easy to set up and gave such a good experience, so I decided to re-make it with Unity.

                    The interface for the setup is kept as simple as possible and the view of the tournament progress is an almost exact copy of the original, without the extra obsolete header. This gives a nice fullscreen view.</p>
                   <br/>
                    <p className="text-gray">Starting from version 1.2.4, the manager can synchronize with another instance of HPTM on a different device which then will duplicate the screen, making it possible to have multiple devices displaying the stats around the place where you host your tournaments.

                    When pressing the title for 5+ seconds, a player with a connected device can enter a code to gain "admin access" and control the tournament remotely.

                    If you have any comments or things you think I can improve, do let me know! I will be using this software myself, so if I find anything that can be improved I'll make it happen.</p>
                    <a className="btn btn-primary bg-color-primary" href="https://grrava.itch.io/hptm">download on PC</a>
                    <a href="https://play.google.com/store/apps/details?id=be.avadev.hptm"> <Image src="/images/google-play-badge.png" alt='android' width={155} height={60} /></a>
                </div>
                <Image className="d-none d-sm-inline rounded-4 mt-auto mb-auto" src="/images/HPTM.png" alt={"HPTM"} width={475} height={267} />
                </div>
                </div>
            </main>
        </>
    )
}
