require('dotenv').config()
const mongoose = require('mongoose')
const { DB_HOST } = process.env 

mongoose.connect(`mongodb://${DB_HOST}/blog`)

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