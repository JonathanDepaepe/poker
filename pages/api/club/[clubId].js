import https from "https";

export default async function handler(req, res) {
    const {clubId} =  req.query
    const body = req.body;
    const url = `${process.env.URL_API}/Club/ClubId/` + clubId;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resx = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + body.user.user.token,
        },
        agent: httpsAgent
    })
    return res.status(200).json(await resx.json())
}

