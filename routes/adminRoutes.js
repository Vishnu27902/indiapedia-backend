const express = require("express")
const { getAdminData, adminProfileUpdate, deleteAdminSelf, addState, addCity, getState, editState, getCity, editCity, addNewUser, deleteUser, getUsers, editUser, deleteState, deleteCity, checkAdminCurrentPassword, changeAdminPassword, getUser } = require("../controllers/adminController")
const { getStates, getCities, getSearchResult } = require("../controllers/appController")
const Router = express.Router()

Router.route("/").get(getAdminData).patch(adminProfileUpdate).delete(deleteAdminSelf)

Router.route("/state").post(addState)

Router.route("/city").post(addCity)

Router.route("/states").get(getStates)

Router.route("/states/:id").get(getState).delete(deleteState)

Router.route("/cities").get(getCities)

Router.route("/cities/:id").get(getCity).delete(deleteCity)

Router.route("/state/:id").get(getState).patch(editState)

Router.route("/city/:id").get(getCity).patch(editCity)

Router.route("/users").get(getUsers).post(addNewUser)

Router.route("/users/:id").get(getUser).patch(editUser).delete(deleteUser)

Router.route("/checkAdminPassword").post(checkAdminCurrentPassword)

Router.route("/changeAdminPassword").post(changeAdminPassword)

Router.route("/search").get(getSearchResult)

module.exports = Router