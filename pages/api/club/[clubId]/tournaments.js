import https from "https";

export default async function handler(req, res) {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const urlTournament = `https://pokermanager.games/api/Tournament/ClubTournaments/${clubId}`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(urlTournament, {
            agent: httpsAgent,
        headers: {
            'Authorization': "Bearer " + token,
        },
    }).then((res) => res.json())
        .then( (tournaments) => {
            return res.status(200).json(tournaments);
        })
}
