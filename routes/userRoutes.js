const express = require("express")
const { getUserData, editUserData, deleteUserSelf, checkUserPassword, changeUserPassword, stateLike, stateDislike, statePost, statePostDelete, cityLike, cityDislike, cityPost, cityPostDelete } = require("../controllers/userController")
const { getSearchResult, getCities, getStates, getState, getCity } = require("../controllers/appController")
const Router = express.Router()

Router.route("/").get(getUserData).patch(editUserData).delete(deleteUserSelf)

Router.route("/checkPassword").post(checkUserPassword)

Router.route("/changePassword").post(changeUserPassword)

Router.route("/states").get(getStates)

Router.route("/cities").get(getCities)

Router.route("/states/:id").get(getState)

Router.route("/cities/:id").get(getCity)

Router.route("/states/:id/like").patch(stateLike).delete(stateDislike)

Router.route("/states/:id/post").post(statePost)

Router.route("/states/:id/post/:postID").delete(statePostDelete)

Router.route("/cities/:id/like").patch(cityLike).delete(cityDislike)

Router.route("/cities/:id/post").post(cityPost)

Router.route("/cities/:id/post/:postID").delete(cityPostDelete)

Router.route("/result").get(getSearchResult)

module.exports = Router