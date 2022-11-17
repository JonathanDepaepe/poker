import {NavTop} from "../components/navigation/navTop";
import Head from "next/head";

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
            <main className="w-100">
                <div id="login-register" className="m-auto w mt-2 w-50 bg-white rounded-3 p-4">
                    <ul className=" nav nav-pills nav-justified border-1 mb-3">
                        <li className="nav-item">
                            <a className="nav-link color-primary" id="tab-login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active color-primary" id="tab-register">Register</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="login-form" className="tab-pane fade">
                            <form>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="loginName">Email</label>
                                    <input type="email" placeholder="Your email" id="loginName" className="form-control border-0" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                    <input type="password" placeholder="Your password" id="loginPassword" className="form-control border-0" />
                                </div>
                                <div className="text-center  d-flex flex-column">
                                    <button type="submit" className="btn btn-primary btn-block mb-2 bg-color-primary">Sign in</button>
                                    <p>or:</p>
                                    <button type="button" className="btn btn-primary btn-block mb-2 bg-color-primary">
                                        <i className="fab fa-google" /> Login with Google
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div id="register-form" className="tab-pane hiding show active">
                            <form>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="registerName">Name</label>
                                    <input type="text" placeholder="Your Name" id="registerName" className="form-control border-0" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="registerUsername">Username</label>
                                    <input type="text" placeholder="Your Username" id="registerUsername" className="form-control border-0" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="registerEmail">Email</label>
                                    <input type="email" placeholder="Your Email" id="registerEmail" className="form-control border-0" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                    <input type="password" placeholder="Your Password" id="registerPassword" className="form-control border-0" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                                    <input type="password" placeholder="Your Repeat password" id="registerRepeatPassword" className="form-control border-0" />
                                </div>
                                <div className="form-check d-flex justify-content-center mb-3">
                                    <input className="form-check-input me-2 " type="checkbox" defaultValue id="registerCheck" defaultChecked aria-describedby="registerCheckHelpText" />
                                    <label className="form-check-label" htmlFor="registerCheck">
                                        I have read and agree to the terms
                                    </label>
                                </div>
                                <div className="text-center  d-flex flex-column">
                                    <button type="submit" className="btn btn-primary border-0 bg-color-primary btn-block mb-2">Sign in</button>
                                    <p>or:</p>
                                    <button type="button" className="btn btn-primary border-0 bg-color-primary btn-block mb-2">
                                        <i className="fab fa-google" /> Register with Google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}