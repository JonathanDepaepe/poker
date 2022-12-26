import https from "https";


export default async function handler(req, res) {
    const body = req.body;

    const url = `https://pokermanager.games/api/Auth/register`;
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const userInfo =  JSON.parse(body)
    let registerRes = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        agent: httpsAgent,
        body: JSON.stringify({
            Username: userInfo.username,
            Email: userInfo.email,
            Password: userInfo.password
        }),
    });
    const register = await registerRes.json();
    console.log(register)
    if (registerRes.status === 400) {
        res.status(400).json(register);
    } else if (registerRes.status === 200) {
        res.status(200).send("success");
    }
}
