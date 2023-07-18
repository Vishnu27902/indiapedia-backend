const express = require("express")
const { getStates, getCities, getState, getCity, getSearchResult } = require("../controllers/appController")
const Router = express.Router()

Router.route("/states").get(getStates)

Router.route("/cities").get(getCities)

Router.route("/states/:id").get(getState)

Router.route("/cities/:id").get(getCity)

Router.route("/search").get(getSearchResult)

module.exports = Router