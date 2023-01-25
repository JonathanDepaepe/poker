import https from "https";

const post = async (req, res) => {
    const {clubId} =  req.query
    const body = JSON.parse(req.body);
    const url = `${process.env.URL_API}/Announcement`;
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
            clubId: clubId,
            creatorId : body.user.user.memberId,
            title: body.title,
            description: body.description,
            newAnnouncement: "true"
        }),
        agent: httpsAgent
    })
    return res.status(200).json(await resx.json())
}

const get = async (req, res) => {
    const {clubId} =  req.query
    const header = req.headers;
    const body = req.body;
    const token = header.authorization.split(" ")[1];
    const url = `${process.env.URL_API}/Announcement/${clubId}/Announcements`;
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
    const body = req.body;
    const header = req.headers;
    const token = header.authorization.split(" ")[1];
    const url = `${process.env.URL_API}/Announcement/DeleteAnnouncement`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: body
        ,
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