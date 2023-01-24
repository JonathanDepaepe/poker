import {NavClub} from "../../../components/navigation/navClub";
import {NavTop} from "../../../components/navigation/navTop";
import React, {useEffect, useState} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {useIntl} from "react-intl";
import {useRouter} from "next/router";


export default function Home() {
    const router = useRouter()
    const [isCreatingNews, setCreatingNews] = useState(false);
    const [news, setNews] = useState();
    const [invites, setInvites] = useState();
    const [user, setUser] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const {clubId} = router.query;
    const intl = useIntl();
    useEffect(() => {
        const href = window.location.href.split('/');
        const clubHref = href[href.length - 2];
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                fetch(`/api/club/${clubHref}/news`, {headers: {'Authorization': "Bearer " + fetchUser.user.token}})
                    .then((res) => res.json())
                    .then((data) => {
                        setNews(data)
                    })
                loadInvites(fetchUser)
            })
    }, [])

    function loadNews() {
        fetch(`/api/club/${clubId}/news`, {headers: {'Authorization': "Bearer " + user.user.token}})
            .then((res) => res.json())
            .then((data) => {
                setNews(data)
            })
    }

    function loadInvites(user) {
        const href = window.location.href.split('/');
        const clubId = href[href.length - 2];
        fetch(`/api/club/${clubId}/invites`, {headers: {'Authorization': "Bearer " + user.user.token}})
            .then((res) => res.json())
            .then((data) => {
                const currentDate = new Date();
                for (let invite of data) {
                    const expirationDate = new Date(invite.expirationDate);
                    invite.days = Math.floor((expirationDate - currentDate) / (1000 * 3600 * 24))
                }
                setInvites(data.reverse())
            })
    }

    const deleteNews = async (e) => {
        e.preventDefault();
        fetch(`/api/club/${clubId}/news`, {
            headers: {'Authorization': "Bearer " + user.user.token},
            method: "DELETE",
            body: parseInt(e.target.id)
        }).then(response => {
            if (response.status === 201) {
                loadNews();
            }
        })
    }
    const createNews = async (e) => {
        e.preventDefault();
        setCreatingNews(true)
        const title = e.target.title.value;
        const description = e.target.description.value;
        fetch(`/api/club/${clubId}/news`, {
            method: "POST",
            body: JSON.stringify({
                user,
                title,
                description
            })
        }).then(response => {
            if (response.status === 200) {
                loadNews();
            }
        })
    };
    const createInvite = async (e) => {
        e.preventDefault();
        const days = e.target.duration.value;
        const memberId = e.target.memberId.value;
        fetch(`/api/club/${clubId}/invites`, {
            method: "POST",
            body: JSON.stringify({
                user,
                memberId,
                days
            })
        }).then(response => {
            if (response.status === 200) {
                loadInvites(user);
            }
        })
    };

    const deleteInvite = async (e) => {
        e.preventDefault();
        fetch(`/api/club/${clubId}/invites`, {
            headers: {'Authorization': "Bearer " + user.user.token},
            method: "DELETE",
            body: JSON.stringify({
                user,
                inviteCode: e.target.id
            })
        }).then(response => {
            if (response.status === 201) {
                loadInvites(user);
            }
        })
    }
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    /*const updateClub = async (event) => { niet in de api
        event.preventDefault();
        try {
            const clubName = event.target.username.value;
            const formData = new FormData();
            !selectedImage ?
                formData.append("file", "Default") :
                formData.append("file", selectedImage)
            formData.append("clubName", clubName);

            await fetch('/api/club/'+clubId, {
                body: formData,
                method: 'PUT',
            }).then(function (response) {
                if (response.status === 201) {
                    setTimeout(function () {
                        router.reload()
                    }, 1200)
                }
            })
        } catch (error) {
            console.log(error.response?.data);
        }
    };*/

    return (
        <>
            <Head>
                <title>Poker Manager | Club</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavClub/>

                <main className="p-4 w-100">
                    <Tabs
                        defaultActiveKey="news"
                        id="uncontrolled-tab-example"
                        className="mb-3 tab-layout"
                    >
                        {/*<Tab eventKey="club" title="Club">
                            <div className="card-body">
                                <Image className={"img-thumbnail img-club-profile"} src={"/images/placeholder.png"}
                                       width={700} height={400} alt={"Club logo"}/>
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <label htmlFor="club-img"
                                       className="btn btn-primary bg-color-primary"><i
                                    className="m-auto fa-solid fa-arrow-up-from-bracket"/>{intl.formatMessage({id: "page.club.settings.upload"})}
                                </label>
                                <input type="file" id="club-img" name="img" onChange={imageChange} hidden
                                       accept="image/*"/>
                            </div>
                            <form>
                                <div className="form-group mt-3">
                                    <label htmlFor="clubName">Club Name:</label>
                                    <input type="text" className="form-control w-50 mb-2" id="clubName"
                                           aria-describedby="clubName" placeholder="Enter club name"/>
                                </div>
                                <button type="submit" disabled className="btn btn-primary bg-color-primary">Submit</button>
                            </form>

                        </Tab>*/}
                        <Tab eventKey="news" title={intl.formatMessage({id: "page.club.news"})}>
                            <div className="d-flex flex-wrap">
                                <div className="w-50 mw-100">
                                    <h3>{intl.formatMessage({id: "page.club.settings.createNews"})}</h3>
                                    <form onSubmit={createNews}>
                                        <label
                                            htmlFor="title">{intl.formatMessage({id: "page.club.settings.title"})}:</label>
                                        <input required type="text" id="title" name="title"
                                               className="form-control w-75  mb-2"
                                               placeholder={intl.formatMessage({id: "page.club.settings.title"})}/>
                                        <label
                                            htmlFor="description">{intl.formatMessage({id: "page.club.settings.description"})}:</label>
                                        <textarea required className="form-control mb-2 w-75" id="description"
                                                  name="description" rows="3"></textarea>
                                        <button type="submit"
                                                className="btn btn-primary bg-color-primary">{intl.formatMessage({id: "page.club.settings.createNews"})}
                                        </button>
                                    </form>
                                </div>
                                <div className="w-50 mw-100">
                                    <h3>{intl.formatMessage({id: "page.club.settings.recentNews"})}</h3>
                                    <article>
                                        {news?.map((newsArticle) => (
                                            <section>
                                                <div className={"d-flex justify-content-between"}>
                                                    <h4>{newsArticle.title}</h4>
                                                    <Link id={newsArticle.postId} onClick={deleteNews} href={"#"}><Image
                                                        id={newsArticle.postId} className={"mt-auto mb-auto"}
                                                        src="/images/icons/trah-icon.svg" alt="trash" width={15}
                                                        height={15}/></Link>
                                                </div>
                                                <p>{newsArticle.description}</p>
                                            </section>
                                        ))}
                                    </article>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="invites" title={intl.formatMessage({id: "page.club.settings.invites"})}>
                            <div className="d-flex flex-wrap">
                                <div className="w-50 mw-100">
                                    <h3>{intl.formatMessage({id: "page.club.settings.createInvite"})}</h3>
                                    <form onSubmit={createInvite}>
                                        <label
                                            htmlFor="memberId">{intl.formatMessage({id: "page.club.settings.idOfUserYouWantToInvite"})}:</label>
                                        <input required type="text" id="memberId" name="memberId"
                                               className="form-control w-50 mb-2" placeholder="01234-abcd-..."/>
                                        <div>
                                            <label
                                                htmlFor="title">{intl.formatMessage({id: "page.club.settings.duration"})}:</label>
                                            <div className={"d-flex"}>
                                                <input required type="number" id="duration" name="duration"
                                                       className="form-control w-25 mb-2" placeholder="10"/>
                                                <p className={"mt-auto ms-1"}>/{intl.formatMessage({id: "page.club.settings.days"})}</p>
                                            </div>
                                        </div>
                                        <button type="submit"
                                                className="btn btn-primary bg-color-primary">{intl.formatMessage({id: "page.club.settings.create"})}
                                        </button>
                                    </form>
                                </div>
                                <div className="w-50 mw-100">
                                    <h3>{intl.formatMessage({id: "page.club.settings.activeCodes"})}</h3>
                                    <article className={"height-code overflow-auto"}>
                                        {invites?.map((invite) => (
                                            <section>
                                                <hr/>
                                                <div className={"d-flex flex-wrap"}>
                                                    <p>{intl.formatMessage({id: "page.club.settings.code"})}: </p>
                                                    <div>
                                                    <input className={"height-fit-content ms-1 me-1"} type="text"
                                                           disabled value={invite.invitationHash}/>
                                                    <Link id={invite.invitationHash} onClick={deleteInvite}
                                                          href={"#"}><Image id={invite.invitationHash}
                                                                            className={"mt-auto mb-auto"}
                                                                            src="/images/icons/trah-icon.svg"
                                                                            alt="trash" width={15} height={15}/></Link></div>
                                                </div>
                                                <p>{intl.formatMessage({id: "page.club.settings.duration"})}: {invite.days + 1} {intl.formatMessage({id: "page.club.settings.daysLeft"})}</p>
                                                <p>{intl.formatMessage({id: "page.club.settings.forMemberID"})}: {invite.memberId}</p>
                                            </section>
                                        ))}
                                    </article>
                                </div>
                            </div>


                        </Tab>
                        <Tab eventKey="subscription"
                             title={intl.formatMessage({id: "page.club.settings.subscription"})}>
                            <article className="d-flex flex-wrap justify-content-around mt-5">
                                <section className="card text-center">
                                    <h3 className="card-header">{intl.formatMessage({id: "page.club.settings.free"})}</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>1 Tournament/month</li>
                                        <li>27 Max Players</li>
                                    </ul>
                                    <button disabled="true"
                                            className="btn btn-primary bg-color-primary card-footer">{intl.formatMessage({id: "page.club.settings.current"})}
                                    </button>
                                </section>
                                <section className="card text-center">
                                    <h3 className="card-header">Tier 10</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>{intl.formatMessage({id: "page.club.settings.comingSoon"})}</li>
                                    </ul>
                                    <button disabled="true"
                                            className="btn btn-primary bg-color-primary card-footer">{intl.formatMessage({id: "page.club.settings.soon"})}</button>
                                </section>
                                <section className="card text-center">
                                    <h3 className="card-header">Tier 50</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>{intl.formatMessage({id: "page.club.settings.comingSoon"})}</li>
                                    </ul>
                                    <button disabled="true"
                                            className="btn btn-primary bg-color-primary card-footer">{intl.formatMessage({id: "page.club.settings.soon"})}</button>
                                </section>
                                <section className="card text-center">
                                    <h3 className="card-header">Tier 100</h3>
                                    <ul className="card-body list-unstyled">
                                        <li>{intl.formatMessage({id: "page.club.settings.comingSoon"})}</li>
                                    </ul>
                                    <button disabled="true"
                                            className="btn btn-primary bg-color-primary card-footer">{intl.formatMessage({id: "page.club.settings.soon"})}</button>
                                </section>
                            </article>
                        </Tab>

                    </Tabs>

                </main>

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
            </div>
        </>
    )
}