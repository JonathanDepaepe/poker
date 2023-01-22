import https from "https";

const post = async (req, res) => {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const body = JSON.parse(req.body);
    const urlLeague = `https://pokermanager.games/api/League`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(urlLeague, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent,
        body: JSON.stringify({
            clubId,
            name: body.name,
            description: body.description,
            public: !body.isPrivate
        })
    }).then((resx) =>{
        return res.status(resx.status).send();
        })
}

const get = async (req, res) => {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const urlLeague = `https://pokermanager.games/api/League/Club=${clubId}`;
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
            return res.status(200).json(leagues);
        })
}

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "GET"
            ? get(req, res)
                : res.status(404).send("");
};