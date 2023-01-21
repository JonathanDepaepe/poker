
import withSession from '../../../lib/session';
import https from "https";
import {error} from "next/dist/build/output/log";



export default withSession(async (req, res) => {
    const login = JSON.parse(req.body);
    const url = `https://pokermanager.games/api/Auth/login`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });


    try {
        const loginInfo = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            agent: httpsAgent,
            body: JSON.stringify({
                Username: login.username,
                Password: login.password
            }),

        }).then(function (response){ return response.json();}).then(async function (data) {
            if (data.status === 401){
                throw new Error("invalid username or password")
            }
            const user = {
                isLoggedIn: true,
                memberId: data.memberId,
                token: data.token,
                refreshToken: data.refreshToken,
                expiration: data.expiration,
                refreshExpiration: data.refreshExpiration
            };
            req.session.set('user', user);
            await req.session.save();
            res.json(user);
        })
    } catch (error) {
        console.error("error in login api :")
        console.error(error)
        res.status(401).json(error);
    }
});