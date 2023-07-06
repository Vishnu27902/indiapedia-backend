const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userModel = require("../models/userModel")

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

const signUpController = async (req, res) => {
    let { name, email: _id, phNumber, password } = req.body
    _id = _id.toLowerCase()
    const duplicateCheck = await userModel.findOne({ _id })
    if (duplicateCheck) {
        console.error("Duplicate Entry")
        res.status(400).json({
            success: false,
            message: "Duplicate Entry"
        })
        return
    }
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    password = await bcrypt.hash(password, 10)
    try {
        await userModel.create({
            _id,
            name,
            phNumber,
            role: "user",
            password
        })
        console.log(`New User ${name} registered`)
        res.status(201).json({
            success: true,
            message: `New User ${name} registered`
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const signInController = async (req, res) => {
    let { username: _id, password } = req.body
    _id = _id.toLowerCase()
    const user = await userModel.findOne({ _id })
    if (!user) {
        console.error("No Such User Exists")
        res.status(400).json({
            success: false,
            message: "Check Username and Password"
        })
        return
    }
    passwordCheck = await bcrypt.compare(password, user.password)
    if (passwordCheck) {
        const ACCESS_TOKEN = jwt.sign(
            {
                username: user.name,
                phNumber: user.phNumber,
                email: user._id
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: "10m"
            }
        )
        const REFRESH_TOKEN = jwt.sign(
            {
                username: user.name,
                phNumber: user.phNumber,
                email: user._id
            },
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d"
            }
        )
        try {
            await userModel.updateOne({ _id }, { $set: { REFRESH_TOKEN } })
            res.cookie("jwt", REFRESH_TOKEN, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })
            console.log(`User ${user.name} logged in Successfully with the email ID ${user._id}`)
            req.session.username = _id
            res.status(201).json({
                success: true,
                message: "Login Successful",
                ACCESS_TOKEN,
                role: user.role
            })
        } catch (err) {
            console.error(err)
            res.status(409).json({
                success: false,
                message: `Error Occurred : ${err.message}`
            })
        }
    } else {
        console.error("Incorrect Password")
        res.status(400).json({
            success: false,
            message: "Check Username and Password"
        })
    }
}

const refreshController = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        console.log("Cookie not Found")
        res.status(401).json({
            success: false,
            message: "Cookie not Found"
        })
        return
    }
    const REFRESH_TOKEN = cookies.jwt
    const userData = await userModel.findOne({ REFRESH_TOKEN }).exec()
    if (!userData) {
        console.log("No User with Refresh Token Found")
        res.status(403).json({
            success: false,
            message: "No User with Refresh Token Found"
        })
        return
    }
    jwt.verify(
        REFRESH_TOKEN,
        REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("Access Token Expired")
                res.status(403).json({
                    success: false,
                    message: "Access Token Expired"
                })
            }
            const ACCESS_TOKEN = jwt.sign(
                {
                    username: decoded.username
                },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '10m'
                }
            )
            console.log("Access Token regenerated Successfully")
            res.status(200).json({
                success: true,
                message: "Access Token regenerated Successfully",
                ACCESS_TOKEN
            })
        }
    )
}

const logoutController = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        req.session.destroy()
        console.log("JWT Cookie Not Found")
        res.status(204).json({
            success: true,
            message: "JWT Cookie Not Found"
        })
        return
    }
    const REFRESH_TOKEN = cookies.jwt
    const userData = userModel.findOne({ REFRESH_TOKEN }).exec()
    if (!userData) {
        res.clearCookie("jwt", { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        req.session.destroy()
        console.log("No User with the Refresh Token Found")
        res.json(204).json({
            success: true,
            message: "No User with the Refresh Token Found"
        })
        return
    }
    try {
        await userModel.updateOne({ REFRESH_TOKEN }, {
            $unset: {
                REFRESH_TOKEN
            }
        })
        console.log("Cookies Cleared Successfully")
        res.clearCookie("jwt", { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        req.session.destroy()
        res.sendStatus(204)
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

module.exports = { signInController, signUpController, logoutController, refreshController }