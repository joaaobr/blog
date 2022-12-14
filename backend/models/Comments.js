const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost/blog")

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        unique: true,
        required: true
    }
})

const Comment = mongoose.model("comments", CommentSchema)

module.exports = Comment