import https from "https";

export default async function handler(req, res) {
    const body = req.body;
    const userInfo = JSON.parse(body)
    const url = `https://pokermanager.games/api/Club/MemberId/` + userInfo.User.user.memberId;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    const resx = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + userInfo.User.user.token,
        },
        agent: httpsAgent
    })
    return res.status(200).json(await resx.json())
}

