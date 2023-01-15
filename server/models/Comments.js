const mongoose = require('../database/connection')

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Comment = mongoose.model("comments", CommentSchema)

module.exports = Comment