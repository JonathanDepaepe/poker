import https from "https";

export default async function handler(req, res) {
    const data = JSON.parse(req.body);
    const url = `https://pokermanager.games/api/Club/JoinClubInvite?inviteHash=${data.inviteCode}&memberId=${data.user.user.memberId}`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resx = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + data.user.user.token,
        },
        agent: httpsAgent
    })
    if (resx.status !== 200){
        return res.status(500).send()
    }else{
        return res.status(201).send()
    }

}