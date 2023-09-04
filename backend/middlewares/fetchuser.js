const jwt = require('jsonwebtoken')
const JWT_SECRET = "Godzilla@8126"

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");

    if(!token) {
        return res.status(401).send({error: "please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET) // will verify and fetch the data from the json web token which we provided to it
        req.user = data.userId // fetch the userId from the data object
        next() // instantiate the next middleware function
    } catch (error) {
        return res.status(401).send({error: "please authenticate using a valid token"})
    }
}

module.exports = fetchUser