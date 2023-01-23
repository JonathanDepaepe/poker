import {NavTop} from "../components/navigation/navTop";
import Head from "next/head";
import {useEffect, useState} from "react";
import Link from "next/link";
import Popup from 'reactjs-popup';
import {useRouter} from 'next/router';
import {useIntl} from "react-intl";


export default function Club() {
    const intl = useIntl();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isCreating, setCreating] = useState(false);
    const [isCreated, setCreated] = useState(false);
    const [joinCode, setJoinCode] = useState("join");
    const [user, setUser] = useState();
    const [clubs, setClubs] = useState();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)
                loadClubs(fetchUser)

            })
    }, [])

    async function loadClubs(clubUsers) {
        await fetch('/api/club')
            .then((res) => res.json())
            .then((data) => {
                let joinedClubs = [];
                if (clubUsers?.isLoggedIn) {
                    for (const element of clubUsers.user.clubs) {
                        joinedClubs.push(element.clubId);
                    }
                }
                for (const element of data) {
                    if (joinedClubs.includes(element.clubId)) {
                        element.button = "leave"
                    } else if (clubUsers?.isLoggedIn) {
                        element.button = "join"
                    } else {
                        element.button = "login"
                    }
                    if (element.pictureUrl[0] !== "/"){
                        element.image = "/static/placeholder.png"
                    }else{
                        try{
                            require( "../public" +element.pictureUrl)
                            element.image = element.pictureUrl;
                        }
                        catch(err){
                            element.image = "/static/placeholder.png"
                        }
                    }

                }
                setClubs(data)
                setLoading(false)
            })
    }

    const onClubConnect = async (e) => {
        e.preventDefault();
        try {
            const clubId = e.target.id;
            const isJoin = e.target.classList.contains("join")
            let url;
            if (isJoin) {
                url = `/api/club/${clubId}/join`;
            } else {
                url = `/api/club/${clubId}/leave`;
            }
            await fetch(url, {
                body: JSON.stringify(user)
                ,
                method: 'POST',
            }).then(function (response) {
                loadClubs(user)
                router.reload()
            })

        } catch (error) {
            console.log(error);
        }
    };

    const joinViaInvite = async (e) => {
        e.preventDefault();
        const inviteCode = e.target.inviteCode.value;
        fetch(`/api/club/joinInviteCode`,{
            method:"POST",
            body: JSON.stringify({
                user,
                inviteCode
            })
        }).then(response => {if (response.status=== 201){
            setJoinCode("joined")
            setTimeout(function () {
                router.reload()
            }, 1200)
        }else{
            setJoinCode("error")
            setTimeout(function () {
                setJoinCode("join")
            }, 2000)
        }

        })
    }

    const submitClub = async (event) => {
        event.preventDefault();
        setCreating(true)
        try {
            fetch('/api/auth/user')
                .then((res) => res.json())
                .then(async (data) => {
                    const clubName = event.target.clubName.value;
                    const isPrivate = event.target.private.checked;
                    const formData = new FormData();
                    !selectedImage ?
                        formData.append("file", "Default") :
                        formData.append("file", selectedImage)
                    formData.append("token", data.user.token);
                    formData.append("memberId", data.user.memberId);
                    formData.append("clubName", clubName);
                    formData.append("isPrivate", isPrivate);
                    await fetch('/api/club', {
                        body: formData,
                        method: 'POST',
                    }).then(function (response) {
                        if (response.status === 201) {
                            setCreating(false)
                            setCreated(true)
                            setTimeout(function () {
                                router.reload()
                            }, 1200)
                        }
                    })
                });
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <>
            <Head>
                <title>Poker Manager | Club</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>
            <main className="p-4 w-75 m-auto">
                <div className="d-flex flex-wrap justify-content-between">
                    {user?.isLoggedIn && (
                        <button className="btn btn-primary bg-color-primary" onClick={() => setOpen(o => !o)}>+
                            Create Club
                        </button>)}
                    {user?.isLoggedIn && (
                            <form className="d-flex" onSubmit={joinViaInvite}>
                                <input className="form-control rounded-0 rounded-start" name="inviteCode" placeholder="Invite Code" type="text"/>
                                {joinCode === "join" && (<button className="btn btn-primary rounded-0 rounded-end bg-color-primary">Join</button>)}
                                {joinCode === "joined" && (<button className="btn btn-primary rounded-0 rounded-end bg-color-green">Joined</button>)}
                                {joinCode === "error" && (<button className="btn btn-primary rounded-0 rounded-end bg-color-red">Failed</button>)}

                            </form>
                        )}
                </div>
                {isLoading && (<h5>Clubs Are loading ...</h5>)}
                <article className="d-flex mt-4 flex-wrap">
                    {clubs?.map((club) => (
                        <section className="card m-2 shadow">
                            <img className="card-img-top img-club" width={300} height={150} src={club.image}
                                 alt="placeholder"/>
                            <div className="card-body d-flex flex-column justify-content-between text-center">
                                <div>
                                    <h3 className="card-title">{club.name}</h3>
                                    <p className="text-gray">{club.totalMembers} {intl.formatMessage({id: "page.club.members"})}</p>
                                </div>
                                {club.button === "leave" && (<button id={club.clubId} onClick={onClubConnect}
                                                                     className="btn btn-primary bg-danger border-0 me-auto ms-auto w-75 mt-2 bg-color-red leave">{intl.formatMessage({id: "page.club.leave"})}</button>)}
                                {club.button === "join" && (<button id={club.clubId} onClick={onClubConnect}
                                                                    className="btn btn-primary w-75 mt-2 me-auto ms-auto bg-color-primary join">{intl.formatMessage({id: "page.club.join"})}</button>)}
                                {club.button === "login" && (<Link
                                    className={"text-decoration-none text-white me-auto ms-auto btn btn-primary w-75 mt-2 bg-color-primary"}
                                    href="/login">{intl.formatMessage({id: "page.login.login"})}</Link>)}
                                {club.button !== "login" && (
                                    <Link href={`/club/${club.clubId}`} className="">info</Link>)}
                            </div>
                        </section>
                    ))}

                </article>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="bg-white border rounded-3" role="document">
                        <div className="modal-content p-4">
                            <div className="modal-header">
                                <h5 className="modal-title">Create a club</h5>
                                <button onClick={() => setOpen(o => !o)} type="button" className="btn-close"
                                        data-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <form className="d-flex flex-column" onSubmit={submitClub}>
                                    <div className="d-flex align-items-end">
                                        {selectedImage && (
                                            <img src={URL.createObjectURL(selectedImage)} width={300} height={150}
                                                 className="img-thumbnail img-club"
                                                 id="display-image" alt="club img"/>)}
                                        {!selectedImage && (<img src="/images/placeholder.png" width={300} height={150}
                                                                 className="img-thumbnail"
                                                                 id="display-image" alt="club img"/>)}

                                        <label htmlFor="club-img"
                                               className="btn btn-primary d-flex ms-3 min-content bg-color-primary"><i
                                            className="m-auto fa-solid fa-arrow-up-from-bracket"/>Upload</label>
                                        <input type="file" id="club-img" name="img" onChange={imageChange} hidden
                                               accept="image/*"/>
                                    </div>
                                    <label className="form-label mt-3" htmlFor="club-name">Club Name</label>
                                    <input className="form-control" maxLength="15" name={"clubName"} type="text"
                                           required
                                           id="club-name"/>
                                    <div className="d-flex mt-2 form-switch ps-0">
                                        <label className="form-check-label" htmlFor="club-private">Private</label>
                                        <input type="checkbox" className="ms-2 form-check-input" name="private"
                                               id="club-private"/>
                                    </div>
                                    <div className="modal-footer">
                                        {!isCreating && !isCreated && (<button type="submit"
                                                                               className="btn btn-primary bg-color-primary">Create</button>)}
                                        {isCreating && !isCreated && (<button disabled={"true"} type="submit"
                                                                              className="btn btn-primary bg-color-primary">Creating...</button>)}
                                        {!isCreating && isCreated && (<button disabled={"true"} type="submit"
                                                                              className="btn btn-primary bg-color-green">Created</button>)}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </Popup>
            </main>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        </>
    )
}

