const express = require("express")
const { getAdminData, adminProfileUpdate, deleteAdminSelf, addState, addCity, getState, editState, getCity, editCity, addNewUser, deleteUser, getUsers, editUser, deleteState, deleteCity, checkAdminCurrentPassword, changeAdminPassword, getUser } = require("../controllers/adminController")
const Router = express.Router()

Router.route("/").get(getAdminData).patch(adminProfileUpdate).delete(deleteAdminSelf)

Router.route("/state").post(addState)

Router.route("/city").post(addCity)

Router.route("/state/:id").get(getState).patch(editState).delete(deleteState)

Router.route("/city/:id").get(getCity).patch(editCity).delete(deleteCity)

Router.route("/users").get(getUsers).post(addNewUser)

Router.route("/users/:id").get(getUser).patch(editUser).delete(deleteUser)

Router.route("/checkAdminPassword").post(checkAdminCurrentPassword)

Router.route("/changeAdminPassword").post(changeAdminPassword)

module.exports = Router