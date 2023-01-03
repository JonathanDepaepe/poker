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
    const [user, setUser] = useState();
    const [clubs, setClubs] = useState();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    useEffect( () => {
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((fetchUser) => {
                setUser(fetchUser)

        fetch('/api/club')
            .then((res) => res.json())
            .then((data) => {
                let joinedClubs= [];
                if(fetchUser?.isLoggedIn) {
                    for (const element of fetchUser.user.clubs) {
                        joinedClubs.push(element.clubId);
                }}
                for (const element of data) {
                    if (joinedClubs.includes(element.clubId)){
                        element.button = "leave"
                    }else if(fetchUser?.isLoggedIn){
                        element.button = "join"
                    }else{
                        element.button = "login"
                    }
                    if (element.pictureUrl[0]!== "/"){
                        element.pictureUrl = "/static/placeholder.png"
                    }

                }
                setClubs(data)
                setLoading(false)
            })
            })
    }, [])


    const onClubConnect = async (e) => {
        e.preventDefault();
        try {
            const clubId = e.target.id;
            const type = e.target.innerHTML;
            console.log(user)
            let url = '';
            if (type === "Join") {
                url = `/api/club/${clubId}/join`;
            } else if (type === "Leave"){
                url = `/api/club/${clubId}/leave`;
            }
            await fetch(url, {
                body: JSON.stringify(user)
                ,
                method: 'POST',
            }).then(function (response) {
                if(response.status === 201){
                   /* let newClubs = clubs;
                    console.log(newClubs)
                    for (const club of newClubs){
                        console.log('here')
                        if (club.clubId === parseInt(clubId)){
                            console.log("true")
                            if (type === "Join"){
                                console.log('join')
                                club.button = "login"
                            } else{
                                club.button = "login"
                            }
                        }
                    }
                    setClubs(newClubs)*/
                    router.reload()
                }
            })

        } catch (error) {
            console.log(error);
        }
    };

    const submitClub = async (event) => {
        event.preventDefault();
        setCreating(true)
        try {
            fetch('/api/auth/user')
                .then((res) => res.json())
                .then(async (data) => {
                    console.log(data)

                    const clubName = event.target.clubName.value;
                    const isPrivate = event.target.private.value;
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
                        if(response.status === 201){
                            setCreating(false)
                            setCreated(true)
                            setTimeout(function (){router.reload()}, 1200)
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
                    <div className="d-flex">
                        <input className="form-control rounded-0 rounded-start" placeholder="Invite Code" type="text"/>
                        <button className="btn btn-primary rounded-0 rounded-end bg-color-primary">Join</button>
                    </div>)}
                </div>
                {isLoading && (<h5>Clubs Are loading ...</h5>)}
                <article className="d-flex mt-4 flex-wrap">
                    {clubs?.map((club) => (
                        <section className="card m-2 shadow">
                            <img className="card-img-top img-club" width={300} height={150} src={club.pictureUrl}
                                   alt="placeholder"/>
                            <div className="card-body d-flex flex-column justify-content-between text-center">
                                <div>
                                <h3 className="card-title">{club.name}</h3>
                                <p className="text-gray">- {intl.formatMessage({ id: "page.club.members" })}</p>
                                </div>
                                {club.button === "leave" && (<button id={club.clubId} onClick={onClubConnect}className="btn btn-primary bg-danger border-0 me-auto ms-auto w-75 mt-2 bg-color-red">{intl.formatMessage({ id: "page.club.leave" })}</button>)}
                                {club.button === "join" && (<button id={club.clubId} onClick={onClubConnect} className="btn btn-primary w-75 mt-2 me-auto ms-auto bg-color-primary">{intl.formatMessage({ id: "page.club.join" })}</button>)}
                                {club.button === "login" && (<Link className={"text-decoration-none text-white me-auto ms-auto btn btn-primary w-75 mt-2 bg-color-primary"} href="/login">{intl.formatMessage({ id: "page.login.login" })}</Link>)}
                                {club.button !== "login" && (<Link href={`/club/${club.clubId}/home`} className="">info</Link>)}
                            </div>
                        </section>
                    ))}

                </article>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="bg-white border rounded-3" role="document">
                        <div className="modal-content p-4">
                            <div className="modal-header">
                                <h5 className="modal-title">Create a club</h5>
                                <button onClick={() => setOpen(o => !o)} type="button" className="btn-close" data-dismiss="modal" aria-label="Close"/>
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
                                        <input  type="file" id="club-img" name="img" onChange={imageChange} hidden
                                               accept="image/*"/>
                                    </div>
                                    <label className="form-label mt-3" htmlFor="club-name">Club Name</label>
                                    <input className="form-control"  maxLength="15" name={"clubName"} type="text" required
                                           id="club-name"/>
                                    <div className="d-flex mt-2 form-switch ps-0">
                                        <label className="form-check-label" htmlFor="club-private">Private</label>
                                        <input type="checkbox" className="ms-2 form-check-input" name="private"
                                               id="club-private"/>
                                    </div>
                                    <div className="modal-footer">
                                        {!isCreating && !isCreated && (<button type="submit" className="btn btn-primary bg-color-primary">Create</button>)}
                                        {isCreating && !isCreated && (<button disabled={"true"} type="submit" className="btn btn-primary bg-color-primary">Creating...</button>)}
                                        {!isCreating && isCreated && (<button disabled={"true"} type="submit" className="btn btn-primary bg-color-green">Created</button>)}
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

