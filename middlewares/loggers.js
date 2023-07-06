const path = require("path")
const fs = require("fs")
const { format } = require("date-fns")

const loginLogger = (req, res, next) => {
    const { name } = req.body
    const txt = `${name} tried to sign in at ${format(new Date(), "yyyy-MM-dd HH.mm.ss a").toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}\n`
    fs.appendFileSync(path.join(__dirname, "..", "logs", "loginLogger.txt"), txt)
    console.log("Logs Updated Successfully")
    next()
}

const registerLogger = (req, res, next) => {
    const { name, email, phNumber } = req.body
    const txt = `${name} tried to sign up at ${format(new Date(), "yyyy-MM-dd HH.mm.ss a").toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })} with email ${email} and Phone Number ${phNumber}\n`
    fs.appendFileSync(path.join(__dirname, "..", "logs", "registerLogger.txt"), txt)
    console.log("Logs Updated Successfully")
    next()
}

module.exports = { loginLogger, registerLogger }