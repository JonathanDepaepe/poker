import https from "https";

export default async function handler(req, res) {
    const urlTournament = `${process.env.URL_API}/Tournament/public`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(urlTournament, {agent: httpsAgent}).then((res) => res.json())
        .then( (tournaments) => {
            return res.status(200).json(tournaments);
        })
}
