const express = require("express")
const { getUserData, editUserData, deleteUserSelf, checkUserPassword, changeUserPassword, stateLike, stateDislike, statePost, statePostDelete, cityLike, cityDislike, cityPost, cityPostDelete } = require("../controllers/userController")
const Router = express.Router()

Router.route("/").get(getUserData).patch(editUserData).delete(deleteUserSelf)

Router.route("/checkPassword").post(checkUserPassword)

Router.route("/changePassword").post(changeUserPassword)

Router.route("/states/like/:id").patch(stateLike).delete(stateDislike)

Router.route("/states/post/:id").post(statePost)

Router.route("/states/post/:id/:postID").delete(statePostDelete)

Router.route("/cities/like/:id").patch(cityLike).delete(cityDislike)

Router.route("/cities/post/:id").post(cityPost)

Router.route("/cities/post/:id/:postID").delete(cityPostDelete)

module.exports = Router