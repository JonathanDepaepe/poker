import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'


export default async function useUser({
                                          redirectTo = false,
                                          redirectIfFound = false,
                                      } = {}) {
    const data = await fetch('/api/auth/user').then((res) => res.json())
        .then((data) => {


            return {user:data}

        })

}