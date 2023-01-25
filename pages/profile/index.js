import {NavProfile} from "../../components/navigation/navProfile";
import {NavTop} from "../../components/navigation/navTop";
import Head from "next/head";
import Image from "next/image";
import {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {useIntl} from "react-intl";

export default function Index() {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isCreating, setCreating] = useState(false)
    const [saved, setSaved] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const intl = useIntl();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    useEffect(() => {
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((data) => {
                if (data.user.data.profilePictureUrl[0] !== "/" && data.user.data.profilePictureUrl[0] !== "h") {
                    data.user.data.profilePictureUrl = "/images/logo.png"
                }
                setUser(data)
            })
    }, [])

    const submitProfile = async (event) => {
        event.preventDefault();
        setCreating(true)
        try {
            fetch('/api/auth/user')
                .then((res) => res.json())
                .then(async (data) => {
                    const nickname = event.target.username.value;
                    const email = event.target.email.value;
                    const formData = new FormData();
                    formData.append("newImage", "false");
                    console.log(user?.user.data.profilePictureUrl[0])
                    console.log(user?.user.data.profilePictureUrl[0]=== "h")
                    if (user?.user.data.profilePictureUrl[0]=== "h") {
                        formData.append("file", user?.user.data.profilePictureUrl)
                    } else if (!selectedImage){
                        formData.append("file", "Default")
                    } else {
                        formData.append("newImage", "true");
                        formData.append("file", selectedImage)
                    }
                    formData.append("token", data.user.token);
                    formData.append("memberId", data.user.memberId);
                    formData.append("nickname", nickname);
                    formData.append("email", email);

                    await fetch('/api/profile/profile', {
                        body: formData,
                        method: 'POST',
                    }).then(function (response) {
                        if (response.status === 201) {
                            setCreating(false)
                            setSaved(true)
                            setTimeout(function () {
                                setSaved(false)
                            }, 2000)
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
                <title>Poker Manager | Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>

            <div className={"d-flex bg-white"}>
                <NavProfile/>

                <main className="p-4 w-100">
                    <div className="">
                        <form onSubmit={submitProfile} className="d-flex flex-wrap h-100">
                            <div className="rounded-0 border-1 rounded-start">
                                <div className="card-body text-center">
                                    {selectedImage && (
                                        <img src={URL.createObjectURL(selectedImage)} width={100} height={100}
                                             className="img-profile rounded-circle mb-2"
                                             id="display-image" alt="club img"/>)}
                                    {!selectedImage && (
                                        <>
                                            {!user?.user.data.profilePictureUrl && (
                                                <img src={"/images/logo.png"} width={100} height={100}
                                                     className="img-profile rounded-circle mb-2"
                                                     id="display-image" alt="club img"/>
                                            )}
                                            {user?.user.data.profilePictureUrl && (
                                                <img src={user?.user.data.profilePictureUrl} width={100} height={100}
                                                     className="img-profile rounded-circle mb-2"
                                                     id="display-image" alt="club img"/>
                                            )}
                                        </>
                                    )}
                                    <div
                                        className="small font-italic text-muted mb-4">{intl.formatMessage({id: "page.profile.noLargerThan5Mb"})}</div>
                                    <label htmlFor="club-img"
                                           className="btn btn-primary bg-color-primary"><i
                                        className="m-auto fa-solid fa-arrow-up-from-bracket"/>{intl.formatMessage({id: "page.club.settings.upload"})}
                                    </label>
                                    <input type="file" id="club-img" name="img" onChange={imageChange} hidden
                                           accept="image/*"/>
                                </div>
                            </div>
                            <div className="rounded-0 w-75 ms-5 border-1 rounded-end">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="small mb-1"
                                               htmlFor="form-memberID">{intl.formatMessage({id: "page.profile.yourMemberID"})}</label>
                                        <input className="form-control" id="form-memberID" disabled type="text"
                                               defaultValue={user?.user.data.memberId}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1"
                                               htmlFor="form-username">{intl.formatMessage({id: "page.profile.username"})}</label>
                                        <input className="form-control" id="form-username" name={"username"} type="text"
                                               placeholder="Enter your username"
                                               defaultValue={user?.user.data.nickname}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1"
                                               htmlFor="form-email">{intl.formatMessage({id: "page.profile.email"})}</label>
                                        <input className="form-control" name={"email"} id="form-email" type="email"
                                               placeholder="Enter your email address"
                                               defaultValue={user?.user.data.email}/>
                                    </div>
                                    <div className="d-flex justify-content-end ">
                                        {!saved && !isCreating &&(<button className="btn btn-primary bg-color-primary"
                                                                                   type="submit">{intl.formatMessage({id: "page.profile.saveChanges"})}</button>)}
                                        {!saved && isCreating &&(<button className="btn btn-primary bg-color-primary disabled"
                                                                          type="submit">{intl.formatMessage({id: "page.profile.saving"})}</button>)}
                                        {saved && !isCreating &&(<button className="btn btn-primary bg-color-green disabled"
                                                                         type="submit">{intl.formatMessage({id: "page.profile.saved"})}</button>)}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mt-5">
                        <article className="d-flex flex-wrap justify-content-around">
                            <section className="bg-white border-1 shadow rounded achievement">
                                <p>{intl.formatMessage({id: "page.profile.total"})}</p>
                                <h3>0</h3>
                                <p>{intl.formatMessage({id: "page.profile.wins"})}</p>
                            </section>
                            <section className="bg-white border-1 shadow  rounded achievement">
                                <p>{intl.formatMessage({id: "page.profile.thisMonth"})}</p>
                                <h3>0</h3>
                                <p>{intl.formatMessage({id: "page.profile.wins"})}</p>
                            </section>
                            <section className="bg-white border-1 shadow  rounded achievement">
                                <p>{intl.formatMessage({id: "page.profile.joined"})}</p>
                                <h3>0</h3>
                                <p>Tournaments</p>
                            </section>
                        </article>
                    </div>
                </main>
            </div>
        </>
    )
}
