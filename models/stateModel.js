const mongoose = require("mongoose")
const getDefaultImg = require("../helpers/defaultDummyImg")
const Schema = mongoose.Schema

const stateSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        data: {
            type: String,
            default: getDefaultImg()
        },
        contentType: {
            type: String,
            default: "png"
        },
        alt: {
            type: String,
            default: "Image"
        }
    },
    impression: {
        like: {
            type: Array,
            required: true
        },
        comment: [{
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                unique: true
            },
            username: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            postedAt: {
                type: String,
                required: true
            }
        }]
    },
    flowChart: {
        type: Array,
        default: ["General", "History", "Geography", "Education", "Economy", "Culture", "Sports", "Tourism", "Additional"]
    },
    mainContent: [{
        order: {
            type: Number,
            required: true,
            unique: true
        },
        category: {
            type: String,
            enum: ['h1', 'h3', 'h5', 'description', 'list', 'table', 'img', 'iframe'],
            required: true
        },
        content: {
            type: String
        },
        table: {
            th: Array,
            tr: Array
        },
        list: Array,
        img: {
            data: {
                type: String,
                default: getDefaultImg()
            },
            contentType: {
                type: String,
                default: "png"
            },
            alt: {
                type: String,
                default: "Image"
            }
        }
    }]
})

const stateModel = mongoose.model("states", stateSchema)

module.exports = stateModel