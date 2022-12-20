
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
    const login = JSON.parse(req.body);
    const url = `http://localhost:4000/api/login`;

    try {
        const loginInfo = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: login.username,
                Password: login.password
            }),
        })
        const { memberId, token, refreshToken } = "null";
        console.log(loginInfo.body)

        const user = { isLoggedIn: true, memberId, token, refreshToken };
        req.session.set('user', user);
        //console.log(req.session);
        await req.session.save();
        res.json(user);
    } catch (error) {
        const { response: fetchResponse } = error;
        console.error("error in login api :")
        console.error(error)
        res.status(fetchResponse?.status || 500).json(error.data);
    }
});