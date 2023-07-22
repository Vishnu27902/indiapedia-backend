const bcrypt = require("bcrypt")

const stateModel = require("../models/stateModel.js")
const cityModel = require("../models/cityModel.js")
const userModel = require("../models/userModel.js")

const addState = async (req, res) => {
    const { code, name, img, mainContent } = req.body
    const duplicateCheck = await stateModel.findOne({ _id: code }).exec()
    if (duplicateCheck) {
        console.log("Duplicate Entry")
        res.status(400).json({
            success: false,
            message: "Duplicate Entry"
        })
        return
    }
    try {
        await stateModel.create({
            _id: code,
            name,
            img,
            mainContent
        })
        console.log(`New State ${name} with state code ${code} added successfully`)
        res.status(201).json({
            success: true,
            message: `New State ${name} with state code ${code} added successfully`
        })
    } catch (err) {
        console.log(`Error Occurred ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred ${err.message}`
        })
    }
}

const addCity = async (req, res) => {
    const { code, name, img, state, mainContent } = req.body
    const duplicateCheck = await cityModel.findOne({ _id: code }).exec()
    if (duplicateCheck) {
        console.log("Duplicate Entry")
        res.send(400).json({ success: false, message: "Duplicate Entry" })
        return
    }
    try {
        await cityModel.create({
            _id: code,
            name,
            state,
            img,
            mainContent
        })
        console.log(`New City ${name} added with City code ${code}`)
        res.status(201).json({
            success: true,
            message: `New City ${name} added with City code ${code}`
        })
    } catch (err) {
        console.log(`Error Occurred ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred ${err.message}`
        })
    }
}

const getState = async (req, res) => {
    const { id } = req.params
    try {
        const stateData = await stateModel.findOne({ _id: id }).exec()
        console.log(`State ${stateData.name} fetched Successfully`)
        res.status(200).json({
            success: true,
            message: `State ${stateData.name} fetched Successfully`,
            stateData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const getCity = async (req, res) => {
    const { id } = req.params
    const cityData = await cityModel.findOne({ _id: id }).exec()
    console.log(`City ${cityData.name} fetched Successfully`)
    res.status(200).json({
        success: true,
        message: `City ${cityData.name} fetched Successfully`,
        cityData
    })
}

const editState = async (req, res) => {
    const { id } = req.params
    const { code, name, img, mainContent } = req.body
    const stateData = await stateModel.findOne({ _id: id }).exec()
    if (!stateData) {
        console.log(`No State with the state id ${id} exists`)
        res.status(400).json({ success: false, message: `No State with the state id ${id} exists` })
        return
    }
    try {
        await stateModel.updateOne({ _id: id }, {
            $set: {
                _id: code,
                name,
                img,
                mainContent
            }
        })
        console.log(`State ${stateData.name} with state code ${stateData._id} updated successfully`)
        res.status(200).json({
            success: true,
            message: `State ${stateData.name} with state code ${stateData._id} updated successfully`
        })
    } catch (err) {
        console.log(`Error Occurred ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred ${err.message}`
        })
    }
}

const editCity = async (req, res) => {
    const { id } = req.params
    const { code, name, img, state, mainContent } = req.body
    const cityData = await cityModel.findOne({ _id: id }).exec()
    if (!cityData) {
        console.log(`Duplicate Entry`)
        res.status(400).json({
            success: false,
            message: "Duplicate Entry"
        })
        return
    }
    try {
        await cityModel.updateOne({ _id: id }, {
            $set: {
                _id: code,
                name,
                img,
                state,
                mainContent
            }
        })
        console.log(`City ${cityData.name} updated Successfully`)
        res.status(200).json({
            success: true,
            message: `City ${cityData.name} updated Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred ${err.message}`
        })
    }
}

const deleteState = async (req, res) => {
    const { id } = req.params
    try {
        await stateModel.deleteOne({ _id: id })
        console.log(`State with code ${id} deleted Successfully`)
        res.status(200).json({
            success: true,
            message: `State with code ${id} deleted Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const deleteCity = async (req, res) => {
    const { id } = req.params
    try {
        await cityModel.deleteOne({ _id: id })
        console.log(`City with code ${id} deleted Successfully`)
        res.status(200).json({
            success: true,
            message: `City with code ${id} deleted Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const getAdminData = async (req, res) => {
    const { username } = req.session
    try {
        const { img, phNumber, name } = await userModel.findOne({ _id: username }).exec()
        userData = {
            email: username,
            img,
            phNumber,
            name
        }
        console.log(`Admin Data of ${name} fetched Successfully`)
        res.status(200).json({
            success: true,
            message: `Admin Data of ${name} fetched Successfully`,
            userData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const adminProfileUpdate = async (req, res) => {
    const { username } = req.session
    let { email, name, img, phNumber } = req.body
    // email = email.toLowerCase()
    // const duplicateCheck = await userModel.findOne({ _id: email }).exec()
    // if (duplicateCheck && email !== username) {
    //     console.log(`Duplicate Entry`)
    //     res.status(400).json({
    //         success: false,
    //         message: "Duplicate Entry"
    //     })
    //     return
    // }
    const adminData = await userModel.findOne({ _id: username }).exec()
    try {
        await userModel.updateOne({ _id: username }, {
            $set: {
                // _id: email,
                name,
                img,
                phNumber
            }
        })
        req.session.username = email
        console.log(`Admin ${adminData.name} updated Successfully`)
        res.status(200).json({
            success: true,
            message: `Admin ${adminData.name} updated Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const addNewUser = async (req, res) => {
    let { email, name, phNumber, role, password } = req.body
    email = email.toLowerCase()
    const duplicateCheck = await userModel.findOne({ _id: email }).exec()
    if (duplicateCheck) {
        console.log(`Duplicate Entry`)
        res.status(400).json({
            success: false,
            message: "Duplicate Entry"
        })
        return
    }
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    try {
        password = await bcrypt.hash(password, 10)
        await userModel.create({
            _id: email,
            name,
            phNumber,
            password,
            role
        })
        if (role) {
            console.log(`New Admin ${name} registered with email ID ${email}`)
            res.status(200).json({
                success: true,
                message: `New Admin ${name} registered with email ID ${email}`
            })
        } else {
            console.log(`New User ${name} register with email Id ${email}`)
            res.status(200).json({
                success: true,
                message: `New User ${name} register with email Id ${email}`
            })
        }
    } catch (err) {
        console.error(`Error occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error occurred : ${err.message}`
        })
    }
}

const getUsers = async (req, res) => {
    try {
        let usersData = await userModel.find({})
        console.log("Users data fetched Successfully")
        const { page, limit } = req.query
        if (page && limit) {
            const startIndex = page - 1
            const endIndex = limit
            usersData = usersData.slice(startIndex, endIndex)
        }
        res.status(200).json({
            success: true,
            message: "Users data fetched Successfully",
            usersData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    const userData = await userModel.findOne({ _id: id }).exec()
    console.log(`User ${userData.name} with ID ${id} fetched Successfully`)
    res.status(200).json({
        success: true,
        message: `User ${userData.name} with ID ${id} fetched Successfully`,
        userData
    })
}

const checkAdminCurrentPassword = async (req, res) => {
    const { password } = req.body
    const { username } = req.session
    const adminData = await userModel.findOne({ _id: username }).exec()
    let passwordCheck = await bcrypt.compare(password, adminData.password)
    if (passwordCheck) {
        console.log("Password verified")
        res.status(200).json({
            success: true,
            message: "Authorized"
        })
    } else {
        console.log("Unauthorized")
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

const changeAdminPassword = async (req, res) => {
    const { username } = req.session
    let { password } = req.body
    try {
        password = await bcrypt.hash(password, 10)
        await userModel.updateOne({ _id: username }, {
            $set: {
                password
            }
        })
        console.log(`Admin with ${username} ID Changed Password`)
        res.status(200).json({
            success: true,
            message: `Admin with ${username} ID Changed Password`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const deleteAdminSelf = async (req, res) => {
    const { username } = req.session
    try {
        await userModel.deleteOne({ _id: username })
        console.log(`User ${username} deleted Successfully`)
        res.status(200).json({
            success: true,
            message: `User ${username} deleted Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const editUser = async (req, res) => {
    const { id } = req.params
    const { name, email, img, phNumber, role } = req.body
    try {
        await userModel.updateOne({ _id: id }, {
            $set: {
                _id: email,
                name,
                img,
                phNumber,
                role
            }
        })
        console.log(`User ${name} updated Successfully`)
        res.status(200).json({
            success: true,
            message: `User ${name} updated Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await userModel.deleteOne({ _id: id })
        console.log(`User with ID ${id} deleted Successfully`)
        res.status(200).json({
            success: true,
            message: `User with ID ${id} deleted Successfully`
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

module.exports = { addState, addCity, getState, getCity, editCity, editState, deleteState, deleteCity, getAdminData, adminProfileUpdate, getUsers, getUser, addNewUser, editUser, checkAdminCurrentPassword, changeAdminPassword, deleteAdminSelf, deleteUser }