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
    post: {
        type: Text,
        required: true
    },
    id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Posts = mongoose.model("posts", PostsSchema)

module.exports = Posts