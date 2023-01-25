import https from "https";

export default async function handler(req, res) {
    const urlLeague = `${process.env.URL_API}/League/public`;
    const urlClub = `${process.env.URL_API}/Club/public`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(urlLeague, {agent: httpsAgent}).then((res) => res.json())
        .then(async (leagues) => {
            await fetch(urlClub, {agent: httpsAgent}).then((res) => res.json())
                .then((clubs) => {
                    for (let league of leagues){
                        for (let club of clubs){
                            if (league.clubId === club.clubId){
                                league.club = club;
                                break;
                            }
                        }
                    }
                    return res.status(200).json(leagues);
                })
        })
        }



