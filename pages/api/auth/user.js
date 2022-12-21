import withSession from '../../../lib/session'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    console.log("toggled user")
    if (user) {
        console.log("toggled user logged in")
        res.json({
            isLoggedIn: true,
            ...user,
        })
    } else {
        console.log("toggled user logged out")
        res.json({
            isLoggedIn: false,
        })
    }
})