import https from "https";

export default async function handler(req, res) {
    const body = req.body;
    const userInfo = JSON.parse(body)
    const url = `${process.env.URL_API}/Club/MemberId/` + userInfo.User.user.memberId;
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
    const clubs = await resx.json()
    for (let club of clubs){
        await fetch(`${process.env.URL_API}/Club/ClubId/${club.clubId}/members`, {agent: httpsAgent}).then((res) => res.json())
            .then(async (members) => {
                club.totalMembers = members.length
            })
    }
    return res.status(200).json(clubs)
}

