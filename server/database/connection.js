require('dotenv').config()
const mongoose = require('mongoose')
const { DB_HOST, DB_NAME, NODE_ENV, DB_URI } = process.env

const options = { maxPoolSize: 10 }

mongoose.set("strictQuery", true);

if (NODE_ENV === "development") {
    mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, options)
} else {
    mongoose.connect(DB_URI, options)
}

module.exports = mongoose