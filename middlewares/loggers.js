const path = require("path")
const fs = require("fs")
const { format } = require("date-fns")

const loginLogger = (req, res, next) => {
    const { name } = req.body
    if (fs.existsSync(path.join(__dirname, "logs", "loginLogger.txt"))) {
        const txt = `${name} tried to sign in at ${format(new Date(), "yyyy-MM-dd").toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}\n`
        fs.appendFileSync(path.join(__dirname, "logs", "loginLogger.txt"), txt)
    } else {
        fs.appendFileSync(path.join(__dirname, "logs", "loginLogger.txt"), "")
    }
    next()
}

const registerLogger = (req, res, next) => {
    const { name, email, phNumber } = req.body
    if (fs.existsSync(path.join(__dirname, "logs", "registerLogger.txt"))) {
        const txt = `${name} tried to sign up at ${format(new Date(), "yyyy-MM-dd").toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })} with email ${email} and Phone Number ${phNumber}\n`
        fs.appendFileSync(path.join(__dirname, "logs", "registerLogger.txt"), txt)
    } else {
        fs.appendFileSync(path.join(__dirname, "logs", "registerLogger.txt"), "")
    }
    next()
}

module.exports = { loginLogger, registerLogger }