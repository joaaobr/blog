const mongoose = require('../database/connection')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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