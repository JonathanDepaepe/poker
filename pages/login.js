import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";

import {useState} from 'react';

import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useRouter} from 'next/router';
import {NavTop} from "../components/navigation/navTop";

// @ts-ignore
export default function SignIn({user}) {
    const router = useRouter();
    const [error, setError] = useState(null);


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

                <div className={"d-flex mr-auto ml-auto flex-col w-6/12"}>
                    <h2 className={"mr-auto p-5 mb-2 ml-auto text-black text-2xl"}>Login</h2>
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
                                if (res.status === 201){
                                    setError(null);
                                    return router.push("/");
                                }else{
                                    setError("Username or password is invalid");
                                }

                            } catch (error) {
                                console.error('An unexpected error happened:', error)
                                setError(error);
                            }
                        }}
                    >
                        {(formik) => (

                            <form className={"flex flex-col "} onSubmit={formik.handleSubmit}>
                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <label
                                    htmlFor="username"
                                    className="uppercase text-sm text-gray-600 font-bold"
                                >
                                    Username
                                    <Field
                                        name="username"
                                        aria-label="enter your username"
                                        aria-required="true"
                                        type="text"
                                        className="bg-gray-50 mt-3 mb-5 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-slate-50 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </label>
                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="username"/>
                                </div>
                                <label
                                    htmlFor="password"
                                    className="uppercase text-sm text-gray-600 font-bold"
                                >
                                    password
                                    <Field
                                        name="password"
                                        aria-label="enter your password"
                                        aria-required="true"
                                        type="password"
                                        className="bg-gray-50 mb-5 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-50 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </label>

                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="password"/>
                                </div>

                                <button
                                    type="submit"
                                    className="ml-auto mr-auto text-black underline"
                                >
                                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                </button>
                                <Link className={"ml-auto mr-auto text-black underline"} href={"/register"}>Create
                                    an account</Link>

                            </form>

                        )}
                    </Formik>
                </div>
            </main>

        </>
    )
}