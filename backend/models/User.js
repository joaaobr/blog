require('dotenv').config()
const mongoose = require('mongoose')
const { DB_HOST } = process.env 

mongoose.connect(`mongodb://${DB_HOST}/blog`)

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    }
})

const User = mongoose.model("users", UserSchema)

module.exports = User