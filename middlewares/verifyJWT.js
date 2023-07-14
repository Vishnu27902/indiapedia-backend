const jwt = require("jsonwebtoken")
const { ACCESS_TOKEN_SECRET } = process.env

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        console.log("Auth Header not set")
        res.status(401).json({ success: false, message: "Auth Header not set" })
        return
    }
    const ACCESS_TOKEN = authHeader.split(" ")[1]
    jwt.verify(
        ACCESS_TOKEN,
        ACCESS_TOKEN_SECRET,
        (err, decodedData) => {
            if (err) {
                console.error("Token Expired")
                res.status(403).json({ success: false, message: "Token Expired" })
                return
            }
            console.log("Token verified Successfully")
            next()
        }
    )
}

module.exports = verifyJWT