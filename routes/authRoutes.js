const express = require("express")
const { signUpController, signInController, logoutController, refreshController } = require("../controllers/authControllers")
const { registerLogger, loginLogger } = require("../middlewares/loggers")
const Router = express.Router()

Router.route("/signUp").post(registerLogger, signUpController)

Router.route("/signIn").post(loginLogger, signInController)

Router.route("/refresh").get(refreshController)

Router.route("/logout").get(logoutController)

module.exports = Router