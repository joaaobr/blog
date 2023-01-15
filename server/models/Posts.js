const mongoose = require('../database/connection')

const PostsSchema = new mongoose.Schema({
    name: {
        type: String,
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