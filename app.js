require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session")

const adminRouter = require("./routes/adminRoutes")
const apiRouter = require("./routes/apiRoutes")
const appRouter = require("./routes/appRoutes")
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const corsOption = require("./config/corsOption")
const connectDB = require("./database/dbConnection")
const verifyJWT = require("./middlewares/verifyJWT")

const { PORT, MONGO_LOCAL_URI, SESSION_SECRET } = process.env
const app = express()

connectDB(MONGO_LOCAL_URI)

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    }
}))
app.use(cookieParser())
app.use(cors(corsOption))
app.use(
    express.urlencoded({
        extended: false
    }),
    express.json({
        limit: "20mb"
    }))

app.use("/api/v1", apiRouter)
app.use("/app", appRouter)
app.use("/auth", authRouter)
app.use("/admin", verifyJWT, adminRouter)
app.use("/user", verifyJWT, userRouter)

app.use("*", (req, res) => {
    res.sendStatus(404)
})

mongoose.connection.on("open", () => {
    app.listen(PORT, () => {
        console.log(`Server listening at Port ${PORT}... http://localhost:${PORT}`)
    })
})