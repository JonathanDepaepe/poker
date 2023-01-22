import https from "https";

export default async function handler(req, res) {
    const {leagueID} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const url = `https://pokermanager.games/api/League/` + leagueID;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resx = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent
    })
    return res.status(200).json(await resx.json())
}
