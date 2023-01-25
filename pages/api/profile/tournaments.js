import https from "https";

export default async function handler(req, res) {
    const header = req.headers;
    const {memberId} = req.query;
    console.log(memberId)
    const token = header.authorization.split(" ")[1];
    const allTournaments = await getAllTournaments(token);
    let userTournaments = [];
    for (let tournament of allTournaments){
        for (let members of tournament.tournamentEntrys){
            if (members.memberId === memberId){
                userTournaments.push(tournament)
            }
        }
    }
    return res.status(200).send(userTournaments);
}

const getAllTournaments = async (token) => {
    const urlTournament = `${process.env.URL_API}/Tournament/`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const res = await fetch(urlTournament, {
        agent: httpsAgent,
        headers: {
            'Authorization': "Bearer " + token,
        },
    })
    return await res.json();
}