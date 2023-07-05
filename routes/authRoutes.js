const express = require("express")
const { signUpController, signInController, logoutController, refreshController } = require("../controllers/authControllers")
const Router = express.Router()

Router.route("/signUp").post(signUpController)

Router.route("/signIn").post(signInController)

Router.route("/refresh").get(refreshController)

Router.route("/logout").get(logoutController)

module.exports = Router