const mongoose = require("mongoose")
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
            type: String
        },
        contentType: {
            type: String
        },
        alt: {
            type: String
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
            user: {
                type: String,
                required: true
            },
            comment: {
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
        default: ["General", "History", "Geography", "Education", "Economy", "Culture", "Sports", "Tourism"]
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
                type: String
            },
            contentType: {
                type: String
            },
            alt: {
                type: String
            }
        }
    }]
})

const stateModel = mongoose.model("states", stateSchema)

module.exports = stateModel