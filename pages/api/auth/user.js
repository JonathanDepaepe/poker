import withSession from '../../../lib/session'
import https from "https";

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if (user) {
        const userDataURL = `https://pokermanager.games/api/User/` + user.memberId;
        const refreshURL = `https://pokermanager.games/api/Auth/refresh-token`
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const currentTime = new Date();
        const tokenExpiration = new Date(user.expiration);
        const refreshExpiration = new Date(user.refreshExpiration);

        if (0 > (tokenExpiration - currentTime ) && 0 < (refreshExpiration - currentTime )){
            const res = await fetch(refreshURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                agent: httpsAgent,
                body:JSON.stringify({
                    accessToken: user.token,
                    refreshToken: user.refreshToken
                })
            }).then(function (response){ return response.json();}).then(async function (data) { return data})
            if (res.token !== null){
                user.token = res.token;
                user.expiration = res.expiration;
                user.refreshToken = res.refreshToken;
                req.session.set('user', user);
                await req.session.save();
            }
        }

        await fetch(userDataURL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + user.token,
            },
            agent: httpsAgent,
        }).then(function (response) {
            if (response.status !== 200){
                res.json({
                    isLoggedIn: false,
                })
            }else {
                return response.json()
            }
            }).then(async function (data) {
            if (data === null || user.token === null) {
                console.log("here")
                res.json({
                    isLoggedIn: false,
                })
            } else {
                const httpsAgent = new https.Agent({
                    rejectUnauthorized: false,
                });

                await fetch(`https://pokermanager.games/api/Club/MemberId/${user.memberId}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + user.token,
                    },
                    agent: httpsAgent,
                }).then((res) => res.json())
                    .then((Clubs) => {
                        user.clubs = Clubs;
                        user.data = data[0];
                        res.json({
                            isLoggedIn: true,
                            user,
                        })
                    })
            }
        });

    } else {
        console.log("toggled user logged out")
        res.json({
            isLoggedIn: false,
        })
    }
})