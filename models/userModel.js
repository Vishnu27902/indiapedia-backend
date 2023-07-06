const mongoose = require("mongoose")
const getDefaultUserImg = require("../helpers/defaultUserImg")
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    img: {
        data: {
            type: String,
            default: getDefaultUserImg()
        },
        contentType: {
            type: String,
            default: "jpg"
        },
        alt: {
            type: String,
            default: 'DP'
        }
    },
    name: {
        type: String,
        required: true
    },
    phNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    REFRESH_TOKEN: {
        type: String
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel