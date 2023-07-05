const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    img: {
        data: {
            type: String
        },
        contentType: {
            type: String
        },
        alt: {
            type: String
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