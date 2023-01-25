import https from "https";

export default async function handler(req, res) {
    const {leagueID} = req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const url = `${process.env.URL_API}/League/` + leagueID;
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
    const league = await resx.json();
    const totalScorePlayers = [];
    const tableBody = [];
    league[0].tournaments.sort(function (a,b){return new Date(a.startDateTime) - new Date(b.startDateTime)})
    for (let tournament of league[0].tournaments) {
        const resY = await fetch(`${process.env.URL_API}/Tournament/` + tournament.tournamentId + "/results", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            agent: httpsAgent
        })
        tournament.data = await resY.json();
        for (let member of tournament.data.tournamentResults) {
            let hasScore = false;
            for (let score of totalScorePlayers) {
                if (score.memberId === member.memberId) {
                    score.points += member.points;
                    hasScore = true;
                }
            }
            if (!hasScore) {
                totalScorePlayers.push({nickname:member.name, memberId: member.memberId, points: member.points})
            }
        }
        totalScorePlayers.sort(function (a, b) {
            return b.points - a.points
        })
    }
        for (let member of totalScorePlayers){
            let memberRow = {nickname: member.nickname, tournaments: [], total: member.points}
            for (let tournament of league[0].tournaments){
                let hasMember = false;
                for (let joinedMembers of tournament.data.tournamentResults) {
                    if (joinedMembers.memberId === member.memberId) {
                        memberRow.tournaments.push(joinedMembers.points)
                        hasMember = true;
                    }
                }
            if(!hasMember) {
                    memberRow.tournaments.push("-")
                }
            }
            tableBody.push(memberRow)
        }
    league[0].totalsPlayers = tableBody;
    return res.status(200).json(league)

}