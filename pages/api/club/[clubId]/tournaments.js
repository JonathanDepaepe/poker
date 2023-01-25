import https from "https";

const get = async (req, res) => {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const urlTournament = `${process.env.URL_API}/Tournament/ClubTournaments/${clubId}`;
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

const post = async (req, res) => {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const body = JSON.parse(req.body);
    const url = `${process.env.URL_API}/Tournament?clubId=${clubId}&leagueId=${body.leagueId}&creatorId=${body.memberId}`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(url, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent,
        body: JSON.stringify({
            public: !body.isPrivate,
            name: body.name,
            description: "",
            status:"0",
            startDateTime: body.date,
            location: body.place,
            maxPlayerCount: parseInt(body.maxPlayers)
        })
    }).then((resx) =>{
        return res.status(resx.status).send();
    })
}


export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "GET"
            ? get(req, res)
            : res.status(404).send("");
};
