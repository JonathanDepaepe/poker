import https from "https";

export default async function handler(req, res) {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const urlLeague = `${process.env.URL_API}/League/Club=${clubId}`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(urlLeague, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent
    }).then((res) => res.json())
        .then(async (leagues) => {
            let planning = [];
            for (let league of leagues){
                if (league.tournaments.length === 0){
                    break;
                }
                let tournaments = [];
                for (let tournament of league.tournaments){
                    const currentDate = new Date();
                    const tournamentDate = new Date(tournament.startDateTime);
                    if ((tournamentDate - currentDate) > 0 ){
                        planning.push({name: tournament.name, date: new Date(tournament.startDateTime).toLocaleString("be", {dateStyle: "short", timeStyle: "short"}), upComingDate: tournament.startDateTime, type:"tournaments"})
                    }
                    tournaments.push(tournament)
                }
                tournaments.sort(function(a,b){return new Date(a.startDateTime) - new Date(b.startDateTime)})
                league.date = "" + new Date(tournaments[0].startDateTime).toLocaleString("be", {dateStyle: "short", timeStyle: "short"})  + " / " + new Date(tournaments[tournaments.length-1].startDateTime).toLocaleString("be", {dateStyle: "short", timeStyle: "short"});
                for (let date of tournaments){ // zoeken naar een datum in de toekomst
                    const currentDate = new Date();
                    const tournamentDate = new Date(date.startDateTime);
                    if ((tournamentDate - currentDate) > 0 ){
                        league.upComingDate = date.startDateTime
                        break;
                    }
                }
                if (league.upComingDate === undefined){ // als er geen datum in de toekomst is
                    break;
                }
                else{
                    planning.push({name: league.name, date: league.date, upComingDate: league.upComingDate, type:"leagues"})
                }
            }
            return res.status(200).json(planning.slice(0,4));
        })

}