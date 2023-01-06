require('dotenv').config()
const mongoose = require('mongoose')
const { DB_HOST, DB_NAME, NODE_ENV, DB_URI } = process.env

mongoose.set("strictQuery", true);

if (NODE_ENV === "development") {
    mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`)
} else {
    mongoose.connect(DB_URI)
}


module.exports = mongoose