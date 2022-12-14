const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost/blog")

const PostsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const Post = mongoose.model("posts", PostsSchema)

module.exports = Post