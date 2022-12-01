import {NavTop} from "../components/navigation/navTop";
import Head from "next/head";
import Image from "next/image";


export default function Club() {
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
                    <button className="btn btn-primary bg-color-primary" data-toggle="modal" data-target="#createClub">+ Create Club</button>
                    <div className="d-flex">
                        <input className="form-control rounded-0 rounded-start" placeholder="Invite Code" type="text" />
                        <button className="btn btn-primary rounded-0 rounded-end bg-color-primary">Join</button>
                    </div>
                </div>
                <article className="d-flex mt-4 flex-wrap">
                    <section className="card m-2 shadow">
                        <Image className="card-img-top" width={300} height={150} src="/images/placeholder.png" alt="placeholder" />
                        <div className="card-body text-center">
                            <h2 className="card-title">Club name</h2>
                            <p className="text-gray">5 Members</p>
                            <button className="btn btn-primary w-75 mt-2 bg-color-primary">Join</button>
                        </div>
                    </section>
                    <section className="card m-2 shadow">
                        <Image className="card-img-top" width={300} height={150} src="/images/placeholder.png" alt="placeholder" />
                        <div className="card-body text-center">
                            <h2 className="card-title">Club name</h2>
                            <p className="text-gray">5 Members</p>
                            <button className="btn btn-primary bg-danger border-0 w-75 mt-2 bg-color-red">Leave</button>
                        </div>
                    </section>
                    <section className="card m-2 shadow">
                        <Image className="card-img-top" width={300} height={150} src="/images/placeholder.png" alt="placeholder" />
                        <div className="card-body text-center">
                            <h2 className="card-title">Club name</h2>
                            <p className="text-gray">5 Members</p>
                            <button className="btn btn-primary w-75 mt-2 bg-color-primary">Join</button>
                        </div>
                    </section>
                </article>
                <div className="modal fade show" id="createClub" tabIndex={-1} role="dialog" aria-labelledby="createClub" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create a club</h5>
                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form className="d-flex flex-column">
                                    <div className="d-flex align-items-end">
                                        <img src="/images/placeholder.png" width={300} height={150} className="img-thumbnail" style={{objectFit: 'cover'}} id="display-image" alt="club img" />
                                        <label htmlFor="club-img" className="btn btn-primary d-flex ms-3 min-content bg-color-primary"><i className="m-auto mx-2 fa-solid fa-arrow-up-from-bracket" />Upload</label>
                                        <input type="file" id="club-img" name="img" hidden accept="image/*" />
                                    </div>
                                    <label className="form-label mt-3" htmlFor="club-name">Club Name</label>
                                    <input className="form-control" type="text" required id="club-name" />
                                    <div className="d-flex mt-2 form-switch ps-0">
                                        <label className="form-check-label" htmlFor="club-private">Private</label>
                                        <input type="checkbox" className="ms-2 form-check-input" name="private" id="club-private" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary bg-color-primary">Create</button>
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