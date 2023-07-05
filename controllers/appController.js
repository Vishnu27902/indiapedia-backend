const cityModel = require("../models/cityModel")
const stateModel = require("../models/stateModel")

const getStates = async (req, res) => {
    try {
        const statesData = await stateModel.find({}).exec()
        console.log("States Data Fetched Successfully")
        res.status(200).json({
            success: true,
            message: "States Data Fetched Successfully",
            statesData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const getCities = async (req, res) => {
    try {
        const citiesData = await cityModel.find({}).exec()
        console.log("Cities Data Fetched Successfully")
        res.status(200).json({
            success: true,
            message: "Cities Data Fetched Successfully",
            citiesData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

const getState = async (req, res) => {
    const { id } = req.params
    try {
        const stateData = await stateModel.find({ _id: id })
        console.log(`State Data with code ${id} Fetched Successfully`)
        res.status(200).json({
            success: true,
            message: `State Data with code ${id} Fetched Successfully`,
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
    try {
        const cityData = await cityModel.find({ _id: id })
        console.log(`City Data with code ${id} Fetched Successfully`)
        res.status(200).json({
            success: true,
            message: `City Data with code ${id} Fetched Successfully`,
            cityData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: false,
            message: `Error Occurred : ${err.message}`
        })
    }
}

module.exports = { getStates, getCities, getState, getCity }