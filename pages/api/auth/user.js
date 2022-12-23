import withSession from '../../../lib/session'
import https from "https";

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if (user) {
        const url = `https://pokermanager.games/api/User/` + user.memberId;
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + user.token,
            },
            agent: httpsAgent,
        }).then(function (response) {
            if (response.status !== 200){
                return null;
            }else {
                return response.json()
            }
            }).then(async function (data) {
            if (data === null) {
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