const { format } = require("date-fns")
const { id } = require("date-fns/locale")

const timeFormatter = (post) => {
    const date = format(Date.now(), "dd/MM/yyyy HH:mm a", { locale: id })
    post.postedAt = date
    console.log("Post Time Formatted Successfully")
    return post
}

module.exports = timeFormatter