import {NavTop} from "../components/navigation/navTop";
import Head from "next/head";
import Image from "next/image";
import {useEffect, useState} from "react";
import https from "https";
import Link from "next/link";




export default function Club() {
    const [selectedImage, setSelectedImage] = useState();
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [clubs, setClubs] = useState();
    const [Uploading, setUploading] = useState(false);

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
                setLoading(false)

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


    const submitClub = async (event) => {
        event.preventDefault();

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
                        console.log(response)
                    })
                });
        } catch (error) {
            console.log(error.response?.data);
        }
        setUploading(false);
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
                    <button className="btn btn-primary bg-color-primary" data-toggle="modal" data-target="#createClub">+
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
                            <img className="card-img-top" width={300} height={150} src={club.pictureUrl}
                                   alt="placeholder"/>
                            <div className="card-body text-center">
                                <h2 className="card-title">{club.name}</h2>
                                <p className="text-gray">5 Members</p>
                                {club.button === "leave" && (<button className="btn btn-primary bg-danger border-0 w-75 mt-2 bg-color-red">Leave</button>)}
                                {club.button === "join" && (<button className="btn btn-primary w-75 mt-2 bg-color-primary">Join</button>)}
                                {club.button === "login" && (<Link className={"text-decoration-none text-white btn btn-primary w-75 mt-2 bg-color-primary"} href="/login">Login</Link>)}
                            </div>
                        </section>
                    ))}

                </article>
                <div className="modal fade active show" id="createClub" tabIndex={-1} role="dialog"
                     aria-labelledby="createClub" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create a club</h5>
                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <form className="d-flex flex-column" onSubmit={submitClub}>
                                    <div className="d-flex align-items-end">
                                        {selectedImage && (
                                            <img src={URL.createObjectURL(selectedImage)} width={300} height={150}
                                                 className="img-thumbnail" style={{objectFit: 'cover'}}
                                                 id="display-image" alt="club img"/>)}
                                        {!selectedImage && (<img src="/images/placeholder.png" width={300} height={150}
                                                                 className="img-thumbnail" style={{objectFit: 'cover'}}
                                                                 id="display-image" alt="club img"/>)}

                                        <label htmlFor="club-img"
                                               className="btn btn-primary d-flex ms-3 min-content bg-color-primary"><i
                                            className="m-auto fa-solid fa-arrow-up-from-bracket"/>Upload</label>
                                        <input type="file" id="club-img" name="img" onChange={imageChange} hidden
                                               accept="image/*"/>
                                    </div>
                                    <label className="form-label mt-3" htmlFor="club-name">Club Name</label>
                                    <input className="form-control" name={"clubName"} type="text" required
                                           id="club-name"/>
                                    <div className="d-flex mt-2 form-switch ps-0">
                                        <label className="form-check-label" htmlFor="club-private">Private</label>
                                        <input type="checkbox" className="ms-2 form-check-input" name="private"
                                               id="club-private"/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary bg-color-primary">Create
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        </>
    )
}

