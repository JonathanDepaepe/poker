import Head from 'next/head'
import Link from "next/link";

import React, {useState} from 'react';
import { FormattedMessage, useIntl } from "react-intl";

import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useRouter} from 'next/router';
import {NavTop} from "../components/navigation/navTop";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from "next/image";

// @ts-ignore
export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const intl = useIntl();

    return (
        <>
            <Head>
                <title>Poker Manager | Club</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <NavTop/>
            </div>
            <main>
                <div className={"d-flex ms-auto me-auto fit-content mt-4 rounded w-56r shadow p-5"}>
                    <Image className={"mt-auto mb-auto me-4"} src={"/images/playing_cards.svg"}
                           alt={"Playing card image"} width={460} height={327}/>
                    <div className={"w-100"}>
                        <Tabs
                            defaultActiveKey="login"
                            id="uncontrolled-tab-example"
                            className="tab-layout w-100"
                        >
                            <Tab eventKey="login" title={intl.formatMessage({ id: "page.login.login" })} className={"h-100"}>
                                <div className={"form d-flex mr-auto ml-auto flex-col h-100 w-100 w-6/12"}>

                                    <Formik
                                        initialValues={{username: '', password: ''}}
                                        validationSchema={Yup.object({
                                            username: Yup.string()
                                                .max(30, 'Must be 30 characters or less')
                                                .required('Please enter your username'),
                                            password: Yup.string().required('Please enter your password'),
                                        })}
                                        onSubmit={async (values, {setSubmitting}) => {
                                            try {
                                                const res = await fetch('/api/auth/login', {
                                                    method: 'post',
                                                    body: JSON.stringify({
                                                        redirect: false,
                                                        username: values.username,
                                                        password: values.password,
                                                        callbackUrl: `${window.location.origin}`,
                                                    })
                                                });
                                                if (res.status === 200) {
                                                    setError(null);
                                                    return router.push("/");
                                                } else {
                                                    setError("Username or password is invalid");
                                                }

                                            } catch (error) {
                                                console.error('An unexpected error happened:', error)
                                                setError(error);
                                            }
                                        }}
                                    >
                                        {(formik) => (

                                            <form className={"d-flex flex-column justify-content-between w-100"} onSubmit={formik.handleSubmit}>
                                                <div>
                                                <div className="text-danger text-center rounded p-2">
                                                    {error}
                                                </div>
                                                <label
                                                    htmlFor="username"
                                                    className="d-flex flex-row mb-2 mt-3"
                                                >
                                                    {intl.formatMessage({ id: "page.login.username" })}
                                                    <Field
                                                        name="username"
                                                        aria-label="enter your username"
                                                        aria-required="true"
                                                        type="text"
                                                        className="border-0 border-bottom ms-auto"
                                                    />
                                                </label>
                                                <div className="text-danger">
                                                    <ErrorMessage name="username"/>
                                                </div>
                                                <label
                                                    htmlFor="password"
                                                    className="d-flex flex-row mb-2 mt-3"
                                                >
                                                    {intl.formatMessage({ id: "page.login.password" })}
                                                    <Field
                                                        name="password"
                                                        aria-label="enter your password"
                                                        aria-required="true"
                                                        type="password"
                                                        className="border-0 border-bottom ms-auto"
                                                    />
                                                </label>

                                                <div className="text-red-600 text-sm">
                                                    <ErrorMessage name="password"/>
                                                </div>
                                                </div>
                                                <div className={"d-flex flex-column text-center"}>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block mb-4 bg-color-primary"
                                                    >
                                                        {formik.isSubmitting ? 'Please wait...' : intl.formatMessage({ id: "page.login.login" })}
                                                    </button>
                                                </div>
                                            </form>

                                        )}
                                    </Formik>
                                </div>
                            </Tab>
                            <Tab eventKey="register" title={intl.formatMessage({ id: "page.login.register" })} className={"h-100"}>
                                <Formik
                                    initialValues={{username: '',email: '', password: '', conPassword: ''}}
                                    validationSchema={Yup.object({
                                        username: Yup.string()
                                            .max(30, 'Must be 30 characters or less')
                                            .required('Please enter your username'),
                                        email: Yup.string().email().required('Please enter your email'),
                                        password: Yup.string().required('Please enter your password').matches(
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                                        ),
                                        conPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm password'),
                                    })}
                                    onSubmit={async (values, {setSubmitting}) => {
                                        try {
                                            const res = await fetch('/api/auth/register', {
                                                method: 'post',
                                                body: JSON.stringify({
                                                    redirect: false,
                                                    username: values.username,
                                                    email: values.email,
                                                    password: values.password,
                                                })
                                            });
                                            if (res.status === 200) {
                                                setError(null);
                                                return router.reload();
                                            } else {
                                                setError("something went wrong");
                                            }

                                        } catch (error) {
                                            console.error('An unexpected error happened:', error)
                                            setError(error);
                                        }
                                    }}
                                >
                                    {(formik) => (
                                        <form className={'d-flex flex-column justify-content-between h-100 w-100'} onSubmit={formik.handleSubmit}>
                                            <div>
                                            <label
                                                htmlFor="username"
                                                className="d-flex flex-row mb-2 mt-3"
                                            >
                                                {intl.formatMessage({ id: "page.login.username" })}
                                                <Field
                                                    name="username"
                                                    aria-label="enter your username"
                                                    aria-required="true"
                                                    type="text"
                                                    className="border-0 border-bottom ms-auto"
                                                />
                                            </label>
                                            <div className="text-danger">
                                                <ErrorMessage name="username"/>
                                            </div>
                                            <label
                                                htmlFor="email"
                                                className="d-flex flex-row mb-2"
                                            >
                                                {intl.formatMessage({ id: "page.login.email" })}
                                                <Field
                                                    name="email"
                                                    aria-label="enter your Email"
                                                    aria-required="true"
                                                    type="email"
                                                    className="border-0 border-bottom ms-auto"
                                                />
                                            </label>
                                            <div className="text-danger">
                                                <ErrorMessage name="email"/>
                                            </div>
                                            <label
                                                htmlFor="password"
                                                className="d-flex flex-row mb-2"
                                            >
                                                {intl.formatMessage({ id: "page.login.password" })}
                                                <Field
                                                    name="password"
                                                    aria-label="enter your password"
                                                    aria-required="true"
                                                    type="password"
                                                    className="border-0 border-bottom ms-auto"
                                                />
                                            </label>
                                            <div className="text-danger">
                                                <ErrorMessage name="password"/>
                                            </div>
                                            <label
                                                htmlFor="conPassword"
                                                className="d-flex flex-row mb-2"
                                            >
                                                {intl.formatMessage({ id: "page.login.confPassword" })}
                                                <Field
                                                    name="conPassword"
                                                    aria-label="Confirm Password"
                                                    aria-required="true"
                                                    type="password"
                                                    className="border-0 border-bottom ms-auto"
                                                />
                                            </label>
                                            <div className="text-danger">
                                                <ErrorMessage name="conPassword"/>
                                            </div>
                                            </div>
                                            <div class="text-center  d-flex flex-column">

                                                <button type="submit"
                                                        className="btn btn-primary mt-3 border-0 bg-color-primary btn-block mb-4">{formik.isSubmitting ? 'Please wait...' : intl.formatMessage({ id: "page.login.create" })}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </main>

        </>
    )
}