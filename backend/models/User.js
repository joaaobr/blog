const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost/blog")

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

const User = mongoose.model("user", UserSchema)

module.exports = User