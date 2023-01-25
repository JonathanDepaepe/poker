import https from "https";

export default async function handler(req, res) {
    const {clubId} =  req.query;
    const data = JSON.parse(req.body);
    const url = `${process.env.URL_API}/Club/ClubId/${clubId}/join/${data.user.memberId}`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resx = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + data.user.token,
        },
        agent: httpsAgent
    })
    return res.status(201).send()
}