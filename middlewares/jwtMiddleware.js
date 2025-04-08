const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    const accessToken = req.headers['authorization'].split(" ")[1]
    if (accessToken) {
        try {
            const jwtResponse = jwt.verify(accessToken, process.env.JWTPASSWORD)
            req.userId = jwtResponse.userId
            next()
        } catch (err) {
            res.status(401).status("Authorization failed")
        }
    } else {
        res.status(400).json("Authorization Failed...Token Missing")
    }
}

module.exports = jwtMiddleware