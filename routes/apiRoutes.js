const express = require("express")
const Router = express.Router()

Router.route("/").get()

Router.route("/states").get()

Router.route("/cities").get()

module.exports = Router