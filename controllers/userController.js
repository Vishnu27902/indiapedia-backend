const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const userModel = require("../models/userModel")
const stateModel = require("../models/stateModel")
const cityModel = require("../models/cityModel")
const timeFormatter = require("../helpers/timeFormatter")

const getUserData = async (req, res) => {
    const { username } = req.session
    try {
        const userData = await userModel.findOne({ _id: username }).exec()
        console.log(`User ${userData.name}'s data fetched Success`)
        res.status(200).json({
            success: true,
            message: `User ${userData.name}'s data fetched Success`,
            userData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(200).json({
            success: true,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const editUserData = async (req, res) => {
    const { username } = req.session
    let { name, email, img, phNumber } = req.body
    email = email.toLowerCase()
    const duplicateCheck = await userModel.findOne({ _id: email }).exec()
    if (username!==email && duplicateCheck) {
        console.log("Duplicate Entry")
        res.status(400).json({
            success: false,
            message: "Duplicate Entry"
        })
        return
    }
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    try {
        await userModel.updateOne({ _id: username }, {
            _id: email,
            name,
            img,
            phNumber
        })
        req.session.username = email
        console.log(`User with ID ${username} updated Successfully`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} updated Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const deleteUserSelf = async (req, res) => {
    const { username } = req.session
    try {
        await userModel.deleteOne({ _id: username })
        console.log(`User with ID ${username} deleted Successfully`)
        res.json({
            success: true,
            message: `User with ID ${username} deleted Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const checkUserPassword = async (req, res) => {
    const { username } = req.session
    const { password } = req.body
    const userData = await userModel.findOne({ _id: username })
    const passwordCheck = await bcrypt.compare(password, userData.password)
    if (passwordCheck) {
        console.log("Authorization Successful")
        res.status(200).json({
            success: true,
            message: "Authorization Successful"
        })
    }
    else {
        console.log("Authorization Failed")
        res.status(402).json({
            success: false,
            message: "Authorization Failed"
        })
    }
}

const changeUserPassword = async (req, res) => {
    const { username } = req.session
    let { password } = req.body
    try {
        password = await bcrypt.hash(password, 10)
        await userModel.updateOne({ _id: username }, {
            $set: {
                password
            }
        })
        console.log(`User's password with ID ${username} changed Successfully`)
        res.status(200).json({
            success: true,
            message: `User's password with ID ${username} changed Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const stateLike = async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    try {
        await stateModel.updateOne({ _id: id }, {
            $push: { "impression.usersLiked": username }
        })
        console.log(`User with ID ${username} liked the content of State with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} liked the content of State with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const stateDislike = async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    try {
        await stateModel.updateOne({ _id: id }, {
            $pull: { "impression.usersLiked": username }
        })
        console.log(`User with ID ${username} disliked the content of State with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} disliked the content of State with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const cityLike = async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    try {
        await cityModel.updateOne({ _id: id }, {
            $push: { "impression.usersLiked": username }
        })
        console.log(`User with ID ${username} liked the content of City with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} liked the content of City with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const cityDislike = async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    try {
        await cityModel.updateOne({ _id: id }, {
            $pull: { "impression.usersLiked": username }
        })
        console.log(`User with ID ${username} disliked the content of City with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} disliked the content of City with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const statePost = async (req, res) => {
    const { username } = req.session
    const { message } = req.body
    const { id } = req.params
    const _id = mongoose.Schema.Types.ObjectId
    const post = timeFormatter({ username, message, _id })
    try {
        await stateModel.updateOne({ _id: username }, {
            $push: { "impression.comment": post }
        })
        console.log(`User with ID ${username} commented on a state content with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} commented on a state content with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const statePostDelete = async (req, res) => {
    const { username } = req.session
    const { id, postID } = req.params
    try {
        await stateModel.updateOne({ _id: username, "impression.comment._id": postID }, {
            $pull: {
                "impression.comment.$._id": postID
            }
        })
        console.log(`User with ID ${username} deleted his/her comment on a state content with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} deleted his/her comment on a state content with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const cityPost = async (req, res) => {
    const { username } = req.session
    const { message } = req.body
    const { id } = req.params
    const _id = mongoose.Schema.Types.ObjectId
    const post = timeFormatter({ username, message, _id })
    try {
        await cityModel.updateOne({ _id: username }, {
            $push: { "impression.comment": post }
        })
        console.log(`User with ID ${username} commented on a city content with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} commented on a city content with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const cityPostDelete = async (req, res) => {
    const { username } = req.session
    const { id, postID } = req.params
    try {
        await cityModel.updateOne({ _id: username, "impression.comment._id": postID }, {
            $pull: {
                "impression.comment.$._id": postID
            }
        })
        console.log(`User with ID ${username} deleted his/her comment on a city content with ID ${id}`)
        res.status(200).json({
            success: true,
            message: `User with ID ${username} deleted his/her comment on a city content with ID ${id}`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

module.exports = { getUserData, editUserData, deleteUserSelf, checkUserPassword, changeUserPassword, stateLike, stateDislike, cityLike, cityDislike, statePost, statePostDelete, cityPost, cityPostDelete }