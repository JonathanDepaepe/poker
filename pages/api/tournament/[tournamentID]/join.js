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

    const URL = `${process.env.URL_API}/Tournament/` + tournamentID;
    const resx = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent
    })
    const tournament = await resx.json();
    if (!checkIfInClub(tournament[0], body.user)){
        return res.status(400).send()
    }

    const seatNumber = await calculateSeat(tournament[0]);
    const urlJoin = `${process.env.URL_API}/Tournament/Reservation?tournamentId=${tournamentID}&memberId=${body.memberId}&seatNumber=${seatNumber}`;
    await fetch(urlJoin, {
        headers: {
            'Authorization': "Bearer " + token,
        },
        method:"post",
        agent: httpsAgent,
    }).then((resx) => {return res.status(resx.status).send()})
}

const checkIfInClub = (tournament, user) => {
    let hasClub = false;
    for (let clubs of user.user.clubs){
        if (tournament.clubId === clubs.clubId){
            hasClub = true;
        }
    }
    return hasClub;
}

const calculateSeat = (tournament) => {
    const attendees = tournament.tournamentEntrys;
    if (attendees.length === 0){
        return 0;
    }
    attendees.sort(function (a, b) {return a.seatNumber - b.seatNumber});
    for (let i = 0; i < attendees.length; i++){
        if (attendees[i].seatNumber !== (i + 1)){
            return (i + 1)
        }
    }
    return (attendees.length + 1)
}



