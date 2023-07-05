const domainList = [
    "http://localhost:5000",
    "http://localhost:3000"
]

const corsOption = {
    origin: (origin, callback) => {
        if (domainList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error("CORS not allowed"))
        }
    },
    credentials: true
}