import https from "https";

export default async function handler(req, res) {
    const urlTournament = `https://pokermanager.games/api/Tournament/public`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(urlTournament, {agent: httpsAgent}).then((res) => res.json())
        .then( (tournaments) => {
                    for (let tour of tournaments){
                        const tourTime = new Date(tour.startDateTime);
                        const nowTime = new Date();
                        tour.ended = (tourTime-nowTime) < 1;
                    }
                    return res.status(200).json(tournaments);
        })
}
