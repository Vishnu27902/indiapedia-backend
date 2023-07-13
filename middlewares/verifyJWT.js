const jwt = require("jsonwebtoken")
const { ACCESS_TOKEN_SECRET } = process.env

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        res.status(401).json({ success: false, message: "Auth Header not set" })
        return
    }
    const ACCESS_TOKEN = authHeader.split(" ")[1]
    jwt.verify(
        ACCESS_TOKEN,
        ACCESS_TOKEN_SECRET,
        (err, decodedData) => {
            if (err) {
                res.status(403).json({ success: false, message: "Token Expired" })
                console.error("Token Expired")
                return
            }
            console.log("Token verified Successfully")
            next()
        }
    )
}

module.exports = verifyJWT