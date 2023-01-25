import https from "https";

export default async function handler(req, res) {
    const {tournamentID} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const URL = `${process.env.URL_API}/Tournament/` + tournamentID;
    const userURL = `${process.env.URL_API}/User/` ;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resx = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent
    })
    let tournament = await resx.json();
    for (let member of tournament[0].tournamentEntrys){
        const resY = await fetch(userURL + member.memberId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            agent: httpsAgent
        })
        member.info = await resY.json();
    }

    return res.status(200).json(tournament)
}