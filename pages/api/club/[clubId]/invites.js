import https from "https";

const post = async (req, res) => {
    const {clubId} =  req.query
    const body = JSON.parse(req.body);
    const url = `${process.env.URL_API}/Club/CreateClubInvite`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resx = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + body.user.user.token,
        },
        body: JSON.stringify({
            creatorId: body.user.user.memberId,
            memberId : body.memberId,
            clubId: clubId,
            role: "1",
            duration: parseInt(body.days)
        }),
        agent: httpsAgent
    })
    console.log(resx)
    const response = await resx.json()
    console.log(response)
    return res.status(200).json(response)
}

const get = async (req, res) => {
    const {clubId} =  req.query
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const url = `${process.env.URL_API}/Club/ClubId/${clubId}/Invitations`;
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
    const news = await resx.json();
    return res.status(200).json(news)
}

const deleteReq = async (req, res) => {
    const body = JSON.parse(req.body);
    const {clubId} =  req.query
    const memberId = body.user.user.memberId
    const inviteCode = body.inviteCode;

    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const url = `${process.env.URL_API}/Club/DeleteClubInvite?clubId=${clubId}&memberID=${memberId}&hash=${inviteCode}`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        agent: httpsAgent
    })
    return res.status(201).send("");
}

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "GET"
            ? get(req, res):
            req.method === "DELETE"?
                deleteReq(req, res)
                : res.status(404).send("");
};