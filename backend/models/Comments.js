const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost/blog")

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        unique: true,
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