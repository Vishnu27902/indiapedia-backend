const cityModel = require("../models/cityModel")
const stateModel = require("../models/stateModel")

const getStates = async (req, res) => {
    try {
        let statesData = await stateModel.find({}).exec()
        const { page, limit } = req.query
        if (page && limit) {
            const startIndex = page - 1
            const endIndex = limit
            statesData = statesData.slice(startIndex, endIndex)
        }
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
        let citiesData = await cityModel.find({}).exec()
        console.log("Cities Data Fetched Successfully")
        const { page, limit } = req.query
        if (page && limit) {
            const startIndex = page - 1
            const endIndex = limit
            citiesData = citiesData.slice(startIndex, endIndex)
        }
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

const getSearchResult = async (req, res) => {
    let { data } = req.query
    try {
        data = data.toLowerCase()
        const regex = new RegExp(data, "g")
        const states = await stateModel.find({})
        const cities = await cityModel.find({})
        const statesData = states.filter(state => regex.test(state.name.toLowerCase()))
        const citiesData = cities.filter(city => regex.test(city.name.toLowerCase()))
        console.log(`Search results for the input ${data} has been successfully Generated`)
        res.status(200).json({
            success: true,
            message: `Search results for the input ${data} has been successfully Generated`,
            statesData,
            citiesData
        })
    } catch (err) {
        console.log(`Error Occurred : ${err.message}`)
        res.status(409).json({
            success: true,
            message: `Error Occurred : ${err.message}`
        })
    }
}

module.exports = { getStates, getCities, getState, getCity, getSearchResult }