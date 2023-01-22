import https from "https";
import has from "lodash/has";

export default async function handler(req, res) {
    const {tournamentID} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const body = JSON.parse(req.body);
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    const urlJoin = `https://pokermanager.games/api/Tournament/DeletePlayerFromTournament?tournamentId=${tournamentID}&memberId=${body.memberId}`;
    await fetch(urlJoin, {
        headers: {
            'Authorization': "Bearer " + token,
        },
        method:"DELETE",
        agent: httpsAgent,
    }).then((resx) => {return res.status(resx.status).send()})
}



