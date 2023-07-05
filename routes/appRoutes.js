const express = require("express")
const { getStates, getCities, getState, getCity } = require("../controllers/appController")
const Router = express.Router()

Router.route("/states").get(getStates)

Router.route("/cities").get(getCities)

Router.route("/states/:id").get(getState)

Router.route("/cities/:id").get(getCity)

module.exports = Router