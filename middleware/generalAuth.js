const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send({ success: false, message: 'Authorization denied.' })
    }

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, validToken) => {
        if (error) {
            return res.status(400).send({ success: false, message: 'Invalid token.' })
        } else {
            req.user = validToken
            next()
        }
    })
}
