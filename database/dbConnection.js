const mongoose = require("mongoose")

const connectDB = async (connectionString) => {
    try {
        await mongoose.connect(connectionString)
        console.log("Database Connection Established Successfully")
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB